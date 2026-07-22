import type { Project } from '@/types';

/**
 * `live` is intentionally omitted where there is no public deployment —
 * the Live link only renders when the field is present.
 */
export const projects: readonly Project[] = [
  {
    id: 'dsg-suite',
    title: 'DSG_Suite',
    tag: 'AI-powered web vulnerability scanner',
    desc: 'Production-grade cybersecurity tool engineered for comprehensive OWASP Top 10 vulnerability detection with AI-assisted payload generation and remediation guidance.',
    problem:
      'Conventional scanners fire static payloads at every parameter. They miss context-dependent injection points, multi-step attack chains, and the API endpoints that increasingly carry the real attack surface.',
    solution:
      'An asynchronous Python tool that detects OWASP Top 10 vulnerabilities including SQL injection, cross-site scripting, IDOR, and privilege escalation, with Google Gemini integrated for context-aware payload generation, multi-step attack chain detection, and intelligent API endpoint analysis.',
    tech: ['Python', 'Async/Await', 'Google Gemini API', 'Security', 'CLI', 'REST API'],
    highlights: [
      'Asynchronous architecture for scalable scanning',
      'LLM-enhanced payload generation with context awareness',
      'Comprehensive remediation recommendations',
      'Automated HTML/JSON audit report generation',
    ],
    results:
      'A modular, extensible CLI with REST API support and CI/CD pipeline integration — a production-ready security assessment tool.',
    github: 'https://github.com/2D0S0G6/DSG_Suite',
  },
  {
    id: 'prompt-injection-detection',
    title: 'Prompt Injection Detection',
    tag: 'Ensemble transformer defence for banking LLMs',
    desc: 'Ensemble transformer framework for detecting adversarial prompt injection attacks in production Large Language Models with financial applications.',
    problem:
      'Banking LLMs sit in front of real money, and a single crafted prompt can override their instructions. Single-model classifiers miss obfuscated, role-play, and multi-turn injections — and give security teams no reason for the verdict they return.',
    solution:
      'A transformer ensemble (BERT, RoBERTa, DistilBERT) with weighted prediction aggregation and SHAP explainability, backed by end-to-end data pipelines handling 154K+ samples with comprehensive preprocessing, tokenization, and batching strategies.',
    tech: ['Python', 'PyTorch', 'BERT', 'RoBERTa', 'DistilBERT', 'SHAP', 'Deep Learning', 'NLP'],
    highlights: [
      'Weighted ensemble voting for robust threat detection',
      'SHAP explainability for security team interpretation',
      'Robustness against jailbreaks, semantic obfuscation, and role-play attacks',
      'Multi-turn injection detection capability',
    ],
    results:
      'Published in IEEE; demonstrated 99%+ precision in threat detection as a production-grade system for financial AI security.',
    github: 'https://github.com/2D0S0G6/Prompt_Injection_Detection',
  },
  {
    id: 'fingerprint-spoof-detection',
    title: 'Fingerprint Spoof Detection',
    tag: 'Ensemble defence against AI-generated deepfakes',
    desc: 'Advanced biometric security system using ensemble deep learning to defend against AI-generated fingerprint deepfakes with 96.7% accuracy.',
    problem:
      'GAN-generated fingerprints defeat conventional liveness checks. Detectors trained on classic spoofs generalise poorly to synthetic deepfakes, and class imbalance in the training data keeps that failure quiet.',
    solution:
      'An ensemble deep learning system combining EfficientNet-B0, ResNet-18, and DIET-CNN architectures in PyTorch, trained on 13,000+ samples including GAN-generated synthetic fingerprints.',
    tech: ['Python', 'PyTorch', 'EfficientNet', 'ResNet', 'Deep Learning', 'Computer Vision'],
    highlights: [
      '96.7% accuracy on ensemble predictions',
      'Training on 13,000+ samples with synthetic data augmentation',
      'Weighted ensemble inference for confidence calibration',
      'ROC curve and confusion matrix analysis',
      'Feature separability analysis demonstrating clear decision boundaries',
    ],
    results:
      'Published in Elsevier; a production-ready biometric security system demonstrating resilience against advanced deepfake techniques.',
    github: 'https://github.com/2D0S0G6/Deepfake_Detection_fingerprint',
  },
  {
    id: 'solfix',
    title: 'SolFix',
    tag: 'AI-assisted smart-contract security',
    desc: 'Intelligent security analysis tool for Solidity smart contracts combining pattern matching, static analysis, and AI-assisted vulnerability recommendations.',
    problem:
      "Smart-contract review splits into two imperfect halves: automated scanners that flag patterns without judgement, and expert audits that don't scale.",
    solution:
      'SolFix combines pattern matching and static analysis with AI-assisted review, producing vulnerability findings alongside practical remediation recommendations.',
    tech: ['JavaScript', 'Node.js', 'Solidity', 'AI', 'Security', 'Blockchain'],
    highlights: [
      'Integrated AI-assisted vulnerability analysis',
      'Smart contract security assessment',
      'Practical recommendations for remediation',
    ],
    results:
      'Bridges the gap between automated scanning and expert analysis, accelerating smart-contract security review workflows.',
    github: 'https://github.com/2D0S0G6/SolFix',
  },
];
