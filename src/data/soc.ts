import type { SocArea } from '@/types';

export const socAreas: readonly SocArea[] = [
  {
    area: 'Network Traffic Analysis',
    desc: 'Hands-on experience dissecting TCP/IP behaviour and tracing malicious packet streams. Deep packet inspection for identifying command & control communication patterns and lateral movement indicators.',
    tools: ['Wireshark', 'Tshark'],
    methods: [
      'deep packet inspection',
      'TCP/IP behaviour analysis',
      'C2 pattern identification',
      'lateral movement detection',
    ],
  },
  {
    area: 'SIEM & Log Correlation',
    desc: 'Crafting advanced correlation queries (SPL) to ingest endpoint logs, track failed login spikes, and build real-time threat dashboards. Custom rule development for zero-day detection and anomaly hunting.',
    tools: ['Splunk', 'ELK', 'Wazuh'],
    methods: [
      'SPL correlation queries',
      'endpoint log ingestion',
      'real-time threat dashboards',
      'custom rule development',
    ],
  },
  {
    area: 'Network Security Monitoring (NSM)',
    desc: 'Applying behavioural traffic profiling via structured logs to identify lateral movement and out-of-band C2 communication attempts. Threat intel integration for automated detection and response workflows.',
    tools: ['Zeek', 'Snort'],
    methods: [
      'behavioural traffic profiling',
      'lateral movement detection',
      'out-of-band C2 detection',
      'threat intel integration',
    ],
  },
  {
    area: 'Host-Based Forensics (DFIR)',
    desc: 'Rapid extraction of execution artifacts, persistence mechanisms (e.g. Run keys), and user activity from Windows Registry hive files during post-incident response. Timeline reconstruction and evidence preservation.',
    tools: ['RegRipper'],
    methods: [
      'registry hive analysis',
      'persistence hunting',
      'timeline reconstruction',
      'evidence preservation',
    ],
  },
  {
    area: 'Memory & Malware Triage',
    desc: 'RAM memory dumping to hunt for rootkits, and custom malware signature matching. Advanced behavioural analysis for identifying hidden processes and injected code in volatile memory.',
    tools: ['Volatility', 'YARA'],
    methods: [
      'memory dumping',
      'rootkit hunting',
      'signature matching',
      'behavioural analysis of injected code',
    ],
  },
];
