'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '../Badge';
import { PackContentRenderer } from './PackContentRenderer';
import { PackTOC } from './PackTOC';
import type { PhasePack } from '@/lib/types';
import type { CanonFile } from '@/lib/pack-content';
import { formatCapitalRange, getSkillLevelColor } from '@/utils/format';

interface PhasePackDetailProps {
  pack: PhasePack;
  content: CanonFile[];
}

export function PhasePackDetail({ pack, content }: PhasePackDetailProps) {
  const [ruralMode, setRuralMode] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/50 to-navy-900" />
        <div className="absolute inset-0 wave-gradient opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/phase-packs"
                className="text-fog-500 hover:text-wave-400 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Phase Packs
              </Link>
            </nav>

            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="wave" size="md">{pack.category}</Badge>
              <span className={`text-sm font-medium ${getSkillLevelColor(pack.skillLevel)}`}>
                {pack.skillLevel}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fog-50 mb-4 leading-tight">
              {pack.name}
            </h1>

            <p className="text-lg text-fog-300 mb-8 max-w-2xl">
              {pack.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4">
                <span className="text-fog-500 text-xs uppercase tracking-wide block mb-1">Capital Needed</span>
                <span className="text-fog-100 font-semibold text-sm sm:text-base">
                  {formatCapitalRange(pack.capitalRange.min, pack.capitalRange.max, pack.capitalRange.currency)}
                </span>
              </div>
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4">
                <span className="text-fog-500 text-xs uppercase tracking-wide block mb-1">Time to First Sale</span>
                <span className="text-fog-100 font-semibold text-sm sm:text-base">{pack.timeToFirstSale}</span>
              </div>
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4">
                <span className="text-fog-500 text-xs uppercase tracking-wide block mb-1">Skill Level</span>
                <span className={`font-semibold text-sm sm:text-base ${getSkillLevelColor(pack.skillLevel)}`}>{pack.skillLevel}</span>
              </div>
            </div>

            {/* Rural context toggle */}
            {pack.ruralVariant && (
              <div className="mt-6">
                <button
                  onClick={() => setRuralMode(v => !v)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    ruralMode
                      ? 'bg-leaf-500/20 text-leaf-300 border-leaf-500/50 shadow-[0_0_12px_rgba(132,204,22,0.2)]'
                      : 'bg-navy-800/60 text-fog-400 border-navy-600 hover:border-leaf-500/40 hover:text-leaf-400'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {ruralMode ? 'Showing: Rural Context' : 'Switch to Rural Context'}
                </button>
                {ruralMode && (
                  <p className="text-xs text-leaf-500/70 mt-2 ml-1">
                    Showing parish-specific guidance for rural operators
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content + TOC */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: 'rgb(var(--color-bg-primary))' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-10 lg:gap-12">
            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <PackContentRenderer files={content} />
            </div>

            {/* TOC — handles both desktop sidebar + mobile drawer internally */}
            <PackTOC files={content} />
          </div>
        </div>
      </section>
    </>
  );
}
