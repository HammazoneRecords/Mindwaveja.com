'use client';

import { useState } from 'react';

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
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
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
                Step 1 — Send payment to this account
              </p>
              <div className="space-y-2 text-sm" style={{ color: 'rgb(var(--color-text-secondary))' }}>
                <div className="flex justify-between">
                  <span>Bank</span>
                  <span className="font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>Scotiabank Jamaica</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Account Name</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>Ovando Brown</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('Ovando Brown', 'name')}
                      className="text-xs px-2 py-0.5 rounded-md transition-colors"
                      style={{
                        backgroundColor: copied === 'name' ? 'rgb(var(--color-brand-red) / 0.15)' : 'rgb(var(--color-bg-primary))',
                        color: copied === 'name' ? 'rgb(var(--color-brand-red))' : 'rgb(var(--color-text-tertiary))',
                        border: '1px solid rgb(var(--color-border-primary))',
                      }}
                    >
                      {copied === 'name' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Account Type</span>
                  <span className="font-semibold" style={{ color: 'rgb(var(--color-text-primary))' }}>Savings</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Account #</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold font-mono" style={{ color: 'rgb(var(--color-text-primary))' }}>50575 000972844</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('50575000972844', 'acct')}
                      className="text-xs px-2 py-0.5 rounded-md transition-colors"
                      style={{
                        backgroundColor: copied === 'acct' ? 'rgb(var(--color-brand-red) / 0.15)' : 'rgb(var(--color-bg-primary))',
                        color: copied === 'acct' ? 'rgb(var(--color-brand-red))' : 'rgb(var(--color-text-tertiary))',
                        border: '1px solid rgb(var(--color-border-primary))',
                      }}
                    >
                      {copied === 'acct' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div
                  className="flex justify-between pt-2 mt-2"
                  style={{ borderTop: '1px solid rgb(var(--color-border-primary))' }}
                >
                  <span className="font-semibold">Amount</span>
                  <span className="font-bold text-base" style={{ color: 'rgb(var(--color-brand-red))' }}>{productPrice}</span>
                </div>
              </div>
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90 mt-1 disabled:opacity-60"
                style={{
                  backgroundColor: 'rgb(var(--color-brand-red))',
                  color: '#fff',
                }}
              >
                {loading ? 'Sending...' : 'Submit Reservation'}
              </button>
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
            <button
              onClick={handleClose}
              className="px-6 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'rgb(var(--color-brand-red))',
                color: '#fff',
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
