import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container, type ContainerWidth } from './Container';

interface SectionProps {
  children: ReactNode;
  width?: ContainerWidth;
  /**
   * `list` — sits directly under a PageHeader, so the top pad is small and the
   *          first child's own border-top provides the rule.
   * `block` — standalone section with full padding top and bottom.
   */
  spacing?: 'list' | 'block';
  className?: string;
}

/** Standard content section: fade-in, centred container, fluid vertical rhythm. */
export function Section({ children, width = 'default', spacing = 'list', className }: SectionProps) {
  return (
    <section
      className={cn(
        'animate-pf-fade',
        spacing === 'list'
          ? 'pt-[clamp(20px,3vw,40px)] pb-[clamp(52px,8vw,104px)]'
          : 'py-[clamp(52px,8vw,104px)]',
        className,
      )}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
