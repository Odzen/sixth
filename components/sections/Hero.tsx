'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { t, language } = useLanguage();

  const scrollToDemo = () => {
    const element = document.getElementById('audio-demo');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] dotted-bg pt-20 pb-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-12">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-5xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
            {t.hero.title1}{' '}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto font-light">
            {t.hero.description}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={scrollToDemo}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors mt-auto"
        >
          <span className="text-sm font-medium">
            {language === 'es' ? 'Escucha la demo' : 'Listen to the demo'}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
