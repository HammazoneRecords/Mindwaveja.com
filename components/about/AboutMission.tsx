'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';

export function AboutMission() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <Section background="default">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-charcoal-900 mb-6">
              Our Mission
            </h2>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              Too many brilliant ideas die in Jamaica because people do not know 
              where to start. They have the vision, the drive, and often the skills, 
              but they lack the roadmap.
            </p>
            <p className="text-charcoal-600 leading-relaxed mb-6">
              MindWave Jamaica bridges that gap. We provide structured guidance, 
              proven frameworks, and practical resources that transform raw ideas 
              into operational businesses.
            </p>
            <p className="text-charcoal-600 leading-relaxed">
              Our approach is not about theory. It is about action. Every service, 
              every Phase Pack, every resource we create is designed to move you 
              from thinking to doing.
            </p>
          </div>

          <div className="bg-gradient-to-br from-wave-50 to-leaf-50 border border-charcoal-100 rounded-3xl p-8 shadow-soft">
            <blockquote className="text-xl sm:text-2xl font-display text-charcoal-800 italic mb-6">
              &ldquo;You bring a spark. We turn it into a blueprint.&rdquo;
            </blockquote>
            <p className="text-charcoal-600">
              This is not just a tagline. It is our promise. Whatever stage you are 
              at, we meet you there and help you move forward.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
