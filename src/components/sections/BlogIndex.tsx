import Link from 'next/link';
import { posts } from '@/data/posts';
import { formatDate } from '@/lib/utils';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

export function BlogIndex() {
  return (
    <Section width="narrow">
      {posts.map((post) => (
        <Reveal key={post.id} as="article">
          <Link
            href={`/blog/${post.id}`}
            className="border-line text-text group block w-full border-t py-[clamp(28px,4vw,46px)] text-left transition-transform duration-300 hover:translate-x-[10px]"
          >
            <div className="text-faint flex gap-4 font-mono text-[11px] tracking-[0.08em]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.read}</span>
            </div>

            <h2 className="font-display mt-3.5 max-w-[20ch] text-[clamp(26px,4vw,46px)] leading-[1.02] font-bold tracking-[-0.025em] text-balance">
              {post.title}
            </h2>

            <p className="text-dim mt-3.5 max-w-[60ch] text-[clamp(15px,1.5vw,17px)] leading-[1.6]">
              {post.excerpt}
            </p>

            <ul className="mt-4 flex list-none flex-wrap gap-2 p-0">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border-line2 text-faint border px-[9px] py-1 font-mono text-[10.5px] tracking-[0.06em]"
                >
                  <span aria-hidden="true">#</span>
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </Reveal>
      ))}
    </Section>
  );
}
