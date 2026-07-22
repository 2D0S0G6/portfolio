import type { Publication } from '@/types';

/**
 * Author lists, venues, dates and DOIs were reconciled against the Crossref
 * registry on 2026-07-22 (api.crossref.org). Authors are listed in publication
 * order. Abstracts remain the short summaries from the source content rather
 * than the publishers' full text.
 */
export const publications: readonly Publication[] = [
  {
    title: 'Ensemble Deep Learning for Robust Prompt Injection Detection in Banking LLMs',
    authors: ['Neha Manoj', 'Deepak S G', 'Turala Pranav', 'Devi Rajeev'],
    venue: 'IEEE — ICSCCC 2026',
    date: 'May 2026',
    abstract:
      'This paper focuses on securing Large Language Models deployed within financial and banking institutions. It introduces an ensemble deep learning framework designed to detect and block prompt injection attacks.',
    topics: ['Deep Learning', 'BERT', 'RoBERTa', 'DistilBERT', 'SHAP', 'Python'],
    link: 'https://ieeexplore.ieee.org/document/11599973',
    doi: '10.1109/ICSCCC69031.2026.11599973',
  },
  {
    title: 'Ensemble Deep Learning for Robust Fingerprint Spoof Detection Against AI-Generated Deepfakes',
    authors: ['Turala Pranav', 'Deepak S G', 'Neha Manoj', 'Devi Rajeev'],
    venue: 'Elsevier — Procedia Computer Science',
    date: '2026',
    abstract:
      'Tackles advanced biometric vulnerabilities by presenting an ensemble deep learning approach to fingerprint spoof detection against AI-generated deepfakes.',
    topics: ['Deep Learning', 'EfficientNet', 'ResNet', 'PyTorch', 'Computer Vision'],
    link: 'https://www.sciencedirect.com/science/article/pii/S1877050926016947',
    doi: '10.1016/j.procs.2026.06.063',
  },
  {
    title:
      'Enhancing Traffic Safety: An Automated License Plate Recognition System for Effective Law Enforcement',
    authors: ['Sam M G Harish', 'Aksharasree S', 'Deepak S G', 'Mamatha S', 'Vipina Valsan'],
    venue: 'IEEE — ACROSET 2024',
    date: 'Sep 2024',
    abstract:
      'Presents an automated number plate recognition system using computer vision and image processing techniques for day and night operation, offering efficient and scalable enforcement.',
    topics: ['Computer Vision', 'Image Processing', 'Python', 'Deep Learning'],
    link: 'https://ieeexplore.ieee.org/document/10743360',
    doi: '10.1109/ACROSET62108.2024.10743360',
  },
];
