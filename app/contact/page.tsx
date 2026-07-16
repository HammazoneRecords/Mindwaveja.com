import { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MindWave Jamaica. We respond within 48 hours.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
    </>
  );
}
