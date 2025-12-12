'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
      <motion.button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'es'
            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
            : 'text-white/60 hover:text-white'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        ES
      </motion.button>
      <motion.button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
            : 'text-white/60 hover:text-white'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
    </div>
  );
}

