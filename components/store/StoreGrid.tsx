'use client';

import { useState, useMemo } from 'react';
import { Section } from '../Section';
import { SearchBar } from '../SearchBar';
import { FilterChips } from '../FilterChips';
import { ProductCard } from '../ProductCard';
import products from '@/content/products.json';
import type { Product, ProductCategory } from '@/lib/types';

const categories: readonly ProductCategory[] = [
  'Books',
  'Apps',
  'Templates',
  'Guides',
  'Reports',
  'Creativity Tools',
  'AI Plugins',
  'Licenses',
] as const;

export function StoreGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

  const allProducts = products.products as Product[];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [allProducts, searchQuery, selectedCategory]);

  return (
    <Section background="default" animate={false}>
      {/* Filters */}
      <div className="mb-10 space-y-6">
        <SearchBar
          placeholder="Search products..."
          value={searchQuery}
          onChange={setSearchQuery}
          className="max-w-md"
        />

        <FilterChips
          options={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
          label="Filter by category"
        />
      </div>

      {/* Results count */}
      <p className="text-fog-500 text-sm mb-6">
        Showing {filteredProducts.length} of {allProducts.length} products
      </p>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-fog-400 text-lg mb-4">No products found matching your criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}
            className="text-wave-400 hover:text-wave-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
}
