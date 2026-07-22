import Link from 'next/link';
import { contact, sections, site } from '@/data/site';
import { Arrow } from '@/components/ui/Arrow';
import { Container } from '@/components/ui/Container';
import { BackToTop } from '@/components/ui/BackToTop';

const elsewhere = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'X', href: contact.x },
  { label: '0din', href: contact.odin },
];

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-faint mb-4 font-mono text-[11px] tracking-[0.24em] uppercase">{title}</h2>
      <div className="flex flex-col gap-[9px]">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-dim hover:text-text text-sm transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line bg-bg2 relative z-1 border-t">
      <Container width="wide" className="py-[clamp(48px,7vw,80px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-10">
          <div>
            <div className="font-display text-[34px] leading-none font-extrabold tracking-[-0.03em]">
              {site.wordmark}
            </div>
            <p className="text-dim mt-3.5 max-w-[260px] text-sm leading-[1.6]">
              Security researcher &amp; AI engineer. Building carefully, breaking honestly.
            </p>
          </div>

          <FooterColumn title="Sections" items={sections.slice(0, 5)} />
          <FooterColumn title="More" items={sections.slice(5)} />

          <div>
            <h2 className="text-faint mb-4 font-mono text-[11px] tracking-[0.24em] uppercase">Elsewhere</h2>
            <div className="flex flex-col gap-[9px]">
              {elsewhere.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dim hover:text-text text-sm transition-colors"
                >
                  {item.label} <Arrow />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-line2 mt-[clamp(40px,6vw,64px)] flex flex-wrap items-center justify-between gap-4 border-t pt-[22px]">
          <span className="text-faint font-mono text-[11px] tracking-[0.08em]">
            © {year} — {contact.location}
          </span>
          <BackToTop />
        </div>
      </Container>
    </footer>
  );
}
