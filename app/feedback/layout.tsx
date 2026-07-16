import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback',
  description:
    'Raw feedback only. No filtering. This goes straight to the builder and shapes what gets built next. Rate MindWave products and tell us what you think.',
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
