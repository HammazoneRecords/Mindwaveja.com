import { Section, SectionHeader } from '../Section';
import { ProductCard } from '../ProductCard';
import { Button } from '../Button';
import products from '@/content/products.json';
import type { Product } from '@/lib/types';

export function StoreHighlight() {
  const featuredProducts = (products.products as Product[])
    .filter((product) => product.featured)
    .slice(0, 3);

  return (
    <Section background="default">
      <SectionHeader
        title="Resource Marketplace"
        subtitle="Templates, guides, and tools to accelerate your business journey"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      <div className="text-center">
        <Button href="/marketplace" variant="outline" size="lg">
          Visit Marketplace
        </Button>
      </div>
    </Section>
  );
}
