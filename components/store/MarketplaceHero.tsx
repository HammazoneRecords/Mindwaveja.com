'use client';

import { motion } from 'framer-motion';

export function MarketplaceHero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-bg-primary" />
      <div className="absolute inset-0 wave-gradient opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-red text-[0.9375rem] font-medium tracking-wider uppercase mb-4">
            Resource Marketplace
          </p>

          <h1 className="font-display text-[2.625rem] sm:text-[3.1875rem] lg:text-[3.875rem] font-bold text-primary dark:text-text-primary mb-6 leading-tight">
            Tools for Growth
          </h1>

          <p className="text-[1.1875rem] sm:text-[1.3125rem] text-secondary dark:text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Templates, guides, and resources designed specifically for 
            Jamaican entrepreneurs. Practical tools you can use immediately.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
