'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';
import { Button } from '../Button';

const contactMethods = [
  {
    title: 'Start a Project',
    description: 'Ready to work with us? Start with our intake form.',
    action: 'Start Your Idea',
    href: '/intake',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'General Inquiries',
    description: 'Questions about our services or how we can help.',
    action: 'hello@mindwaveja.com',
    href: 'mailto:hello@mindwaveja.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'WhatsApp',
    description: 'Quick questions or prefer messaging.',
    action: '+1 876 XXX XXXX',
    href: '#',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export function ContactInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="default">
      <div ref={ref} className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-navy-800/50 border border-navy-700 rounded-3xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-wave-600/20 rounded-2xl text-wave-400 mb-4">
                {method.icon}
              </div>
              <h3 className="text-fog-100 font-semibold mb-2">{method.title}</h3>
              <p className="text-fog-400 text-sm mb-4">{method.description}</p>
              <a
                href={method.href}
                className="text-wave-400 hover:text-wave-300 text-sm font-medium transition-colors"
              >
                {method.action}
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-navy-800/30 border border-navy-700 rounded-3xl p-8 text-center"
        >
          <h3 className="text-xl font-display font-bold text-fog-50 mb-3">
            Have a Common Question?
          </h3>
          <p className="text-fog-400 mb-6">
            Check our FAQ section for quick answers to frequently asked questions.
          </p>
          <Button href="/#faq" variant="outline">
            View FAQ
          </Button>
        </motion.div>

        {/* Response Time Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center text-fog-500 text-sm mt-8"
        >
          We typically respond within 24-48 hours during business days.
        </motion.p>
      </div>
    </Section>
  );
}
