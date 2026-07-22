import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

import { site } from '@/data/site';
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

const sans = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Applies the stored theme before first paint, preventing a flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <a
          href="#main"
          className="bg-text text-btn-ink sr-only z-100 px-4 py-2 font-mono text-xs uppercase focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>

        <GrainOverlay />
        <Loader />
        <ScrollEffects />

        <div className="bg-bg text-text relative min-h-screen">
          {/* data-no-explain marks chrome the Explain popover should ignore. */}
          <div data-no-explain>
            <Navbar />
          </div>

          <main id="main" data-explain-scope className="relative z-1">
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
