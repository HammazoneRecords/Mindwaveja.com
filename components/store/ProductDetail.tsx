'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '../Section';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { BankTransferCheckout } from '../BankTransferCheckout';
import type { Product } from '@/lib/types';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  
  // Parse price if it's a number
  const priceMatch = product.price.match(/\$?([\d,]+)/);
  const priceJmd = priceMatch ? priceMatch[1].replace(/,/g, '') : product.price;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/50 to-navy-900" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/marketplace"
                className="text-tertiary hover:text-brand-red transition-colors text-[0.9375rem] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Marketplace
              </Link>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="default" size="md">{product.category}</Badge>
                  {product.featured && <Badge variant="wave" size="sm">Featured</Badge>}
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fog-50 mb-4">
                  {product.name}
                </h1>

                <p className="text-lg text-fog-300 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-fog-500 bg-navy-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase Card */}
              <div className="lg:col-span-2">
                <div className="bg-navy-800 border border-navy-700 rounded-3xl p-6 sticky top-24">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-wave-400">{product.price}</span>
                    {product.priceNote && (
                      <span className="text-fog-500 text-sm block mt-1">{product.priceNote}</span>
                    )}
                  </div>

                  <Button 
                    onClick={() => setShowCheckout(true)}
                    className="w-full mb-4"
                  >
                    Purchase via Bank Transfer
                  </Button>
                  
                  <Button 
                    href={`/intake?product=${product.slug}`}
                    variant="outline"
                    className="w-full mb-4"
                  >
                    Request Consultation
                  </Button>

                  <p className="text-fog-500 text-xs text-center">
                    Checkout not available yet. Submit request and we will contact you.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features & Included */}
      <Section background="default">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-navy-800/50 border border-navy-700 rounded-3xl p-6"
            >
              <h2 className="text-xl font-display font-bold text-fog-50 mb-4">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-fog-300">
                    <svg className="w-5 h-5 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-navy-800/50 border border-navy-700 rounded-3xl p-6"
            >
              <h2 className="text-xl font-display font-bold text-fog-50 mb-4">What&apos;s Included</h2>
              <ul className="space-y-3">
                {product.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-fog-300">
                    <svg className="w-5 h-5 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-navy-900 to-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-fog-50 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-fog-300 mb-8 max-w-xl mx-auto">
            Purchase this product via bank transfer or request a consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowCheckout(true)}
              size="lg"
            >
              Purchase Now
            </Button>
            <Button href="/store" variant="ghost" size="lg">
              Browse More Products
            </Button>
          </div>
        </div>
      </section>

      {/* Bank Transfer Checkout Modal */}
      {showCheckout && (
        <BankTransferCheckout
          itemType="product"
          itemId={product.id}
          itemName={product.name}
          priceJmd={priceJmd}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
