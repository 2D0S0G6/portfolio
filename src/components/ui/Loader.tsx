'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { site } from '@/data/site';

/**
 * Full-screen intro card shown once on first load, then faded out.
 *
 * Purely decorative: it is aria-hidden and pointer-events-none, so it never
 * traps focus or blocks interaction, and it is skipped entirely for visitors
 * who prefer reduced motion.
 */
export function Loader() {
  const prefersReduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase('fading'), 1500);
    const hideTimer = setTimeout(() => setPhase('done'), 2150);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (prefersReduced || phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'bg-bg pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-600',
        phase === 'fading' ? 'opacity-0' : 'opacity-100',
      )}
    >
      <div className="relative flex flex-col items-center gap-5">
        <span className="bg-text animate-pf-in h-3 w-3 rotate-45" />
        <span className="font-display animate-pf-in text-text text-[clamp(30px,6vw,56px)] leading-none font-extrabold tracking-[-0.025em] [animation-delay:0.1s]">
          {site.name}
        </span>
        <span className="bg-text animate-line-grow h-px w-[min(220px,46vw)] origin-left scale-x-0 [animation-delay:0.25s]" />
        <span className="text-faint animate-pf-fade font-mono text-[10px] tracking-[0.34em] uppercase [animation-delay:0.55s]">
          Security · AI
        </span>
      </div>
    </div>
  );
}
