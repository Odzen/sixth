'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Waves, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when Sixth launches.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer id="waitlist" className="py-24 bg-deep-charcoal border-t border-neon-blue/20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the Audio Revolution
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Be among the first to experience visual concepts through spatial audio. Sign up for early access and updates.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mb-16"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-neon-blue/30 text-white placeholder:text-white/40 h-14 pl-12 text-lg focus:border-neon-blue"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-neon-blue text-deep-charcoal hover:bg-neon-blue/90 font-semibold text-lg px-8 h-14 shadow-lg shadow-neon-blue/30"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </div>
        </motion.form>

        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-bright-yellow rounded-lg flex items-center justify-center shadow-lg shadow-neon-blue/30">
                <Waves className="w-6 h-6 text-deep-charcoal" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">Sixth</span>
            </div>

            <p className="text-white/60 text-lg">
              Bringing the visual world to life through sound.
            </p>

            <p className="text-white/40">
              © 2025 Sixth. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
