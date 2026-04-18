'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';
import { ReservationModal } from './ReservationModal';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <ReservationModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      productName={product.name}
      productPrice={product.price}
      availableDate={product.availableDate}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative rounded-3xl p-6 transition-all duration-300 flex flex-col"
      style={{
        backgroundColor: 'rgb(var(--color-bg-elevated))',
        border: '1px solid rgb(var(--color-border-primary))',
      }}
    >
      {/* Category + badges */}
      <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
        <Badge variant="default">{product.category}</Badge>
        <div className="flex gap-2">
          {product.comingSoon && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
              style={{
                backgroundColor: 'rgb(var(--color-brand-red) / 0.12)',
                color: 'rgb(var(--color-brand-red))',
              }}
            >
              Pre-Order
            </span>
          )}
          {product.featured && !product.comingSoon && (
            <Badge variant="leaf" size="sm">Featured</Badge>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2 transition-colors" style={{ color: 'rgb(var(--color-text-primary))' }}>
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-4 line-clamp-2 flex-grow" style={{ color: 'rgb(var(--color-text-secondary))' }}>
        {product.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {product.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              color: 'rgb(var(--color-text-tertiary))',
              backgroundColor: 'rgb(var(--color-bg-secondary))',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Price / Available date */}
      <div className="mb-4">
        {product.comingSoon && product.availableDate ? (
          <div>
            <span className="text-base font-semibold" style={{ color: 'rgb(var(--color-brand-red))' }}>
              {product.price}
            </span>
            <p className="text-xs mt-0.5" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
              Launching {product.availableDate} — reserve now
            </p>
          </div>
        ) : (
          <>
            <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-brand-green))' }}>
              {product.price}
            </span>
            {product.priceNote && (
              <span className="text-sm ml-2" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                {product.priceNote}
              </span>
            )}
          </>
        )}
      </div>

      {/* CTA */}
      {product.comingSoon && product.ctaHref ? (
        <Link
          href={product.ctaHref}
          className="w-full py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 block text-center"
          style={{
            backgroundColor: 'rgb(var(--color-brand-red))',
            color: '#fff',
          }}
        >
          {product.ctaLabel ?? 'Reserve Your Copy'}
        </Link>
      ) : product.comingSoon ? (
        <button
          onClick={() => setModalOpen(true)}
          className="w-full py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'rgb(var(--color-brand-red))',
            color: '#fff',
          }}
        >
          Reserve Your Copy
        </button>
      ) : (
        <Link href={`/marketplace/${product.slug}`} className="block">
          <Button variant="secondary" className="w-full" size="sm">
            View Details
          </Button>
        </Link>
      )}
    </motion.article>
    </>
  );
}
