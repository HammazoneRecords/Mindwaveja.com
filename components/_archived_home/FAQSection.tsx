'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader } from '../Section';
import faqs from '@/content/faqs.json';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const displayedFaqs = faqs.faqs.slice(0, 6);

  return (
    <Section id="faq" background="secondary">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Common questions about working with MindWave Jamaica"
      />

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {displayedFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-charcoal-100 rounded-2xl overflow-hidden shadow-soft"
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-cream-50 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <span className="text-charcoal-900 font-medium pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-wave-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-charcoal-600 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
