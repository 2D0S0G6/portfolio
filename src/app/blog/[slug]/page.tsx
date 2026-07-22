import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPost, getRelatedPosts, posts } from '@/data/posts';
import { Article } from '@/components/sections/Article';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every article at build time. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.id}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.id}`,
      publishedTime: post.date,
      tags: [...post.tags],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return <Article post={post} related={getRelatedPosts(post.id)} />;
}
