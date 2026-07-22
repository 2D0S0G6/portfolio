import Link from 'next/link';
import { Arrow } from '@/components/ui/Arrow';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container width="prose" className="flex min-h-[70svh] flex-col justify-center py-32">
      <span className="text-faint font-mono text-[11px] tracking-[0.26em] uppercase">404</span>
      <h1 className="font-display mt-4 text-[clamp(42px,7.6vw,88px)] leading-[0.92] font-extrabold tracking-[-0.03em]">
        Nothing here
      </h1>
      <p className="text-dim mt-[18px] max-w-[48ch] text-[clamp(14px,1.4vw,17px)] leading-[1.6]">
        That page doesn&apos;t exist — it may have moved, or the link may be wrong.
      </p>
      <Link
        href="/"
        className="border-line text-text hover:border-text mt-8 inline-flex w-fit items-center gap-2 border-b font-mono text-[12px] tracking-[0.1em] uppercase transition-colors"
      >
        <Arrow direction="left" /> Back to the index
      </Link>
    </Container>
  );
}
