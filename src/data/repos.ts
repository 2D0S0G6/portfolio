import type { Repo } from '@/types';

/**
 * Static snapshot of the GitHub profile. Star / fork / issue counts and `updated`
 * were read from the GitHub REST API on 2026-07-22; refresh them, or swap this
 * module for a live fetch, without touching the Repositories page.
 */
export const repos: readonly Repo[] = [
  {
    name: 'DSG_Suite',
    desc: 'Cyber_Security tool for vulnerability scanning.',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    topics: ['security', 'cybersecurity'],
    url: 'https://github.com/2D0S0G6/DSG_Suite',
    pinned: true,
    updated: '2026-07-16',
  },
  {
    name: 'DeepNFV_Dockerised_Attack_Detection_CNN',
    desc: 'Dockerised DeepNFV architecture for attack detection using a 1D CNN.',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    topics: ['deep-learning', 'security'],
    url: 'https://github.com/2D0S0G6/DeepNFV_Dockerised_Attack_Detection_CNN',
    pinned: true,
    updated: '2025-11-30',
  },
  {
    name: 'SolFix',
    desc: 'An integrated AI-powered security tool for smart contract analysis.',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
    issues: 0,
    topics: ['security', 'ai'],
    url: 'https://github.com/2D0S0G6/SolFix',
    pinned: true,
    updated: '2026-07-16',
  },
  {
    name: 'Deepfake_Detection_fingerprint',
    desc: 'Fingerprint deepfake detection using deep learning.',
    language: 'Jupyter Notebook',
    stars: 0,
    forks: 0,
    issues: 0,
    topics: ['ai', 'research'],
    url: 'https://github.com/2D0S0G6/Deepfake_Detection_fingerprint',
    pinned: false,
    updated: '2026-07-16',
  },
  {
    name: 'Banking_LLM',
    desc: 'Ensemble deep learning framework for prompt injection detection and SHAP explainability in banking LLMs.',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    topics: ['llm', 'deep-learning', 'banking', 'security'],
    url: 'https://github.com/2D0S0G6/Banking_LLM',
    pinned: false,
    updated: '2026-07-17',
  },
  {
    name: 'neetcode-submissions-e889xvr2',
    desc: 'My NeetCode.io problem submissions.',
    language: 'Python',
    stars: 0,
    forks: 0,
    issues: 0,
    topics: ['algorithms', 'cp'],
    url: 'https://github.com/2D0S0G6/neetcode-submissions-e889xvr2',
    pinned: false,
    updated: '2026-07-16',
  },
];

/** Filter options for the language pills: "All" plus every language present. */
export const repoLanguages: readonly string[] = ['All', ...Array.from(new Set(repos.map((r) => r.language)))];
