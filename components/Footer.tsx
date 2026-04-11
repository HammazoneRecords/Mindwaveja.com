'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  services: [
    { label: 'Phase Packs', href: '/phase-packs' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'Projects', href: '/projects' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Community', href: '/community' },
    { label: 'FAQ', href: '/#faq' },
  ],
  legal: [] as { label: string; href: string }[],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'rgb(var(--color-bg-secondary))',
        borderColor: 'rgb(var(--color-border-primary))',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/mindwave-logo.svg"
                alt="MindWave Jamaica"
                width={160}
                height={45}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-secondary text-sm leading-relaxed mb-4">
              A Jamaican Engine for Innovation. Transforming ideas into operational businesses.
            </p>
            <p className="text-brand-red font-medium text-sm">
              Ideas to Income. Guidance to Growth.
            </p>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-brand-green transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-brand-green transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: 'rgb(var(--color-border-primary))' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-tertiary text-sm">
              © {currentYear} MindWave Jamaica. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-tertiary text-xs">Made with</span>
              <span className="text-brand-red">♥</span>
              <span className="text-tertiary text-xs">in Jamaica</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
