import { projects } from '@/data/projects';
import { ordinal } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Field, TagField } from '@/components/ui/Field';
import { MarkerList } from '@/components/ui/MarkerList';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { Reveal } from '@/components/ui/Reveal';

export function Projects() {
  return (
    <Section>
      {projects.map((project, index) => (
        <Reveal key={project.id} as="article" className="border-line border-t py-[clamp(34px,5vw,64px)]">
          <div className="flex flex-wrap items-baseline gap-3.5">
            <span className="text-faint font-mono text-xs" aria-hidden="true">
              {ordinal(index)}
            </span>
            <h2 className="font-display text-[clamp(32px,5.4vw,68px)] leading-[0.96] font-extrabold tracking-[-0.03em]">
              {project.title}
            </h2>
            <span className="text-dim font-mono text-xs tracking-[0.04em]">— {project.tag}</span>
          </div>

          <p className="text-text mt-[22px] max-w-[62ch] text-[clamp(16px,1.7vw,20px)] leading-[1.65]">
            {project.desc}
          </p>

          <div className="mt-[clamp(30px,4vw,44px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(24px,4vw,52px)]">
            <Field label="Problem">
              <p className="text-dim text-[15px] leading-[1.65]">{project.problem}</p>
            </Field>
            <Field label="Approach">
              <p className="text-dim text-[15px] leading-[1.65]">{project.solution}</p>
            </Field>
          </div>

          <div className="mt-[clamp(26px,3vw,40px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[clamp(24px,4vw,52px)]">
            <TagField label="Stack" items={project.tech} />
            <Field label="Highlights">
              <MarkerList items={project.highlights} marker="·" size="sm" />
            </Field>
          </div>

          <div className="border-line2 bg-panel mt-[clamp(26px,3vw,40px)] border px-[22px] py-5">
            <Eyebrow className="mb-2 block">Results</Eyebrow>
            <p className="text-text text-[15.5px] leading-[1.6]">{project.results}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-5">
            <ExternalLink href={project.github}>GitHub</ExternalLink>
            {project.live && <ExternalLink href={project.live}>Live</ExternalLink>}
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
