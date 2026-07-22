import { Hero } from '@/components/sections/Hero';
import { HomeIndex } from '@/components/sections/HomeIndex';

export default function HomePage() {
  return (
    <section className="animate-pf-in">
      <Hero />
      <HomeIndex />
    </section>
  );
}
