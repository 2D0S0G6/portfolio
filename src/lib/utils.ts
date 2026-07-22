/** Joins conditional class names, dropping falsy entries. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Zero-pads a zero-based index into the "01", "02" ordinals used in gutters. */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * Formats an ISO date as "Jun 30, 2026".
 * Pinned to en-US and UTC so the server and client agree — a locale-dependent
 * format would produce a hydration mismatch.
 */
export function formatDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
