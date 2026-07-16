'use client';

import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import type { CanonFile } from '@/lib/pack-content';

interface PackTOCProps {
  files: CanonFile[];
}

const t = (token: string) => `rgb(var(${token}))`;

export function PackTOC({ files }: PackTOCProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const sections = files.map((f) => document.getElementById(`section-${f.slug}`)).filter(Boolean);

    // If scrolled past all sections, deactivate
    const firstSection = sections[0];
    if (firstSection && window.scrollY < firstSection.offsetTop - 120) {
      setActiveSlug(null);
      return;
    }

    // Find the last section whose top is above the viewport
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = sections[i];
      if (el && el.offsetTop - 140 <= window.scrollY) {
        setActiveSlug(files[i].slug);
        return;
      }
    }
    setActiveSlug(null);
  }, [files]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!files.length) return null;

  const scrollTo = (slug: string) => {
    setIsOpen(false);
    const el = document.getElementById(`section-${slug}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Mobile toggle + scroll-to-top */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40 flex items-end gap-3">
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 rounded-full shadow-lg transition-colors"
          style={{
            backgroundColor: t('--color-bg-elevated'),
            border: `1px solid ${t('--color-border-primary')}`,
            color: t('--color-text-primary'),
          }}
          aria-label="Toggle table of contents"
        >
          <span className="text-[10px] font-semibold leading-tight" style={{ color: t('--color-text-primary') }}>
            Table
          </span>
          <span className="text-[10px] font-semibold leading-tight" style={{ color: t('--color-text-primary') }}>
            Of
          </span>
          <span className="text-[10px] font-semibold leading-tight" style={{ color: t('--color-text-primary') }}>
            Contents
          </span>
        <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h12M4 12h16M4 16h8" />
        </svg>
      </button>

        {!isOpen && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all hover:opacity-80"
            style={{
              backgroundColor: t('--color-bg-elevated'),
              border: `1px solid ${t('--color-border-primary')}`,
              color: t('--color-text-primary'),
            }}
            aria-label="Scroll to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={clsx(
          'lg:sticky lg:top-28 lg:block lg:w-48 lg:shrink-0 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto',
          'fixed lg:static inset-y-0 right-0 z-30 w-64 max-w-[85vw]',
          'border-l',
          'p-5 lg:py-0 lg:pr-3 lg:pl-0',
          'overflow-y-auto',
          'transition-transform duration-250',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
        )}
        style={{
          backgroundColor: isOpen ? t('--color-bg-elevated') : undefined,
          borderColor: isOpen ? t('--color-border-primary') : 'transparent',
        }}
      >
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: t('--color-text-tertiary') }}>
            Contents
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ color: t('--color-text-tertiary'), backgroundColor: t('--color-bg-secondary') }}
          >
            ✕
          </button>
        </div>

        <h4
          className="hidden lg:block text-[10px] font-medium uppercase tracking-[0.25em] mb-5 opacity-30 select-none"
          style={{ color: t('--color-text-tertiary') }}
        >
          On this page
        </h4>

        <style>{`
          .toc-dock-item:not(.toc-dock-active):hover {
            background-color: rgb(var(--color-bg-secondary) / 0.38) !important;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        `}</style>

        <ul className="space-y-0">
          {files.map((file) => {
            const isActive = activeSlug === file.slug;
            return (
              <li key={file.slug}>
                <button
                  onClick={() => scrollTo(file.slug)}
                  className={clsx(
                    'toc-dock-item',
                    isActive && 'toc-dock-active',
                    'block w-full text-left text-sm py-1.5 px-3',
                    'rounded-full',
                    'transition-all duration-300 ease-out',
                    'lg:hover:scale-[1.04] lg:hover:translate-x-1',
                    isActive
                      ? 'font-semibold'
                      : 'font-normal lg:hover:font-medium',
                  )}
                  style={{
                    color: isActive ? t('--color-brand-red') : t('--color-text-tertiary'),
                    backgroundColor: isActive
                      ? `${t('--color-brand-red')}10`
                      : 'transparent',
                    borderLeft: isActive
                      ? `2px solid ${t('--color-brand-red')}`
                      : '2px solid transparent',
                  }}
                >
                  {file.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
