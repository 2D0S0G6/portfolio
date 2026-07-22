'use client';

import { useEffect, useRef } from 'react';
import { contact, sections, site } from '@/data/site';
import { IndexRow } from '@/components/ui/IndexRow';

const socials = [
  { label: 'GitHub', href: contact.github },
  { label: 'LinkedIn', href: contact.linkedin },
  { label: 'X', href: contact.x },
  { label: '0din', href: contact.odin },
];

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

/**
 * Full-screen navigation index.
 *
 * Behaves as a modal dialog: Escape closes it, background scrolling is locked,
 * and focus moves to the close button on open so keyboard users land inside it.
 */
export function MenuOverlay({ open, onClose, pathname }: MenuOverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site index"
      className="bg-bg animate-pf-fade fixed inset-0 z-[95] flex flex-col"
    >
      <div className="border-line2 flex h-16 flex-none items-center justify-between border-b px-[clamp(16px,4vw,44px)]">
        <span className="text-faint font-mono text-[11px] tracking-[0.28em] uppercase">
          Index — {site.name}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="border-line text-text hover:border-text h-[38px] w-[38px] cursor-pointer border bg-transparent text-lg leading-none transition-colors"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-[clamp(16px,4vw,44px)] py-[clamp(20px,5vw,60px)]">
        <IndexRow
          href="/"
          n="01"
          label="Home"
          variant="menu"
          active={pathname === '/'}
          onNavigate={onClose}
        />
        {sections.map((section) => (
          <IndexRow
            key={section.id}
            href={section.href}
            n={section.n}
            label={section.label}
            variant="menu"
            active={pathname.startsWith(section.href)}
            onNavigate={onClose}
          />
        ))}
      </nav>

      <div className="border-line2 flex flex-none flex-wrap gap-[22px] border-t px-[clamp(16px,4vw,44px)] py-[22px]">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dim hover:text-text font-mono text-[11px] tracking-[0.18em] uppercase transition-colors"
          >
            {social.label}
          </a>
        ))}
      </div>
    </div>
  );
}
