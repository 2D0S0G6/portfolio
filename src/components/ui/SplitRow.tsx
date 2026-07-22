import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

/**
 * Width of the left meta gutter. The design tunes this per page, so each
 * preset is a literal class string Tailwind can see at build time.
 */
export type GutterWidth = 'sm' | 'md' | 'lg' | 'xl';

const gutters: Record<GutterWidth, string> = {
  sm: 'flex-[0_0_clamp(120px,15vw,180px)]', // about (education), honors
  md: 'flex-[0_0_clamp(130px,16vw,200px)]', // experience, publications
  lg: 'flex-[0_0_clamp(150px,22vw,260px)]', // skills
  xl: 'flex-[0_0_clamp(150px,22vw,280px)]', // soc
};

interface SplitRowProps {
  /** Left gutter content — ordinal, period, venue, category heading. */
  aside: ReactNode;
  children: ReactNode;
  gutter?: GutterWidth;
  /** The design uses the fainter rule for skills, the stronger one elsewhere. */
  rule?: 'line' | 'line2';
  /** Skills rows are tighter than article-like rows. */
  density?: 'tight' | 'loose';
  as?: ElementType;
  className?: string;
}

/**
 * The meta-gutter + content layout shared by Skills, Experience, Publications,
 * SOC & DFIR, Honors and the education block on About. Wraps to a single
 * column below the flex-basis threshold.
 */
export function SplitRow({
  aside,
  children,
  gutter = 'md',
  rule = 'line',
  density = 'loose',
  as = 'article',
  className,
}: SplitRowProps) {
  return (
    <Reveal
      as={as}
      className={cn(
        'flex flex-wrap gap-[clamp(18px,3vw,48px)] border-t',
        rule === 'line' ? 'border-line' : 'border-line2',
        density === 'tight' ? 'py-[clamp(28px,4vw,44px)]' : 'py-[clamp(30px,4.5vw,52px)]',
        className,
      )}
    >
      <div className={gutters[gutter]}>{aside}</div>
      {/* min-w-0: a flex item's auto minimum would otherwise stop long DOIs
          and titles from shrinking below their min-content width. */}
      <div className="min-w-0 flex-[1_1_min(100%,460px)]">{children}</div>
    </Reveal>
  );
}
