import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import phasePacks from '@/content/phasePacks.json';
import type { PhasePack } from '@/lib/types';
import { getPackContentFromJSON } from '@/lib/pack-content';
import { PhasePackDetail } from '@/components/phase-packs/PhasePackDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (phasePacks.phasePacks as unknown as PhasePack[]).map((pack) => ({
    slug: pack.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pack = (phasePacks.phasePacks as unknown as PhasePack[]).find(
    (p) => p.slug === slug
  );

  if (!pack) {
    return { title: 'Pack Not Found' };
  }

  return {
    title: `${pack.name} | Phase Packs`,
    description: pack.description,
  };
}

export default async function PhasePackPage({ params }: Props) {
  const { slug } = await params;
  const pack = (phasePacks.phasePacks as unknown as PhasePack[]).find(
    (p) => p.slug === slug
  );

  if (!pack) {
    notFound();
  }

  const content = getPackContentFromJSON(pack);

  return <PhasePackDetail pack={pack} content={content} />;
}
