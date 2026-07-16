import type { MetadataRoute } from 'next';
import phasePacksData from '@/content/phasePacks.json';
import productsData from '@/content/products.json';
import blogData from '@/content/blog/posts.json';

const BASE_URL = 'https://mindwaveja.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: BASE_URL, changeFrequency: 'monthly', priority: 1.0 },
      { url: `${BASE_URL}/marketplace/artist-digital-territory-license`, changeFrequency: 'weekly', priority: 0.95 },
      { url: `${BASE_URL}/phase-packs`, changeFrequency: 'weekly', priority: 0.9 },
      { url: `${BASE_URL}/marketplace`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${BASE_URL}/store`, changeFrequency: 'weekly', priority: 0.7 },
      { url: `${BASE_URL}/intake`, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${BASE_URL}/projects`, changeFrequency: 'monthly', priority: 0.6 },
      { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/community`, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/systems`, changeFrequency: 'monthly', priority: 0.5 },
      { url: `${BASE_URL}/systems/tech-evolution`, changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/feedback`, changeFrequency: 'monthly', priority: 0.4 },
      { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
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

  const blogRoutes: MetadataRoute.Sitemap = blogData.posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...staticRoutes, ...marketplaceRoutes, ...phasePackRoutes, ...blogRoutes];
}
