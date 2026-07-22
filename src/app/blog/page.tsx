import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { BlogIndex } from '@/components/sections/BlogIndex';

export const metadata = sectionMetadata('blog');

export default function BlogPage() {
  return (
    <>
      <PageHeader {...pageMeta.blog} />
      <BlogIndex />
    </>
  );
}
