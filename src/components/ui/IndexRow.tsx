import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Arrow } from './Arrow';

interface IndexRowProps {
  href: string;
  n: string;
  label: string;
  /** Right-aligned description. Only the home index shows one. */
  blurb?: string;
  /** `index` is the home list; `menu` the larger overlay list. */
  variant?: 'index' | 'menu';
  /** Highlights the row for the current route. */
  active?: boolean;
  onNavigate?: () => void;
}

/**
 * A numbered navigation row that slides right on hover — the design's primary
 * navigation gesture, shared by the home index and the full-screen menu.
 */
export function IndexRow({
  href,
  n,
  label,
  blurb,
  variant = 'index',
  active = false,
  onNavigate,
}: IndexRowProps) {
  const isMenu = variant === 'menu';

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        'border-line2 hover:text-text group flex w-full items-baseline border-t text-left transition-[transform,color] duration-300 hover:translate-x-[10px]',
        isMenu
          ? 'gap-[clamp(14px,3vw,40px)] py-[clamp(10px,1.6vw,20px)]'
          : 'gap-[clamp(14px,3vw,40px)] py-[clamp(12px,1.5vw,20px)]',
        active ? 'text-text' : 'text-dim',
      )}
    >
      <span
        className={cn(
          'text-faint flex-none font-mono',
          isMenu ? 'w-[34px] text-[12px] tracking-[0.1em]' : 'w-[30px] text-[11px]',
        )}
        aria-hidden="true"
      >
        {n}
      </span>
      <span
        className={cn(
          'font-display tracking-[-0.02em]',
          isMenu
            ? 'text-[clamp(30px,6vw,68px)] leading-none font-bold'
            : 'flex-1 text-[clamp(22px,3.4vw,40px)] leading-[1.05] font-semibold',
        )}
      >
        {label}
      </span>
      {blurb && (
        <span className="text-dim max-w-[min(46%,340px)] text-right font-mono text-[11px] max-[860px]:hidden">
          {blurb}
        </span>
      )}
      {!isMenu && <Arrow className="text-dim text-[15px]" />}
    </Link>
  );
}
