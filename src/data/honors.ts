import type { Honor } from '@/types';

/** `amount` is omitted where the honor carried no award — the pill hides itself. */
export const honors: readonly Honor[] = [
  {
    title: 'Mozilla 0DIN Bug Bounty Program',
    org: 'Mozilla',
    date: 'Mar 2026 — Sep 2026',
    amount: '$5,000',
    desc: 'Ten validated findings across production Large Language Model systems, each a multiple-model guardrail jailbreak that carried a restricted request inside the vocabulary of legitimate technical, scholarly or financial work, or inside a mechanical reconstruction task. Disclosed responsibly with reproduction steps, proof-of-concept exploits, and remediation recommendations.',
  },
  {
    title: '3rd Prize — Vidyut National Level Multifest',
    org: 'Amrita Vishwa Vidyapeetham (CISAI)',
    date: 'Aug 2025',
    amount: '₹20,000 + Trophy',
    desc: 'Won 3rd Prize for developing Null-Scan, an AI-powered multi-platform security tool, in a 36-hour hackathon. Collaborated with a team to tackle automated penetration testing across Web, Android, and Blockchain platforms.',
  },
  {
    title: 'Top 25 Finalist — AlgoQuest 2025',
    org: 'AlgoQuest 2025',
    date: '2025',
    desc: 'Achieved a top 25 position in an algorithmic problem-solving competition, showcasing analytical thinking and coding proficiency.',
  },
  {
    title: 'Top 25 Finalist — Cython Competitive Programming',
    org: 'Cython',
    date: 'Aug 2024',
    desc: 'Ranked among the top 25 participants in a competitive programming competition, demonstrating strong problem-solving and algorithmic thinking skills.',
  },
];
