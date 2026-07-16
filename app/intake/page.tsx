import { Metadata } from 'next';
import { Suspense } from 'react';
import { IntakeForm } from '@/components/intake/IntakeForm';

export const metadata: Metadata = {
  title: 'Start Your Idea',
  description: 'Tell us about your idea and let us help you take the next step. Free initial consultation.',
};

export default function IntakePage() {
  return (
    <section className="min-h-screen pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<IntakeFormSkeleton />}>
          <IntakeForm />
        </Suspense>
      </div>
    </section>
  );
}

function IntakeFormSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-navy-800 rounded w-3/4 mb-4" />
      <div className="h-4 bg-navy-800 rounded w-1/2 mb-8" />
      <div className="space-y-4">
        <div className="h-12 bg-navy-800 rounded" />
        <div className="h-12 bg-navy-800 rounded" />
        <div className="h-12 bg-navy-800 rounded" />
      </div>
    </div>
  );
}
