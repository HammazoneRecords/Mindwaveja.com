'use client';

import { useState } from 'react';
import { Button } from './Button';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
  availableDate?: string;
}

export function ReservationModal({
  isOpen,
  onClose,
  productName,
  productPrice,
  availableDate,
}: ReservationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const copyAmount = () => {
    const amount = productPrice.replace(/[^\d.,]/g, '');
    navigator.clipboard.writeText(amount).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Name and email are required.');
      return;
    }
    if (!receipt) {
      setError('Please attach your payment screenshot.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append('name', name);
      fd.append('email', email);
      fd.append('whatsapp', whatsapp);
      fd.append('productName', productName);
      fd.append('productPrice', productPrice);
      fd.append('receipt', receipt);

      const res = await fetch('/api/reserve', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('send failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or WhatsApp us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setWhatsapp('');
    setReceipt(null);
    setSubmitted(false);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-2xl p-6 overflow-y-auto max-h-[90vh]"
        style={{
          backgroundColor: 'rgb(var(--color-bg-elevated))',
          border: '1px solid rgb(var(--color-border-primary))',
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ color: 'rgb(var(--color-text-tertiary))', backgroundColor: 'rgb(var(--color-bg-secondary))' }}
          aria-label="Close"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="mb-5">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-3 inline-block"
                style={{
                  backgroundColor: 'rgb(var(--color-brand-red) / 0.12)',
                  color: 'rgb(var(--color-brand-red))',
                }}
              >
                Reserve Your Copy
              </span>
              <h2 className="text-xl font-semibold mb-1" style={{ color: 'rgb(var(--color-text-primary))' }}>
                {productName}
              </h2>
              {availableDate && (
                <p className="text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Expected launch: <strong>{availableDate}</strong>
                </p>
              )}
            </div>

            {/* Payment details */}
            <div
              className="rounded-xl p-4 mb-5"
              style={{
                backgroundColor: 'rgb(var(--color-bg-secondary))',
                border: '1px solid rgb(var(--color-border-primary))',
              }}
            >
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Step 1 — Send payment
              </p>

              {/* WiPay */}
              <Button
                href="https://jm.wipayfinancial.com/to_me/mindwaveja"
                variant="wipay"
                size="sm"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
              >
                Pay with WiPay
              </Button>
              <p className="text-xs mt-2 text-center" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Enter{' '}
                <button
                  type="button"
                  onClick={copyAmount}
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                  style={{ color: 'rgb(var(--color-text-secondary))' }}
                >
                  {productPrice}
                  {copied ? (
                    <span className="text-xs" style={{ color: 'rgb(var(--color-brand-green))' }}>✓ Copied</span>
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  )}
                </button>
                {' '}when prompted on the payment page
              </p>
              <p className="text-xs mt-3 text-center" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Prefer bank transfer?{' '}
                <a
                  href={`mailto:info@mindwaveja.com?subject=Bank%20Transfer%20-%20${encodeURIComponent(productName)}`}
                  style={{ color: 'rgb(var(--color-brand-red))', textDecoration: 'underline' }}
                >
                  Email us
                </a>
                {' '}and we&apos;ll send you the details.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                Step 2 — Submit your details + receipt
              </p>

              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: 'rgb(var(--color-bg-primary))',
                    border: '1px solid rgb(var(--color-border-primary))',
                    color: 'rgb(var(--color-text-primary))',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: 'rgb(var(--color-bg-primary))',
                    border: '1px solid rgb(var(--color-border-primary))',
                    color: 'rgb(var(--color-text-primary))',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  WhatsApp Number <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>(optional — for faster confirmation)</span>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+1876-XXX-XXXX"
                  className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: 'rgb(var(--color-bg-primary))',
                    border: '1px solid rgb(var(--color-border-primary))',
                    color: 'rgb(var(--color-text-primary))',
                  }}
                />
              </div>

              {/* Receipt upload */}
              <div>
                <label className="block text-xs mb-1 font-medium" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                  Payment Screenshot *
                </label>
                <label
                  className="flex flex-col items-center justify-center w-full rounded-lg py-4 cursor-pointer transition-colors"
                  style={{
                    backgroundColor: receipt ? 'rgb(var(--color-brand-red) / 0.06)' : 'rgb(var(--color-bg-primary))',
                    border: `2px dashed ${receipt ? 'rgb(var(--color-brand-red))' : 'rgb(var(--color-border-primary))'}`,
                    color: 'rgb(var(--color-text-tertiary))',
                  }}
                >
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => setReceipt(e.target.files?.[0] ?? null)}
                  />
                  {receipt ? (
                    <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-brand-red))' }}>
                      ✓ {receipt.name}
                    </span>
                  ) : (
                    <>
                      <span className="text-2xl mb-1">📎</span>
                      <span className="text-xs text-center">
                        Tap to attach payment screenshot<br />
                        <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>JPG, PNG or PDF</span>
                      </span>
                    </>
                  )}
                </label>
              </div>

              {error && (
                <p className="text-xs" style={{ color: 'rgb(var(--color-brand-red))' }}>{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                size="sm"
                fullWidth
                isLoading={loading}
                className="mt-1"
              >
                Submit Reservation
              </Button>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="text-center py-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
              style={{ backgroundColor: 'rgb(var(--color-brand-red) / 0.12)' }}
            >
              ✓
            </div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--color-text-primary))' }}>
              Reservation Received!
            </h2>
            <p className="text-sm mb-4" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              Thanks, <strong>{name}</strong>. We&apos;ll review your payment and confirm your reservation within 24–48 hours.
            </p>
            <p className="text-xs mb-6" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
              Check your email at <strong style={{ color: 'rgb(var(--color-text-secondary))' }}>{email}</strong> for confirmation.
            </p>
            <Button
              onClick={handleClose}
              size="sm"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
