import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Evolution',
  description:
    'A journey of accelerating change — from prehistoric stone tools to the Fourth Industrial Revolution. Explore the S-curve innovation model across 5 major eras.',
};

export default function TechEvolutionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
