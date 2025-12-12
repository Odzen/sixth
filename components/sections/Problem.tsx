'use client';

import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, Sparkles } from 'lucide-react';

const problems = [
  {
    icon: BookOpen,
    title: 'Text descriptions fall short',
    description: 'Reading about light, color, and visual phenomena cannot capture the essence of these experiences.',
  },
  {
    icon: MessageSquare,
    title: 'Words have limits',
    description: 'How do you explain the brilliance of a sunset or the depth of a starry night through text alone?',
  },
  {
    icon: Sparkles,
    title: 'We create the experience',
    description: 'Through immersive spatial audio narratives, listeners can experience visual concepts in a new dimension.',
  },
];

export function Problem() {
  return (
    <section id="mission" className="py-24 bg-gradient-to-b from-deep-charcoal to-[#0d1317] px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Words are not enough.
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Traditional education relies on visual examples that exclude visually impaired students from truly understanding abstract concepts.
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
              className="group"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm border-2 border-neon-blue/20 rounded-2xl p-8 hover:border-neon-blue/60 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-blue/20">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-neon-blue/30 group-hover:scale-110 transition-transform duration-300">
                    <problem.icon className="w-8 h-8 text-deep-charcoal" strokeWidth={2.5} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {problem.title}
                  </h3>

                  <p className="text-lg text-white/70 leading-relaxed">
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
