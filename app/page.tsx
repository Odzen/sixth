'use client';

import { useState } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { UseCases } from '@/components/sections/UseCases';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleUseCaseClick = (prompt: string) => {
    setSelectedPrompt(prompt);
    // Scroll to hero section
    const heroElement = document.getElementById('hero');
    heroElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-deep-charcoal">
      <Navbar />
      <Hero selectedPrompt={selectedPrompt} clearSelectedPrompt={() => setSelectedPrompt(null)} />
      <Problem />
      <HowItWorks />
      <UseCases onUseCaseClick={handleUseCaseClick} />
      <Footer />
    </main>
  );
}
