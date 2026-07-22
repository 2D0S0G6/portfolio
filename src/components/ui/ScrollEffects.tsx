'use client';

import { useEffect, useRef } from 'react';

/**
 * Drives the two scroll-linked effects: the progress bar pinned to the top of
 * the viewport, and the parallax drift of the hero/header gradient plate.
 *
 * Both are written directly to the DOM inside a rAF rather than through React
 * state — this fires on every scroll frame, and re-rendering the tree that
 * often would be wasteful.
 */
export function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      const progress = Math.min(1, Math.max(0, window.scrollY / max));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }

      if (!prefersReduced) {
        const plate = document.querySelector<HTMLElement>('[data-hero-plate]');
        if (plate) plate.style.transform = `translateY(${window.scrollY * 0.26}px) scale(1.1)`;
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="bg-text fixed top-0 right-0 left-0 z-[96] h-0.5 origin-left scale-x-0 opacity-85"
    />
  );
}
