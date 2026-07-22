import { contact } from '@/data/site';
import { Container } from '@/components/ui/Container';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';
import { ContactForm } from './ContactForm';

const channels = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'X / Twitter', href: contact.x },
  { label: '0din — GenAI bounty', href: contact.odin },
];

/** Decorative globe, echoing the "Based in" location line. */
function GlobeGlyph() {
  return (
    <svg
      viewBox="0 0 100 100"
      width="58"
      height="58"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className="text-dim flex-none"
    >
      <circle cx="50" cy="50" r="38" />
      <ellipse cx="50" cy="50" rx="15" ry="38" />
      <ellipse cx="50" cy="50" rx="38" ry="15" />
      <line x1="12" y1="50" x2="88" y2="50" />
      <line x1="50" y1="12" x2="50" y2="88" />
    </svg>
  );
}

export function Contact() {
  return (
    <section className="animate-pf-fade pt-[clamp(28px,4vw,52px)] pb-[clamp(52px,8vw,104px)]">
      <Container>
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(36px,6vw,80px)]">
          <div>
            <Eyebrow as="h2">Email</Eyebrow>
            <div className="mt-3.5">
              <ObfuscatedEmail />
            </div>
            <p className="text-faint mt-3 text-[13px]">
              Address assembled client-side — no scrapers, please.
            </p>

            <div className="mt-[clamp(34px,5vw,52px)] flex flex-col gap-0.5">
              {channels.map((channel, index) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border-line2 text-text hover:text-dim flex items-center justify-between gap-3 border-t py-4 transition-colors ${
                    index === channels.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span className="font-mono text-xs tracking-[0.14em] uppercase">{channel.label}</span>
                  <Arrow className="text-dim text-sm" />
                </a>
              ))}
            </div>

            <div className="mt-[clamp(30px,4vw,44px)] flex items-center gap-[18px]">
              <GlobeGlyph />
              <div>
                <Eyebrow>Based in</Eyebrow>
                <p className="text-text mt-1.5 text-base">{contact.location}</p>
              </div>
            </div>

            <p className="border-line mt-[26px] inline-flex items-center gap-2.5 border px-3.5 py-2.5">
              <span aria-hidden="true" className="bg-text animate-dot-pulse h-[9px] w-[9px] rounded-full" />
              <span className="text-dim font-mono text-[11px] tracking-[0.06em]">{contact.availability}</span>
            </p>
          </div>

          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
