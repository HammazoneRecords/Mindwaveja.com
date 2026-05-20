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
      <span className="text-xs mb-1" style={{ color: 'rgb(var(--color-text-tertiary))' }}>{label}</span>
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
      className="group relative rounded-2xl p-4 transition-all duration-300 flex flex-col h-full overflow-hidden min-w-0"
      style={{
        backgroundColor: 'rgb(var(--color-bg-elevated))',
        border: '1px solid rgb(var(--color-border-primary))',
      }}
    >
      {/* Category Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="wave">{pack.category}</Badge>
          {pack.ruralVariant && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-leaf-500/15 text-leaf-400 border border-leaf-500/25">
              Rural Ready
            </span>
          )}
        </div>
        <span className={`text-sm font-medium ${getSkillLevelColor(pack.skillLevel)}`}>
          {pack.skillLevel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold mb-2 line-clamp-1 transition-colors" style={{ color: 'rgb(var(--color-text-primary))' }}>
        {pack.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-2 break-words overflow-hidden"
        style={{
          color: 'rgb(var(--color-text-secondary))',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
        }}
      >
        {pack.description}
      </p>

      {/* Pack Score Strip */}
      {pack.packScore && (
        <div 
          className="flex items-center gap-3 mb-4 pb-4 border-b dark:border-border-secondary"
          style={{ borderColor: 'rgb(var(--color-border-secondary))' }}
        >
          <ScoreIndicator label="Demand" score={pack.packScore.demandScore} />
          {pack.packScore.capitalDifficulty != null && (
            <ScoreIndicator label="Capital" score={6 - pack.packScore.capitalDifficulty} inverted />
          )}
          <ScoreIndicator label="Speed" score={pack.packScore.timeToFirstSale} />
          {pack.packScore.skillRequired != null && (
            <ScoreIndicator label="Skill" score={6 - pack.packScore.skillRequired} inverted />
          )}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wide" style={{ color: 'rgb(var(--color-text-tertiary))' }}>Capital</span>
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--color-text-primary))' }}>
            {formatCapitalRange(pack.capitalRange.min, pack.capitalRange.max, pack.capitalRange.currency)}
          </p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-wide" style={{ color: 'rgb(var(--color-text-tertiary))' }}>First Sale</span>
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--color-text-primary))' }}>{pack.timeToFirstSale}</p>
        </div>
      </div>

      {/* First 7 Actions Teaser */}
      <div className="mb-4 flex-1">
        <span className="text-xs uppercase tracking-wide mb-2 block" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
          First 7 Actions Preview
        </span>
        <ul className="space-y-1">
          {pack.firstSevenActions.slice(0, 3).map((action, i) => {
            const truncated = action.length > 60 ? action.slice(0, 60).trimEnd() + '…' : action;
            return (
              <li key={i} className="text-sm flex items-start gap-2 min-w-0" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                <span className="mt-1 flex-shrink-0" style={{ color: 'rgb(var(--color-brand-red))' }}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="flex-1 min-w-0 truncate block">{truncated}</span>
              </li>
            );
          })}
          <li className="text-brand-red dark:text-brand-red text-sm">+ {pack.firstSevenActions.length - 3} more actions</li>
        </ul>
      </div>

      {/* CTA */}
      <Link
        href={`/phase-packs/${pack.slug}`}
        className="block mt-auto"
      >
        <Button variant="outline" className="w-full" size="sm">
          View Full Pack
        </Button>
      </Link>
    </motion.article>
  );
}
