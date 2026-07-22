import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { buildKnowledgeBase } from '@/lib/knowledge';
import { site } from '@/data/site';

/** Guards against oversized payloads and runaway conversation history. */
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 8;
/** Rejected before the body is parsed, so a huge payload is never buffered. */
const MAX_BODY_BYTES = 32 * 1024;

/** Per-IP token bucket. Best-effort only — resets on redeploy and is per-instance. */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 12;
const hits = new Map<string, number[]>();

/** Cap the handler so a slow completion fails fast instead of hanging the platform. */
export const maxDuration = 30;

type Mode = 'guide' | 'explain';

interface ChatRequest {
  mode?: Mode;
  messages?: { role?: string; content?: string }[];
}

/**
 * Built once at module load — the knowledge base is derived from static data,
 * so rebuilding it per request only burned CPU and broke prompt-cache reuse.
 */
const KNOWLEDGE_BASE = buildKnowledgeBase();

const SYSTEM_PROMPTS: Record<Mode, string> = {
  guide:
    `You are the friendly guide for the personal portfolio of ${site.name} (handle ${site.wordmark}), a Security Researcher & AI Engineer. ` +
    `Answer ONLY from the profile below, in a warm, concise voice (2-4 sentences). ` +
    `If something isn't covered, say you're not sure and point them to the Contact page.\n\nPROFILE:\n${KNOWLEDGE_BASE}`,
  explain:
    "You explain highlighted text from a security & AI researcher's portfolio to a curious visitor. " +
    'Give a clear, friendly explanation in 1-3 sentences, plain language. If it is a technical term, define it simply.',
};

/** Reused across requests so the connection pool and keep-alive survive. */
let client: Anthropic | null = null;
function getClient(apiKey: string): Anthropic {
  return (client ??= new Anthropic({ apiKey }));
}

/** True when this caller has spare budget in the current window. */
function withinRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }

  return true;
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // The site is fully functional without a key — the assistant just says so.
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The assistant is not configured on this deployment.' },
      { status: 503 },
    );
  }

  const callerKey = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!withinRateLimit(callerKey)) {
    return NextResponse.json({ error: 'Too many requests — give it a moment.' }, { status: 429 });
  }

  if (Number(request.headers.get('content-length') ?? '0') > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
  }

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { mode: rawMode, messages: rawMessages } = body as ChatRequest;
  const mode: Mode = rawMode === 'explain' ? 'explain' : 'guide';

  const messages = (Array.isArray(rawMessages) ? rawMessages : [])
    .filter((m) => m && typeof m.content === 'string' && m.content.trim().length > 0)
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
    }));

  // The Messages API requires the conversation to begin with a user turn.
  while (messages.length > 0 && messages[0].role !== 'user') messages.shift();

  if (messages.length === 0) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
  }

  try {
    const response = await getClient(apiKey).messages.create(
      {
        model: 'claude-sonnet-5',
        // Sonnet 5 runs adaptive thinking when `thinking` is omitted, and
        // `max_tokens` caps thinking + text together. These are short grounded
        // answers, so thinking is disabled explicitly — otherwise the budget can
        // be spent reasoning and the response arrives with no text block at all.
        thinking: { type: 'disabled' },
        output_config: { effort: 'low' },
        max_tokens: mode === 'explain' ? 400 : 800,
        system: SYSTEM_PROMPTS[mode],
        messages,
      },
      { signal: request.signal, timeout: 20_000 },
    );

    if (response.stop_reason === 'refusal') {
      return NextResponse.json({ text: "I can't help with that one — try asking another way." });
    }

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    if (!text) {
      return NextResponse.json({ error: 'The assistant returned an empty reply.' }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('[api/chat]', error);
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
