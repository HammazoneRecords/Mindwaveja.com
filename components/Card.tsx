'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  elevation?: 0 | 1 | 2 | 3;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
  gradient?: boolean;
}

const paddingSizes = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  hover = false,
  glass = false,
  elevation = 2,
  padding = 'md',
  as: Component = 'div',
  gradient = false,
}: CardProps) {
  const baseStyles = clsx(
    'rounded-3xl',
    glass
      ? 'glass'
      : `elevation-${elevation}`,
    hover && 'transition-all duration-300 hover:border-brand-red/30 glow-red',
    'border border-primary',
    paddingSizes[padding],
    className
  );

  // Dark mode gradient overlay
  const gradientOverlay = gradient ? (
    <div 
      className="absolute inset-0 rounded-3xl pointer-events-none opacity-30"
      style={{
        background: 'linear-gradient(135deg, rgba(var(--color-brand-red) / 0.05) 0%, rgba(var(--color-brand-green) / 0.03) 100%)',
      }}
      aria-hidden="true"
    />
  ) : null;

  const cardContent = (
    <>
      {gradientOverlay}
      <div className="relative z-10">{children}</div>
    </>
  );

  if (hover) {
    return (
      <motion.div
        className={clsx(baseStyles, 'relative')}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <Component className={clsx(baseStyles, 'relative')}>
      {cardContent}
    </Component>
  );
}

// Sub-components for structured card content - now theme-aware
Card.Header = function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={clsx(
      'text-xl font-semibold text-primary',
      className
    )}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={clsx(
      'leading-relaxed text-secondary',
      className
    )}>
      {children}
    </p>
  );
};

Card.Footer = function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(
      'mt-6 pt-4 border-t border-primary',
      className
    )}>
      {children}
    </div>
  );
};
