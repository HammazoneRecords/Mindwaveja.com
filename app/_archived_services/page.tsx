import { Metadata } from 'next';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServicesList } from '@/components/services/ServicesList';
import { ComparisonTable } from '@/components/services/ComparisonTable';
import { ServicesCTA } from '@/components/services/ServicesCTA';

export const metadata: Metadata = {
  title: 'Services | MindWave Jamaica',
  description: 'From idea refinement to business scaling. Explore our Wave packages designed to meet you where you are in your entrepreneurial journey.',
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <ComparisonTable />
      <ServicesCTA />
    </>
  );
}
