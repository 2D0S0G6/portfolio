import type { Publication } from '@/types';

/** NOTE: `link` and `doi` are sample values from the design — replace before publishing. */
export const publications: readonly Publication[] = [
  {
    title: 'Detecting Prompt-Injection in Tool-Augmented Language Models',
    authors: ['D. S. G.', 'A. Menon', 'R. Krishnan'],
    venue: 'IEEE',
    date: '2026',
    abstract:
      'We present a lightweight, latency-aware method for detecting prompt-injection attempts in LLMs that call external tools, evaluated across a benchmark of adversarial prompts spanning direct and indirect injection.',
    topics: ['LLM security', 'prompt injection', 'ML'],
    link: '#',
    doi: '10.0000/ieee.2026.000001',
  },
  {
    title: 'Explainable Anomaly Scoring for Encrypted Network Traffic',
    authors: ['D. S. G.', 'S. Nair'],
    venue: 'Elsevier — Computers & Security',
    date: '2025',
    abstract:
      'An unsupervised approach to flag anomalous flows in encrypted traffic while producing human-readable justifications for each alert, reducing analyst fatigue without sacrificing recall.',
    topics: ['network security', 'anomaly detection', 'explainability'],
    link: '#',
    doi: '10.0000/elsevier.2025.000042',
  },
  {
    title: 'A Survey of Reentrancy Defenses in Modern Smart Contracts',
    authors: ['D. S. G.'],
    venue: 'Springer',
    date: '2025',
    abstract:
      'A structured review of reentrancy vulnerabilities and mitigations across Solidity patterns, with recommendations for the design of static-analysis tooling.',
    topics: ['blockchain', 'smart contracts', 'static analysis'],
    link: '#',
    doi: '10.0000/springer.2025.000117',
  },
];
