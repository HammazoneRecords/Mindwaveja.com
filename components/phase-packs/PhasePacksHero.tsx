'use client';

import { motion } from 'framer-motion';
import { HeroRevealPlaceholder } from '../HeroRevealPlaceholder';

export function PhasePacksHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 overflow-hidden">
      <HeroRevealPlaceholder />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'rgb(var(--color-brand-red))' }}>
            Business Blueprints
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: 'rgb(var(--color-text-primary))' }}>
            Phase Packs
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
            Complete roadmaps for specific business types. Each pack includes
            startup costs, first actions, common pitfalls, and growth paths
            tailored for the Jamaican market.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
