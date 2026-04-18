'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const PRODUCTS = [
  'MindWave Phase Packs',
  'Patois Calibration Agent',
  'RAAS — Reggae As A Service',
  'Solobility Portal',
  'Marcus Garvey App',
  'Time-Check App',
  'General / MindWave Platform',
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  const labels = ['', 'Poor', 'Below Average', 'Average', 'Good', 'Excellent'];
  const display = hovered || value;

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '32px',
              color: star <= display ? '#ffd700' : '#333',
              transition: 'color 0.15s, transform 0.1s',
              transform: star <= display ? 'scale(1.15)' : 'scale(1)',
              padding: '0',
            }}
            aria-label={`${star} stars`}
          >
            ★
          </button>
        ))}
      </div>
      <p style={{ color: display ? '#ffd700' : '#555', fontSize: '13px', margin: 0, minHeight: '18px' }}>
        {display ? `${display}/5 — ${labels[display]}` : 'Select a rating'}
      </p>
    </div>
  );
}

function FeedbackForm() {
  const searchParams = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';

  const [product, setProduct] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const match = PRODUCTS.find((p) =>
      p.toLowerCase().includes(prefilledProduct.toLowerCase())
    );
    if (match) setProduct(match);
  }, [prefilledProduct]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return setErrorMsg('Please select a product.');
    if (!rating) return setErrorMsg('Please select a rating.');
    if (!comment.trim()) return setErrorMsg('Please add a comment.');
    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, rating, comment, name, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#111',
    border: '1px solid #222',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#888',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '8px',
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{ fontSize: '52px', marginBottom: '16px' }}>🙏</div>
        <h2 style={{ color: '#00e5ff', margin: '0 0 12px 0', fontSize: '22px' }}>Respect. Feedback received.</h2>
        <p style={{ color: '#888', fontSize: '15px', lineHeight: '1.6', maxWidth: '360px', margin: '0 auto 32px' }}>
          Every piece of feedback shapes what we build next. This goes straight to the builder.
        </p>
        <button
          onClick={() => { setStatus('idle'); setRating(0); setComment(''); setName(''); setEmail(''); }}
          style={{
            background: 'transparent',
            border: '1px solid #00e5ff',
            borderRadius: '8px',
            color: '#00e5ff',
            padding: '10px 24px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Product */}
      <div>
        <label style={labelStyle}>Product / App</label>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          style={{ ...inputStyle, appearance: 'none' }}
        >
          <option value="">Select a product...</option>
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div>
        <label style={labelStyle}>Rating</label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Comment */}
      <div>
        <label style={labelStyle}>Your Feedback</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What worked? What didn't? What do you wish it did?"
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
        />
      </div>

      {/* Optional identity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div>
          <label style={labelStyle}>Name <span style={{ color: '#555' }}>(optional)</span></label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anonymous"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Email <span style={{ color: '#555' }}>(optional)</span></label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="For follow-up only"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <p style={{ color: '#ff4444', fontSize: '13px', margin: 0 }}>{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' ? '#0a3a40' : '#00e5ff',
          color: status === 'loading' ? '#00e5ff' : '#000',
          border: 'none',
          borderRadius: '8px',
          padding: '14px 24px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Feedback'}
      </button>
    </form>
  );
}

export default function FeedbackPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '520px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ color: '#00e5ff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 12px 0' }}>
            MindWave
          </p>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: '0 0 12px 0', lineHeight: '1.2' }}>
            How are we driving?
          </h1>
          <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
            Raw feedback only. No filtering. This goes straight to the builder and shapes what gets built next.
          </p>
        </div>

        {/* Form */}
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #1a1a1a',
          borderRadius: '16px',
          padding: '32px',
        }}>
          <Suspense fallback={<p style={{ color: '#666' }}>Loading...</p>}>
            <FeedbackForm />
          </Suspense>
        </div>

        {/* Footer note */}
        <p style={{ color: '#444', fontSize: '12px', textAlign: 'center', marginTop: '24px', lineHeight: '1.6' }}>
          Anonymous submissions are welcome. If you leave an email we may follow up — never for marketing.
        </p>
      </div>
    </div>
  );
}
