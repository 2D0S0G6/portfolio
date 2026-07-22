import type { PageMeta } from '@/types';
import { HeroPlate } from './HeroPlate';
import { Reveal } from './Reveal';

/**
 * The gradient banner at the top of every content route: ordinal, eyebrow,
 * oversized title and a short intro, over a drifting hero plate.
 */
export function PageHeader({ num, eyebrow, title, intro }: PageMeta) {
  return (
    <header className="border-line relative flex h-[clamp(300px,46vh,470px)] items-end overflow-hidden border-b">
      <HeroPlate variant="header" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14)_0%,transparent_22%,var(--scrim)_64%,var(--bg)_100%)]"
      />
      <Reveal className="relative mx-auto w-full max-w-[1120px] px-[clamp(20px,5vw,56px)] pb-[clamp(28px,4vw,50px)]">
        <div className="text-dim flex items-center gap-3 font-mono text-[11px] tracking-[0.26em] uppercase">
          <span>{num}</span>
          <span className="bg-line inline-block h-px w-7" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <h1 className="font-display mt-4 max-w-[15ch] text-[clamp(42px,7.6vw,100px)] leading-[0.92] font-extrabold tracking-[-0.03em] text-balance">
          {title}
        </h1>
        <p className="text-dim mt-[18px] max-w-[54ch] text-[clamp(14px,1.4vw,17px)] leading-[1.6]">{intro}</p>
      </Reveal>
    </header>
  );
}
