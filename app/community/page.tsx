import { Metadata } from 'next';
import { CommunityVideo } from '@/components/community/CommunityVideo';

export const metadata: Metadata = {
  title: 'Community',
  description: 'MindWave Community.',
};

export default function CommunityPage() {
  return <CommunityVideo />;
}
