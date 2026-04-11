import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { PhasePacksHighlight } from '@/components/home/PhasePacksHighlight';
import { StoreHighlight } from '@/components/home/StoreHighlight';
import { CommunityPreview } from '@/components/home/CommunityPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { CTABand } from '@/components/home/CTABand';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <PhasePacksHighlight />
      <StoreHighlight />
      <CommunityPreview />
      <FAQSection />
      <CTABand />
    </>
  );
}
