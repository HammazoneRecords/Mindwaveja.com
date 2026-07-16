import { Section, SectionHeader } from '../Section';
import { Button } from '../Button';

export function ADTLHighlight() {
  return (
    <Section background="gradient">
      <SectionHeader
        title="Artist Digital Territory"
        subtitle="Bespoke dancehall & reggae artist websites on owned domains. 16 artists already live — Skeng, Chronic Law, Aidonia, Mavado, and more. Flat license, full ownership, no lock-in."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto text-center">
        {[
          { label: 'Own Your Domain', desc: 'Not a link-in-bio. A real website on a domain you own.' },
          { label: 'Flat License', desc: '$4,200 once. Or build custom from $1,599. Full transfer.' },
          { label: '16 Artists Live', desc: 'Skeng, Mavado, Aidonia, Jada Kingdom — already on owned domains.' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl p-5"
            style={{
              backgroundColor: 'rgb(var(--color-bg-secondary) / 0.5)',
              border: '1px solid rgb(var(--color-border-primary))',
            }}
          >
            <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--color-text-primary))' }}>{item.label}</h3>
            <p className="text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Button href="/marketplace/artist-digital-territory-license" variant="primary" size="lg">
          See Available Domains →
        </Button>
      </div>
    </Section>
  );
}
