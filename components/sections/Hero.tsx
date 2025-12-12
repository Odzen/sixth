'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Volume2 } from 'lucide-react';

const predefinedPrompts = [
  'How does it feel to see the sun?',
  'What does a rainbow look like?',
  'Describe the colors of a sunset',
  'How does light reflect on water?',
  'Custom prompt...',
];

interface HeroProps {
  selectedPrompt?: string | null;
  clearSelectedPrompt?: () => void;
}

export function Hero({ selectedPrompt: externalPrompt, clearSelectedPrompt }: HeroProps) {
  const [selectedPrompt, setSelectedPrompt] = useState(predefinedPrompts[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const maxLength = 100;

  // Update prompt when external prompt is set
  useEffect(() => {
    if (externalPrompt) {
      setSelectedPrompt(externalPrompt);
      setIsCustom(false);
      setCustomPrompt('');
      if (clearSelectedPrompt) {
        clearSelectedPrompt();
      }
    }
  }, [externalPrompt, clearSelectedPrompt]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePromptChange = (prompt: string) => {
    if (prompt === 'Custom prompt...') {
      setIsCustom(true);
      setSelectedPrompt('');
    } else {
      setIsCustom(false);
      setSelectedPrompt(prompt);
    }
  };

  const handleGenerate = () => {
    const finalPrompt = isCustom ? customPrompt : selectedPrompt;
    console.log('Generating audio for:', finalPrompt);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-deep-charcoal pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Experience the world through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-bright-yellow">
              immersive audio
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
            Sixth creates immersive spatial audio experiences for everyone. We transform concepts and ideas into rich soundscapes, making content accessible and engaging for all, especially for people with disabilities.
          </p>

          <Button
            onClick={() => scrollToSection('technology')}
            className="bg-neon-blue text-deep-charcoal hover:!bg-bright-yellow hover:!shadow-bright-yellow/50 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-2xl shadow-neon-blue/40 group transition-all hover:scale-105"
          >
            Experience the Technology
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/5 backdrop-blur-sm border-2 border-neon-blue/30 rounded-3xl p-8 space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-full blur-2xl"
                />

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-neon-blue/30"
                  style={{
                    borderStyle: 'dashed',
                  }}
                />

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-4 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-full shadow-2xl shadow-neon-blue/50 flex items-center justify-center"
                >
                  <Volume2 className="w-16 h-16 text-white" strokeWidth={2} />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 bg-neon-blue rounded-full"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-white font-semibold text-base sm:text-lg block">
                Try an Experience
              </label>

              {!isCustom ? (
                <select
                  value={selectedPrompt}
                  onChange={(e) => handlePromptChange(e.target.value)}
                  className="w-full bg-white/10 border-2 border-neon-blue/30 text-white rounded-lg px-4 py-3 text-lg focus:border-neon-blue focus:outline-none"
                >
                  {predefinedPrompts.map((prompt) => (
                    <option key={prompt} value={prompt} className="bg-deep-charcoal">
                      {prompt}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Enter your question..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value.slice(0, maxLength))}
                    maxLength={maxLength}
                    className="bg-white/10 border-2 border-neon-blue/30 text-white placeholder:text-white/40 text-base sm:text-lg focus:border-neon-blue"
                  />
                  <div className="flex justify-between items-center text-sm">
                    <button
                      onClick={() => setIsCustom(false)}
                      className="text-neon-blue hover:underline"
                    >
                      Back to presets
                    </button>
                    <span className="text-white/60">
                      {customPrompt.length}/{maxLength}
                    </span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={isCustom && !customPrompt.trim()}
                className="w-full bg-gradient-to-r from-neon-blue to-bright-yellow text-deep-charcoal hover:!from-bright-yellow hover:!to-neon-blue font-semibold text-base sm:text-lg py-5 sm:py-6 shadow-xl group transition-all hover:scale-105 hover:shadow-2xl"
              >
                <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                Generate Audio Experience
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
