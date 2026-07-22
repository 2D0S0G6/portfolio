import { bio, education } from '@/data/about';
import { experience } from '@/data/experience';
import { honors } from '@/data/honors';
import { posts } from '@/data/posts';
import { projects } from '@/data/projects';
import { publications } from '@/data/publications';
import { skills } from '@/data/skills';
import { socAreas } from '@/data/soc';
import { contact } from '@/data/site';

/**
 * Flattens every content collection into the plain-text profile handed to the
 * assistant as grounding. Derived from the same data the pages render, so the
 * assistant can never drift out of sync with the site.
 */
export function buildKnowledgeBase(): string {
  const skillLines = skills.map((c) => `${c.cat}: ${c.items.join(', ')}`).join('. ');
  const experienceLines = experience.map((e) => `${e.role} at ${e.org} (${e.period}): ${e.desc}`).join(' ');
  const projectLines = projects
    .map((p) => `${p.title} — ${p.tag}. ${p.desc} Results: ${p.results}`)
    .join(' ');
  const publicationLines = publications.map((p) => `"${p.title}" (${p.venue}, ${p.date})`).join('; ');
  const socLines = socAreas.map((a) => `${a.area} (tools: ${a.tools.join(', ')})`).join('; ');
  const honorLines = honors.map((h) => `${h.title} — ${h.org} (${h.date})`).join('; ');
  const postLines = posts.map((p) => `"${p.title}" (${p.read})`).join('; ');

  return [
    `BIO: ${bio.join(' ')}`,
    `EDUCATION: ${education.degree} at ${education.school}, ${education.period}, GPA ${education.gpa}.`,
    `SKILLS: ${skillLines}`,
    `EXPERIENCE: ${experienceLines}`,
    `PROJECTS: ${projectLines}`,
    `PUBLICATIONS: ${publicationLines}`,
    `SOC & DFIR: ${socLines}`,
    `HONORS: ${honorLines}`,
    `WRITING: ${postLines}`,
    `CONTACT: GitHub ${contact.github}, LinkedIn ${contact.linkedin}, location ${contact.location}, ${contact.availability}.`,
  ].join('\n');
}
