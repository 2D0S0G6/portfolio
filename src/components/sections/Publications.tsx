import { publications } from '@/data/publications';
import { ordinal } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { SplitRow } from '@/components/ui/SplitRow';
import { Tag } from '@/components/ui/Tag';
import { ExternalLink } from '@/components/ui/ExternalLink';

export function Publications() {
  return (
    <Section>
      {publications.map((pub, index) => (
        <SplitRow
          key={pub.doi}
          gutter="md"
          aside={
            <div className="flex flex-col gap-2">
              <span className="text-faint font-mono text-xs" aria-hidden="true">
                {ordinal(index)}
              </span>
              <span className="text-text font-mono text-xs tracking-[0.04em]">{pub.venue}</span>
              <span className="text-faint font-mono text-[11px]">{pub.date}</span>
            </div>
          }
        >
          <h2 className="font-display text-[clamp(22px,3vw,34px)] leading-[1.1] font-bold tracking-[-0.02em] text-balance">
            {pub.title}
          </h2>
          <p className="text-dim mt-2.5 text-[13.5px] tracking-[0.02em]">{pub.authors.join(', ')}</p>
          <p className="text-dim mt-[18px] max-w-[60ch] text-[15px] leading-[1.7]">{pub.abstract}</p>

          <ul className="mt-[18px] flex list-none flex-wrap gap-2 p-0">
            {pub.topics.map((topic) => (
              <li key={topic}>
                <Tag className="px-2.5 py-1.5 text-[11px]">{topic}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-5">
            <ExternalLink href={pub.link}>Read paper</ExternalLink>
            <span className="text-faint font-mono text-[11px]">
              <span className="tracking-[0.14em]">DOI</span>&nbsp;&nbsp;{pub.doi}
            </span>
          </div>
        </SplitRow>
      ))}
    </Section>
  );
}
