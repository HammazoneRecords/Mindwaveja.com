import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical guides for dancehall artists and Jamaican entrepreneurs. Artist website costs, business startup steps, digital territory vs link-in-bio — no theory, just what works.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
