'use client';

import { useState } from 'react';
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
      className="group relative rounded-2xl p-4 transition-all duration-300 flex flex-col h-full"
      style={{
        backgroundColor: 'rgb(var(--color-bg-elevated))',
        border: '1px solid rgb(var(--color-border-primary))',
      }}
    >
      {/* Category + badges */}
      <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
        <Badge variant="default">{product.category}</Badge>
        <div className="flex gap-2">
          {product.comingSoon && (
            <span
              className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
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
      <h3 className="text-sm font-semibold mb-1.5 line-clamp-1 transition-colors" style={{ color: 'rgb(var(--color-text-primary))' }}>
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-xs leading-relaxed mb-3 line-clamp-2 flex-grow" style={{ color: 'rgb(var(--color-text-secondary))' }}>
        {product.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
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

      {/* Price / Available date (coming soon products only) */}
      {product.comingSoon && product.availableDate && (
        <div className="mb-4">
          <div>
            <span className="text-base font-semibold" style={{ color: 'rgb(var(--color-brand-red))' }}>
              {product.price}
            </span>
            <p className="text-xs mt-0.5" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
              Launching {product.availableDate} — reserve now
            </p>
          </div>
        </div>
      )}

      {/* CTA */}
      {product.comingSoon && product.ctaHref ? (
        <Button
          href={product.ctaHref}
          size="sm"
          fullWidth
        >
          {product.ctaLabel ?? 'Reserve Your Copy'}
        </Button>
      ) : product.comingSoon ? (
        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          fullWidth
        >
          Reserve Your Copy
        </Button>
      ) : (
        <Button href={`/marketplace/${product.slug}`} variant="secondary" size="sm" fullWidth>
          View Details
        </Button>
      )}
    </motion.article>
    </>
  );
}
