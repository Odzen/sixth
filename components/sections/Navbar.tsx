'use client';

import { Button } from '@/components/ui/button';
import { Waves } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Navbar() {
  const { t } = useLanguage();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Sixth
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('mission')}
              className="text-white/70 hover:text-white transition-colors text-base font-medium"
            >
              {t.nav.mission}
            </button>
            <button
              onClick={() => scrollToSection('technology')}
              className="text-white/70 hover:text-white transition-colors text-base font-medium"
            >
              {t.nav.technology}
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="text-white/70 hover:text-white transition-colors text-base font-medium"
            >
              {t.nav.demo}
            </button>
            <LanguageSwitcher />
            <Button
              onClick={() => {
                // If on homepage, scroll to demo section, otherwise navigate
                if (window.location.pathname === '/') {
                  scrollToSection('demo');
                } else {
                  window.location.href = '/#demo';
                }
              }}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 font-semibold text-sm px-5 py-5 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 rounded-full"
            >
              {t.nav.tryExperience}
            </Button>
          </div>
          
          {/* Mobile language switcher */}
          <div className="md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
