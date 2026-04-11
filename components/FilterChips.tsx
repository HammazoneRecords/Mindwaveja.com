'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';

interface FilterChipsProps<T extends string> {
  options: readonly T[];
  selected: T | null;
  onChange: (value: T | null) => void;
  className?: string;
  label?: string;
}

export function FilterChips<T extends string>({
  options,
  selected,
  onChange,
  className,
  label,
}: FilterChipsProps<T>) {
  return (
    <div className={clsx('flex flex-wrap gap-2', className)} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(null)}
        className={clsx(
          'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
          selected === null
            ? 'bg-brand-red text-white'
            : 'bg-secondary text-secondary hover:bg-tertiary hover:text-primary border border-primary'
        )}
        aria-pressed={selected === null}
      >
        All
      </button>
      {options.map((option) => (
        <motion.button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={clsx(
            'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
            selected === option
              ? 'bg-brand-red text-white'
              : 'bg-secondary text-secondary hover:bg-tertiary hover:text-primary border border-primary'
          )}
          whileTap={{ scale: 0.95 }}
          aria-pressed={selected === option}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}
