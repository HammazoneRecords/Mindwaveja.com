'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, SectionHeader } from '../Section';
import services from '@/content/services.json';
import type { ServicePackage } from '@/lib/types';
import { formatCurrency } from '@/utils/format';

const features = [
  { name: 'Idea Clarity Session', waves: [1, 2, 3, 4] },
  { name: 'Business Blueprint', waves: [2, 3, 4] },
  { name: 'Financial Projections', waves: [2, 3, 4] },
  { name: 'Marketing Strategy', waves: [2, 3, 4] },
  { name: 'Weekly Check-ins', waves: [3, 4] },
  { name: 'Priority Support', waves: [3, 4] },
  { name: 'Network Introductions', waves: [3, 4] },
  { name: 'Pitch Deck', waves: [4] },
  { name: 'Investor Prep', waves: [4] },
  { name: 'Expansion Strategy', waves: [4] },
];

export function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const servicePackages = services.services as ServicePackage[];

  return (
    <Section background="gradient">
      <SectionHeader
        title="Compare Packages"
        subtitle="Find the right level of support for your journey"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[800px]">
          <thead>
            <tr>
              <th className="text-left py-4 px-4 text-fog-400 font-medium">Features</th>
              {servicePackages.map((service) => (
                <th key={service.id} className="text-center py-4 px-4">
                  <span className="text-fog-100 font-semibold block">Wave {service.wave}</span>
                  <span className="text-wave-400 text-sm block">{service.price}</span>
                  <span className="text-fog-500 text-xs">starting price</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.name}
                className={index % 2 === 0 ? 'bg-navy-800/30' : ''}
              >
                <td className="py-4 px-4 text-fog-300">{feature.name}</td>
                {servicePackages.map((service) => (
                  <td key={service.id} className="text-center py-4 px-4">
                    {feature.waves.includes(service.wave) ? (
                      <svg
                        className="w-5 h-5 text-wave-500 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-navy-600">-</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {/* Explainer Videos Row */}
            <tr className="bg-navy-800/30">
              <td className="py-4 px-4 text-fog-300">Explainer Videos Included</td>
              {servicePackages.map((service) => (
                <td key={service.id} className="text-center py-4 px-4 text-wave-400 font-medium">
                  {service.includedExplainerVideos}
                </td>
              ))}
            </tr>
            {/* Rush Delivery Row */}
            <tr>
              <td className="py-4 px-4 text-fog-300">48-Hour Rush Available</td>
              {servicePackages.map((service) => {
                const hasRush = service.deliveryOptions.some(o => o.id.includes('rush') || o.id.includes('48hr'));
                return (
                  <td key={service.id} className="text-center py-4 px-4">
                    {hasRush ? (
                      <span className="text-orange-400 text-sm font-medium">4x base</span>
                    ) : (
                      <span className="text-navy-600">-</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </motion.div>

      {/* Pricing Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-navy-800/30 rounded-2xl p-6"
      >
        <h3 className="text-fog-100 font-semibold mb-4">Pricing Notes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <span className="text-fog-200 font-medium">Standard Delivery</span>
              <p className="text-fog-500">Base price, regular timeline</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <span className="text-fog-200 font-medium">Detailed Option</span>
              <p className="text-fog-500">1.5-1.75x price, extended analysis</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div>
              <span className="text-fog-200 font-medium">48-Hour Rush</span>
              <p className="text-fog-500">4x base price, priority delivery</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-wave-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <div>
              <span className="text-fog-200 font-medium">Additional Videos</span>
              <p className="text-fog-500">{formatCurrency(5000)} per extra video</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
