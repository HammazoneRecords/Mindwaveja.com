import { Metadata } from "next";
import { OpportunitiesHero } from "@/components/opportunities/OpportunitiesHero";
import { HowItWorks } from "@/components/opportunities/HowItWorks";
import { PricingTable } from "@/components/opportunities/PricingTable";
import { Rewards } from "@/components/opportunities/Rewards";
import { OpportunitiesFAQ } from "@/components/opportunities/OpportunitiesFAQ";
import { OpportunitiesCTA } from "@/components/opportunities/OpportunitiesCTA";

export const metadata: Metadata = {
  title: "Opportunities | MindWave Jamaica",
  description:
    "Earn real JMD transcribing videos and social media content. Fast payouts, meal vouchers, and career growth — powered by MindWave Jamaica.",
};

export default function OpportunitiesPage() {
  return (
    <main className="flex-1">
      <OpportunitiesHero />
      <HowItWorks />
      <PricingTable />
      <Rewards />
      <OpportunitiesFAQ />
      <OpportunitiesCTA />
    </main>
  );
}
