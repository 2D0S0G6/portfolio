import type { Repo } from '@/types';

/**
 * Static snapshot of the GitHub profile. Star / fork / issue counts are sample
 * values from the design — replace them, or swap this module for a fetch
 * against the GitHub REST API, without touching the Repositories page.
 */
export const repos: readonly Repo[] = [
  {
    name: 'sentinel',
    desc: 'Prompt-injection firewall for LLM applications.',
    language: 'Python',
    stars: 312,
    forks: 41,
    issues: 7,
    topics: ['llm-security', 'prompt-injection', 'ai-safety', 'fastapi'],
    url: 'https://github.com/2d0s0g6',
    pinned: true,
    updated: '2026-06-28',
  },
  {
    name: 'nightjar',
    desc: 'Unsupervised network anomaly detection over Zeek logs.',
    language: 'Python',
    stars: 198,
    forks: 23,
    issues: 4,
    topics: ['network-security', 'anomaly-detection', 'zeek', 'ml'],
    url: 'https://github.com/2d0s0g6',
    pinned: true,
    updated: '2026-05-14',
  },
  {
    name: 'cinder',
    desc: 'Static analyzer for Solidity smart contracts.',
    language: 'Rust',
    stars: 141,
    forks: 12,
    issues: 9,
    topics: ['solidity', 'static-analysis', 'evm', 'security'],
    url: 'https://github.com/2d0s0g6',
    pinned: true,
    updated: '2026-06-02',
  },
  {
    name: 'grainstore',
    desc: 'Local-first encrypted notes with semantic search.',
    language: 'TypeScript',
    stars: 87,
    forks: 6,
    issues: 3,
    topics: ['privacy', 'rag', 'local-first', 'encryption'],
    url: 'https://github.com/2d0s0g6',
    pinned: false,
    updated: '2026-07-01',
  },
  {
    name: 'ctf-writeups',
    desc: 'Notes and solutions from CTFs — web, rev, forensics.',
    language: 'Markdown',
    stars: 64,
    forks: 15,
    issues: 1,
    topics: ['ctf', 'writeups', 'reverse-engineering', 'forensics'],
    url: 'https://github.com/2d0s0g6',
    pinned: false,
    updated: '2026-06-20',
  },
  {
    name: 'memcarve',
    desc: 'Small memory-forensics helpers for Volatility.',
    language: 'Python',
    stars: 53,
    forks: 8,
    issues: 2,
    topics: ['dfir', 'memory-forensics', 'volatility', 'malware'],
    url: 'https://github.com/2d0s0g6',
    pinned: false,
    updated: '2026-04-09',
  },
  {
    name: 'dotfiles',
    desc: 'My terminal, editor, and tmux setup.',
    language: 'Shell',
    stars: 29,
    forks: 4,
    issues: 0,
    topics: ['dotfiles', 'neovim', 'tmux', 'linux'],
    url: 'https://github.com/2d0s0g6',
    pinned: false,
    updated: '2026-03-22',
  },
];

/** Filter options for the language pills: "All" plus every language present. */
export const repoLanguages: readonly string[] = ['All', ...Array.from(new Set(repos.map((r) => r.language)))];
