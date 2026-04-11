'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';
import { Badge } from '../Badge';

export function CommunityPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="wave">
      <div ref={ref} className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Badge variant="wave" size="md" className="mb-6">
            Coming Soon
          </Badge>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fog-50 mb-6">
            MindWave Community
          </h2>

          <p className="text-lg sm:text-xl text-fog-300 mb-8 leading-relaxed">
            Connect with fellow Jamaican entrepreneurs. Share experiences, find 
            collaborators, and grow together. A space for those building the 
            future of Jamaican business.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Peer Networks', description: 'Industry-specific groups' },
              { label: 'Live Sessions', description: 'Weekly founder calls' },
              { label: 'Resource Library', description: 'Shared knowledge base' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-navy-800/30 border border-navy-700/50 rounded-2xl p-4"
              >
                <h3 className="text-fog-100 font-medium mb-1">{item.label}</h3>
                <p className="text-fog-500 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-10"
          >
            <p className="text-fog-500 text-sm">
              Join the waitlist to be notified when community launches
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
