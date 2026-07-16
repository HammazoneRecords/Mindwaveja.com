'use client';

import { motion } from 'framer-motion';
import { HeroRevealPlaceholder } from '../HeroRevealPlaceholder';
import { HeroCTAButton } from '../HeroCTAButton';

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
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 leading-none" style={{ color: 'rgb(var(--color-text-primary))' }}>
            MindWave
            <br />
            <span className="text-gradient">Jamaica</span>
          </h1>

          <p className="text-lg sm:text-xl font-semibold tracking-wide mb-6" style={{ color: 'rgb(var(--color-brand-red))' }}>
            A Jamaican Engine for Innovation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <HeroCTAButton href="/phase-packs">Phase Packs</HeroCTAButton>
            <HeroCTAButton href="https://chat2cash.mindwaveja.com" accent="rgb(var(--color-brand-green))">Chat2Cash</HeroCTAButton>
            <HeroCTAButton href="/marketplace/artist-digital-territory-license" accent="rgba(255,255,255,0.85)" compact>
              <span style={{ fontSize: 14, lineHeight: 1.25, textAlign: 'center' as const }}>
                Artise<br/>Digital Territory
              </span>
            </HeroCTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
