import { emailParts } from '@/data/site';

/**
 * Assembles the contact address from its parts.
 *
 * Callers must only invoke this in an effect (never during render) so the
 * complete address never appears in the server-rendered HTML — that is the
 * point of the design's "Address assembled client-side" note.
 */
export function assembleEmail(): string {
  return `${emailParts[0]}@${emailParts[1]}`;
}

/** Builds the mailto: URL used by the contact form's submit handler. */
export function buildMailto(name: string, from: string, message: string): string {
  const subject = encodeURIComponent(`Portfolio — message from ${name || 'a visitor'}`);
  const signature = name || from ? `\n\n— ${name}${from ? ` (${from})` : ''}` : '';
  const body = encodeURIComponent(`${message}${signature}`);
  return `mailto:${assembleEmail()}?subject=${subject}&body=${body}`;
}
