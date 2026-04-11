'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'secondary' | 'tertiary' | 'elevated' | 'gradient' | 'wave' | 'dark';
  container?: 'narrow' | 'wide' | 'full';
  animate?: boolean;
}

// Theme-aware background classes using CSS variables
const backgrounds = {
  default: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  elevated: 'bg-elevated',
  gradient: 'bg-primary wave-gradient',
  wave: 'bg-primary wave-gradient',
  dark: 'elevation-1', // Uses secondary background in dark mode
};

const containers = {
  narrow: 'max-w-4xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

export function Section({
  children,
  className,
  id,
  background = 'default',
  container = 'wide',
  animate = true,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const content = (
    <div className={clsx('mx-auto px-4 sm:px-6 lg:px-8', containers[container])}>
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.section
        ref={ref}
        id={id}
        className={clsx(
          'py-16 sm:py-20 lg:py-24',
          backgrounds[background],
          className
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {content}
      </motion.section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={clsx(
        'py-16 sm:py-20 lg:py-24',
        backgrounds[background],
        className
      )}
    >
      {content}
    </section>
  );
}

// Separate component for section headers - now theme-aware
export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className,
}: {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'mb-12 lg:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          'text-lg sm:text-xl max-w-2xl text-secondary',
          align === 'center' && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
