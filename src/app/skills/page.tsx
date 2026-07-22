import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { Skills } from '@/components/sections/Skills';

export const metadata = sectionMetadata('skills');

export default function SkillsPage() {
  return (
    <>
      <PageHeader {...pageMeta.skills} />
      <Skills />
    </>
  );
}
