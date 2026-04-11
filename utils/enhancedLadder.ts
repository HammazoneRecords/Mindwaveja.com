import enhancedPackLadders from '@/content/enhanced_pack_ladders.json';
import type { EnhancedPackLaddersMap, EnhancedPackLadder, PhasePack } from '@/lib/types';
import phasePacksData from '@/content/phasePacks.json';

// Cast the imported JSON to the correct type
export const enhancedLadders: EnhancedPackLaddersMap = enhancedPackLadders as EnhancedPackLaddersMap;

/**
 * Get enhanced ladder data for a pack by its slug
 */
export function getEnhancedLadder(slug: string): EnhancedPackLadder | null {
  return enhancedLadders[slug] || null;
}

/**
 * Check if a pack has enhanced ladder data
 */
export function hasEnhancedLadder(slug: string): boolean {
  return slug in enhancedLadders;
}

/**
 * Get all available next packs with full details
 */
export function getAvailableNextPacks(slug: string): PhasePack[] {
  const ladder = getEnhancedLadder(slug);
  if (!ladder || !ladder.availableNext) return [];

  const phasePacks = phasePacksData.phasePacks as PhasePack[];

  return ladder.availableNext
    .filter(next => next.available)
    .map(next => phasePacks.find(p => p.slug === next.slug))
    .filter((p): p is PhasePack => p !== undefined);
}

/**
 * Get research paths for a pack
 */
export function getResearchPaths(slug: string) {
  const ladder = getEnhancedLadder(slug);
  return ladder?.researchPaths || [];
}

/**
 * Get category stage (entry/mid/advanced/independent)
 */
export function getCategoryStage(slug: string): string {
  const ladder = getEnhancedLadder(slug);
  return ladder?.categoryStage || 'entry';
}

/**
 * Get progression type
 */
export function getProgressionType(slug: string): string {
  const ladder = getEnhancedLadder(slug);
  return ladder?.progressionType || 'general';
}

/**
 * Get vertical progression path
 */
export function getVerticalProgression(slug: string): string | undefined {
  const ladder = getEnhancedLadder(slug);
  return ladder?.verticalProgression;
}

/**
 * Get all packs at a specific stage
 */
export function getPacksByStage(stage: 'entry' | 'mid' | 'advanced' | 'independent'): string[] {
  return Object.entries(enhancedLadders)
    .filter(([_, ladder]) => ladder.categoryStage === stage)
    .map(([slug, _]) => slug);
}

/**
 * Get all packs by progression type
 */
export function getPacksByType(type: string): string[] {
  return Object.entries(enhancedLadders)
    .filter(([_, ladder]) => ladder.progressionType === type)
    .map(([slug, _]) => slug);
}

export default enhancedLadders;
