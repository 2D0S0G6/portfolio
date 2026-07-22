'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Fades and lifts its children into place once they scroll into view.
 *
 * Renders visible-by-default and only hides itself after mount, so the content
 * is present in the server HTML and stays visible without JavaScript. Users who
 * prefer reduced motion never see the hidden state (the CSS defeats it, and the
 * observer is skipped entirely).
 */
export function Reveal({ children, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    // Already on screen at mount — leave it visible rather than flashing it out.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    setHidden(true);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHidden(false);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={cn('reveal', hidden && 'reveal-off', className)}>
      {children}
    </Tag>
  );
}
