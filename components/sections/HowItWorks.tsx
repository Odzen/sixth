'use client';

import { motion } from 'framer-motion';
import { Eye, Brain, Volume2 } from 'lucide-react';

const steps = [
  {
    icon: Eye,
    title: 'Imagine',
    subtitle: 'Concept Creation',
    description: 'Share any concept, scene, or experience you want to bring to life through sound - from natural phenomena to abstract ideas.',
  },
  {
    icon: Brain,
    title: 'Craft',
    subtitle: 'AI Narration',
    description: 'Advanced language models create rich, descriptive narratives that transform your concepts into vivid auditory experiences.',
  },
  {
    icon: Volume2,
    title: 'Experience',
    subtitle: 'Spatial Audio',
    description: 'Immersive 3D audio brings your concepts to life with depth, movement, and spatial positioning for a truly engaging experience.',
  },
];

export function HowItWorks() {
  return (
    <section id="technology" className="py-24 bg-[#0d1317] px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Sixth transforms visual concepts into immersive audio experiences through three seamless steps.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-bright-yellow to-neon-blue transform -translate-y-1/2" />

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative h-full flex"
              >
                <div className="bg-deep-charcoal border-2 border-neon-blue/30 rounded-2xl p-8 shadow-2xl shadow-neon-blue/10 hover:border-bright-yellow transition-all duration-300 hover:shadow-bright-yellow/20 group flex-1">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative w-24 h-24 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-full flex items-center justify-center shadow-2xl">
                        <step.icon className="w-12 h-12 text-deep-charcoal" strokeWidth={2.5} />
                      </div>
                    </div>

                    <div>
                      <div className="text-bright-yellow text-5xl sm:text-6xl font-bold mb-2">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-neon-blue text-base sm:text-lg font-semibold mb-4">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
