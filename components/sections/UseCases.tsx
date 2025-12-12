'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Mountain } from 'lucide-react';

const useCases = [
  {
    icon: Sun,
    title: 'Experience the Sun',
    description: 'Listen to an immersive narrative that conveys the warmth, brilliance, and life-giving energy of sunlight through spatial audio and evocative storytelling.',
    gradient: 'from-bright-yellow to-orange-400',
  },
  {
    icon: Moon,
    title: 'Journey to the Moon',
    description: 'Explore the lunar landscape through rich audio descriptions that paint a vivid picture of craters, shadows, and the vastness of space.',
    gradient: 'from-gray-400 to-gray-600',
  },
  {
    icon: Mountain,
    title: 'Feel the Horizon',
    description: 'Navigate through layers of depth and distance as spatial audio creates an immersive sense of perspective, from foreground to infinite sky.',
    gradient: 'from-neon-blue to-purple-500',
  },
];

export function UseCases() {
  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-[#0d1317] to-deep-charcoal px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hear the Unseen
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Sixth transforms visual concepts into rich spatial audio experiences that bring the world to life through sound.
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
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                   style={{ backgroundImage: `linear-gradient(to bottom right, var(--neon-blue), var(--bright-yellow))` }} />

              <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 h-full hover:border-neon-blue/50 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-neon-blue/20">
                <div className={`w-16 h-16 bg-gradient-to-br ${useCase.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {useCase.title}
                </h3>

                <p className="text-lg text-white/70 leading-relaxed">
                  {useCase.description}
                </p>

                <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-neon-blue to-bright-yellow transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
