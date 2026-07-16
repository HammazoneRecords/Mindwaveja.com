'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { PackCategory, SkillLevel } from '@/lib/types';

export interface PackFilters {
    capitalRange: 'all' | 'micro' | 'small' | 'medium' | 'large';
    timeline: 'all' | 'quick' | 'fast' | 'standard' | 'long';
    skillLevel: 'all' | SkillLevel;
    category: 'all' | PackCategory;
    search: string;
}

interface PackFiltersProps {
    filters: PackFilters;
    onFilterChange: (filters: PackFilters) => void;
    packCount: number;
}

const selectClass = 'px-3 py-2 bg-primary border border-primary rounded-xl text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-red w-full max-w-full min-h-[44px]';

export function PackFiltersComponent({ filters, onFilterChange, packCount }: PackFiltersProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);

    const updateFilter = (key: keyof PackFilters, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    const hasActiveFilters =
        filters.capitalRange !== 'all' ||
        filters.timeline !== 'all' ||
        filters.skillLevel !== 'all' ||
        filters.category !== 'all' ||
        filters.search !== '';

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    const closeSearch = () => {
        setSearchOpen(false);
        updateFilter('search', '');
    };

    return (
        <div className="bg-secondary rounded-2xl px-5 py-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
                {/* Dropdowns */}
                <select value={filters.capitalRange} onChange={(e) => updateFilter('capitalRange', e.target.value)} className={selectClass}>
                    <option value="all">All Budgets</option>
                    <option value="micro">Under $50K JMD</option>
                    <option value="small">$50–100K JMD</option>
                    <option value="medium">$100–200K JMD</option>
                    <option value="large">$200K+ JMD</option>
                </select>

                <select value={filters.timeline} onChange={(e) => updateFilter('timeline', e.target.value)} className={selectClass}>
                    <option value="all">Any Timeline</option>
                    <option value="quick">Quick Start (1–7 days)</option>
                    <option value="fast">Fast Track (1–4 weeks)</option>
                    <option value="standard">Standard (1–3 months)</option>
                    <option value="long">Long Build (3+ months)</option>
                </select>

                <select value={filters.skillLevel} onChange={(e) => updateFilter('skillLevel', e.target.value)} className={selectClass}>
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <select value={filters.category} onChange={(e) => updateFilter('category', e.target.value)} className={selectClass}>
                    <option value="all">All Categories</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Food">Food</option>
                    <option value="Services">Services</option>
                    <option value="Digital">Digital</option>
                    <option value="Retail">Retail</option>
                    <option value="Events">Events</option>
                    <option value="Agriculture">Agriculture</option>
                </select>

                {/* Expanding search */}
                {searchOpen ? (
                    <div className="flex items-center gap-2 bg-primary border border-brand-red rounded-xl px-3 py-2 flex-1 min-w-[180px]">
                        <Search size={14} className="shrink-0" style={{ color: 'rgb(var(--color-text-tertiary))' }} />
                        <input
                            ref={searchRef}
                            type="text"
                            value={filters.search}
                            onChange={(e) => updateFilter('search', e.target.value)}
                            placeholder="Search packs..."
                            className="flex-1 bg-transparent text-sm text-primary placeholder-tertiary focus:outline-none min-w-0"
                        />
                        <button onClick={closeSearch} className="shrink-0 transition-opacity hover:opacity-70" aria-label="Close search">
                            <X size={14} style={{ color: 'rgb(var(--color-text-tertiary))' }} />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setSearchOpen(true)}
                        aria-label="Search packs"
                        className="p-2 rounded-xl border border-primary transition-colors hover:border-brand-red"
                        style={{ backgroundColor: 'rgb(var(--color-bg-primary))' }}
                    >
                        <Search size={16} style={{ color: 'rgb(var(--color-text-secondary))' }} />
                    </button>
                )}

                {/* Pack count + clear */}
                <div className="ml-auto flex items-center gap-4 shrink-0">
                    {hasActiveFilters && (
                        <button
                            onClick={() => onFilterChange({ capitalRange: 'all', timeline: 'all', skillLevel: 'all', category: 'all', search: '' })}
                            className="text-xs text-brand-red hover:text-brand-red/80 font-medium transition-colors"
                        >
                            Clear
                        </button>
                    )}
                    <span className="text-sm text-tertiary">{packCount} packs</span>
                </div>
            </div>
        </div>
    );
}
