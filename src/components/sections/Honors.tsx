import { honors } from '@/data/honors';
import { ordinal } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SplitRow } from '@/components/ui/SplitRow';

export function Honors() {
  return (
    <Section>
      {honors.map((honor, index) => (
        <SplitRow
          key={honor.title}
          gutter="sm"
          aside={
            <div className="flex flex-col gap-2">
              <span className="text-faint font-mono text-xs" aria-hidden="true">
                {ordinal(index)}
              </span>
              <span className="text-text font-mono text-xs tracking-[0.04em]">{honor.date}</span>
              {honor.amount && (
                <span className="border-line text-dim self-start border px-[9px] py-[5px] font-mono text-[10px] tracking-[0.12em] uppercase">
                  {honor.amount}
                </span>
              )}
            </div>
          }
        >
          <h2 className="font-display text-[clamp(24px,3.4vw,42px)] leading-[1.04] font-bold tracking-[-0.025em] text-balance">
            {honor.title}
          </h2>
          <p className="text-dim mt-2 text-sm tracking-[0.02em]">{honor.org}</p>
          <p className="text-dim mt-[18px] max-w-[58ch] text-[15.5px] leading-[1.7]">{honor.desc}</p>
        </SplitRow>
      ))}
    </Section>
  );
}
