import { emailParts } from '@/data/site';

/**
 * Assembles the contact address from its parts.
 *
 * Must not run during a server render — callers gate it behind `useIsMounted()`
 * so the complete address never appears in the served HTML, which is the point
 * of the design's "Address assembled client-side" note.
 *
 * Worth knowing: this defeats HTML-only scrapers, not determined ones. Both
 * halves ship as adjacent string literals in the client bundle.
 */
export function assembleEmail(): string {
  return `${emailParts[0]}@${emailParts[1]}`;
}

/** Builds the mailto: URL used by the contact form's submit handler. */
export function buildMailto(name: string, from: string, message: string): string {
  const subject = encodeURIComponent(`Portfolio — message from ${name || 'a visitor'}`);
  // Built by filtering rather than a nested ternary: `name || from ? …` binds as
  // `(name || from) ? …`, so an empty name with a present address produced
  // "— ␣(a@b.com)" with a stray double space.
  const attribution = [name, from && `(${from})`].filter(Boolean).join(' ');
  const signature = attribution ? `\n\n— ${attribution}` : '';
  const body = encodeURIComponent(`${message}${signature}`);
  return `mailto:${assembleEmail()}?subject=${subject}&body=${body}`;
}
