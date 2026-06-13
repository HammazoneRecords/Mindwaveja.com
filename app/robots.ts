import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/feedback', '/legal'],
    },
    sitemap: 'https://mindwaveja.com/sitemap.xml',
  };
}
