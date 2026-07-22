'use client';

import { assembleEmail } from '@/lib/email';
import { useIsMounted } from '@/lib/hooks';

const sharedClass =
  'font-display border-line block border-b text-[clamp(22px,3.4vw,40px)] leading-[1.05] font-bold tracking-[-0.02em]';

/**
 * Renders the contact address only after hydration, so the complete string
 * never appears in the server-rendered HTML that scrapers read.
 */
export function ObfuscatedEmail() {
  const mounted = useIsMounted();

  if (!mounted) {
    return <span className={`${sharedClass} text-dim`}>loading…</span>;
  }

  const email = assembleEmail();

  return (
    <a
      href={`mailto:${email}`}
      className={`${sharedClass} text-text hover:text-dim break-all transition-colors`}
    >
      {email}
    </a>
  );
}
