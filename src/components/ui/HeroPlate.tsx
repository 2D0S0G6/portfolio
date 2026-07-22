import { cn } from '@/lib/utils';

export type PlateVariant = 'hero' | 'header';

/**
 * The blurred, slowly drifting gradient field behind the hero and page headers.
 * Pure CSS — the design contains no raster imagery at all.
 *
 * Each variant's layers are spelled out as literal Tailwind classes (rather
 * than composed at runtime) because Tailwind only detects complete class
 * strings when it scans the source.
 */
const plate: Record<
  PlateVariant,
  { root: string; blur: string; scrim: string; blobA: string; blobB: string }
> = {
  hero: {
    root: '-inset-[16%]',
    blur: 'blur-[76px]',
    scrim:
      'bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,transparent_30%,transparent_60%,rgba(0,0,0,0.62)_100%)]',
    blobA:
      'left-0 right-[-8%] top-[-12%] h-[54%] bg-[radial-gradient(62%_86%_at_42%_44%,rgba(236,233,227,0.22),transparent_72%)]',
    blobB:
      'left-[-16%] right-[-16%] top-[40%] h-[42%] bg-[radial-gradient(56%_100%_at_50%_50%,rgba(206,203,196,0.3),transparent_74%)]',
  },
  header: {
    root: '-inset-[14%]',
    blur: 'blur-[70px]',
    scrim:
      'bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,transparent_32%,transparent_58%,rgba(0,0,0,0.66)_100%)]',
    blobA:
      'left-0 right-[-8%] top-[-16%] h-[60%] bg-[radial-gradient(62%_86%_at_40%_42%,rgba(236,233,227,0.2),transparent_72%)]',
    blobB:
      'left-[-16%] right-[-16%] top-[38%] h-[48%] bg-[radial-gradient(56%_100%_at_50%_50%,rgba(206,203,196,0.28),transparent_74%)]',
  },
};

interface HeroPlateProps {
  variant?: PlateVariant;
}

/**
 * `data-hero-plate` is the hook <ScrollEffects> uses to apply parallax.
 */
export function HeroPlate({ variant = 'hero' }: HeroPlateProps) {
  const v = plate[variant];

  return (
    <div data-hero-plate aria-hidden="true" className={cn('bg-bg absolute will-change-transform', v.root)}>
      <div className={cn('absolute inset-0 scale-[1.2]', v.blur)}>
        <div className={cn('absolute inset-0', v.scrim)} />
        <div className={cn('animate-blob-a absolute', v.blobA)} />
        <div className={cn('animate-blob-b absolute', v.blobB)} />
        {variant === 'hero' && (
          <div className="absolute right-[-10%] bottom-0 left-[-10%] h-[34%] bg-[radial-gradient(72%_100%_at_50%_64%,rgba(150,150,146,0.2),transparent_72%)]" />
        )}
      </div>
    </div>
  );
}
