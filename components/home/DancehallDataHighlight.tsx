'use client';

import { Section, SectionHeader } from '../Section';
import { Badge } from '../Badge';

export function DancehallDataHighlight() {
  return (
    <Section background="wave">
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="wave" size="md" className="mb-6">
          Coming Soon
        </Badge>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fog-50 mb-6">
          Dancehall Data
        </h2>

        <p className="text-lg sm:text-xl text-fog-300 mb-8 leading-relaxed">
          Analytics and insights for the dancehall industry. Track artist growth,
          streaming trends, and market data — built in Jamaica, for the culture.
          Dedicated domain coming soon.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { label: 'Artist Analytics', desc: 'Streaming, social growth, fan engagement.' },
            { label: 'Industry Trends', desc: 'See what is moving in dancehall — first.' },
            { label: 'Culture-First', desc: 'Built by people who understand dancehall.' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-4"
              style={{
                backgroundColor: 'rgb(4 10 30 / 0.3)',
                border: '1px solid rgb(30 45 80 / 0.5)',
              }}
            >
              <h3 className="font-medium mb-1" style={{ color: 'rgb(var(--color-text-primary))' }}>{item.label}</h3>
              <p className="text-sm" style={{ color: 'rgb(100 110 140)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
