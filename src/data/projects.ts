import type { Project } from '@/types';

/**
 * `live` is intentionally omitted where there is no public deployment —
 * the Live link only renders when the field is present.
 */
export const projects: readonly Project[] = [
  {
    id: 'sentinel',
    title: 'Sentinel',
    tag: 'LLM prompt-injection firewall',
    desc: 'A lightweight gateway that inspects prompts and tool calls before they reach a model, flagging injection, exfiltration, and jailbreak patterns in real time.',
    problem:
      'Teams were shipping LLM features with nothing between untrusted input and the model — one crafted message could leak system prompts or trigger unintended tool use.',
    solution:
      'A streaming classifier plus a rule engine sits in front of the model, scoring each turn and rewriting or blocking risky content, with every decision logged for review.',
    tech: ['Python', 'FastAPI', 'Transformers', 'Redis', 'Docker'],
    highlights: [
      'Sub-40ms overhead per request',
      'Catches known injection families out of the box',
      'Pluggable policies per route',
    ],
    results: 'Blocked 94% of a 1,200-case injection test set with a <2% false-positive rate.',
    github: 'https://github.com/2d0s0g6',
  },
  {
    id: 'grainstore',
    title: 'Grainstore',
    tag: 'Encrypted personal knowledge base',
    desc: 'A private, local-first notebook with client-side encryption and semantic search — your notes stay yours, but you can still ask them questions.',
    problem:
      'Most "second brain" tools trade privacy for search. I wanted retrieval over my own research without shipping it to someone else’s server.',
    solution:
      'Notes are encrypted in the browser; embeddings are computed locally and queried through a small RAG loop that never sees plaintext on the wire.',
    tech: ['TypeScript', 'Next.js', 'SQLite', 'web-crypto', 'Ollama'],
    highlights: ['Zero plaintext leaves the device', 'Full-text + semantic search', 'Works fully offline'],
    results: 'Now my daily driver for research notes across roughly 2,000 documents.',
    github: 'https://github.com/2d0s0g6',
  },
  {
    id: 'nightjar',
    title: 'Nightjar',
    tag: 'Quiet network anomaly detection',
    desc: 'A monitoring pipeline that learns what "normal" looks like on a network and surfaces the strange without drowning you in alerts.',
    problem:
      'Signature-based tools miss novel behavior and volume-based ones cry wolf. Analysts burn out on noise.',
    solution:
      'Zeek logs feed an unsupervised model that scores flows by how surprising they are; only the genuinely odd bubbles up, with context attached.',
    tech: ['Python', 'Zeek', 'scikit-learn', 'Kafka', 'Grafana'],
    highlights: ['Explainable anomaly scores', 'Context-rich alerts', 'Tunable sensitivity'],
    results: 'Reduced alert volume ~70% in a lab replay while keeping true positives.',
    github: 'https://github.com/2d0s0g6',
  },
  {
    id: 'cinder',
    title: 'Cinder',
    tag: 'Smart-contract static analyzer',
    desc: 'A static analysis tool for Solidity that flags common vulnerability patterns before a contract ever reaches a testnet.',
    problem:
      'Costly bugs in smart contracts are often the same handful of patterns, found too late — after deploy, after loss.',
    solution:
      'Cinder parses contracts into an IR and runs a growing library of detectors for reentrancy, access-control gaps, and unchecked math, with clear remediation notes.',
    tech: ['Rust', 'Solidity', 'EVM', 'Foundry'],
    highlights: ['Fast AST + IR analysis', 'Actionable, low-noise findings', 'CI-friendly output'],
    results: 'Flagged every known issue across a suite of intentionally-vulnerable contracts.',
    github: 'https://github.com/2d0s0g6',
  },
];
