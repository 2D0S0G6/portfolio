'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { site, topLinks } from '@/data/site';
import { cn } from '@/lib/utils';
import { Arrow } from '@/components/ui/Arrow';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MagneticCta } from '@/components/ui/MagneticCta';
import { MenuOverlay } from './MenuOverlay';

/** Fixed, blurred navigation bar plus the full-screen index it opens. */
export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <nav
        aria-label="Primary"
        className="bg-scrim border-line2 fixed top-0 right-0 left-0 z-60 flex h-16 items-center justify-between gap-4 border-b px-[clamp(16px,4vw,44px)] backdrop-blur-[12px]"
      >
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="text-text flex items-center gap-[11px] py-1.5"
        >
          <span aria-hidden="true" className="bg-text inline-block h-2 w-2 rotate-45" />
          <span className="font-mono text-[13px] font-medium tracking-[0.3em] uppercase">
            {site.initials}
          </span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-[30px] max-[1160px]:hidden">
          {topLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'nav-link px-0.5 py-1 font-mono text-[11.5px] tracking-[0.18em] uppercase transition-colors',
                  active ? 'text-text' : 'text-dim hover:text-text',
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="border-line hover:border-text hover:bg-raise flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[3px] border bg-transparent transition-[border-color,background] min-[861px]:hidden"
          >
            <span aria-hidden="true" className="bg-text h-[1.5px] w-[15px]" />
            <span aria-hidden="true" className="bg-text h-[1.5px] w-[15px]" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            className="border-line text-text hover:border-text hover:bg-raise flex h-11 cursor-pointer items-center gap-[9px] border bg-transparent px-[15px] font-mono text-[11px] tracking-[0.18em] uppercase transition-[border-color,background] max-[860px]:hidden"
          >
            Index
            <span aria-hidden="true" className="bg-text h-px w-[14px]" />
          </button>

          <MagneticCta href="/contact" aria-label="Get in touch">
            <span className="max-[860px]:hidden">Get in touch</span>
            <Arrow className="text-[13px]" />
          </MagneticCta>
        </div>
      </nav>

      <MenuOverlay open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
