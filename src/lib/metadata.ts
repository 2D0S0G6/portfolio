import type { Metadata } from 'next';
import { pageMeta } from '@/data/site';
import type { SectionId } from '@/types';

/**
 * Builds per-route metadata from the same copy the PageHeader renders, so the
 * title and description can never drift from what's on the page.
 */
export function sectionMetadata(id: SectionId): Metadata {
  const meta = pageMeta[id];
  return {
    title: meta.title,
    description: meta.intro,
    openGraph: {
      title: meta.title,
      description: meta.intro,
      url: `/${id}`,
    },
    alternates: { canonical: `/${id}` },
  };
}
