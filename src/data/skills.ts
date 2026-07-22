import type { SkillCategory } from '@/types';

export const skills: readonly SkillCategory[] = [
  {
    cat: 'Languages',
    note: 'Everyday tools',
    items: ['Python', 'C', 'C++', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'Bash', 'SQL'],
  },
  {
    cat: 'AI / Deep Learning',
    note: 'Building & red-teaming models',
    items: [
      'PyTorch',
      'Transformers',
      'LLM fine-tuning',
      'RAG pipelines',
      'Prompt-injection testing',
      'scikit-learn',
      'Diffusion models',
      'LangChain',
      'Model evaluation',
    ],
  },
  {
    cat: 'Security',
    note: 'Offensive & defensive',
    items: [
      'Web app pentesting',
      'Binary exploitation',
      'Reverse engineering',
      'Malware analysis',
      'Threat modeling',
      'Burp Suite',
      'Ghidra',
      'Metasploit',
      'OWASP Top 10',
    ],
  },
  {
    cat: 'Fullstack',
    note: 'Shipping the whole thing',
    items: ['React', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker', 'REST & GraphQL', 'Tailwind'],
  },
  {
    cat: 'Network',
    note: 'Wire-level fluency',
    items: ['TCP/IP', 'Wireshark', 'Zeek', 'Suricata', 'Nmap', 'TLS / PKI', 'DNS', 'Firewalls & VPNs'],
  },
  {
    cat: 'Blockchain',
    note: 'On-chain security',
    items: [
      'Solidity',
      'Smart-contract auditing',
      'EVM internals',
      'Foundry',
      'Hardhat',
      'web3.js',
      'DeFi security',
    ],
  },
];
