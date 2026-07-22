import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { Honors } from '@/components/sections/Honors';

export const metadata = sectionMetadata('honors');

export default function HonorsPage() {
  return (
    <>
      <PageHeader {...pageMeta.honors} />
      <Honors />
    </>
  );
}
