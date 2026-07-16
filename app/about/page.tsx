import { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutMission } from '@/components/about/AboutMission';
import { AboutFounder } from '@/components/about/AboutFounder';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about MindWave Jamaica and our mission to transform ideas into operational businesses across Jamaica.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutFounder />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
