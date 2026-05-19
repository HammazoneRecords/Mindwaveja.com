import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PhasePacksHighlight } from '@/components/home/PhasePacksHighlight';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { StoreHighlight } from '@/components/home/StoreHighlight';
import { EmailCapture } from '@/components/home/EmailCapture';
import { FAQSection } from '@/components/home/FAQSection';
import { CTABand } from '@/components/home/CTABand';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <PhasePacksHighlight />
      <FeaturesSection />
      <StoreHighlight />
      <EmailCapture />
      <FAQSection />
      <CTABand />
    </>
  );
}
