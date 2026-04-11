'use client';

import { useState } from 'react';
import { PackCategory, SkillLevel } from '@/lib/types';

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

export function PackFiltersComponent({ filters, onFilterChange, packCount }: PackFiltersProps) {
    const updateFilter = (key: keyof PackFilters, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-secondary rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary">Filter Packs</h2>
                <span className="text-sm text-tertiary">{packCount} packs found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Capital Range */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                        Capital Range
                    </label>
                    <select
                        value={filters.capitalRange}
                        onChange={(e) => updateFilter('capitalRange', e.target.value)}
                        className="w-full px-4 py-2 bg-primary border border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                        <option value="all">All Budgets</option>
                        <option value="micro">Under $50K JMD (Micro)</option>
                        <option value="small">$50-100K JMD (Small)</option>
                        <option value="medium">$100-200K JMD (Medium)</option>
                        <option value="large">$200K+ JMD (Large)</option>
                    </select>
                </div>

                {/* Timeline */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                        Time to First Sale
                    </label>
                    <select
                        value={filters.timeline}
                        onChange={(e) => updateFilter('timeline', e.target.value)}
                        className="w-full px-4 py-2 bg-primary border border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                        <option value="all">Any Timeline</option>
                        <option value="quick">Quick Start (1-7 days)</option>
                        <option value="fast">Fast Track (1-4 weeks)</option>
                        <option value="standard">Standard (1-3 months)</option>
                        <option value="long">Long Build (3+ months)</option>
                    </select>
                </div>

                {/* Skill Level */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                        Skill Level
                    </label>
                    <select
                        value={filters.skillLevel}
                        onChange={(e) => updateFilter('skillLevel', e.target.value)}
                        className="w-full px-4 py-2 bg-primary border border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                        <option value="all">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                        Category
                    </label>
                    <select
                        value={filters.category}
                        onChange={(e) => updateFilter('category', e.target.value)}
                        className="w-full px-4 py-2 bg-primary border border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-brand-red"
                    >
                        <option value="all">All Categories</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Food">Food</option>
                        <option value="Services">Services</option>
                        <option value="Digital">Digital</option>
                        <option value="Retail">Retail</option>
                        <option value="Events">Events</option>
                        <option value="Agriculture">Agriculture</option>
                    </select>
                </div>
            </div>

            {/* Search */}
            <div className="mt-4">
                <label className="block text-sm font-medium text-primary mb-2">
                    Search
                </label>
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder="Search by name or description..."
                    className="w-full px-4 py-2 bg-primary border border-primary rounded-xl text-primary placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-brand-red"
                />
            </div>

            {/* Clear Filters */}
            {(filters.capitalRange !== 'all' ||
                filters.timeline !== 'all' ||
                filters.skillLevel !== 'all' ||
                filters.category !== 'all' ||
                filters.search !== '') && (
                    <button
                        onClick={() => onFilterChange({
                            capitalRange: 'all',
                            timeline: 'all',
                            skillLevel: 'all',
                            category: 'all',
                            search: '',
                        })}
                        className="mt-4 text-sm text-brand-red hover:text-brand-red/80 font-medium"
                    >
                        Clear all filters
                    </button>
                )}
        </div>
    );
}
