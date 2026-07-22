import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { About } from '@/components/sections/About';

export const metadata = sectionMetadata('about');

export default function AboutPage() {
  return (
    <>
      <PageHeader {...pageMeta.about} />
      <About />
    </>
  );
}
