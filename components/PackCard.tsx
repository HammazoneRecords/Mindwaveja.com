'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';
import type { PhasePack } from '@/lib/types';
import { formatCapitalRange, getSkillLevelColor } from '@/utils/format';

interface PackCardProps {
  pack: PhasePack;
  index?: number;
}

// Score Indicator Component - Theme-aware
function ScoreIndicator({ label, score, inverted = false }: { label: string; score: number; inverted?: boolean }) {
  const displayScore = inverted ? score : score;
  const colorClass = displayScore >= 4 
    ? 'bg-brand-green' 
    : displayScore >= 3 
      ? 'bg-yellow-500' 
      : 'bg-tertiary';
  
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-tertiary dark:text-text-secondary mb-1">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-1.5 h-3 rounded-full transition-colors ${
              i <= displayScore ? colorClass : 'bg-secondary dark:bg-bg-tertiary'
            }`}
            style={i <= displayScore ? undefined : { 
              backgroundColor: 'rgb(var(--color-bg-tertiary))' 
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function PackCard({ pack, index = 0 }: PackCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative elevation-2 dark:bg-secondary rounded-3xl p-6 hover:glow-red transition-all duration-300 border border-primary dark:border-primary"
    >
      {/* Category Badge */}
      <div className="flex items-start justify-between mb-4">
        <Badge variant="wave">{pack.category}</Badge>
        <span className={`text-sm font-medium ${getSkillLevelColor(pack.skillLevel)}`}>
          {pack.skillLevel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-primary dark:text-text-primary mb-2 group-hover:text-brand-red transition-colors">
        {pack.name}
      </h3>

      {/* Description */}
      <p className="text-secondary dark:text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
        {pack.description}
      </p>

      {/* Pack Score Strip */}
      {pack.packScore && (
        <div 
          className="flex items-center gap-3 mb-4 pb-4 border-b dark:border-border-secondary"
          style={{ borderColor: 'rgb(var(--color-border-secondary))' }}
        >
          <ScoreIndicator label="Demand" score={pack.packScore.demandScore} />
          <ScoreIndicator label="Capital" score={6 - pack.packScore.capitalDifficulty} inverted />
          <ScoreIndicator label="Speed" score={pack.packScore.timeToFirstSale} />
          <ScoreIndicator label="Skill" score={6 - pack.packScore.skillRequired} inverted />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-tertiary dark:text-text-tertiary text-xs uppercase tracking-wide">Capital</span>
          <p className="text-primary dark:text-text-primary text-sm font-medium">
            {formatCapitalRange(pack.capitalRange.min, pack.capitalRange.max, pack.capitalRange.currency)}
          </p>
        </div>
        <div>
          <span className="text-tertiary dark:text-text-tertiary text-xs uppercase tracking-wide">First Sale</span>
          <p className="text-primary dark:text-text-primary text-sm font-medium">{pack.timeToFirstSale}</p>
        </div>
      </div>

      {/* First 7 Actions Teaser */}
      <div className="mb-6">
        <span className="text-tertiary dark:text-text-tertiary text-xs uppercase tracking-wide mb-2 block">
          First 7 Actions Preview
        </span>
        <ul className="space-y-1">
          {pack.firstSevenActions.slice(0, 3).map((action, i) => (
            <li key={i} className="text-secondary dark:text-text-secondary text-sm flex items-start gap-2">
              <span className="text-brand-green dark:text-brand-red mt-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="line-clamp-1">{action}</span>
            </li>
          ))}
          <li className="text-brand-red dark:text-brand-red text-sm">+ {pack.firstSevenActions.length - 3} more actions</li>
        </ul>
      </div>

      {/* CTA */}
      <Link
        href={`/phase-packs/${pack.slug}`}
        className="block"
      >
        <Button variant="outline" className="w-full" size="sm">
          View Full Pack
        </Button>
      </Link>
    </motion.article>
  );
}
