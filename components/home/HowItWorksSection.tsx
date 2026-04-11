'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, SectionHeader } from '../Section';

const steps = [
  {
    number: '01',
    title: 'Idea',
    description: 'You have a concept, a vision, a spark of something that could be more.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'wave',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'We refine your idea into a clear, actionable plan with defined steps.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    color: 'mixed',
  },
  {
    number: '03',
    title: 'Business',
    description: 'Your plan becomes operational with systems, structure, and first sales.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'mixed',
  },
  {
    number: '04',
    title: 'Scale',
    description: 'Growth strategies, funding prep, and expansion into new markets.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'leaf',
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="secondary" id="how-it-works">
      <SectionHeader
        title="How It Works"
        subtitle="A clear path from concept to operating business"
      />

      <div ref={ref} className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-charcoal-200 to-transparent -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-white dark:bg-bg-tertiary border border-charcoal-100 dark:border-border-primary rounded-3xl p-6 text-center hover:border-wave-300 dark:hover:border-brand-red hover:shadow-glow-red transition-all shadow-soft">
                {/* Step Number */}
                <div className={`text-[3.0625rem] font-bold font-display mb-4 ${
                  step.color === 'wave' ? 'text-wave-200 dark:text-brand-red' : 
                  step.color === 'leaf' ? 'text-leaf-200 dark:text-brand-green' : 'text-gradient opacity-30 dark:opacity-40'
                }`}>
                  {step.number}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  step.color === 'wave' ? 'bg-wave-50 dark:bg-brand-red/10 text-wave-500 dark:text-brand-red' : 
                  step.color === 'leaf' ? 'bg-leaf-50 dark:bg-brand-green/10 text-leaf-500 dark:text-brand-green' : 'bg-gradient-to-br from-wave-50 to-leaf-50 dark:from-brand-red/10 dark:to-brand-green/10 text-charcoal-700 dark:text-primary'
                }`}>
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-[1.375rem] font-semibold text-charcoal-900 dark:text-primary mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-charcoal-600 dark:text-secondary text-[0.9375rem] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <svg
                    className="w-4 h-4 text-charcoal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
