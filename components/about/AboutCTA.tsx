'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../Button';

export function AboutCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 sm:py-24 bg-charcoal-900">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream-100 mb-4">
            Ready to Start Your Journey?
          </h2>

          <p className="text-lg text-charcoal-300 mb-8 max-w-2xl mx-auto">
            Whether you have a fully formed business plan or just the beginning 
            of an idea, we are here to help you take the next step.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/intake" size="lg">
              Start Your Idea
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
