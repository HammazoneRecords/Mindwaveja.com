'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';
import { Button } from '../Button';
import { Badge } from '../Badge';
import services from '@/content/services.json';
import type { ServicePackage } from '@/lib/types';
import { formatCurrency } from '@/utils/format';

export function ServicesList() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const servicePackages = services.services as ServicePackage[];

  return (
    <Section background="default">
      <div ref={ref} className="space-y-12 lg:space-y-16">
        {servicePackages.map((service, index) => (
          <motion.article
            key={service.id}
            id={`wave-${service.wave}`}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-navy-800/50 border border-navy-700 rounded-3xl p-6 sm:p-8 lg:p-10 hover:border-wave-600/20 transition-colors">
              {/* Wave Number - Decorative */}
              <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-4">
                <div className="text-6xl lg:text-7xl font-display font-bold text-wave-600/20">
                  {service.wave}
                </div>
                <Badge variant="wave" size="md">
                  Wave {service.wave}
                </Badge>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-4 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-fog-50 mb-2">
                    {service.name}
                  </h2>
                  <p className="text-wave-400 font-medium">{service.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-fog-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Who It's For */}
                  <div>
                    <h3 className="text-fog-100 font-semibold mb-3">Who It&apos;s For</h3>
                    <ul className="space-y-2">
                      {service.whoItsFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-fog-400 text-sm">
                          <svg className="w-4 h-4 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outputs */}
                  <div>
                    <h3 className="text-fog-100 font-semibold mb-3">What You Get</h3>
                    <ul className="space-y-2">
                      {service.outputs.map((output, i) => (
                        <li key={i} className="flex items-start gap-2 text-fog-400 text-sm">
                          <svg className="w-4 h-4 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="pt-4 border-t border-navy-700">
                  <h3 className="text-fog-100 font-semibold mb-4">Delivery Options</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {service.deliveryOptions.map((option) => {
                      const price = service.basePrice * option.priceMultiplier + (option.priceAdd || 0);
                      const isRush = option.id.includes('rush') || option.id.includes('48hr');
                      const isDetailed = option.id.includes('detailed') || option.id.includes('comprehensive') || option.id.includes('intensive');
                      
                      return (
                        <div
                          key={option.id}
                          className={`relative p-4 rounded-2xl border transition-all ${
                            option.id === 'standard'
                              ? 'bg-navy-700/30 border-navy-600'
                              : isRush
                              ? 'bg-orange-900/20 border-orange-700/50'
                              : 'bg-wave-900/20 border-wave-700/50'
                          }`}
                        >
                          {isRush && (
                            <span className="absolute -top-2 -right-2 text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full">
                              4x
                            </span>
                          )}
                          <h4 className="font-semibold text-fog-100 mb-1">{option.name}</h4>
                          <p className="text-fog-500 text-xs mb-2">{option.description}</p>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-lg font-bold ${isRush ? 'text-orange-400' : isDetailed ? 'text-wave-400' : 'text-fog-200'}`}>
                              {formatCurrency(price)}
                            </span>
                          </div>
                          <p className="text-fog-500 text-xs mt-1">{option.duration}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Explainer Videos Info */}
                <div className="bg-navy-700/30 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-fog-200 text-sm font-medium">
                        {service.includedExplainerVideos} Explainer Video{service.includedExplainerVideos > 1 ? 's' : ''} Included
                      </p>
                      <p className="text-fog-500 text-xs mt-1">
                        Additional videos: {formatCurrency(service.additionalVideoPrice)} each
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price Summary and CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-navy-700">
                  <div>
                    <span className="text-fog-500 text-sm">Starting from</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-wave-400">{service.price}</span>
                      <span className="text-fog-500 text-sm">{service.priceNote}</span>
                    </div>
                  </div>
                  <Button href={`/intake?service=${service.slug}`}>
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
