import type { Contact, PageMeta, Section, SectionId } from '@/types';

export const site = {
  name: 'Deepak S G',
  /** Stylised wordmark used in the hero watermark and footer. */
  wordmark: '2D0S0G6',
  /** Short mono initials shown in the navbar. */
  initials: 'DSG',
  role: 'Security Researcher · AI & IoT Security',
  tagline: 'Building security solutions at the intersection of AI, cryptography, and practical engineering.',
  description:
    'Portfolio of Deepak S G — cybersecurity researcher and engineer working on AI security, IoT security, and vulnerability research.',
  /** Used for canonical URLs and Open Graph. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deepaksg.vercel.app',
} as const;

export const contact: Contact = {
  github: 'https://github.com/2D0S0G6',
  linkedin: 'https://www.linkedin.com/in/dsgdeepak',
  x: 'https://x.com/DeepakSG67',
  odin: 'https://0din.ai/researchers/b0b505fc-957b-43a9-b5a3-145b2d8799db',
  location: 'Nagercoil, Tamil Nadu, India',
  availability: 'Open to research collaborations & internships',
};

/**
 * Email is split so the assembled address never appears in the served HTML.
 * `useEmail()` joins the parts after hydration, matching the design's
 * "Address assembled client-side — no scrapers, please." note.
 */
export const emailParts = ['sgdeepak515', 'gmail.com'] as const;

export const sections: readonly Section[] = [
  { id: 'about', label: 'About', n: '02', blurb: 'Bio, education & the shape of the work', href: '/about' },
  { id: 'skills', label: 'Skills', n: '03', blurb: 'Six disciplines, end to end', href: '/skills' },
  {
    id: 'experience',
    label: 'Experience',
    n: '04',
    blurb: 'Where I have shipped and researched',
    href: '/experience',
  },
  {
    id: 'projects',
    label: 'Projects',
    n: '05',
    blurb: 'Four things I have built and broken',
    href: '/projects',
  },
  { id: 'repos', label: 'Repositories', n: '06', blurb: 'Open-source, searchable', href: '/repos' },
  { id: 'blog', label: 'Writing', n: '07', blurb: 'Notes & write-ups — coming soon', href: '/blog' },
  { id: 'publications', label: 'Research', n: '08', blurb: 'Peer-reviewed papers', href: '/publications' },
  { id: 'soc', label: 'SOC & DFIR', n: '09', blurb: 'Blue-team & forensics expertise', href: '/soc' },
  { id: 'honors', label: 'Honors', n: '10', blurb: 'Bounties, wins & recognition', href: '/honors' },
  { id: 'contact', label: 'Contact', n: '11', blurb: 'Say hello', href: '/contact' },
];

/** A condensed navbar link. Labels differ from the section labels by design. */
export interface TopLink {
  id: SectionId;
  label: string;
  href: string;
}

/** The four condensed links shown centred in the navbar on wide viewports. */
export const topLinks: readonly TopLink[] = [
  { id: 'projects', label: 'Work', href: '/projects' },
  { id: 'blog', label: 'Writing', href: '/blog' },
  { id: 'publications', label: 'Research', href: '/publications' },
  { id: 'about', label: 'About', href: '/about' },
];

/** Header copy for each route, keyed by section id. */
export const pageMeta: Record<SectionId, PageMeta> = {
  about: {
    num: '02',
    eyebrow: 'About',
    title: 'The person behind the handle',
    intro: 'The short version of who I am and how I got here.',
  },
  skills: {
    num: '03',
    eyebrow: 'Capabilities',
    title: 'What I work with',
    intro: 'Six disciplines I move between — from the wire up to the model.',
  },
  experience: {
    num: '04',
    eyebrow: 'Experience',
    title: 'Where I have worked',
    intro: "A few of the places I've researched, built, and broken things.",
  },
  projects: {
    num: '05',
    eyebrow: 'Selected work',
    title: 'Things I built & broke',
    intro: "Four things I've made — what broke, and what I did about it.",
  },
  repos: {
    num: '06',
    eyebrow: 'Open source',
    title: 'Repositories',
    intro: 'Open source, notes, and small tools. Search around.',
  },
  blog: {
    num: '07',
    eyebrow: 'Writing',
    title: 'Notes & essays',
    intro: 'Write-ups on security research and the things I build. First ones on the way.',
  },
  publications: {
    num: '08',
    eyebrow: 'Research',
    title: 'Publications',
    intro: 'Peer-reviewed work at the seam of security and AI.',
  },
  soc: {
    num: '09',
    eyebrow: 'Blue team',
    title: 'SOC & DFIR',
    intro: 'Reading the traces attackers leave behind.',
  },
  honors: {
    num: '10',
    eyebrow: 'Recognition',
    title: 'Honors & awards',
    intro: 'A little recognition for the late nights.',
  },
  contact: {
    num: '11',
    eyebrow: 'Contact',
    title: 'Let us talk',
    intro: "The door's open. Here's how to reach me.",
  },
};
