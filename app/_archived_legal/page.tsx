import { Metadata } from "next";
import { LegalDocuments } from "@/components/legal/LegalDocuments";

export const metadata: Metadata = {
  title: "Legal | MindWave Jamaica",
  description: "Terms of Service, Privacy Policy, and other important legal documents for MindWave Jamaica.",
};

export default function LegalPage() {
  return (
    <main className="flex-1">
      <div className="min-h-screen bg-primary dark:bg-bg-primary py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-[4.5rem] font-bold text-primary dark:text-text-primary mb-4">
              Legal & Policies
            </h1>
            <p className="text-[1.3125rem] text-secondary dark:text-text-secondary">
              Important information about your rights and our responsibilities
            </p>
          </div>

          {/* Legal Documents Component */}
          <LegalDocuments />
        </div>
      </div>
    </main>
  );
}
