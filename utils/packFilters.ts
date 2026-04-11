import { PhasePack } from '@/lib/types';
import { PackFilters } from '@/components/phase-packs/PackFilters';

/**
 * Filter packs based on capital range
 */
export function filterByCapital(pack: PhasePack, range: PackFilters['capitalRange']): boolean {
    if (range === 'all') return true;

    const max = pack.capitalRange?.max ?? 0;

    switch (range) {
        case 'micro':
            return max < 50000;
        case 'small':
            return max >= 50000 && max < 100000;
        case 'medium':
            return max >= 100000 && max < 200000;
        case 'large':
            return max >= 200000;
        default:
            return true;
    }
}

/**
 * Filter packs based on timeline to first sale
 */
export function filterByTimeline(pack: PhasePack, timeline: PackFilters['timeline']): boolean {
    if (timeline === 'all') return true;

    const timeStr = (pack.timeToFirstSale || '').toLowerCase();

    switch (timeline) {
        case 'quick':
            // 1-7 days
            return timeStr.includes('day') && !timeStr.includes('week') && !timeStr.includes('month');
        case 'fast':
            // 1-4 weeks
            return timeStr.includes('week') || (timeStr.includes('day') && parseInt(timeStr) > 7);
        case 'standard':
            // 1-3 months
            return timeStr.includes('month') && !timeStr.includes('+');
        case 'long':
            // 3+ months
            return timeStr.includes('+') || (timeStr.includes('month') && parseInt(timeStr) >= 3);
        default:
            return true;
    }
}

/**
 * Filter packs based on skill level
 */
export function filterBySkillLevel(pack: PhasePack, level: PackFilters['skillLevel']): boolean {
    if (level === 'all') return true;
    return (pack.skillLevel || '') === level;
}

/**
 * Filter packs based on category
 */
export function filterByCategory(pack: PhasePack, category: PackFilters['category']): boolean {
    if (category === 'all') return true;
    return (pack.category || '') === category;
}

/**
 * Filter packs based on search query
 */
export function filterBySearch(pack: PhasePack, search: string): boolean {
    if (!search) return true;

    const query = search.toLowerCase();
    return (
        (pack.name || '').toLowerCase().includes(query) ||
        (pack.description || '').toLowerCase().includes(query) ||
        (pack.category || '').toLowerCase().includes(query)
    );
}

/**
 * Apply all filters to a list of packs
 */
export function applyFilters(packs: PhasePack[], filters: PackFilters): PhasePack[] {
    return packs.filter(pack =>
        filterByCapital(pack, filters.capitalRange) &&
        filterByTimeline(pack, filters.timeline) &&
        filterBySkillLevel(pack, filters.skillLevel) &&
        filterByCategory(pack, filters.category) &&
        filterBySearch(pack, filters.search)
    );
}

/**
 * Sort packs by various criteria
 */
export function sortPacks(packs: PhasePack[], sortBy: 'name' | 'capital' | 'demand' | 'speed'): PhasePack[] { const sorted = [...packs]; switch (sortBy) { case 'name': return sorted.sort((a, b) => a.name.localeCompare(b.name)); case 'capital': return sorted.sort((a, b) => a.capitalRange.min - b.capitalRange.min); case 'demand': return sorted.sort((a, b) => (b.packScore?.demandScore ?? 0) - (a.packScore?.demandScore ?? 0)); case 'speed': return sorted.sort((a, b) => (b.packScore?.timeToFirstSale ?? 0) - (a.packScore?.timeToFirstSale ?? 0)); default: return sorted; } }