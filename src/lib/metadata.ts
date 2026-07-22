import type { Metadata } from 'next';
import { pageMeta, site } from '@/data/site';
import type { SectionId } from '@/types';

/**
 * Builds per-route metadata from the same copy the PageHeader renders, so the
 * title and description can never drift from what's on the page.
 *
 * `openGraph` and `twitter` are both spelled out in full: Next.js *replaces* a
 * parent's object rather than merging field-by-field, so omitting `twitter`
 * here left every subpage advertising the homepage title on X, and omitting
 * `type` / `siteName` silently dropped them from the OG tags.
 */
export function sectionMetadata(id: SectionId): Metadata {
  const meta = pageMeta[id];
  return {
    title: meta.title,
    description: meta.intro,
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: meta.title,
      description: meta.intro,
      url: `/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.intro,
    },
    alternates: { canonical: `/${id}` },
  };
}
