import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutMission } from '@/components/about/AboutMission';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About | MindWave Jamaica',
  description: 'Learn about MindWave Jamaica and our mission to transform ideas into operational businesses across Jamaica.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
