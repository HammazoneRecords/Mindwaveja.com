'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Theme-aware button variants using CSS variables
const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red hover:opacity-90 text-white font-semibold glow-red hover:shadow-lg transition-all',
  secondary:
    'bg-brand-green hover:opacity-90 font-semibold glow-green hover:shadow-lg transition-all',
  ghost:
    'bg-transparent hover:bg-tertiary text-secondary hover:text-primary transition-all',
  outline:
    'bg-transparent border-2 border-brand-red/50 hover:border-brand-red text-brand-red hover:bg-brand-red/10 transition-all',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      isLoading,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      'inline-flex items-center justify-center gap-2 font-medium',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      // Text color for secondary button
      variant === 'secondary' && 'text-primary',
      className
    );

    const content = (
      <>
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={baseStyles}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={baseStyles}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
