import type { Education } from '@/types';

/** One string per paragraph, rendered in order on /about. */
export const bio: readonly string[] = [
  "Hi — I'm Deepak. I'm a cybersecurity researcher and engineer working at the intersection of AI, cryptography, and practical engineering, currently pursuing a B.Tech in Computer Science & Engineering (Cyber Security) at Amrita Vishwa Vidyapeetham.",
  'My work spans vulnerability research, AI security, IoT security engineering, and secure software development. What I care about most is building practical systems that connect applied research to real-world security problems — a scanner someone can actually run in CI, a detector that holds up against adversarial input.',
  "Right now I'm researching behavioural authentication for IoT at the Amrita Center for Cybersecurity Systems & Networks, publishing on prompt-injection detection and biometric spoof detection, and exploring where machine learning and cybersecurity meet.",
];

export const education: Education = {
  school: 'Amrita Vishwa Vidyapeetham',
  degree: 'B.Tech in Computer Science & Engineering (Cyber Security)',
  period: 'Aug 2023 — May 2027',
  gpa: '8.82',
  activities: [
    'Cybersecurity research',
    'Capture The Flag (CTF) competitions',
    'Security engineering projects',
    'Hackathons',
    'Team bi0s (cybersecurity research club)',
  ],
  highlights: [
    'Research in prompt injection detection for banking LLMs',
    'Biometric security and deepfake detection research',
    'Behavioural authentication for IoT systems',
  ],
};
