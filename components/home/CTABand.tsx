'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../Button';

export function CTABand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background gradient - brand colors */}
      <div className="absolute inset-0 bg-charcoal-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-wave-500/10 via-transparent to-leaf-400/10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-wave-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-leaf-400/15 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 mb-6">
            Ready to Build Something?
          </h2>

          <p className="text-lg sm:text-xl text-charcoal-300 mb-10 max-w-2xl mx-auto">
            Whether you have a fully formed idea or just a spark of inspiration,
            we are here to help you take the next step.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/intake" size="lg">
              Start Your Idea
            </Button>
          </div>

          <p className="mt-8 text-charcoal-400 text-sm">
            Free to start. No commitment required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
