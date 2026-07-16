import { HeroSection } from '@/components/home/HeroSection';
import { PhasePacksHighlight } from '@/components/home/PhasePacksHighlight';
import { ADTLHighlight } from '@/components/home/ADTLHighlight';
import { Chat2CashHighlight } from '@/components/home/Chat2CashHighlight';
import { DancehallDataHighlight } from '@/components/home/DancehallDataHighlight';
import { StoreHighlight } from '@/components/home/StoreHighlight';
import { EmailCapture } from '@/components/home/EmailCapture';
import { BlogHighlight } from '@/components/home/BlogHighlight';
import { CommunityPreview } from '@/components/home/CommunityPreview';
import { CTABand } from '@/components/home/CTABand';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhasePacksHighlight />
      <ADTLHighlight />
      <Chat2CashHighlight />
      <DancehallDataHighlight />
      <StoreHighlight />
      <EmailCapture />
      <BlogHighlight />
      <CommunityPreview />
      <CTABand />
    </>
  );
}
