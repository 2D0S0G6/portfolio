import { socAreas } from '@/data/soc';
import { ordinal } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SplitRow } from '@/components/ui/SplitRow';
import { Field, TagField } from '@/components/ui/Field';
import { MarkerList } from '@/components/ui/MarkerList';

export function SocDfir() {
  return (
    <Section>
      {socAreas.map((area, index) => (
        <SplitRow
          key={area.area}
          gutter="xl"
          aside={
            <div className="flex items-baseline gap-2.5">
              <span className="text-faint font-mono text-xs" aria-hidden="true">
                {ordinal(index)}
              </span>
              <h2 className="font-display text-[clamp(21px,2.6vw,30px)] leading-[1.08] font-bold tracking-[-0.02em]">
                {area.area}
              </h2>
            </div>
          }
        >
          <p className="text-dim max-w-[58ch] text-[15.5px] leading-[1.7]">{area.desc}</p>

          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-7">
            <TagField label="Tools" items={area.tools} />
            <Field label="Key methods">
              <MarkerList items={area.methods} marker="—" size="sm" />
            </Field>
          </div>
        </SplitRow>
      ))}
    </Section>
  );
}
