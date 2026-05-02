import { Metadata } from 'next';
import Link from 'next/link';

// Exchange rate policy: use Bank of Jamaica Dec 31 closing rate for the prior year.
// Update ANNUAL_JMD_RATE each Jan 1 with the BOJ Dec 31 rate from boj.org.jm
// Dec 31 2025 BOJ rate: 160.09 JMD/USD → $5,200 × 160.09 = JMD 832,468
const ADTL_USD = 5_200;
const ANNUAL_JMD_RATE = 160.09; // BOJ Dec 31 2025 — next update: Jan 1 2027
const ADTL_JMD = Math.round(ADTL_USD * ANNUAL_JMD_RATE).toLocaleString('en-JM');

export const metadata: Metadata = {
  title: 'Artist Digital Territory License | MindWave Jamaica',
  description:
    'Secure your digital territory. Bespoke artist websites built on owned domains — Jamaican artists claiming their space online.',
};

interface ArtistLicense {
  domain: string;
  artist: string;
  genre: string;
  notes: string;
  wave: 1 | 2 | 3;
  url?: string; // live site URL once deployed
}

const ARTISTS: ArtistLicense[] = [
  // Wave 1 — priority builds
  { domain: 'skengdon.com', artist: 'Skeng', genre: 'Dancehall', notes: 'One of the hottest artists in Jamaica right now. Massive streaming.', wave: 1, url: 'https://skengdon.com' },
  { domain: 'chroniclawmusic.com', artist: 'Chronic Law', genre: 'Dancehall', notes: '#1 most-streamed dancehall artist in Jamaica (Spotify 2025).', wave: 1, url: 'https://chroniclawmusic.com' },
  { domain: 'tarrusrileyja.com', artist: 'Tarrus Riley', genre: 'Reggae', notes: 'Professional team, international reach, legacy brand.', wave: 1, url: 'https://tarrusrileyja.com' },
  // Wave 2
  { domain: 'officialalkaline.com', artist: 'Alkaline', genre: 'Dancehall', notes: 'New Rules era. Cleanest official domain of three held.', wave: 2 },
  { domain: 'officialbountykiller.com', artist: 'Bounty Killer', genre: 'Dancehall', notes: 'Legend. The Warlord. A co-sign that opens every door.', wave: 2 },
  { domain: 'jadakingdommusic.com', artist: 'Jada Kingdom', genre: 'Dancehall/R&B', notes: 'Female artist, strong crossover demographic.', wave: 2 },
  // Wave 3
  { domain: 'mavadogullyside.com', artist: 'Mavado', genre: 'Dancehall', notes: 'Legend. Gully Side brand.', wave: 3 },
  { domain: 'aidonia4thgenna.com', artist: 'Aidonia', genre: 'Dancehall', notes: 'Veteran. 4th Genna brand strong.', wave: 3 },
  { domain: 'busysignalturf.com', artist: 'Busy Signal', genre: 'Reggae/Dancehall', notes: 'Veteran with international reach.', wave: 3 },
  { domain: 'dingdongravers.com', artist: 'Ding Dong', genre: 'Dancehall', notes: 'Dancer/artist. Ravers Claquez brand.', wave: 3 },
  { domain: 'maliedonnmusic.com', artist: 'Malie Donn', genre: 'Dancehall', notes: 'Rising artist.', wave: 3 },
  { domain: 'officialjashiimusic.com', artist: 'Jahshii', genre: 'Dancehall', notes: 'Conscious dancehall. Grant\'s Pen to the world.', wave: 1, url: 'https://officialjashiimusic.com' },
  { domain: 'skattaburrell.com', artist: 'Skatta Burrell', genre: 'Producer/Industry', notes: 'Producer legend, A&R, radio personality.', wave: 3 },
  { domain: 'realjahvinci.com', artist: 'Jah Vinci', genre: 'Reggae/Dancehall', notes: '', wave: 3 },
  { domain: 'rajahwildofficial.com', artist: 'Rajah Wild', genre: 'Dancehall', notes: '', wave: 3 },
];

const WAVE_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Wave 1 — Priority Build', color: '#a4cf4c', bg: 'rgba(164,207,76,0.08)' },
  2: { label: 'Wave 2 — Next Up', color: '#f0a500', bg: 'rgba(240,165,0,0.08)' },
  3: { label: 'Wave 3 — Hold / Evaluate', color: '#4a5168', bg: 'rgba(74,81,104,0.08)' },
};

export default function ArtistDigitalTerritoryPage() {
  const byWave = ARTISTS.reduce<Record<number, ArtistLicense[]>>((acc, a) => {
    acc[a.wave] = acc[a.wave] ? [...acc[a.wave], a] : [a];
    return acc;
  }, {});

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '100px 24px 60px' }}>
      {/* Back */}
      <Link
        href="/marketplace"
        style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
      >
        ← Back to Marketplace
      </Link>

      {/* Hero */}
      <div style={{ marginBottom: 48 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgb(var(--color-brand-red, 236 50 55))', marginBottom: 12, display: 'block',
        }}>
          Artist Digital Territory License · ${ADTL_USD.toLocaleString()} USD / JMD {ADTL_JMD}
        </span>
        <h1 style={{ fontSize: 36, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          Claim Your Digital Territory.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 620, color: 'var(--color-text-secondary, #888)' }}>
          Every artist below has a domain owned and ready. MindWave JA builds a bespoke site on an owned domain
          and hands the full package to the artist or their team. One flat license per territory — yours to own.
        </p>
      </div>

      {/* How it works */}
      <div style={{
        background: 'rgba(164,207,76,0.06)', border: '1px solid rgba(164,207,76,0.2)',
        borderRadius: 16, padding: '24px 28px', marginBottom: 48,
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20,
      }}>
        {[
          { n: '01', title: 'Domain Owned', desc: 'We already hold the domain — no squatting, no delay.' },
          { n: '02', title: 'Site Built', desc: 'Bespoke artist site. Vite + React, live on the owned domain. Fast, branded, clean.' },
          { n: '03', title: 'Full Transfer', desc: 'GitHub repo + DNS handover. Full ownership from day one — no lock-in.' },
        ].map((s) => (
          <div key={s.n}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(164,207,76,0.7)', letterSpacing: '0.08em' }}>{s.n}</span>
            <p style={{ fontWeight: 700, marginTop: 6, marginBottom: 4, fontSize: 14 }}>{s.title}</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', lineHeight: 1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Artist waves */}
      {([1, 2, 3] as const).map((wave) => (
        <div key={wave} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{WAVE_LABELS[wave].label}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {(byWave[wave] ?? []).map((a) => (
              <div
                key={a.domain}
                style={{
                  background: WAVE_LABELS[a.wave].bg,
                  border: `1px solid ${WAVE_LABELS[a.wave].color}40`,
                  borderLeft: `3px solid ${WAVE_LABELS[a.wave].color}`,
                  borderRadius: 12, padding: '18px 20px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div>
                    <p style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{a.artist}</p>
                    <p style={{ fontSize: 11, color: 'var(--color-text-secondary, #888)', fontWeight: 600 }}>{a.genre}</p>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 4,
                    background: a.wave === 1 ? 'rgba(164,207,76,0.15)' : 'rgba(255,255,255,0.05)',
                    color: WAVE_LABELS[a.wave].color,
                    whiteSpace: 'nowrap',
                  }}>
                    {a.wave === 1 ? 'Available' : 'Coming Soon'}
                  </span>
                </div>

                <code style={{
                  fontSize: 12, color: 'var(--color-text-secondary, #888)',
                  background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 4,
                  display: 'block',
                }}>
                  {a.domain}
                </code>

                {a.notes && (
                  <p style={{ fontSize: 12, color: 'var(--color-text-tertiary, #666)', lineHeight: 1.5, marginTop: 2 }}>
                    {a.notes}
                  </p>
                )}

                <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: WAVE_LABELS[a.wave].color }}>
                      ${ADTL_USD.toLocaleString()} USD
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #555)', fontWeight: 600 }}>
                      JMD {ADTL_JMD}
                    </span>
                  </div>
                  {a.url ? (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 8,
                        background: WAVE_LABELS[a.wave].color, color: '#0f1117', textDecoration: 'none',
                      }}
                    >
                      Visit Site
                    </a>
                  ) : (
                    <a
                      href={`mailto:ovandobrown@gmail.com?subject=ADTL Interest — ${a.artist} (${a.domain})&body=Hi, I'm interested in the Artist Digital Territory License for ${a.artist} at ${a.domain}.`}
                      style={{
                        fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 8,
                        background: 'rgba(255,255,255,0.07)', color: 'var(--color-text-primary, #fff)',
                        textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      Enquire
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom CTA */}
      <div style={{
        marginTop: 24, padding: '32px 28px', borderRadius: 16,
        background: 'rgba(164,207,76,0.06)', border: '1px solid rgba(164,207,76,0.15)',
        textAlign: 'center',
      }}>
        <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Don&rsquo;t see your artist?</h3>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #888)', marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
          We hold domains for 20 Jamaican artists and one athlete. If you represent someone on this list, or want to discuss a domain not listed — reach out.
        </p>
        <a
          href="mailto:ovandobrown@gmail.com?subject=ADTL — Artist Enquiry"
          style={{
            display: 'inline-block', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14,
            background: 'rgb(var(--color-brand-green, 164 207 76))', color: '#0f1117', textDecoration: 'none',
          }}
        >
          Get in Touch
        </a>
      </div>
    </main>
  );
}
