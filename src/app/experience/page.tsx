import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { Experience } from '@/components/sections/Experience';

export const metadata = sectionMetadata('experience');

export default function ExperiencePage() {
  return (
    <>
      <PageHeader {...pageMeta.experience} />
      <Experience />
    </>
  );
}
