import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';
import { buildKnowledgeBase } from '@/lib/knowledge';
import { site } from '@/data/site';

/** Guards against oversized payloads and runaway conversation history. */
const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 8;

type Mode = 'guide' | 'explain';

interface ChatRequest {
  mode?: Mode;
  messages?: { role?: string; content?: string }[];
}

const SYSTEM_PROMPTS: Record<Mode, () => string> = {
  guide: () =>
    `You are the friendly guide for the personal portfolio of ${site.name} (handle ${site.wordmark}), a Security Researcher & AI Engineer. ` +
    `Answer ONLY from the profile below, in a warm, concise voice (2-4 sentences). ` +
    `If something isn't covered, say you're not sure and point them to the Contact page.\n\nPROFILE:\n${buildKnowledgeBase()}`,
  explain: () =>
    "You explain highlighted text from a security & AI researcher's portfolio to a curious visitor. " +
    'Give a clear, friendly explanation in 1-3 sentences, plain language. If it is a technical term, define it simply.',
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  // The site is fully functional without a key — the assistant just says so.
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The assistant is not configured on this deployment.' },
      { status: 503 },
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const mode: Mode = body.mode === 'explain' ? 'explain' : 'guide';

  const messages = (body.messages ?? [])
    .filter((m) => typeof m.content === 'string' && m.content.trim().length > 0)
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
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: mode === 'explain' ? 220 : 500,
      system: SYSTEM_PROMPTS[mode](),
      messages,
    });

    const text = response.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('')
      .trim();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('[api/chat]', error);
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
