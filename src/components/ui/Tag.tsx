import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: ReactNode;
  /**
   * `solid` — bordered chip for skills, stack and tools.
   * `subtle` — fainter border for topics and post tags.
   */
  variant?: 'solid' | 'subtle';
  className?: string;
}

/** Bordered monospace chip. The design's only "badge" shape. */
export function Tag({ children, variant = 'solid', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border font-mono',
        variant === 'solid'
          ? 'border-line text-dim px-[13px] py-2 text-[12px] tracking-[0.04em]'
          : 'border-line2 text-faint px-[9px] py-1 text-[10.5px] tracking-[0.06em]',
        className,
      )}
    >
      {children}
    </span>
  );
}
