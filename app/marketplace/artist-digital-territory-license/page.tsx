import { Metadata } from 'next';
import Link from 'next/link';

// Exchange rate policy: use Bank of Jamaica Dec 31 closing rate for the prior year.
// Update ANNUAL_JMD_RATE each Jan 1 with the BOJ Dec 31 rate from boj.org.jm
// Dec 31 2025 BOJ rate: 160.09 JMD/USD — next update: Jan 1 2027
const ANNUAL_JMD_RATE = 160.09;
const CLAIM_USD = 5_200;
const CLAIM_JMD = Math.round(CLAIM_USD * ANNUAL_JMD_RATE).toLocaleString('en-JM');
const TIER1_USD = 2_600;
const TIER2_USD = 3_900;
const TIER1_JMD = Math.round(TIER1_USD * ANNUAL_JMD_RATE).toLocaleString('en-JM');
const TIER2_JMD = Math.round(TIER2_USD * ANNUAL_JMD_RATE).toLocaleString('en-JM');

export const metadata: Metadata = {
  title: 'Artist Digital Territory License | MindWave Jamaica',
  description:
    'Claim or create your digital territory. Bespoke artist websites built on owned domains — Jamaican artists claiming their space online.',
};

interface ArtistLicense {
  domain: string;
  altDomain?: string;
  artist: string;
  genre: string;
  wave: 1 | 2 | 3;
  url?: string;
}

const ARTISTS: ArtistLicense[] = [
  // ── Wave 1 — Live ──────────────────────────────────────────────────────
  { domain: 'skengdon.com',             artist: 'Skeng',                  genre: 'Dancehall',         wave: 1, url: 'https://skengdon.com' },
  { domain: 'chroniclawmusic.com',      artist: 'Chronic Law',            genre: 'Dancehall',         wave: 1, url: 'https://chroniclawmusic.com' },
  { domain: 'tarrusrileyja.com',        artist: 'Tarrus Riley',           genre: 'Reggae',            wave: 1, url: 'https://tarrusrileyja.com' },
  { domain: 'officialalkaline.com',     artist: 'Alkaline',               genre: 'Dancehall',         wave: 1, url: 'https://officialalkaline.com' },
  { domain: 'officialbountykiller.com', artist: 'Bounty Killer',          genre: 'Dancehall',         wave: 1, url: 'https://officialbountykiller.com', altDomain: 'grunggaadzilla.com' },
  { domain: 'jadakingdommusic.com',     artist: 'Jada Kingdom',           genre: 'Dancehall/R&B',    wave: 1, url: 'https://jadakingdommusic.com' },
  { domain: 'aidonia4thgenna.com',      artist: 'Aidonia',                genre: 'Dancehall',         wave: 1, url: 'https://aidonia4thgenna.com' },
  { domain: 'busysignalturf.com',       artist: 'Busy Signal',            genre: 'Reggae/Dancehall',  wave: 1, url: 'https://busysignalturf.com' },
  { domain: 'dingdongravers.com',       artist: 'Ding Dong',              genre: 'Dancehall',         wave: 1, url: 'https://dingdongravers.com' },
  { domain: 'maliedonnmusic.com',       artist: 'Malie Donn',             genre: 'Dancehall',         wave: 1, url: 'https://maliedonnmusic.com' },
  { domain: 'officialjashiimusic.com',  artist: 'Jahshii',                genre: 'Dancehall',         wave: 1, url: 'https://officialjashiimusic.com' },
  { domain: 'skattaburrell.com',        artist: 'Skatta Burrell',         genre: 'Producer/Industry', wave: 1, url: 'https://skattaburrell.com' },
  { domain: 'elainethompsonherah.com',  artist: 'Elaine Thompson-Herah',  genre: 'Sports/Athlete',    wave: 1, url: 'https://elainethompsonherah.com' },
  // ── Wave 2 — In Build ─────────────────────────────────────────────────
  { domain: 'mavadogullyside.com',      artist: 'Mavado',                 genre: 'Dancehall',         wave: 2 },
  { domain: 'kraffbuduchop.com',        artist: 'Kraff BuduChop',         genre: 'Dancehall',         wave: 2 },
  { domain: 'rajahwildofficial.com',    artist: 'Rajah Wild',             genre: 'Dancehall',         wave: 2 },
  // ── Wave 3 — On Deck ──────────────────────────────────────────────────
  { domain: 'realjahvinci.com',         artist: 'Jah Vinci',              genre: 'Reggae/Dancehall',  wave: 3 },
];

const WAVE_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Completed — Live Now', color: '#a4cf4c', bg: 'rgba(164,207,76,0.08)' },
  2: { label: 'Coming Soon — In Build', color: '#f0a500', bg: 'rgba(240,165,0,0.08)' },
  3: { label: 'On Deck — Available for Pre-Order', color: '#4a5168', bg: 'rgba(74,81,104,0.08)' },
};

export default function ArtistDigitalTerritoryPage() {
  const byWave = ARTISTS.reduce<Record<number, ArtistLicense[]>>((acc, a) => {
    acc[a.wave] = acc[a.wave] ? [...acc[a.wave], a] : [a];
    return acc;
  }, {});

  return (
    <main className="max-w-[900px] mx-auto px-4 sm:px-6 pt-20 pb-16">
      <style>{`
        .adtl-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 600px) { .adtl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 900px) { .adtl-grid { grid-template-columns: repeat(4, 1fr); } }
        .adtl-steps { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 600px) { .adtl-steps { grid-template-columns: repeat(3, 1fr); } }
        .adtl-card-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .adtl-path-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 600px) { .adtl-path-grid { grid-template-columns: repeat(2, 1fr); } }
        .adtl-tier-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 600px) { .adtl-tier-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      {/* Back */}
      <Link
        href="/marketplace"
        style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40 }}
      >
        ← Back to Marketplace
      </Link>

      {/* Page intro */}
      <div style={{ marginBottom: 40 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgb(var(--color-brand-red, 236 50 55))', marginBottom: 12, display: 'block',
        }}>
          Artist Digital Territory License
        </span>
        <h1 style={{ fontSize: 'clamp(22px, 6vw, 36px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          Your Digital Territory. Two Ways In.
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 620, color: 'var(--color-text-secondary, #888)' }}>
          Artists claim domains we already hold. Brands and businesses create from scratch.
          Either way — MindWave JA builds it, you own it.
        </p>
      </div>

      {/* Two path cards */}
      <div className="adtl-path-grid" style={{ marginBottom: 72 }}>
        {/* Claim */}
        <a
          href="#claim"
          style={{
            display: 'block', textDecoration: 'none',
            background: 'rgba(164,207,76,0.06)', border: '1px solid rgba(164,207,76,0.25)',
            borderTop: '3px solid #a4cf4c',
            borderRadius: 16, padding: '28px 24px',
            transition: 'border-color 0.2s',
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>Claim Your Digital Territory</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', lineHeight: 1.6, marginBottom: 20 }}>
            If we already hold your domain, your site is already built — one flat license and it&rsquo;s yours,
            including the merch designs. 
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#a4cf4c' }}>${CLAIM_USD.toLocaleString()} USD</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', fontWeight: 600, marginBottom: 4 }}>= JMD {CLAIM_JMD}</p>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary, #666)', fontWeight: 600, marginBottom: 20 }}>Flat license · all-in</p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700, color: '#a4cf4c',
          }}>
            See Available Domains ↓
          </span>
        </a>

        {/* Create */}
        <a
          href="#create"
          style={{
            display: 'block', textDecoration: 'none',
            background: 'rgba(236,50,55,0.05)', border: '1px solid rgba(236,50,55,0.2)',
            borderTop: '3px solid rgb(var(--color-brand-red, 236 50 55))',
            borderRadius: 16, padding: '28px 24px',
            transition: 'border-color 0.2s',
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>Create Your Digital Territory</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', lineHeight: 1.6, marginBottom: 20 }}>
            Don&rsquo;t see your domain on the list? No problem. Bring your own domain and brief —
            we assess the complexity and build it your way.
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: 'rgb(var(--color-brand-red, 236 50 55))' }}>From ${TIER1_USD.toLocaleString()} USD</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', fontWeight: 600, marginBottom: 4 }}>= JMD {TIER1_JMD}</p>
          <p style={{ fontSize: 11, color: 'var(--color-text-tertiary, #666)', fontWeight: 600, marginBottom: 20 }}>2 tiers based on complexity</p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700, color: 'rgb(var(--color-brand-red, 236 50 55))',
          }}>
            See Pricing &amp; Enquire ↓
          </span>
        </a>
      </div>

      {/* ── CLAIM SECTION ── */}
      <div id="claim" style={{ scrollMarginTop: 80, marginBottom: 72 }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a4cf4c', display: 'block', marginBottom: 8 }}>Claim Your Digital Territory</span>
          <h2 style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 900, marginBottom: 12 }}>
            Domains We Hold. Ready to Build.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #888)', maxWidth: 560, lineHeight: 1.7 }}>
            Every artist below has an owned domain and a site ready to launch. One flat license —
            ${CLAIM_USD.toLocaleString()} USD (JMD {CLAIM_JMD}) — and the full package transfers to you.
          </p>
        </div>

        {/* How it works */}
        <div className="adtl-steps" style={{
          background: 'rgba(164,207,76,0.06)', border: '1px solid rgba(164,207,76,0.2)',
          borderRadius: 16, padding: '20px 16px', marginBottom: 40,
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
          <div key={wave} style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0 }}>{WAVE_LABELS[wave].label}</h3>
            </div>

            <div className="adtl-grid">
              {(byWave[wave] ?? []).map((a) => (
                <div
                  key={a.domain}
                  style={{
                    background: WAVE_LABELS[a.wave].bg,
                    border: `1px solid ${WAVE_LABELS[a.wave].color}40`,
                    borderLeft: `3px solid ${WAVE_LABELS[a.wave].color}`,
                    borderRadius: 12, padding: '14px 16px',
                    display: 'flex', flexDirection: 'column', gap: 6, height: '100%',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p style={{ fontWeight: 800, fontSize: 13, marginBottom: 2, wordBreak: 'break-word' }}>{a.artist}</p>
                      <p style={{ fontSize: 11, color: 'var(--color-text-secondary, #888)', fontWeight: 600 }}>{a.genre}</p>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                      padding: '3px 8px', borderRadius: 4,
                      background: a.url ? 'rgba(164,207,76,0.15)' : 'rgba(255,255,255,0.05)',
                      color: a.url ? '#a4cf4c' : WAVE_LABELS[a.wave].color,
                      whiteSpace: 'nowrap',
                    }}>
                      {a.url ? 'Live' : 'Coming Soon'}
                    </span>
                  </div>

                  <code style={{
                    fontSize: 12, color: 'var(--color-text-secondary, #888)',
                    background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 4,
                    display: 'block',
                  }}>
                    {a.domain}
                  </code>
                  {a.altDomain && (
                    <code style={{
                      fontSize: 12, color: 'var(--color-text-secondary, #888)',
                      background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: 4,
                      display: 'block', marginTop: 4,
                    }}>
                      {a.altDomain}
                    </code>
                  )}


                  <div className="adtl-card-bottom" style={{ marginTop: 'auto', paddingTop: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: WAVE_LABELS[a.wave].color }}>
                        ${CLAIM_USD.toLocaleString()} USD
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #555)', fontWeight: 600 }}>
                        JMD {CLAIM_JMD}
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
                        href={`https://wa.me/16582170735?text=Hi%2C+I'm+interested+in+claiming+the+ADTL+for+${encodeURIComponent(a.artist)}+at+${encodeURIComponent(a.domain)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
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

        {/* Don't see your artist CTA */}
        <div style={{
          padding: '32px 28px', borderRadius: 16,
          background: 'rgba(164,207,76,0.06)', border: '1px solid rgba(164,207,76,0.15)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Don&rsquo;t see your artist?</h3>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #888)', marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
            We hold domains for 20 Jamaican artists and one athlete. If you represent someone on this list, or want to discuss a domain not listed — reach out.
          </p>
          <a
            href="https://wa.me/16582170735?text=Hi%2C+I'm+interested+in+an+Artist+Digital+Territory+License."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '10px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14,
              background: 'rgb(var(--color-brand-green, 164 207 76))', color: '#0f1117', textDecoration: 'none',
            }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* ── CREATE SECTION ── */}
      <div id="create" style={{ scrollMarginTop: 80 }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgb(var(--color-brand-red, 236 50 55))', display: 'block', marginBottom: 8 }}>Create Your Digital Territory</span>
          <h2 style={{ fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 900, marginBottom: 12 }}>
            Your Vision. Your Domain. We Build It.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #888)', maxWidth: 600, lineHeight: 1.7, marginBottom: 16 }}>
            Bring your own domain and idea. We assess the complexity, agree on the scope, build it, and hand it over completely — GitHub repo, full ownership, no lock-in. Every project starts with a WhatsApp conversation where we understand what you need, who it's for, and what success looks like. We don't start building until the scope is agreed.
          </p>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #888)', maxWidth: 600, lineHeight: 1.7 }}>
            Both tiers are bespoke — not templates. Built on Vite + React, deployed to a private VPS on your own domain. Mobile-first, fast, and designed to reflect your identity — not a generic website builder output. Pick the tier that matches your scope.
          </p>
        </div>

        {/* Tier cards */}
        <div className="adtl-tier-grid" style={{ marginBottom: 16 }}>
          {[
            {
              tier: 'Tier 1',
              label: 'Simple',
              usd: TIER1_USD,
              jmd: TIER1_JMD,
              color: '#a4cf4c',
              bg: 'rgba(164,207,76,0.06)',
              border: 'rgba(164,207,76,0.25)',
              descriptors: [
                'Up to 8 pages — home, bio, music, merch, gallery, contact + more',
                'Profile, streaming links, social integration',
                'Merch store link-out (Printify or external)',
                'Mobile-first, fast load, clean navigation',
                'Brand extensions welcome — up to 2 sub-routes',
                'Contact / booking form (demo mode, activate post-handover)',
              ],
              wa: `https://wa.me/16582170735?text=Hi%2C+I'd+like+to+create+a+Tier+1+(Simple)+digital+territory.%0AMy+domain%3A+%0AMy+brand%2Fartist+name%3A+%0AWhat+I'm+looking+for%3A+`,
            },
            {
              tier: 'Tier 2',
              label: 'Complex',
              usd: TIER2_USD,
              jmd: TIER2_JMD,
              color: 'rgb(var(--color-brand-red, 236 50 55))',
              bg: 'rgba(236,50,55,0.05)',
              border: 'rgba(236,50,55,0.2)',
              descriptors: [
                'Unlimited pages — complex routing, nested sub-routes',
                'Fully custom UI concept (GTA, editorial, magazine, split-panel, etc.)',
                'Integrated music player, live video backgrounds, booking flow',
                'Multiple brand extensions — each with dedicated pages',
                'Advanced animations, custom cursors, parallax, transitions',
                'Database-backed features (pre-orders, fan signups, contact forms live)',
              ],
              wa: `https://wa.me/16582170735?text=Hi%2C+I'd+like+to+create+a+Tier+2+(Complex)+digital+territory.%0AMy+domain%3A+%0AMy+brand%2Fartist+name%3A+%0AWhat+I'm+looking+for%3A+`,
            },
          ].map((t) => (
            <div key={t.tier} style={{
              background: t.bg, border: `1px solid ${t.border}`,
              borderTop: `3px solid ${t.color}`,
              borderRadius: 16, padding: '24px 22px',
              display: 'flex', flexDirection: 'column',
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: t.color, marginBottom: 10, display: 'block' }}>
                {t.tier} — {t.label}
              </span>
              <p style={{ fontSize: 26, fontWeight: 900, marginBottom: 2 }}>
                ${t.usd.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary, #888)' }}>USD</span>
              </p>
              <p style={{ fontSize: 11, color: 'var(--color-text-tertiary, #666)', fontWeight: 600, marginBottom: 20 }}>JMD {t.jmd}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {t.descriptors.map((d) => (
                  <li key={d} style={{ fontSize: 13, color: 'var(--color-text-secondary, #888)', display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.4 }}>
                    <span style={{ color: t.color, flexShrink: 0 }}>✓</span> {d}
                  </li>
                ))}
              </ul>
              <a
                href={t.wa}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center', padding: '10px 20px', borderRadius: 10,
                  fontWeight: 700, fontSize: 13, textDecoration: 'none',
                  background: t.color, color: t.tier === 'Tier 1' ? '#0f1117' : '#ffffff',
                }}
              >
                WhatsApp — {t.label} Site →
              </a>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--color-text-tertiary, #666)', textAlign: 'center', marginBottom: 0 }}>
          Not sure which tier fits? Describe your project and we&rsquo;ll assess it — no charge for the conversation.
        </p>
      </div>
    </main>
  );
}
