import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { Projects } from '@/components/sections/Projects';

export const metadata = sectionMetadata('projects');

export default function ProjectsPage() {
  return (
    <>
      <PageHeader {...pageMeta.projects} />
      <Projects />
    </>
  );
}
