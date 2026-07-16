'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Globe, Gift } from 'lucide-react';

const SIMPLE_EXAMPLES = [
  { name: 'Skeng', url: 'https://skengdon.com' },
  { name: 'Skatta Burrell', url: 'https://skattaburrell.com' },
  { name: 'MindWave JA', url: 'https://mindwaveja.com' },
];

const COMPLEX_EXAMPLES = [
  { name: 'Chronic Law', url: 'https://chroniclawmusic.com' },
  { name: 'Tarrus Riley', url: 'https://tarrusrileyja.com' },
  { name: 'Mavado', url: 'https://mavadogullyside.com' },
];

const SHARED_FEATURES = [
  'Hosted on MindWave VPS (Docker + Nginx)',
  '50 content updates per month',
  'SSL certificate + custom domain routing',
  'Domain ownership after 12 consecutive payments',
];

const SIMPLE_FEATURES = [
  'Single-page mobile-first site',
  'Music links + merch section',
  'Social media integration',
  'Basic interest capture',
];

const COMPLEX_FEATURES = [
  'Multi-page artist territory',
  'Pre-order capture + fan database',
  'Full product catalog',
  'Artist DNA — story, discography, press',
  'Advanced SEO + sitemap',
];

function ExampleSites({ sites }: { sites: typeof SIMPLE_EXAMPLES }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {sites.map((site) => (
        <a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-charcoal-700 text-charcoal-300 hover:border-wave-500 hover:text-wave-400 transition-colors"
        >
          <Globe size={11} />
          {site.name}
        </a>
      ))}
    </div>
  );
}

export function ADTLPricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-charcoal-900">
      <div className="absolute inset-0 bg-gradient-to-br from-wave-500/5 via-transparent to-leaf-400/5" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs tracking-[0.25em] uppercase text-wave-400 mb-3">
            Artist Digital Territory License
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-100 mb-4">
            Your artist deserves a home.
          </h2>
          <p className="text-charcoal-300 text-lg max-w-2xl mx-auto">
            Not a link-in-bio. Not a SoundCloud. A sovereign territory — hosted, maintained, and growing
            every month. Pay for 12 months, own the domain outright.
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Simple Tier */}
          <motion.div
            className="relative rounded-2xl border border-charcoal-700 bg-charcoal-900/80 p-8 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-charcoal-400 mb-2">Simple Site</p>
            <div className="flex items-end gap-2 mb-1">
              <span className="font-display text-4xl font-bold text-cream-100">$123</span>
              <span className="text-charcoal-400 mb-1.5">/ month</span>
            </div>
            <p className="text-sm text-charcoal-400 mb-6">~JMD 19,700 at current rate</p>

            <ul className="space-y-3 mb-6">
              {[...SIMPLE_FEATURES, ...SHARED_FEATURES].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-charcoal-200">
                  <Check size={15} className="text-leaf-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <p className="text-xs text-charcoal-500 uppercase tracking-widest mb-2">Live examples</p>
              <ExampleSites sites={SIMPLE_EXAMPLES} />
            </div>
          </motion.div>

          {/* Complex Tier */}
          <motion.div
            className="relative rounded-2xl border border-wave-500/40 bg-charcoal-900/80 p-8 flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {/* Popular badge */}
            <div className="absolute -top-3.5 left-8">
              <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-wave-500 text-white font-medium">
                Full Territory
              </span>
            </div>

            <p className="text-xs tracking-[0.2em] uppercase text-wave-400 mb-2">Complex Site</p>
            <div className="flex items-end gap-2 mb-1">
              <span className="font-display text-4xl font-bold text-cream-100">$321</span>
              <span className="text-charcoal-400 mb-1.5">/ month</span>
            </div>
            <p className="text-sm text-charcoal-400 mb-6">~JMD 51,400 at current rate</p>

            <ul className="space-y-3 mb-6">
              {[...COMPLEX_FEATURES, ...SHARED_FEATURES].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-charcoal-200">
                  <Check size={15} className="text-wave-400 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <p className="text-xs text-charcoal-500 uppercase tracking-widest mb-2">Live examples</p>
              <ExampleSites sites={COMPLEX_EXAMPLES} />
            </div>
          </motion.div>
        </div>

        {/* Refer-6 Merch Hook */}
        <motion.div
          className="mt-10 rounded-2xl border border-leaf-400/25 bg-leaf-400/5 p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="shrink-0 h-12 w-12 rounded-full border border-leaf-400/40 bg-leaf-400/10 flex items-center justify-center">
            <Gift size={22} className="text-leaf-400" />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-cream-100 mb-1">
              Refer 6 artists — get free merch designs.
            </p>
            <p className="text-sm text-charcoal-300">
              Bring in 6 active subscriptions on any tier and MindWave JA covers a full merch design
              package for you — yours to print, sell, and own. No expiry, no catch.
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <a
            href="/intake"
            className="inline-flex items-center gap-2 rounded-full bg-wave-500 hover:bg-wave-600 px-8 py-3.5 text-sm tracking-[0.12em] uppercase text-white font-medium transition-colors"
          >
            Claim Your Territory
          </a>
          <p className="mt-4 text-xs text-charcoal-500">
            Monthly subscription · Cancel anytime · Domain yours after year one
          </p>
        </motion.div>
      </div>
    </section>
  );
}
