'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '../Section';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { WiPayPackButton } from '../WiPayButton';
import { PackCard } from '../PackCard';
import type { PhasePack } from '@/lib/types';
import { formatCapitalRange, getSkillLevelColor } from '@/utils/format';
import { getEnhancedLadder, getAvailableNextPacks, getResearchPaths, getCategoryStage } from '@/utils/enhancedLadder';
import phasePacks from '@/content/phasePacks.json';

interface PhasePackDetailProps {
  pack: PhasePack;
}

export function PhasePackDetail({ pack }: PhasePackDetailProps) {
  // Get recommended next packs from enhanced ladder
  const enhancedLadder = getEnhancedLadder(pack.slug);
  const nextPacks = enhancedLadder 
    ? getAvailableNextPacks(pack.slug)
    : (pack.packLadder?.nextPacks
        ? (phasePacks.phasePacks as PhasePack[]).filter(p =>
            pack.packLadder?.nextPacks.includes(p.id)
          )
        : []);
  const researchPaths = getResearchPaths(pack.slug);
  const categoryStage = getCategoryStage(pack.slug);

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

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-fog-50 mb-4">
              {pack.name}
            </h1>

            <p className="text-lg text-fog-300 mb-8 max-w-2xl">
              {pack.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4">
                <span className="text-fog-500 text-xs uppercase tracking-wide block mb-1">Capital Needed</span>
                <span className="text-fog-100 font-semibold">
                  {formatCapitalRange(pack.capitalRange.min, pack.capitalRange.max, pack.capitalRange.currency)}
                </span>
              </div>
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4">
                <span className="text-fog-500 text-xs uppercase tracking-wide block mb-1">Time to First Sale</span>
                <span className="text-fog-100 font-semibold">{pack.timeToFirstSale}</span>
              </div>
              <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-4 col-span-2 sm:col-span-1">
                <span className="text-fog-500 text-xs uppercase tracking-wide block mb-1">Skill Level</span>
                <span className={`font-semibold ${getSkillLevelColor(pack.skillLevel)}`}>{pack.skillLevel}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-sm">
              {pack.price === 0 ? (
                <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm bg-leaf-500/20 text-leaf-400 border border-leaf-500/30">
                  Free Pack
                </span>
              ) : (
                <WiPayPackButton packPrice={pack.price ?? 1450} />
              )}
              <Button
                href={`/intake?pack=${pack.slug}`}
                variant="outline"
                size="lg"
              >
                Request Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pack Score Panel */}
      {pack.packScore && (
        <Section background="default">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900 mb-8 text-center">
              Pack Performance Scores
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <ScoreCard
                title="Market Demand"
                score={pack.packScore.demandScore}
                description="How much people need this"
                icon="📈"
              />
              <ScoreCard
                title="Capital Ease"
                score={6 - pack.packScore.capitalDifficulty}
                description="How affordable to start"
                icon="💰"
                inverted
              />
              <ScoreCard
                title="Speed to Sale"
                score={pack.packScore.timeToFirstSale}
                description="How fast you can earn"
                icon="⚡"
              />
              <ScoreCard
                title="Skill Ease"
                score={6 - pack.packScore.skillRequired}
                description="How easy to learn"
                icon="🎯"
                inverted
              />
            </div>
            {pack.packIndex && pack.packIndex.recommendedFor && (
              <div className="mt-8 text-center">
                <p className="text-sm text-charcoal-600 mb-3">Best for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {pack.packIndex.recommendedFor.map((tag) => (
                    <Badge key={tag} variant="leaf" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* Phase Pack Anatomy */}
      <Section background="default">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 1. What This Is */}
          <AnatomySection number={1} title="What This Is">
            <p className="text-fog-300 leading-relaxed">{pack.whatThisIs}</p>
          </AnatomySection>

          {/* 2. What You Need */}
          <AnatomySection number={2} title="What You Need">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pack.whatYouNeed.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-fog-300">
                  <svg className="w-5 h-5 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </AnatomySection>

          {/* 3. First 7 Actions */}
          <AnatomySection number={3} title="First 7 Actions">
            <ol className="space-y-4">
              {pack.firstSevenActions.map((action, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-wave-600/20 text-wave-400 rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-fog-300 pt-1">{action}</span>
                </li>
              ))}
            </ol>
          </AnatomySection>

          {/* 4. Waiting Time Tasks */}
          <AnatomySection number={4} title="Waiting-Time Tasks">
            <p className="text-fog-500 text-sm mb-4">Things to do while waiting for supplies, responses, or between clients:</p>
            <ul className="space-y-2">
              {pack.waitingTimeTasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-fog-300">
                  <svg className="w-4 h-4 text-fog-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {task}
                </li>
              ))}
            </ul>
          </AnatomySection>

          {/* 5. Starter Folder */}
          <AnatomySection number={5} title="Starter Folder Contents">
            <div className="bg-navy-800/50 border border-navy-700 rounded-2xl p-6">
              <p className="text-fog-500 text-sm mb-4">Your Phase Pack includes these ready-to-use resources:</p>
              <ul className="space-y-2">
                {pack.starterFolderContents.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-fog-300">
                    <svg className="w-4 h-4 text-wave-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-navy-600">
                <Button variant="secondary" size="sm" disabled>
                  Download Starter Folder (Available after purchase)
                </Button>
              </div>
            </div>
          </AnatomySection>

          {/* 6. Value-Add Menu */}
          <AnatomySection number={6} title="Value-Add Menu">
            <p className="text-fog-500 text-sm mb-4">Additional services to increase revenue per customer:</p>
            <ul className="space-y-2">
              {pack.valueAddMenu.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-fog-300">
                  <svg className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </AnatomySection>

          {/* 7. Sales Mode */}
          <AnatomySection number={7} title="Sales Mode">
            <p className="text-fog-300 leading-relaxed">{pack.salesMode}</p>
          </AnatomySection>

          {/* 8. Daily Minimum */}
          <AnatomySection number={8} title="Daily Minimum Target">
            <div className="bg-wave-600/10 border border-wave-600/30 rounded-2xl p-6">
              <p className="text-fog-100 leading-relaxed">{pack.dailyMinimum}</p>
            </div>
          </AnatomySection>

          {/* 9. Common Failure Points */}
          <AnatomySection number={9} title="Common Failure Points">
            <p className="text-fog-500 text-sm mb-4">Avoid these common mistakes:</p>
            <ul className="space-y-2">
              {pack.commonFailurePoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-fog-300">
                  <svg className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </AnatomySection>

          {/* 10. Exit/Expand Paths */}
          <AnatomySection number={10} title="Exit / Expand Paths">
            <p className="text-fog-500 text-sm mb-4">Where this business can take you:</p>
            <ul className="space-y-2">
              {pack.exitExpandPaths.map((path, i) => (
                <li key={i} className="flex items-start gap-2 text-fog-300">
                  <svg className="w-4 h-4 text-wave-500 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  {path}
                </li>
              ))}
            </ul>
          </AnatomySection>
        </div>
      </Section>

      {/* Category Stage Badge */}
      {enhancedLadder && (
        <Section background="default">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-navy-800/50 border border-navy-700 rounded-full px-6 py-3">
              <span className="text-wave-400 text-lg">🎯</span>
              <span className="text-fog-300">
                <span className="text-fog-100 font-semibold capitalize">{categoryStage}</span>
                {' '}Level • {enhancedLadder.progressionType} Progression
              </span>
            </div>
          </div>
        </Section>
      )}

      {/* Research Paths */}
      {researchPaths.length > 0 && (
        <Section background="default">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900 mb-8 text-center">
              Research & Expansion Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {researchPaths.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-navy-800/30 border border-navy-700 rounded-2xl p-6 hover:border-wave-500/50 transition-colors"
                >
                  <div className="text-2xl mb-3">
                    {path.direction.includes('Restaurant') ? '🍽️' :
                     path.direction.includes('Manufacturing') ? '🏭' :
                     path.direction.includes('Export') ? '🚢' :
                     path.direction.includes('Franchise') ? '🏪' :
                     path.direction.includes('B2B') ? '🤝' :
                     path.direction.includes('Facility') ? '🏢' :
                     path.direction.includes('Scale') ? '📈' : '🔬'}
                  </div>
                  <h3 className="font-semibold text-fog-100 mb-2">{path.direction}</h3>
                  <p className="text-sm text-fog-400">{path.researchPrompt}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Recommended Next Packs */}
      {nextPacks.length > 0 && (
        <Section background="default">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal-900 mb-3">
                What's Next?
              </h2>
              <p className="text-charcoal-600 max-w-2xl mx-auto">
                {enhancedLadder 
                  ? `Scale your business with these ${categoryStage === 'entry' ? 'mid-level' : categoryStage === 'mid' ? 'advanced' : 'expansion'} opportunities`
                  : pack.packLadder?.reason}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nextPacks.map((nextPack, index) => {
                const nextLadder = enhancedLadder?.availableNext?.find(n => n.slug === nextPack.slug);
                return (
                  <div key={nextPack.id} className="relative">
                    {nextLadder && (
                      <div className="absolute -top-3 left-4 z-10">
                        <Badge variant="wave" size="sm">
                          {nextLadder.relationship}
                        </Badge>
                      </div>
                    )}
                    <PackCard pack={nextPack} index={index} />
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-navy-900 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-50 mb-4">
            Ready to Start?
          </h2>
          <p className="text-fog-300 mb-8 max-w-xl mx-auto">
            Get the complete {pack.name} Phase Pack with all resources, templates, and step-by-step guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {pack.price === 0 ? (
              <span className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-sm bg-leaf-500/20 text-leaf-400 border border-leaf-500/30">
                Free Pack — No Payment Needed
              </span>
            ) : (
              <WiPayPackButton packPrice={pack.price ?? 1450} className="sm:w-auto min-w-[220px]" />
            )}
            <Button href="/phase-packs" variant="ghost" size="lg">
              Browse Other Packs
            </Button>
          </div>
        </div>
      </section>

    </>
  );
}

// Score Card Component
function ScoreCard({
  title,
  score,
  description,
  icon,
  inverted = false
}: {
  title: string;
  score: number;
  description: string;
  icon: string;
  inverted?: boolean;
}) {
  const displayScore = inverted ? score : score;
  const percentage = (displayScore / 5) * 100;

  return (
    <div className="bg-white border border-charcoal-200 rounded-2xl p-6 text-center">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-charcoal-900 mb-2">{title}</h3>
      <div className="mb-3">
        <div className="text-3xl font-bold text-wave-600">{displayScore}/5</div>
      </div>
      <div className="w-full bg-charcoal-100 rounded-full h-2 mb-3">
        <div
          className="bg-gradient-to-r from-wave-500 to-leaf-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-charcoal-600">{description}</p>
    </div>
  );
}

function AnatomySection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="flex-shrink-0 w-10 h-10 bg-navy-700 text-wave-400 rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-fog-50">
          {title}
        </h2>
      </div>
      <div className="pl-14">{children}</div>
    </motion.div>
  );
}
