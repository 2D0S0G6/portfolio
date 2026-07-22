import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { Publications } from '@/components/sections/Publications';

export const metadata = sectionMetadata('publications');

export default function PublicationsPage() {
  return (
    <>
      <PageHeader {...pageMeta.publications} />
      <Publications />
    </>
  );
}
