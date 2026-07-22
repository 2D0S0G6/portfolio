import type { SkillCategory } from '@/types';

export const skills: readonly SkillCategory[] = [
  {
    cat: 'Languages',
    note: 'Everyday tools',
    items: ['Python', 'JavaScript', 'TypeScript', 'Solidity', 'Bash'],
  },
  {
    cat: 'AI & Deep Learning',
    note: 'Building & red-teaming models',
    items: ['PyTorch', 'BERT & Transformers', 'CNNs', 'Computer Vision', 'Ensemble Methods'],
  },
  {
    cat: 'Security & Tools',
    note: 'Offensive research & tooling',
    items: [
      'Vulnerability Research',
      'Web Security',
      'Threat Detection',
      'Blockchain Security',
      'Penetration Testing',
      'Git & GitHub',
      'Linux',
      'Docker',
      'Jupyter',
    ],
  },
  {
    cat: 'Fullstack Development',
    note: 'Shipping the whole thing',
    items: ['React', 'Node.js', 'HTML', 'CSS', 'REST APIs', 'API Integration', 'Responsive Design', 'Docker'],
  },
  {
    cat: 'Network & Analysis',
    note: 'Wire-level & IoT protocols',
    items: [
      'Wireshark',
      'Tshark',
      'Snort',
      'Cisco Packet Tracer',
      'NS3 Simulator',
      'IoT Security',
      'MQTT',
      'Protocol Analysis',
    ],
  },
  {
    cat: 'Blockchain & Reverse Engineering',
    note: 'On-chain & binary analysis',
    items: ['Echidna', 'Slither', 'Ganache', 'IDA Pro', 'GDB', 'FTK Imager', 'MobSF', 'Emulator'],
  },
];
