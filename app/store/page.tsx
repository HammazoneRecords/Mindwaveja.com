import { Metadata } from 'next';
import { StoreHero } from '@/components/store/StoreHero';
import { StoreGrid } from '@/components/store/StoreGrid';

export const metadata: Metadata = {
  title: 'Store',
  description: 'Templates, guides, reports, and tools to accelerate your business journey. Resources designed for Jamaican entrepreneurs.',
};

export default function StorePage() {
  return (
    <>
      <StoreHero />
      <StoreGrid />
    </>
  );
}
