import type { Post } from '@/types';

/** Newest first — the Writing index renders these in array order. */
export const posts: readonly Post[] = [
  {
    id: 'quiet-parts',
    title: 'On the quiet parts of security research',
    date: '2026-06-30',
    read: '6 min',
    tags: ['research', 'craft'],
    excerpt:
      'The best findings rarely come from noise. A note on patience, note-taking, and sitting with a system until it tells you something.',
    body: [
      "Most of the security work that actually matters is slow. It doesn't look like the movies — it looks like reading the same log twice, writing down a hunch, and coming back to it the next morning.",
      "I've learned to trust the boring parts. The finding that changes an assessment usually arrives after an hour of doing nothing flashy: renaming variables, drawing the data flow on paper, sitting with a system until it stops feeling foreign.",
      'So this is a small argument for patience. Take the note. Sleep on it. The quiet parts are where the good work hides.',
    ],
  },
  {
    id: 'teaching-refuse',
    title: 'Teaching a model to refuse',
    date: '2026-06-05',
    read: '9 min',
    tags: ['ai-safety', 'llm'],
    excerpt:
      'Guardrails are not a feature you bolt on at the end. What red-teaming my own models taught me about designing refusal.',
    body: [
      "Refusal is a design problem, not a filter you staple on at the end. If you wait until the model is built to decide what it should decline, you'll always be a step behind the people probing it.",
      'When I red-team my own models, the interesting failures are rarely the obvious ones. They come from indirection — a request wrapped in a request, an instruction hidden in data the model was only meant to read.',
      'The fix that holds up is boring and structural: separate instructions from content, make tool use explicit, and log every decision so you can watch refusal working — or not.',
    ],
  },
  {
    id: 'foggy-ctf',
    title: 'Notes from a foggy CTF weekend',
    date: '2026-05-18',
    read: '5 min',
    tags: ['ctf', 'writeup'],
    excerpt:
      'Two days, three time zones, one very stubborn reversing challenge. What stuck with me afterward.',
    body: [
      "Two days, three time zones, and one reversing challenge that refused to fall. That's the short version of last weekend's CTF.",
      "The breakthrough came where it usually does — after I stopped brute-forcing and started reading. The binary wasn't hiding a trick so much as a small, honest state machine I'd been too impatient to map.",
      "We didn't win, but I came away with a cleaner mental model and a page of notes I'll use for years. That's a fair trade.",
    ],
  },
  {
    id: 'shape-exploit',
    title: 'The shape of a good exploit',
    date: '2026-04-27',
    read: '7 min',
    tags: ['security', 'craft'],
    excerpt:
      'A good exploit is small, honest, and reproducible. On writing proofs-of-concept that other people can trust.',
    body: [
      'A good exploit is small. It does one thing, it does it reliably, and someone else can run it without a five-paragraph apology attached.',
      "I try to write proofs-of-concept the way I'd want to receive them: minimal setup, clear preconditions, and output that makes the impact obvious. If a defender can't reproduce it, it isn't finished.",
      'Honesty matters here too. Note the caveats, the version numbers, the things that might not generalize. The credibility of the finding rests on it.',
    ],
  },
  {
    id: 'write-everything',
    title: 'Why I write everything down',
    date: '2026-03-30',
    read: '4 min',
    tags: ['craft', 'notes'],
    excerpt: 'My lab notebook has saved me more times than any tool. A short case for writing as thinking.',
    body: [
      'My lab notebook has bailed me out more often than any tool. Half of security research is remembering what you already tried.',
      'Writing is how I think. The act of explaining a bug to an imaginary reader forces the gaps in my understanding to the surface, usually before they cost me an afternoon.',
      'So I write everything down — dead ends included. The dead ends are often the most useful thing I have three months later.',
    ],
  },
  {
    id: 'reversing-reading',
    title: 'Reverse engineering as reading',
    date: '2026-02-19',
    read: '8 min',
    tags: ['reversing', 'learning'],
    excerpt:
      'Disassembly is just a language you have not learned to read yet. How I approach an unfamiliar binary.',
    body: [
      "Disassembly looks intimidating until you realize it's just a language you haven't learned to read yet. Like any language, fluency comes from volume, not talent.",
      "When I open an unfamiliar binary I don't start at the entry point. I look for the strings, the imports, the shape of the thing — the way you'd skim a book before reading it.",
      "From there it's iterative: name what you understand, guess at what you don't, and let the picture resolve. Reversing is reading, slowly, with a pencil in hand.",
    ],
  },
];

export function getPost(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

/** Up to three other posts, used by the "Keep reading" strip on an article. */
export function getRelatedPosts(id: string, limit = 3): readonly Post[] {
  return posts.filter((p) => p.id !== id).slice(0, limit);
}
