import { NextResponse } from 'next/server';
import { buildKnowledgeBase } from '@/lib/knowledge';
import { site } from '@/data/site';

/** Guards against oversized payloads and runaway conversation history. */
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 8;
/** Rejected before the body is parsed, so a huge payload is never buffered. */
const MAX_BODY_BYTES = 32 * 1024;

/**
 * Per-IP token bucket. Deliberately a speed bump, not a wall: the map is
 * per-instance and resets on redeploy, so a serverless deployment enforces this
 * per warm instance rather than globally. It stops a naive `while true` curl
 * loop from draining the quota; for a hard guarantee, put a platform-level rule
 * or a shared store (Upstash et al.) in front.
 *
 * 20/min leaves room for an engaged visitor to hold a real conversation.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const hits = new Map<string, number[]>();

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const UPSTREAM_TIMEOUT_MS = 20_000;

/** Cap the handler so a slow completion fails fast instead of hanging. */
export const maxDuration = 30;

type Mode = 'guide' | 'explain';

interface ChatRequest {
  mode?: Mode;
  messages?: { role?: string; content?: string }[];
}

/**
 * Built once at module load — the knowledge base is derived from static data,
 * so rebuilding it per request only burned CPU.
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
  const apiKey = process.env.GROQ_API_KEY;

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

  const history = (Array.isArray(rawMessages) ? rawMessages : [])
    .filter((m) => m && typeof m.content === 'string' && m.content.trim().length > 0)
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
    }));

  if (history.length === 0) {
    return NextResponse.json({ error: 'No message provided.' }, { status: 400 });
  }

  // Abort on either a slow upstream or the visitor closing the tab, so a
  // dropped connection stops consuming quota.
  const signal = AbortSignal.any([request.signal, AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)]);

  try {
    // Groq speaks the OpenAI chat-completions shape, so the system prompt is a
    // leading message rather than a separate top-level field.
    const upstream = await fetch(GROQ_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        max_tokens: mode === 'explain' ? 400 : 800,
        temperature: 0.6,
        messages: [{ role: 'system', content: SYSTEM_PROMPTS[mode] }, ...history],
      }),
      signal,
    });

    if (!upstream.ok) {
      // Log the status only — the body can echo back request content.
      console.error('[api/chat] upstream', upstream.status);
      return NextResponse.json(
        { error: 'The assistant is unavailable right now.' },
        { status: 502 },
      );
    }

    const payload = (await upstream.json()) as {
      choices?: { message?: { content?: string }; finish_reason?: string }[];
    };

    const text = payload.choices?.[0]?.message?.content?.trim() ?? '';
    if (!text) {
      return NextResponse.json({ error: 'The assistant returned an empty reply.' }, { status: 502 });
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('[api/chat]', error);
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
