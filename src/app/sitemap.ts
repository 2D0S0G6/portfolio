import type { MetadataRoute } from 'next';
import { posts } from '@/data/posts';
import { sections, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes have no per-page timestamp, so they share the build time —
  // crawlers use lastmod to prioritise re-crawls, and omitting it entirely
  // left content updates to be discovered on the crawler's own schedule.
  const lastModified = new Date();

  return [
    { url: site.url, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...sections.map((section) => ({
      url: `${site.url}${section.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.id}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
