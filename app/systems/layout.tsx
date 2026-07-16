import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Systems',
  description:
    'Interactive explorations of evolution, innovation, and knowledge systems — from tech evolution timelines to growth story models.',
};

export default function SystemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
