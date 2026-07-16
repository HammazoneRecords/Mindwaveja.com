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
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6" style={{ color: 'rgb(var(--color-text-primary))' }}>
              Our Mission
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              Jamaican artists deserve to own their digital ground — not rent it
              from platforms that don't serve them. That's the gap ADTL exists to close.
            </p>
            <p className="leading-relaxed mb-6" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              MindWave Jamaica builds that infrastructure: ADTL gives each artist
              a bespoke, owned site as their digital territory. Alongside that, we
              ship Phase Packs, Projects, and Books that turn ideas into things
              that actually exist.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              Our approach is not about theory. It is about action. Every Phase Pack,
              every project, every site we build is designed to move from thinking
              to shipping.
            </p>
          </div>

          <div
            className="rounded-3xl p-8"
            style={{
              backgroundColor: 'rgb(var(--color-bg-elevated))',
              border: '1px solid rgb(var(--color-border-primary))',
              background: 'linear-gradient(135deg, rgb(var(--color-brand-red) / 0.06) 0%, rgb(var(--color-brand-green) / 0.06) 100%)',
            }}
          >
            <blockquote className="text-xl sm:text-2xl font-display italic mb-6" style={{ color: 'rgb(var(--color-text-primary))' }}>
              &ldquo;You bring a spark. We turn it into a blueprint.&rdquo;
            </blockquote>
            <p style={{ color: 'rgb(var(--color-text-secondary))' }}>
              This is not just a tagline. It is our promise. Whatever stage you are
              at, we meet you there and help you move forward.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
