'use client';

import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Sparkles, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Problem() {
  const { t } = useLanguage();
  
  const problems: { icon: LucideIcon; title: string; description: string }[] = [
    {
      icon: BookOpen,
      title: t.problem.card1Title,
      description: t.problem.card1Description,
    },
    {
      icon: MessageSquare,
      title: t.problem.card2Title,
      description: t.problem.card2Description,
    },
    {
      icon: Sparkles,
      title: t.problem.card3Title,
      description: t.problem.card3Description,
    },
  ];

  return (
    <section id="mission" className="py-24 bg-[#0a0a0a] dotted-bg px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.problem.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            {t.problem.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group h-full flex"
            >
              <div className="relative flex-1 bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
                    <problem.icon className="w-8 h-8 text-black" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                    {problem.title}
                  </h3>

                  <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
