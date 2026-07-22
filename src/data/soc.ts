import type { SocArea } from '@/types';

export const socAreas: readonly SocArea[] = [
  {
    area: 'Network Traffic Analysis',
    desc: 'Reading packets and flows to reconstruct what actually happened on the wire — beaconing, exfiltration, lateral movement.',
    tools: ['Wireshark', 'tshark', 'Zeek', 'Arkime'],
    methods: ['PCAP triage', 'protocol dissection', 'flow baselining', 'beacon detection'],
  },
  {
    area: 'SIEM & Log Correlation',
    desc: 'Turning scattered logs into a story: stitching events across hosts and services into a single, defensible timeline.',
    tools: ['Splunk', 'Elastic', 'Sigma', 'Wazuh'],
    methods: ['detection engineering', 'correlation rules', 'timeline building', 'alert triage'],
  },
  {
    area: 'Network Security Monitoring',
    desc: 'Continuous visibility into a network — knowing what normal looks like so the abnormal has nowhere to hide.',
    tools: ['Suricata', 'Zeek', 'Security Onion'],
    methods: ['IDS tuning', 'signature + anomaly detection', 'sensor placement', 'threat hunting'],
  },
  {
    area: 'Host-Based Forensics',
    desc: 'Following the traces an intruder leaves on a machine — filesystem, registry, artifacts — to answer what, when, and how.',
    tools: ['Autopsy', 'Velociraptor', 'KAPE', 'plaso'],
    methods: ['artifact analysis', 'super-timeline creation', 'persistence hunting', 'IOC extraction'],
  },
  {
    area: 'Memory & Malware Analysis',
    desc: 'Pulling secrets out of RAM and taking malware apart to understand behavior, capability, and intent.',
    tools: ['Volatility', 'Ghidra', 'x64dbg', 'YARA'],
    methods: ['memory carving', 'static + dynamic analysis', 'unpacking', 'behavioral profiling'],
  },
];
