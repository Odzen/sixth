'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { AudioDemo } from '@/components/sections/AudioDemo';
import { Problem } from '@/components/sections/Problem';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { UseCases } from '@/components/sections/UseCases';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
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
    } else {
      console.log(
        '%c✅ ElevenLabs configured',
        'color: #00E5FF; font-size: 14px; font-weight: bold;',
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <div id="audio-demo">
        <AudioDemo />
      </div>
      <Problem />
      <HowItWorks />
      <UseCases />
      <Footer />
    </main>
  );
}
