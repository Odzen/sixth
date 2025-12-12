'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Mountain, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

import { useRouter } from 'next/navigation';

export function UseCases() {
  const router = useRouter();
  const { t } = useLanguage();
  
  const useCases: { icon: LucideIcon; title: string; description: string; gradient: string; prompt: string }[] = [
    {
      icon: Sun,
      title: t.useCases.case1Title,
      description: t.useCases.case1Description,
      gradient: 'from-yellow-400 to-orange-400',
      prompt: t.useCases.case1Prompt,
    },
    {
      icon: Moon,
      title: t.useCases.case2Title,
      description: t.useCases.case2Description,
      gradient: 'from-gray-400 to-gray-600',
      prompt: t.useCases.case2Prompt,
    },
    {
      icon: Mountain,
      title: t.useCases.case3Title,
      description: t.useCases.case3Description,
      gradient: 'from-cyan-400 to-purple-500',
      prompt: t.useCases.case3Prompt,
    },
  ];

  return (
    <section id="demo" className="py-24 bg-[#0a0a0a] dotted-bg px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.useCases.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            {t.useCases.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => router.push(`/experience?prompt=${encodeURIComponent(useCase.prompt)}`)}
              className="group relative overflow-hidden rounded-2xl h-full flex cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--vapi-blue), var(--vapi-purple))` }} />

              <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 flex-1 hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-500/20 hover:scale-105 flex flex-col">
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {useCase.title}
                </h3>

                <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-6 flex-grow">
                  {useCase.description}
                </p>

                <div className="flex items-center justify-center pt-4 border-t border-white/10">
                  <span className="text-cyan-400 font-semibold text-sm group-hover:text-white transition-colors flex items-center gap-2">
                    {t.useCases.tryExperience}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
