import Link from 'next/link';
import type { Post } from '@/types';
import { formatDate } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';

interface ArticleProps {
  post: Post;
  related: readonly Post[];
}

export function Article({ post, related }: ArticleProps) {
  return (
    <article className="animate-pf-fade">
      <Container width="prose" className="pt-[clamp(96px,12vh,150px)] pb-[clamp(52px,8vw,96px)]">
        <Link
          href="/blog"
          className="text-dim hover:text-text inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors"
        >
          <Arrow direction="left" /> All writing
        </Link>

        <div className="text-faint mt-[34px] flex gap-4 font-mono text-[11px] tracking-[0.08em]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.read}</span>
        </div>

        <h1 className="font-display mt-4 text-[clamp(34px,6vw,66px)] leading-none font-extrabold tracking-[-0.03em] text-balance">
          {post.title}
        </h1>

        <ul className="border-line mt-[22px] flex list-none flex-wrap gap-2 border-b p-0 pb-[34px]">
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

        <div className="mt-[34px]">
          {post.body.map((paragraph) => (
            <p key={paragraph} className="text-text mb-[26px] text-[clamp(16px,1.8vw,19px)] leading-[1.8]">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      {related.length > 0 && (
        <aside className="border-line bg-bg2 border-t">
          <Container width="narrow" className="py-[clamp(40px,6vw,72px)]">
            <Eyebrow as="h2">Keep reading</Eyebrow>
            <ul className="mt-6 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px] p-0">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.id}`}
                    className="border-line2 text-text hover:border-dim hover:bg-raise block h-full border p-5 transition-[transform,border-color,background] duration-300 hover:-translate-y-1"
                  >
                    <time
                      dateTime={item.date}
                      className="text-faint font-mono text-[10.5px] tracking-[0.06em]"
                    >
                      {formatDate(item.date)}
                    </time>
                    <h3 className="font-display mt-2.5 text-[19px] leading-[1.15] font-bold tracking-[-0.01em]">
                      {item.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </aside>
      )}
    </article>
  );
}
