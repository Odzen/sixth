'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Waves, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: t.footer.successTitle,
        description: t.footer.successDescription,
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer id="waitlist" className="py-24 bg-[#050505] border-t border-white/10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.footer.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
            {t.footer.description}
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
                placeholder={t.footer.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-cyan-500/30 text-white placeholder:text-white/40 h-14 pl-12 text-lg focus:border-cyan-400"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:from-cyan-300 hover:to-blue-400 font-semibold text-base sm:text-lg px-6 sm:px-8 h-12 sm:h-14 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 rounded-full"
            >
              {isSubmitting ? t.footer.joining : t.footer.joinWaitlist}
            </Button>
          </div>
        </motion.form>

        <div className="border-t border-white/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Waves className="w-6 h-6 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white">Sixth</span>
            </div>

            <p className="text-white/60 text-lg">
              {t.footer.tagline}
            </p>

            <p className="text-white/40">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
