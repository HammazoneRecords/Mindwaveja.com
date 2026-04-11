'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../Button';

export function ServicesCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 sm:py-24 bg-navy-900">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-50 mb-4">
            Not Sure Which Wave?
          </h2>

          <p className="text-lg text-fog-300 mb-8 max-w-2xl mx-auto">
            Tell us about your idea and current situation. We will recommend the 
            right starting point for your journey.
          </p>

          <Button href="/intake" size="lg">
            Start Your Idea
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
