import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { HomeIndex } from '@/components/sections/HomeIndex';

/** Every other route sets its own canonical; without this the homepage had none. */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <section className="animate-pf-in">
      <Hero />
      <HomeIndex />
    </section>
  );
}
