'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/types';
import { askAssistant } from '@/lib/assistant';
import { cn } from '@/lib/utils';
import { Arrow } from '@/components/ui/Arrow';
import { TypingDots } from '@/components/ui/TypingDots';

const GREETING: ChatMessage = {
  role: 'assistant',
  content: "Hi — I'm the site guide. Ask me anything about Deepak's research, projects, or writing.",
};

/**
 * Floating "Ask the site" assistant.
 *
 * Appears once the visitor has scrolled past the hero (or immediately on any
 * inner route), then expands into a small chat panel.
 */
export function ChatDock() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [loading, setLoading] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > (window.innerHeight || 800) * 0.55);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  async function send() {
    const input = inputRef.current;
    const question = input?.value.trim();
    if (!input || !question || loading) return;

    input.value = '';
    const next: ChatMessage[] = [...messages, { role: 'user', content: question }];
    setMessages(next);
    setLoading(true);

    // Drop the canned greeting — the API requires a leading user turn.
    const reply = await askAssistant(
      next.filter((m, i) => !(i === 0 && m.role === 'assistant')),
      'guide',
    );

    setMessages([...next, { role: 'assistant', content: reply }]);
    setLoading(false);
  }

  if (!visible && !open) return null;

  return (
    <div className="fixed right-[clamp(14px,3vw,28px)] bottom-[clamp(14px,3vw,28px)] z-90">
      {open ? (
        <div
          role="dialog"
          aria-label="Site guide"
          className="bg-panel border-line animate-pf-in flex h-[min(560px,calc(100svh-96px))] w-[min(370px,calc(100vw-28px))] flex-col border shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="border-line2 flex flex-none items-center justify-between border-b px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="bg-text h-2 w-2 rotate-45" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">Site Guide</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-dim hover:text-text h-7 w-7 cursor-pointer border-none bg-transparent text-base transition-colors"
            >
              ✕
            </button>
          </div>

          <div ref={bodyRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
              >
                <p
                  className={cn(
                    'max-w-[82%] border px-3.5 py-2.5 text-[13.5px] leading-[1.55] whitespace-pre-wrap',
                    message.role === 'user'
                      ? 'border-text bg-text text-btn-ink'
                      : 'border-line2 text-text bg-transparent',
                  )}
                >
                  {message.content}
                </p>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <TypingDots className="border-line2 border px-3.5 py-3" />
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
            className="border-line2 flex flex-none gap-2 border-t p-3"
          >
            <input
              ref={inputRef}
              placeholder="Ask about the work…"
              aria-label="Message"
              className="bg-bg border-line text-text placeholder:text-faint flex-1 border px-3 py-2.5 text-[13.5px] outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={loading}
              className="bg-text text-btn-ink w-[42px] flex-none cursor-pointer border-none text-base disabled:opacity-50"
            >
              <Arrow direction="up" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open assistant"
          className="bg-panel border-line text-text hover:border-text hover:bg-raise animate-pf-in flex cursor-pointer items-center gap-2.5 border px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-[border-color,background]"
        >
          <span aria-hidden="true" className="bg-text animate-dot-pulse h-[9px] w-[9px] rounded-full" />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase">Ask the site</span>
        </button>
      )}
    </div>
  );
}
