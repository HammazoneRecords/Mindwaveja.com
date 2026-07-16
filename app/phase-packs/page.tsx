import { Metadata } from 'next';
import { PhasePacksHero } from '@/components/phase-packs/PhasePacksHero';
import { PhasePacksGrid } from '@/components/phase-packs/PhasePacksGrid';

export const metadata: Metadata = {
  title: 'Phase Packs',
  description: 'Complete business blueprints ready to execute. Each Phase Pack contains everything you need to start a specific type of business in Jamaica.',
};

export default function PhasePacksPage() {
  return (
    <>
      <PhasePacksHero />
      <PhasePacksGrid />
    </>
  );
}
