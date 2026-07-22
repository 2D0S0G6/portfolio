import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { RepoExplorer } from '@/components/sections/RepoExplorer';

export const metadata = sectionMetadata('repos');

export default function RepoExplorerPage() {
  return (
    <>
      <PageHeader {...pageMeta.repos} />
      <RepoExplorer />
    </>
  );
}
