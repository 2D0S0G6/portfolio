'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Required — these buttons are icon-only and carry no visible label. */
  'aria-label': string;
}

/** 44×44 bordered square button used for the navbar controls (44px touch target). */
export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'border-line text-text hover:border-text hover:bg-raise flex h-11 w-11 cursor-pointer items-center justify-center border bg-transparent transition-[border-color,transform,background] duration-250 hover:scale-105',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
