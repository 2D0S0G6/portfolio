import type { ExperienceEntry } from '@/types';

export const experience: readonly ExperienceEntry[] = [
  {
    role: 'Information Security Intern',
    org: 'Angel One',
    period: 'Sep 2026 — Present',
    where: 'Bengaluru',
    desc: 'Working on AI security engineering, shadow AI governance, and securing enterprise GenAI workflows.',
    points: [
      'Engineering security controls and monitoring for AI workloads and shadow AI detection',
      'Assessing vulnerabilities, guardrails, and threat models across LLM integrations',
    ],
  },
  {
    role: 'Security Research Intern',
    org: 'Amrita Center for Cybersecurity Systems & Networks',
    period: 'Jun 2026 — Sep 2026',
    where: 'Amritapuri',
    desc: 'Worked on IoT security and behavioural authentication — how a device or user can be verified continuously, not just once at connection time.',
    points: [
      'Built TrustMQTT, a framework for continuous identity verification in MQTT environments',
      'Researched behavioural authentication approaches for IoT deployments',
    ],
  },
  {
    role: 'Blockchain Security Researcher',
    org: 'Team bi0s',
    period: '2024 — 2025',
    where: 'Amritapuri',
    desc: 'Researched blockchain and smart-contract security as part of the university cybersecurity research club.',
    points: [
      'Researched blockchain and smart-contract security',
      'Contributed to team cybersecurity projects',
    ],
  },
  {
    role: 'Independent Security Engineer & Researcher',
    org: 'Independent',
    period: '2023 — Present',
    where: 'Remote',
    desc: 'Building security tools and publishing research across AI security, vulnerability research, and blockchain — mostly things I wanted to exist and could not find.',
    points: [
      'Built DSG_Suite, an async OWASP Top 10 scanner with LLM-assisted payload generation',
      'Published research on prompt-injection detection (IEEE) and fingerprint spoof detection (Elsevier)',
      'Developed SolFix for AI-assisted smart-contract security analysis',
    ],
  },
];
