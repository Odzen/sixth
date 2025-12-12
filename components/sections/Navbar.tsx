'use client';

import { Button } from '@/components/ui/button';
import { Waves } from 'lucide-react';

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-charcoal/90 backdrop-blur-md border-b border-neon-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-lg flex items-center justify-center shadow-lg shadow-neon-blue/30">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-deep-charcoal" strokeWidth={2.5} />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Sixth
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('mission')}
              className="text-white/80 hover:text-neon-blue transition-colors text-lg font-medium"
            >
              Mission
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="text-white/80 hover:text-neon-blue transition-colors text-lg font-medium"
            >
              Technology
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="text-white/80 hover:text-neon-blue transition-colors text-lg font-medium"
            >
              Demo
            </button>
            <Button
              onClick={() => scrollToSection('waitlist')}
              className="bg-neon-blue text-deep-charcoal hover:!bg-bright-yellow hover:!shadow-bright-yellow/50 font-semibold text-base lg:text-lg px-4 lg:px-6 py-4 lg:py-5 shadow-lg shadow-neon-blue/30 transition-all hover:scale-105"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
