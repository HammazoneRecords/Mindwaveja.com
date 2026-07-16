import { Section, SectionHeader } from '../Section';
import { Button } from '../Button';

export function Chat2CashHighlight() {
  return (
    <Section background="default">
      <SectionHeader
        title="Chat2Cash"
        subtitle="Anonymize your WhatsApp chats. Get paid in JMD via WiPay. Your conversations train Caribbean AI models — and you earn for every useful message."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto text-center">
        {[
          { label: 'AI-Assisted', desc: 'Our engine evaluates conversation density and response quality. High-density turns earn more.' },
          { label: 'Privacy First', desc: 'Names, numbers, and emails stripped locally before leaving your device.' },
          { label: 'Paid via WiPay', desc: 'JMD 0.50–$8 per message. Voice notes coming soon — up to $7,000 JMD.' },
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
        <Button href="https://chat2cash.mindwaveja.com" variant="outline" size="lg">
          Start Earning →
        </Button>
      </div>
    </Section>
  );
}
