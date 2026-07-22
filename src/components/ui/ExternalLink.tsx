import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Arrow } from './Arrow';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Underlined monospace link with a trailing ↗, used for GitHub / Live / paper
 * links. The arrow is decorative — screen readers announce the label only.
 */
export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'border-line text-text hover:text-text inline-flex items-center gap-2 border-b font-mono text-[12px] tracking-[0.1em] uppercase transition-colors hover:underline',
        className,
      )}
    >
      {children}
      <Arrow />
    </a>
  );
}
