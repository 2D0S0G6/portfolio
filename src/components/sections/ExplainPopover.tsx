'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { askAssistant } from '@/lib/assistant';
import { TypingDots } from '@/components/ui/TypingDots';

interface Selection {
  text: string;
  x: number;
  y: number;
}

const MIN_LENGTH = 4;
const MAX_LENGTH = 800;

/**
 * Offers a plain-language explanation of any text the visitor highlights
 * inside <main>.
 *
 * Pointer-driven by nature, so it is strictly an enhancement: everything it
 * explains is already readable on the page.
 */
export function ExplainPopover() {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const dismiss = useCallback(() => {
    abortRef.current?.abort();
    setSelection(null);
    setOpen(false);
    setText('');
    setLoading(false);
  }, []);

  useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      // Ignore selections made inside chrome (nav, footer, the popover itself).
      if (target?.closest('[data-no-explain]')) return;

      // Defer so the browser has committed the new selection.
      setTimeout(() => {
        const scope = document.querySelector('[data-explain-scope]');
        const active = window.getSelection();
        const value = active?.toString().trim() ?? '';

        if (scope && active?.rangeCount && value.length >= MIN_LENGTH && value.length <= MAX_LENGTH) {
          const range = active.getRangeAt(0);
          if (scope.contains(range.commonAncestorContainer)) {
            const rect = range.getBoundingClientRect();
            if (rect.width) {
              setSelection({ text: value, x: rect.left + rect.width / 2, y: rect.top });
              setOpen(false);
              setText('');
              return;
            }
          }
        }

        setOpen((isOpen) => {
          if (!isOpen) setSelection(null);
          return isOpen;
        });
      }, 10);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') dismiss();
    }

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dismiss]);

  async function explain() {
    if (!selection) return;

    setOpen(true);
    setLoading(true);
    setText('');

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const reply = await askAssistant(
        [{ role: 'user', content: `Explain this briefly: "${selection.text.slice(0, 600)}"` }],
        'explain',
        controller.signal,
      );
      setText(reply);
    } catch {
      return; // Aborted — the popover has already been dismissed.
    } finally {
      setLoading(false);
    }
  }

  if (!selection) return null;

  const clampedX = Math.min(Math.max(selection.x, 120), window.innerWidth - 120);
  const clampedY = Math.max(selection.y, 70);

  return (
    <div
      data-no-explain
      className="fixed z-99 -translate-x-1/2 -translate-y-[calc(100%+12px)]"
      style={{ left: clampedX, top: clampedY }}
    >
      {open ? (
        <div
          role="dialog"
          aria-label="Explanation"
          className="bg-panel border-line w-[min(300px,calc(100vw-32px))] border px-[15px] py-3.5 shadow-[0_16px_44px_rgba(0,0,0,0.5)]"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-faint font-mono text-[10px] tracking-[0.2em] uppercase">Explain ✦</span>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close explanation"
              className="text-dim hover:text-text cursor-pointer border-none bg-transparent text-sm leading-none"
            >
              ✕
            </button>
          </div>
          {loading ? (
            <TypingDots className="py-1" />
          ) : (
            <p className="text-text text-[13px] leading-[1.6]">{text}</p>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => void explain()}
          className="bg-text text-btn-ink flex cursor-pointer items-center gap-2 border-none px-3.5 py-2 font-mono text-[11px] tracking-[0.14em] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          <span aria-hidden="true" className="text-xs">
            ✦
          </span>
          Explain this
        </button>
      )}
    </div>
  );
}
