import { pageMeta } from '@/data/site';
import { sectionMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/ui/PageHeader';
import { Contact } from '@/components/sections/Contact';

export const metadata = sectionMetadata('contact');

export default function ContactPage() {
  return (
    <>
      <PageHeader {...pageMeta.contact} />
      <Contact />
    </>
  );
}
