/**
 * Shared domain types for every content collection under `src/data`.
 * Each collection is authored against one of these shapes, so adding or
 * editing content never requires touching component JSX.
 */

/** Slugs of every content route. Drives navigation, page headers and metadata. */
export type SectionId =
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'repos'
  | 'blog'
  | 'publications'
  | 'soc'
  | 'honors'
  | 'contact';

/** A navigable section as it appears in the index list, menu and footer. */
export interface Section {
  id: SectionId;
  /** Display label, e.g. "SOC & DFIR". */
  label: string;
  /** Zero-padded ordinal shown in the mono gutter, e.g. "09". */
  n: string;
  /** One-line description shown on the right of the home index rows. */
  blurb: string;
  href: string;
}

/** Eyebrow / title / intro block rendered by the shared PageHeader. */
export interface PageMeta {
  num: string;
  eyebrow: string;
  title: string;
  intro: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  gpa: string;
  activities: readonly string[];
  highlights: readonly string[];
}

export interface SkillCategory {
  cat: string;
  note: string;
  items: readonly string[];
}

export interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  where: string;
  desc: string;
  points: readonly string[];
}

export interface Project {
  id: string;
  title: string;
  /** Short qualifier shown after the title, e.g. "LLM prompt-injection firewall". */
  tag: string;
  desc: string;
  problem: string;
  solution: string;
  tech: readonly string[];
  highlights: readonly string[];
  results: string;
  github: string;
  /** Omit (or leave undefined) when there is no live deployment to link. */
  live?: string;
}

export interface Repo {
  name: string;
  desc: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  topics: readonly string[];
  url: string;
  pinned: boolean;
  /** ISO date (YYYY-MM-DD) used for the "Recent" sort. */
  updated: string;
}

export type RepoSortKey = 'recent' | 'stars' | 'name';

export interface Post {
  id: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Human-readable reading time, e.g. "6 min". */
  read: string;
  tags: readonly string[];
  excerpt: string;
  /** One string per paragraph. */
  body: readonly string[];
}

export interface Publication {
  title: string;
  authors: readonly string[];
  venue: string;
  date: string;
  abstract: string;
  topics: readonly string[];
  link: string;
  doi: string;
}

export interface SocArea {
  area: string;
  desc: string;
  tools: readonly string[];
  methods: readonly string[];
}

export interface Honor {
  title: string;
  org: string;
  date: string;
  /** Omit when the honor carried no award. */
  amount?: string;
  desc: string;
}

export interface Contact {
  github: string;
  linkedin: string;
  x: string;
  odin: string;
  location: string;
  availability: string;
}

/** A single turn in the "Ask the site" assistant. */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
