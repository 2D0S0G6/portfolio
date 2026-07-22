import { experience } from '@/data/experience';
import { Section } from '@/components/ui/Section';
import { SplitRow } from '@/components/ui/SplitRow';
import { MarkerList } from '@/components/ui/MarkerList';

export function Experience() {
  return (
    <Section>
      {experience.map((entry) => (
        <SplitRow
          key={`${entry.org}-${entry.role}`}
          gutter="md"
          aside={
            <div className="flex flex-col gap-1.5">
              <span className="text-text font-mono text-xs tracking-[0.04em]">{entry.period}</span>
              <span className="text-faint font-mono text-[11px] tracking-[0.08em]">{entry.where}</span>
            </div>
          }
        >
          <h2 className="font-display text-[clamp(24px,3.2vw,38px)] leading-[1.04] font-bold tracking-[-0.02em]">
            {entry.role}
          </h2>
          <p className="text-dim mt-2 text-sm tracking-[0.02em]">{entry.org}</p>
          <p className="text-dim mt-[18px] max-w-[56ch] text-[clamp(15px,1.5vw,17px)] leading-[1.7]">
            {entry.desc}
          </p>
          <MarkerList items={entry.points} marker="→" tone="text" className="mt-5" />
        </SplitRow>
      ))}
    </Section>
  );
}
