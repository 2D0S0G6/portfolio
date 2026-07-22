'use client';

import { Arrow } from './Arrow';

/** Smooth-scrolls to the top, respecting the reduced-motion preference. */
export function BackToTop() {
  function scrollToTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="text-dim hover:text-text flex cursor-pointer items-center gap-2 border-none bg-transparent font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
    >
      Back to top
      <Arrow direction="up" className="text-[13px]" />
    </button>
  );
}
