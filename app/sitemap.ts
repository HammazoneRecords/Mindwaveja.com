import type { MetadataRoute } from 'next';
import phasePacksData from '@/content/phasePacks.json';
import productsData from '@/content/products.json';

const BASE_URL = 'https://mindwaveja.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: BASE_URL, changeFrequency: 'monthly', priority: 1.0 },
      { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/community`, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/projects`, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/phase-packs`, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${BASE_URL}/marketplace`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${BASE_URL}/store`, changeFrequency: 'weekly', priority: 0.7 },
      { url: `${BASE_URL}/intake`, changeFrequency: 'monthly', priority: 0.6 },
    ] as const
  ).map((entry) => ({ ...entry, lastModified: new Date() }));

  const phasePackRoutes: MetadataRoute.Sitemap = phasePacksData.phasePacks
    .filter((pack) => pack.status === 'ready')
    .map((pack) => ({
      url: `${BASE_URL}/phase-packs/${pack.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

  const marketplaceRoutes: MetadataRoute.Sitemap = productsData.products.map((product) => ({
    url: `${BASE_URL}/marketplace/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...marketplaceRoutes, ...phasePackRoutes];
}
