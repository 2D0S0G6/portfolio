import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: ReactNode;
  /** `sm` is the 10.5px field label; `md` the 11px section label. */
  size?: 'sm' | 'md';
  as?: ElementType;
  className?: string;
}

/**
 * The small uppercase mono label used above every field, column and section.
 * Appears dozens of times in the design; always faint, always letter-spaced.
 */
export function Eyebrow({ children, size = 'sm', as: Tag = 'span', className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'text-faint font-mono uppercase',
        size === 'sm' ? 'text-[10.5px] tracking-[0.22em]' : 'text-[11px] tracking-[0.3em]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
