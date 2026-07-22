import type { Honor } from '@/types';

/** `amount` is omitted where the honor carried no award — the pill hides itself. */
export const honors: readonly Honor[] = [
  {
    title: 'GenAI Bug Bounty — Validated Findings',
    org: '0din (Mozilla)',
    date: '2026',
    amount: 'Bounty awarded',
    desc: 'Recognized for responsibly disclosed vulnerabilities in production generative-AI systems, including prompt-injection and unsafe tool-use paths.',
  },
  {
    title: 'National CTF — Top Finish',
    org: 'Inter-college CTF',
    date: '2025',
    desc: 'Placed among the top teams in a national capture-the-flag, contributing web-exploitation and reverse-engineering solves under time pressure.',
  },
  {
    title: 'Hackathon Winner — Security Track',
    org: 'Amrita Hackathon',
    date: '2024',
    amount: 'Cash prize',
    desc: 'Built and demoed a working security tool in under 36 hours, judged on impact, originality, and execution.',
  },
  {
    title: 'Academic Merit Recognition',
    org: 'Amrita Vishwa Vidyapeetham',
    date: '2024',
    desc: 'Acknowledged for sustained academic performance (GPA 8.82) alongside active security-community contribution.',
  },
];
