import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

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
  title: 'MindWave Jamaica | Ideas to Income. Guidance to Growth.',
  description:
    'A Jamaican Engine for Innovation. You bring a spark. We turn it into a blueprint. Transform your ideas into operational businesses with structured guidance and support.',
  keywords: [
    'Jamaica business',
    'entrepreneurship',
    'startup',
    'business consulting',
    'Kingston',
    'small business',
    'business plan',
  ],
  authors: [{ name: 'MindWave Jamaica' }],
  icons: {
    icon: '/mindwave-logo.svg',
    shortcut: '/mindwave-logo.svg',
    apple: '/mindwave-logo.svg',
  },
  openGraph: {
    title: 'MindWave Jamaica | Ideas to Income',
    description: 'A Jamaican Engine for Innovation. Transform your ideas into operational businesses.',
    type: 'website',
    locale: 'en_JM',
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
          href="/media/herobkgvideo.mp4"
          as="video"
          type="video/mp4"
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
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
