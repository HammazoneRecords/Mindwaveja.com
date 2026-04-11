'use client';

import { motion } from 'framer-motion';
import { HeroRevealPlaceholder } from '../HeroRevealPlaceholder';
import { Button } from '../Button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-start justify-center overflow-hidden">
      <HeroRevealPlaceholder />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'rgb(var(--color-brand-red))' }}>
            A Jamaican Engine for Innovation
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight" style={{ color: 'rgb(var(--color-text-primary))' }}>
            Ideas to Income.
            <br />
            <span className="text-gradient">Guidance to Growth.</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
            You bring a spark. We turn it into a blueprint.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/intake" size="lg">
              Start Your Idea
            </Button>
            <Button href="/phase-packs" variant="outline" size="lg">
              Explore Phase Packs
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
