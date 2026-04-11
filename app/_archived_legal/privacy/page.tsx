import { Metadata } from 'next';
import { Section } from '@/components/Section';

export const metadata: Metadata = {
  title: 'Privacy Policy | MindWave Jamaica',
  description: 'Privacy Policy for MindWave Jamaica',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/50 to-navy-900" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-fog-50 mb-4">
            Privacy Policy
          </h1>
          <p className="text-fog-400">Last updated: January 2026</p>
        </div>
      </section>

      <Section background="default" animate={false}>
        <div className="max-w-4xl mx-auto prose prose-invert prose-fog">
          <div className="space-y-8 text-fog-300">
            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed mb-4">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Business idea descriptions and related details</li>
                <li>Location information (parish)</li>
                <li>Skills and experience information</li>
                <li>Budget and timeline preferences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you relevant information about our services</li>
                <li>Develop new products and services</li>
                <li>Protect against fraud and unauthorized activity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                3. Information Sharing
              </h2>
              <p className="leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information 
                to third parties without your consent, except as described in this policy 
                or as required by law. We may share information with service providers 
                who assist us in operating our website and conducting our business.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                4. Data Storage
              </h2>
              <p className="leading-relaxed">
                Your information is stored securely. Intake form submissions are currently 
                stored locally in your browser (localStorage) until our backend systems 
                are implemented. We take reasonable measures to protect your information 
                from unauthorized access or disclosure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                5. Your Rights
              </h2>
              <p className="leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                6. Cookies
              </h2>
              <p className="leading-relaxed">
                We use essential cookies to ensure the proper functioning of our website. 
                We do not use tracking cookies or share data with advertising networks.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-fog-100 mb-4">
                7. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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
