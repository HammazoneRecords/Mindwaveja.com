import { Section, SectionHeader } from '../Section';
import { PackCard } from '../PackCard';
import { Button } from '../Button';
import phasePacks from '@/content/phasePacks.json';
import type { PhasePack } from '@/lib/types';

export function PhasePacksHighlight() {
  const featuredPacks = (phasePacks.phasePacks as unknown as PhasePack[])
    .filter((pack) => pack.featured)
    .slice(0, 3);

  return (
    <Section background="gradient">
      <SectionHeader
        title="Phase Packs"
        subtitle="Complete business blueprints ready to execute. Each pack contains everything you need to start."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {featuredPacks.map((pack, index) => (
          <PackCard key={pack.id} pack={pack} index={index} />
        ))}
      </div>

      <div className="text-center">
        <Button href="/phase-packs" variant="outline" size="lg">
          Browse All Phase Packs
        </Button>
      </div>
    </Section>
  );
}
