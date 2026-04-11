import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import products from '@/content/products.json';
import type { Product } from '@/lib/types';
import { ProductDetail } from '@/components/store/ProductDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (products.products as Product[]).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (products.products as Product[]).find(
    (p) => p.slug === slug
  );

  if (!product) {
    return {
      title: 'Product Not Found | MindWave Jamaica',
    };
  }

  return {
    title: `${product.name} | MindWave Jamaica`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = (products.products as Product[]).find(
    (p) => p.slug === slug
  );

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
