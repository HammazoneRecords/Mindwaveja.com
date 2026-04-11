import Link from 'next/link';
import { Button } from '@/components/Button';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-wave-400 text-sm font-medium tracking-wider uppercase mb-4">
          404 Error
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-fog-50 mb-6">
          Page Not Found
        </h1>
        <p className="text-lg text-fog-400 mb-8 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/">
            Go Home
          </Button>
          <Button href="/contact" variant="ghost">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
