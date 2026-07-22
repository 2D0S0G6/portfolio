import type { ExperienceEntry } from '@/types';

export const experience: readonly ExperienceEntry[] = [
  {
    role: 'Security Research Intern',
    org: 'GenAI Bug Bounty — 0din',
    period: '2025 — Present',
    where: 'Remote',
    desc: 'I hunt for weaknesses in production language models: prompt-injection, jailbreaks, data-exfiltration paths, and unsafe tool use. Every finding gets a clean write-up and a reproducible proof-of-concept.',
    points: [
      'Submitted multiple validated GenAI vulnerabilities through the 0din program',
      'Built a small harness that automates prompt-injection regression tests',
      'Wrote disclosure reports engineering teams could act on directly',
    ],
  },
  {
    role: 'AI Engineer (Contract)',
    org: 'Independent',
    period: '2024 — 2025',
    where: 'Remote',
    desc: 'Designed and shipped retrieval-augmented and agentic features for small teams — from data pipelines to guardrails. I care as much about how a model fails as how it succeeds.',
    points: [
      'Delivered a RAG assistant that noticeably cut internal lookup time',
      'Added evaluation + red-team suites before anything reached users',
      'Kept everything observable so regressions surfaced early',
    ],
  },
  {
    role: 'CTF Player & OSS Contributor',
    org: 'Amrita / community teams',
    period: '2023 — Present',
    where: 'Amritapuri',
    desc: 'Weekends are for capture-the-flag. I focus on web, reversing, and forensics, and fold what I learn back into open tools and write-ups for juniors.',
    points: [
      'Consistent top-tier finishes in national CTFs',
      'Maintained tooling and notes used by the campus security group',
      'Mentored first-years through their first exploits',
    ],
  },
];
