import { bio, education } from '@/data/about';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Field } from '@/components/ui/Field';
import { MarkerList } from '@/components/ui/MarkerList';
import { Reveal } from '@/components/ui/Reveal';

export function About() {
  return (
    <Section spacing="block">
      <Reveal className="max-w-[60ch]">
        {bio.map((paragraph) => (
          <p key={paragraph} className="text-text mb-[26px] text-[clamp(17px,1.9vw,22px)] leading-[1.7]">
            {paragraph}
          </p>
        ))}
      </Reveal>

      <Reveal className="border-line mt-[clamp(48px,7vw,88px)] border-t">
        <div className="flex flex-wrap gap-[clamp(18px,3vw,48px)] pt-[clamp(28px,4vw,44px)]">
          <div className="flex-[0_0_clamp(120px,15vw,180px)]">
            <Eyebrow>Education</Eyebrow>
          </div>

          <div className="flex-[1_1_min(100%,440px)]">
            <h2 className="font-display text-[clamp(24px,3.2vw,38px)] leading-[1.05] font-bold tracking-[-0.02em]">
              {education.school}
            </h2>
            <p className="text-dim mt-3 text-[clamp(15px,1.6vw,18px)] leading-[1.5]">{education.degree}</p>

            <div className="mt-[18px] flex flex-wrap items-center gap-[18px]">
              <span className="text-dim font-mono text-xs tracking-[0.06em]">{education.period}</span>
              <span className="border-line inline-flex items-baseline gap-[7px] border px-3 py-[7px]">
                <Eyebrow className="tracking-[0.16em]">GPA</Eyebrow>
                <span className="font-display text-base font-bold">{education.gpa}</span>
              </span>
            </div>

            <div className="mt-[clamp(30px,4vw,44px)] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(24px,4vw,48px)]">
              <Field label="Activities">
                <MarkerList items={education.activities} marker="—" />
              </Field>
              <Field label="Key highlights">
                <MarkerList items={education.highlights} marker="↳" />
              </Field>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
