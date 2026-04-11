'use client';

import { motion } from 'framer-motion';

import { HeroRevealPlaceholder } from '../HeroRevealPlaceholder';

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      {/* Background */}
      <HeroRevealPlaceholder />
      <div className="absolute inset-0 bg-navy-900/60" /> {/* Added dimming overlay for readability */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-wave-400 text-sm font-medium tracking-wider uppercase mb-4">
            Our Services
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-fog-50 mb-6">
            Four Waves of Support
          </h1>

          <p className="text-lg sm:text-xl text-fog-300 max-w-2xl mx-auto leading-relaxed">
            Each Wave package is designed to meet you exactly where you are.
            From your first spark of an idea to scaling an established business.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
