import { skills } from '@/data/skills';
import { ordinal } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SplitRow } from '@/components/ui/SplitRow';
import { Tag } from '@/components/ui/Tag';

export function Skills() {
  return (
    <Section>
      {skills.map((category, index) => (
        <SplitRow
          key={category.cat}
          gutter="lg"
          rule="line2"
          density="tight"
          as="section"
          aside={
            <>
              <div className="flex items-baseline gap-2.5">
                <span className="text-faint font-mono text-xs" aria-hidden="true">
                  {ordinal(index)}
                </span>
                <h2 className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.04] font-bold tracking-[-0.02em]">
                  {category.cat}
                </h2>
              </div>
              <p className="text-faint mt-2.5 ml-[26px] text-[13px] leading-[1.5]">{category.note}</p>
            </>
          }
        >
          <ul className="flex list-none flex-wrap content-start gap-2 p-0">
            {category.items.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>
        </SplitRow>
      ))}
    </Section>
  );
}
