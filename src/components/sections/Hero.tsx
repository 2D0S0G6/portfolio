import { site } from '@/data/site';
import { HeroPlate } from '@/components/ui/HeroPlate';

/**
 * Full-viewport opening: drifting gradient field, centred statement, and the
 * oversized wordmark bleeding off the bottom edge.
 */
export function Hero() {
  return (
    <div className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <HeroPlate variant="hero" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(74%_48%_at_50%_31%,var(--scrim),transparent_72%),linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,transparent_22%,var(--scrim)_70%,var(--bg)_100%)]"
      />

      <div className="absolute top-[31%] right-0 left-0 z-2 flex -translate-y-1/2 flex-col items-center gap-[22px] px-6">
        <p className="animate-pf-in text-text font-mono text-[clamp(10px,1vw,12px)] tracking-[0.4em] uppercase opacity-90 [animation-delay:1.5s] [animation-timing-function:cubic-bezier(0.2,0.7,0.2,1)]">
          {site.role}
        </p>
        <span
          aria-hidden="true"
          className="animate-pf-fade h-9 w-px bg-[linear-gradient(var(--text),transparent)] opacity-50 [animation-delay:1.62s]"
        />
        <p className="animate-pf-in text-text m-0 max-w-[530px] text-center text-[clamp(16px,1.7vw,21px)] leading-[1.66] text-balance [animation-delay:1.68s] [animation-timing-function:cubic-bezier(0.2,0.7,0.2,1)]">
          {site.tagline}
        </p>
      </div>

      <div
        aria-label={site.wordmark}
        role="img"
        className="animate-wm-rise pointer-events-none absolute bottom-[-0.14em] left-1/2 z-2 -translate-x-1/2 whitespace-nowrap [animation-delay:1.82s]"
      >
        <span className="font-display text-text block text-[clamp(90px,24vw,440px)] leading-[0.8] font-extrabold tracking-[-0.045em]">
          2D0
          <span className="text-transparent [-webkit-text-stroke:clamp(2px,0.4vw,4px)_var(--text)]">S</span>
          0G6
        </span>
      </div>
    </div>
  );
}
