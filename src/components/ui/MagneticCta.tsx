'use client';

import Link from 'next/link';
import { useRef, type MouseEvent, type ReactNode } from 'react';

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

  function onMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = node.getBoundingClientRect();
    const dx = Math.max(-8, Math.min(8, (event.clientX - (rect.left + rect.width / 2)) * 0.35));
    const dy = Math.max(-8, Math.min(8, (event.clientY - (rect.top + rect.height / 2)) * 0.4));
    node.style.transform = `translate(${dx}px, ${dy}px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  }

  return (
    <Link
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onBlur={reset}
      className="bg-text border-text text-btn-ink hover:text-text flex h-11 items-center gap-2 border px-4 font-mono text-[11px] tracking-[0.14em] uppercase transition-[background,color,transform] duration-350 hover:bg-transparent"
    >
      {children}
    </Link>
  );
}
