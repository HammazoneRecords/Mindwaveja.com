import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dancehall Artist Websites — Own Your Domain',
  description:
    'Bespoke dancehall & reggae artist websites on owned domains. Skeng, Chronic Law, Aidonia & more already live. $4,200 USD flat license — full ownership, no lock-in. 18 domains held.',
  keywords: [
    'dancehall artist website',
    'artist website design jamaica',
    'jamaican artist digital territory',
    'dancehall artist management',
    'buy artist domain',
    'reggae artist website',
    'bespoke artist website',
  ],
};

export default function ADTLLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Artist Digital Territory License',
            description:
              'Bespoke dancehall & reggae artist websites on owned domains. $4,200 USD flat license — full ownership, no lock-in.',
            brand: {
              '@type': 'Brand',
              name: 'MindWave Jamaica',
            },
            offers: [
              {
                '@type': 'Offer',
                name: 'Claim Existing Domain',
                price: '4200.00',
                priceCurrency: 'USD',
                description: 'Flat license — full ownership. Available for 18 artist domains.',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'Create Tier 1 — Simple (Managed)',
                price: '1599.00',
                priceCurrency: 'USD',
                description: 'Up to 8 pages. 2 years complimentary site management.',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                name: 'Create Tier 2 — Complex (Managed)',
                price: '2600.00',
                priceCurrency: 'USD',
                description: 'Unlimited pages. Fully custom UI. 2 years complimentary site management.',
                availability: 'https://schema.org/InStock',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
