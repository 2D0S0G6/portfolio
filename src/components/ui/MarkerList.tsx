import { cn } from '@/lib/utils';

interface MarkerListProps {
  items: readonly string[];
  /** Leading glyph for each row — the design uses —, ↳, → and · by context. */
  marker: '—' | '↳' | '→' | '·';
  /** Body colour: bullets are dim except in Experience, where they are full text. */
  tone?: 'dim' | 'text';
  size?: 'sm' | 'md';
  className?: string;
}

/** Unstyled list with a faint leading glyph, used for every bullet block. */
export function MarkerList({ items, marker, tone = 'dim', size = 'md', className }: MarkerListProps) {
  return (
    <ul
      className={cn('m-0 flex list-none flex-col p-0', size === 'sm' ? 'gap-[9px]' : 'gap-[11px]', className)}
    >
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'flex leading-[1.5]',
            size === 'sm' ? 'gap-[10px] text-[13.5px]' : 'gap-3 text-[14.5px]',
            tone === 'dim' ? 'text-dim' : 'text-text',
          )}
        >
          <span className="text-faint flex-none" aria-hidden="true">
            {marker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
