import { Metadata } from 'next';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MindWave Jamaica',
};

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/50 to-navy-900" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-fog-50 mb-4">
            Terms of Service
          </h1>
          <p className="text-fog-400">Last updated: January 2026</p>
        </div>
      </section>

      <Section background="default" animate={false}>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8 text-fog-300">
            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing and using MindWave Jamaica&apos;s website and services, you 
                accept and agree to be bound by these Terms of Service. If you do not 
                agree to these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                2. Description of Services
              </h2>
              <p className="leading-relaxed">
                MindWave Jamaica provides educational resources, Phase Packs, and digital
                products designed to help entrepreneurs develop and grow their businesses,
                alongside our Artist Digital Territory License (ADTL) marketplace for
                Jamaican artists.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                3. User Responsibilities
              </h2>
              <p className="leading-relaxed mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of any account information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not reproduce or redistribute our proprietary content without permission</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                4. Payment and Refunds
              </h2>
              <p className="leading-relaxed mb-4">
                Payment terms vary by service. Generally:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consultation services require payment before the session</li>
                <li>Digital products are non-refundable once delivered</li>
                <li>Phase Packs and ongoing services may require deposits</li>
                <li>Refund requests are evaluated on a case-by-case basis</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                5. Intellectual Property
              </h2>
              <p className="leading-relaxed">
                All content, including but not limited to text, graphics, logos, templates, 
                and methodologies, is the property of MindWave Jamaica and is protected by 
                intellectual property laws. You may not reproduce, distribute, or create 
                derivative works without explicit written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                6. Disclaimer of Warranties
              </h2>
              <p className="leading-relaxed">
                Our services are provided &quot;as is&quot; without warranties of any kind. While we 
                strive to provide valuable guidance, we cannot guarantee specific business 
                outcomes. Success depends on many factors including your own effort, market 
                conditions, and execution.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                7. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                MindWave Jamaica shall not be liable for any indirect, incidental, special, 
                or consequential damages arising from your use of our services. Our total 
                liability shall not exceed the amount paid for the specific service in question.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                8. Confidentiality
              </h2>
              <p className="leading-relaxed">
                We respect the confidentiality of your business ideas and information. 
                However, we are not bound by formal non-disclosure agreements unless 
                specifically executed in writing. General business concepts and strategies 
                may be similar across clients.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                9. Modifications to Terms
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be 
                posted on this page with an updated revision date. Continued use of our 
                services after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                10. Governing Law
              </h2>
              <p className="leading-relaxed">
                These terms shall be governed by and construed in accordance with the 
                laws of Jamaica. Any disputes shall be resolved in the courts of Jamaica.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                11. Contact
              </h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:hello@mindwaveja.com" className="text-wave-400 hover:text-wave-300">
                  hello@mindwaveja.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
