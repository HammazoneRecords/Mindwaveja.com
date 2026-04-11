'use client';

import { useEffect } from 'react';
import { Button } from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-4xl font-bold text-charcoal-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-charcoal-600 mb-8">
          We encountered an unexpected error. Please try again.
        </p>
        <Button onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
}
