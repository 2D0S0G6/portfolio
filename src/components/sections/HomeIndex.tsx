import { contact, sections } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { IndexRow } from '@/components/ui/IndexRow';
import { Reveal } from '@/components/ui/Reveal';

/** The numbered table of contents beneath the hero. */
export function HomeIndex() {
  return (
    <Container width="wide" className="py-[clamp(64px,10vh,120px)]">
      <Reveal className="mb-3.5 flex flex-wrap items-baseline justify-between gap-5">
        <Eyebrow size="md" as="h2">
          Index
        </Eyebrow>
        <span className="text-faint font-mono text-[11px] tracking-[0.1em]">{contact.availability}</span>
      </Reveal>

      <nav aria-label="Sections">
        {sections.map((section) => (
          <Reveal key={section.id}>
            <IndexRow href={section.href} n={section.n} label={section.label} blurb={section.blurb} />
          </Reveal>
        ))}
      </nav>
    </Container>
  );
}
