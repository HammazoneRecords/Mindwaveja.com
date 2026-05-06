'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

const systems = [
  {
    id: 'tech-evolution',
    title: 'Tech Evolution',
    description: 'A journey of accelerating change — from prehistoric stone tools to the Fourth Industrial Revolution. Explore the S-curve innovation model and technological acceleration across 5 major eras.',
    href: '/systems/tech-evolution',
    icon: Zap,
    status: 'live',
  },
  {
    id: 'growth-story-models',
    title: 'Growth Story Models',
    description: 'A cosmic visualization of communication technology evolution. Watch interactive planets representing communication eras orbit in a living solar system.',
    href: '#',
    status: 'coming-soon',
  },
  {
    id: 'tech-era-timelines',
    title: 'OvaForge',
    description: 'Your complete intellectual universe mapped as an interactive mind map. Explore core concepts, applications, philosophy, and the Solobic framework.',
    href: '#',
    status: 'coming-soon',
  },
];

export default function SystemsPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-center mb-4">
          Systems
        </h1>
        <p className="text-lg text-[rgb(var(--color-text-secondary))] text-center max-w-3xl mx-auto">
          Interactive explorations of evolution, innovation, and knowledge systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {systems.map((system, i) => {
          const Icon = system.icon;
          const isLive = system.status === 'live';

          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <Link
                href={system.href}
                className={`block h-full p-6 rounded-lg border transition-all duration-300 ${
                  isLive
                    ? 'bg-[rgb(var(--color-bg-tertiary)/0.8)] border-[rgb(var(--color-brand-green)/0.5)] hover:border-[rgb(var(--color-brand-green)/1)] hover:shadow-[0_0_20px_rgb(var(--color-brand-green)/0.3)] cursor-pointer'
                    : 'bg-[rgb(var(--color-bg-tertiary)/0.4)] border-[rgb(var(--color-text-tertiary)/0.2)] opacity-60 cursor-default'
                }`}
              >
                {Icon && (
                  <div className={`mb-4 text-3xl ${isLive ? 'text-[rgb(var(--color-brand-green))]' : 'text-[rgb(var(--color-text-secondary))]'}`}>
                    <Icon size={32} />
                  </div>
                )}

                <h2 className="text-xl font-bold font-headline mb-2 text-[rgb(var(--color-text-primary))]">
                  {system.title}
                </h2>

                <p className="text-sm text-[rgb(var(--color-text-secondary))] mb-4 leading-relaxed">
                  {system.description}
                </p>

                <div className="flex items-center justify-between">
                  {isLive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[rgb(var(--color-brand-green))]">
                      Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-[rgb(var(--color-brand-green)/0.15)] text-[rgb(var(--color-brand-green))] rounded">
                      Coming Soon
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}
