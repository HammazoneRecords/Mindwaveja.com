'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Section } from '../Section';

export function AboutFounder() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="secondary">
      <div ref={ref} className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'rgb(var(--color-text-primary))' }}>
            Founder
          </h2>
          <p className="text-lg leading-relaxed mb-2" style={{ color: 'rgb(var(--color-text-secondary))' }}>
            MindWave Jamaica was founded in 2019 by{' '}
            <span style={{ color: 'rgb(var(--color-text-primary))', fontWeight: 600 }}>Ovando Brown</span>,
            and was formally registered on May 28, 2024.
          </p>
          <a
            href="https://ovandobrown.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-base font-medium"
            style={{ color: 'rgb(var(--color-brand-red))', textDecoration: 'underline' }}
          >
            ovandobrown.com
            <ExternalLink size={15} />
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
