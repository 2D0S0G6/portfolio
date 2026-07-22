import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { SocDfir } from '@/components/sections/SocDfir';

export const metadata = sectionMetadata('soc');

export default function SocDfirPage() {
  return (
    <>
      <PageHeader {...pageMeta.soc} />
      <SocDfir />
    </>
  );
}
