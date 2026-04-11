'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, SectionHeader } from '../Section';

const features = [
  {
    title: 'Idea Refinement Lab',
    description: 'Transform vague concepts into validated business ideas. We help you identify your unique angle, target market, and competitive advantage.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    color: 'wave',
  },
  {
    title: 'Business Structure Engine',
    description: 'Get the operational framework your business needs. From pricing models to workflow systems, we build the backbone of your venture.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    color: 'leaf',
  },
  {
    title: 'Funding Prep Guides',
    description: 'Whether you need JMD 50,000 or JMD 5,000,000, we prepare you for the conversation. Pitch decks, financial projections, and investor readiness.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'leaf',
  },
  {
    title: 'Mentorship + Coaching',
    description: 'Regular check-ins, problem-solving sessions, and access to experienced entrepreneurs who understand the Jamaican business landscape.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'wave',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="default">
      <SectionHeader
        title="What We Offer"
        subtitle="Comprehensive support for every stage of your entrepreneurial journey"
      />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative bg-white dark:bg-bg-tertiary border border-charcoal-100 dark:border-border-primary rounded-3xl p-6 lg:p-8 transition-all duration-300 shadow-soft ${
              feature.color === 'wave' 
                ? 'hover:border-wave-300 dark:hover:border-brand-red hover:shadow-glow-red' 
                : 'hover:border-leaf-300 dark:hover:border-brand-green hover:shadow-glow-green'
            }`}
          >
            {/* Gradient Background on hover */}
            <div
              className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                feature.color === 'wave'
                  ? 'bg-gradient-to-br from-wave-50 to-transparent dark:from-brand-red/10'
                  : 'bg-gradient-to-br from-leaf-50 to-transparent dark:from-brand-green/10'
              }`}
            />

            <div className="relative">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-colors ${
                feature.color === 'wave'
                  ? 'bg-wave-50 text-wave-500 group-hover:bg-wave-100 dark:bg-brand-red/10 dark:text-brand-red dark:group-hover:bg-brand-red/20'
                  : 'bg-leaf-50 text-leaf-500 group-hover:bg-leaf-100 dark:bg-brand-green/10 dark:text-brand-green dark:group-hover:bg-brand-green/20'
              }`}>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-[1.375rem] font-semibold text-charcoal-900 dark:text-primary mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[1.0625rem] text-charcoal-600 dark:text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
