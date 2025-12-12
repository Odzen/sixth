'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { UseCases } from '@/components/sections/UseCases';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  // Log setup instructions on mount
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID) {
      console.warn(
        '%c⚠️ ElevenLabs Setup Required',
        'color: #FFE558; font-size: 16px; font-weight: bold;',
      );
      console.log(
        '%cTo enable audio generation:',
        'color: #00E5FF; font-size: 14px;',
      );
      console.log('1. Create an agent at https://elevenlabs.io/app/agents');
      console.log('2. Add NEXT_PUBLIC_ELEVENLABS_AGENT_ID to .env.local');
      console.log('3. Restart the dev server');
      console.log(
        '%cSee ELEVENLABS_SETUP.md for detailed instructions',
        'color: #00E5FF; font-style: italic;',
      );
    } else {
      console.log(
        '%c✅ ElevenLabs configured',
        'color: #00E5FF; font-size: 14px; font-weight: bold;',
      );
    }
  }, []);

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
