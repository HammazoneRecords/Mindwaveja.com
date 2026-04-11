'use client';

import { useState, useMemo } from 'react';
import { Section } from '../Section';
import { PackCard } from '../PackCard';
import { PackFiltersComponent, PackFilters } from './PackFilters';
import { applyFilters, sortPacks } from '@/utils/packFilters';
import phasePacks from '@/content/phasePacks.json';
import type { PhasePack } from '@/lib/types';

type SortOption = 'name' | 'capital' | 'demand' | 'speed';

export function PhasePacksGrid() {
  const [filters, setFilters] = useState<PackFilters>({
    capitalRange: 'all',
    timeline: 'all',
    skillLevel: 'all',
    category: 'all',
    search: '',
  });
  const [sortBy, setSortBy] = useState<SortOption>('demand');

  const allPacks = phasePacks.phasePacks as PhasePack[];

  const filteredAndSortedPacks = useMemo(() => {
    const filtered = applyFilters(allPacks, filters);
    return sortPacks(filtered, sortBy);
  }, [allPacks, filters, sortBy]);

  return (
    <Section background="default" animate={false}>
      {/* Filters */}
      <PackFiltersComponent
        filters={filters}
        onFilterChange={setFilters}
        packCount={filteredAndSortedPacks.length}
      />

      {/* Sort Options */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-secondary text-sm">
          Showing {filteredAndSortedPacks.length} of {allPacks.length} phase packs
        </p>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm text-secondary font-medium">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 rounded-xl border border-primary bg-primary text-primary focus:ring-2 focus:ring-brand-red transition-colors"
          >
            <option value="name">Name (A-Z)</option>
            <option value="capital">Lowest Capital</option>
            <option value="demand">Highest Demand</option>
            <option value="speed">Fastest to Start</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredAndSortedPacks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAndSortedPacks.map((pack, index) => (
            <PackCard key={pack.slug} pack={pack} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-tertiary text-lg mb-4">No phase packs found matching your criteria.</p>
          <button
            type="button"
            onClick={() => setFilters({
              capitalRange: 'all',
              timeline: 'all',
              skillLevel: 'all',
              category: 'all',
              search: '',
            })}
            className="text-brand-red hover:text-brand-red/80 transition-colors font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </Section>
  );
}
