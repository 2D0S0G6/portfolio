import { cn } from '@/lib/utils';

type Direction = 'up-right' | 'up' | 'left';

/**
 * U+FE0E (variation selector-15) forces text presentation — without it the
 * arrows fall back to the emoji font and render as blue glyphs.
 */
const glyphs: Record<Direction, string> = {
  'up-right': '↗︎',
  up: '↑︎',
  left: '←︎',
};

interface ArrowProps {
  direction?: Direction;
  className?: string;
}

/** Decorative directional arrow. Always hidden from assistive technology. */
export function Arrow({ direction = 'up-right', className }: ArrowProps) {
  return (
    <span aria-hidden="true" className={cn('font-sans', className)}>
      {glyphs[direction]}
    </span>
  );
}
