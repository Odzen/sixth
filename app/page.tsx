import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { UseCases } from '@/components/sections/UseCases';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-deep-charcoal">
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <UseCases />
      <Footer />
    </main>
  );
}
