import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** The four content widths used across the design. */
export type ContainerWidth = 'wide' | 'default' | 'narrow' | 'prose';

const widths: Record<ContainerWidth, string> = {
  wide: 'max-w-[1180px]', // home index
  default: 'max-w-[1120px]', // most content pages
  narrow: 'max-w-[1000px]', // writing index, related posts
  prose: 'max-w-[720px]', // article body
};

interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
}

/** Centred column with the design's fluid horizontal gutter. */
export function Container({ children, width = 'default', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-[clamp(20px,5vw,56px)]', widths[width], className)}>{children}</div>
  );
}
