import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mindwaveja.com'),
  title: {
    default: 'MindWave Jamaica | Ideas to Income. Guidance to Growth.',
    template: '%s | MindWave Jamaica',
  },
  description:
    'Dancehall artist websites on owned domains. 79+ Jamaican business blueprints & startup guides. Own your digital territory — not a link-in-bio. Built in Jamaica.',
  keywords: [
    'dancehall artist website',
    'jamaican artist website',
    'artist digital territory',
    'jamaica business plan',
    'small business jamaica',
    'startup guide jamaica',
    'jamaican business blueprint',
    'dancehall artist management',
    'Kingston',
  ],
  authors: [{ name: 'MindWave Jamaica' }],
  icons: {
    icon: '/mindwave-logo.svg',
    shortcut: '/mindwave-logo.svg',
    apple: '/mindwave-logo.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MindWave Jamaica | Ideas to Income',
    description: 'A Jamaican Engine for Innovation. Transform your ideas into operational businesses.',
    url: '/',
    siteName: 'MindWave Jamaica',
    type: 'website',
    locale: 'en_JM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindWave Jamaica | Ideas to Income',
    description: 'A Jamaican Engine for Innovation. Transform your ideas into operational businesses.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Preload hero background video for faster loading */}
        <link
          rel="preload"
          href="/media/herobkgvideo-compressed.mp4"
          as="video"
          type="video/mp4"
        />
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MindWave Jamaica',
              url: 'https://mindwaveja.com',
              description:
                'A Jamaican Engine for Innovation. Dancehall artist websites on owned domains. Jamaican business blueprints & startup guides.',
              foundingDate: '2019',
              founder: {
                '@type': 'Person',
                name: 'Ovando Brown',
                url: 'https://ovandobrown.com',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'sales',
                email: 'skygovament11@gmail.com',
                telephone: '+1-658-217-0735',
                availableLanguage: ['English'],
              },
              sameAs: ['https://wa.me/16582170735'],
              knowsAbout: [
                'Artist Digital Territory License',
                'Jamaican business blueprints',
                'Phase packs',
                'Dancehall artist websites',
              ],
            }),
          }}
        />
        {/* Prevent FOUC by setting theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Umami Analytics */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            async
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js'}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <ScrollToTop />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
