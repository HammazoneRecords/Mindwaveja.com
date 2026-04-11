'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, SectionHeader } from '../Section';

const values = [
  {
    title: 'Action Over Theory',
    description:
      'We prioritize practical, executable guidance. Every piece of advice comes with clear next steps.',
    color: 'wave',
  },
  {
    title: 'Jamaica-First',
    description:
      'Our frameworks are built for the Jamaican market. We understand local challenges, opportunities, and culture.',
    color: 'leaf',
  },
  {
    title: 'Honest Guidance',
    description:
      'We tell you what you need to hear, not just what you want to hear. Real progress requires real feedback.',
    color: 'wave',
  },
  {
    title: 'Accessible Excellence',
    description:
      'Quality business guidance should not be reserved for those with connections. We make it accessible.',
    color: 'leaf',
  },
  {
    title: 'Community Growth',
    description:
      'When one Jamaican entrepreneur succeeds, it creates opportunities for others. We build together.',
    color: 'wave',
  },
  {
    title: 'Continuous Evolution',
    description:
      'The business landscape changes. We continuously update our frameworks based on what works.',
    color: 'leaf',
  },
];

export function AboutValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="secondary">
      <SectionHeader
        title="Our Values"
        subtitle="The principles that guide everything we do"
      />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="rounded-2xl p-6 transition-all duration-300"
            style={{
              backgroundColor: 'rgb(var(--color-bg-elevated))',
              border: '1px solid rgb(var(--color-border-primary))',
            }}
          >
            <h3 className="font-semibold mb-3" style={{ color: 'rgb(var(--color-text-primary))' }}>{value.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>{value.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
