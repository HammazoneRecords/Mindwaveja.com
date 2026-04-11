'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search...',
  value,
  onChange,
  className,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={clsx(
        'relative flex items-center transition-all duration-200 rounded-2xl',
        isFocused && 'ring-2 ring-brand-red/50',
        className
      )}
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(var(--color-border-primary))',
      }}
    >
      <svg
        className="absolute left-4 w-5 h-5 text-tertiary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={clsx(
          'w-full py-3 pl-12 pr-4 bg-transparent text-primary',
          'placeholder:text-tertiary focus:outline-none'
        )}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-4 p-1 text-tertiary hover:text-primary transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
