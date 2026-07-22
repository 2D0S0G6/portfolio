'use client';

import Link from 'next/link';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface MagneticCtaProps {
  href: string;
  children: ReactNode;
  'aria-label'?: string;
}

/**
 * The inverted navbar call-to-action. It drifts a few pixels toward the cursor
 * on hover and inverts to an outline on the way in.
 *
 * The magnet is skipped for visitors who prefer reduced motion, and the effect
 * is decorative only — it never affects where the link goes.
 */
export function MagneticCta({ href, children, 'aria-label': ariaLabel }: MagneticCtaProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef(0);
  const prefersReduced = usePrefersReducedMotion();

  // Measured once per hover. getBoundingClientRect() forces synchronous layout,
  // and calling it on every mousemove alongside a style write produced a
  // read→write→read thrash loop at pointer-event frequency.
  function onMouseEnter() {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
  }

  function onMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = rectRef.current;
    if (prefersReduced || !rect || frameRef.current) return;

    const { clientX, clientY } = event;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const node = ref.current;
      if (!node) return;
      const dx = Math.max(-8, Math.min(8, (clientX - (rect.left + rect.width / 2)) * 0.35));
      const dy = Math.max(-8, Math.min(8, (clientY - (rect.top + rect.height / 2)) * 0.4));
      node.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }

  function reset() {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
    rectRef.current = null;
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  }

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onBlur={reset}
      className="bg-text border-text text-btn-ink hover:text-text flex h-11 items-center gap-2 border px-4 font-mono text-[11px] tracking-[0.14em] uppercase transition-[background,color,transform] duration-350 hover:bg-transparent"
    >
      {children}
    </Link>
  );
}
