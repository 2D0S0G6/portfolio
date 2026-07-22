import type { Education } from '@/types';

/** One string per paragraph, rendered in order on /about. */
export const bio: readonly string[] = [
  "Hi — I'm Deepak. I'm a security researcher and AI engineer drawn to the quiet, careful end of both fields: taking a system apart to see how it truly works, then figuring out how to make it safer.",
  "Most days I live somewhere between offense and defense — hunting for weaknesses in language models, reversing an unfamiliar binary, or building the tooling that makes the next investigation faster. I care a lot about reproducibility and clear write-ups; a finding isn't finished until someone else can follow it.",
  "When I'm away from a terminal you'll find me writing, playing CTFs, or mentoring juniors through their first exploit. I believe the best security work is patient, honest, and a little bit obsessive.",
];

export const education: Education = {
  school: 'Amrita Vishwa Vidyapeetham',
  degree: 'B.Tech in Computer Science & Engineering (Cyber Security)',
  period: 'Aug 2023 — May 2027',
  gpa: '8.82',
  activities: [
    'Active member of the campus security / CTF community',
    'GenAI bug-bounty research through the 0din program',
    'Peer mentor for first-year programming students',
    'Speaker at student security meetups',
    'Maintainer of shared CTF notes & tooling',
  ],
  highlights: [
    'Sustained GPA 8.82 while researching in parallel',
    'Validated GenAI vulnerability disclosures',
    'Consistent finishes in national CTF competitions',
  ],
};
