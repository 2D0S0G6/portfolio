import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

import { contact, site } from '@/data/site';
import { education } from '@/data/about';
import { themeInitScript } from '@/lib/theme';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ChatDock } from '@/components/sections/ChatDock';
import { ExplainPopover } from '@/components/sections/ExplainPopover';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { ScrollEffects } from '@/components/ui/ScrollEffects';
import { Loader } from '@/components/ui/Loader';

// Self-hosted at build time by next/font — no runtime request to Google, and
// no layout shift from a late-arriving webfont.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});

// 500 and 600 were loaded but never used — every `font-medium` / `font-semibold`
// in the tree sits on a font-mono or font-display element.
const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
    { media: '(prefers-color-scheme: light)', color: '#e7e3db' },
  ],
};

/** Identity graph for search engines. Values are derived from the data layer. */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#person`,
  name: site.name,
  alternateName: site.wordmark,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  knowsAbout: [
    'AI Security',
    'IoT Security',
    'Prompt Injection',
    'Vulnerability Research',
    'Digital Forensics',
    'Smart Contract Security',
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Agasthiswaram',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [contact.github, contact.linkedin, contact.x, contact.odin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint, preventing a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {/* Must outrank the loader (z-200), or the focused link is invisible. */}
        <a
          href="#main"
          className="bg-text text-btn-ink sr-only z-[210] px-4 py-2 font-mono text-xs uppercase focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>

        <GrainOverlay />
        <Loader />
        <ScrollEffects />

        <div className="bg-bg text-text relative min-h-screen">
          {/* data-no-explain marks chrome the Explain popover should ignore. */}
          <header data-no-explain>
            <Navbar />
          </header>

          {/* tabIndex={-1} so the skip link reliably moves focus in Safari. */}
          <main id="main" tabIndex={-1} data-explain-scope className="relative z-1 outline-none">
            {children}
          </main>

          <div data-no-explain>
            <Footer />
            <ChatDock />
            <ExplainPopover />
          </div>
        </div>
      </body>
    </html>
  );
}
