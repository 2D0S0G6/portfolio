import type { ChatMessage } from '@/types';

const FALLBACK =
  "Sorry — I couldn't reach the assistant just now. Try again in a moment, or head to the Contact page.";

/**
 * Calls the portfolio's own /api/chat route.
 *
 * Always resolves to a displayable string: network failures and unconfigured
 * deployments surface as friendly copy rather than throwing into the UI.
 */
export async function askAssistant(
  messages: ChatMessage[],
  mode: 'guide' | 'explain',
  signal?: AbortSignal,
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, messages }),
      signal,
    });

    const data: unknown = await response.json().catch(() => null);
    const payload = data as { text?: string; error?: string } | null;

    if (!response.ok) return payload?.error ?? FALLBACK;
    return payload?.text?.trim() || FALLBACK;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return FALLBACK;
  }
}
