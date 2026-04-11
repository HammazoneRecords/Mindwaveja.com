'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { label: 'Phase Packs', href: '/phase-packs' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Projects', href: '/projects' },
  { label: 'Community', href: '/community', isComingSoon: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'backdrop-blur-xl border-b shadow-soft'
          : 'bg-transparent'
      )}
      style={isScrolled ? {
        backgroundColor: 'rgb(var(--color-bg-primary) / 0.9)',
        borderColor: 'rgb(var(--color-border-primary))',
      } : undefined}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="MindWave Jamaica Home"
          >
            <Image
              src="/mindwave-logo.svg"
              alt="MindWave Jamaica"
              width={100}
              height={50}
              className="h-10 w-auto group-hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 text-sm font-medium rounded-xl transition-colors relative',
                  pathname === link.href
                    ? 'text-wave-500'
                    : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-50'
                )}
              >
                {link.label}
                {link.isComingSoon && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-leaf-400 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop: Theme Toggle & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <Button href="/intake" size="sm">
              Start Your Idea
            </Button>
          </div>

          {/* Mobile: Theme Toggle & Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden backdrop-blur-xl border-b"
            style={{
              backgroundColor: 'rgb(var(--color-bg-primary) / 0.98)',
              borderColor: 'rgb(var(--color-border-primary))',
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-colors',
                    pathname === link.href
                      ? 'text-wave-500 bg-wave-50'
                      : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-50'
                  )}
                >
                  {link.label}
                  {link.isComingSoon && (
                    <span className="text-xs text-leaf-600 bg-leaf-100 px-2 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
              <div className="pt-4">
                <Button href="/intake" className="w-full">
                  Start Your Idea
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
