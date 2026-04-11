'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import type { ItemType, PaymentIntent, PaymentConfig } from '@/lib/types';
import paymentConfig from '@/content/payment.json';

interface BankTransferCheckoutProps {
  itemType: ItemType;
  itemId: string;
  itemName: string;
  priceJmd?: number | string;
  userPrefill?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  onClose?: () => void;
}

export function BankTransferCheckout({
  itemType,
  itemId,
  itemName,
  priceJmd,
  userPrefill,
  onClose,
}: BankTransferCheckoutProps) {
  const config = paymentConfig as PaymentConfig;
  const [step, setStep] = useState<'form' | 'receipt'>('form');
  const [formData, setFormData] = useState({
    payerName: userPrefill?.name || '',
    payerContact: userPrefill?.email || userPrefill?.phone || '',
    transferReference: '',
    amountJmd: priceJmd?.toString() || '',
    notes: '',
  });
  const [receipt, setReceipt] = useState<PaymentIntent | null>(null);

  const generateReceiptId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `MW-${timestamp}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentIntent: PaymentIntent = {
      receipt_id: generateReceiptId(),
      timestamp: new Date().toISOString(),
      item_type: itemType,
      item_id: itemId,
      item_name: itemName,
      amount_jmd: formData.amountJmd || 'TBD',
      payer_name: formData.payerName,
      payer_contact: formData.payerContact,
      transfer_reference: formData.transferReference || undefined,
      notes: formData.notes || undefined,
      status: 'PENDING_BANK_TRANSFER',
    };

    // Save to localStorage
    const existingReceipts = JSON.parse(localStorage.getItem('mindwave_receipts') || '[]');
    existingReceipts.push(paymentIntent);
    localStorage.setItem('mindwave_receipts', JSON.stringify(existingReceipts));

    setReceipt(paymentIntent);
    setStep('receipt');
  };

  const downloadReceipt = () => {
    if (!receipt) return;
    
    const dataStr = JSON.stringify(receipt, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${receipt.receipt_id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyWhatsAppMessage = () => {
    if (!receipt) return;

    const message = `Hi MindWave Jamaica,

I've made a bank transfer for:
📦 Item: ${receipt.item_name}
💰 Amount: JMD ${receipt.amount_jmd}
🆔 Receipt ID: ${receipt.receipt_id}
${receipt.transfer_reference ? `🏦 Transfer Ref: ${receipt.transfer_reference}` : ''}

Name: ${receipt.payer_name}
Contact: ${receipt.payer_contact}

Please confirm receipt. Thanks!`;

    navigator.clipboard.writeText(message);
    alert('Message copied! Paste it in WhatsApp to send.');
  };

  const getMailtoLink = () => {
    if (!receipt) return '';

    const subject = encodeURIComponent(`Payment Confirmation - ${receipt.receipt_id}`);
    const body = encodeURIComponent(`Hi MindWave Jamaica,

I've made a bank transfer for:

Item: ${receipt.item_name}
Amount: JMD ${receipt.amount_jmd}
Receipt ID: ${receipt.receipt_id}
${receipt.transfer_reference ? `Transfer Reference: ${receipt.transfer_reference}` : ''}

Name: ${receipt.payer_name}
Contact: ${receipt.payer_contact}

Please confirm receipt. Thanks!`);

    return `mailto:${config.contact_email}?subject=${subject}&body=${body}`;
  };

  // Common input styles
  const inputStyles = {
    backgroundColor: 'rgb(var(--color-bg-elevated))',
    borderColor: 'rgb(var(--color-border-primary))',
    color: 'rgb(var(--color-text-primary))',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      style={{ backgroundColor: 'rgb(0 0 0 / 0.7)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="elevation-3 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-2">
                    Bank Transfer Payment
                  </h2>
                  <p className="text-secondary text-sm">
                    Complete your purchase via bank transfer
                  </p>
                </div>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="text-tertiary hover:text-primary transition-colors"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Item Info */}
              <div 
                className="rounded-2xl p-4 mb-6"
                style={{
                  backgroundColor: 'rgb(var(--color-brand-red) / 0.1)',
                  border: '1px solid rgb(var(--color-brand-red) / 0.2)',
                }}
              >
                <p className="text-sm text-secondary mb-1">You're purchasing:</p>
                <p className="font-semibold text-primary">{itemName}</p>
                {priceJmd && (
                  <p className="text-brand-red font-bold mt-2">
                    JMD {typeof priceJmd === 'number' ? priceJmd.toLocaleString() : priceJmd}
                  </p>
                )}
              </div>

              {/* Bank Details */}
              <div className="elevation-2 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
                  <span className="text-brand-red">🏦</span>
                  Bank Transfer Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Bank:</span>
                    <span className="font-medium text-primary">{config.bank_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Account Name:</span>
                    <span className="font-medium text-primary">{config.account_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Account Number:</span>
                    <span className="font-medium text-primary">{config.account_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Branch:</span>
                    <span className="font-medium text-primary">{config.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Currency:</span>
                    <span className="font-medium text-primary">{config.currency}</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.payerName}
                    onChange={(e) => setFormData({ ...formData, payerName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors"
                    style={inputStyles}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email or Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.payerContact}
                    onChange={(e) => setFormData({ ...formData, payerContact: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors"
                    style={inputStyles}
                    placeholder="john@example.com or +1876-XXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Amount Sent (JMD)
                  </label>
                  <input
                    type="text"
                    value={formData.amountJmd}
                    onChange={(e) => setFormData({ ...formData, amountJmd: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors"
                    style={inputStyles}
                    placeholder={priceJmd?.toString() || "Enter amount"}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Transfer Reference (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.transferReference}
                    onChange={(e) => setFormData({ ...formData, transferReference: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors"
                    style={inputStyles}
                    placeholder="Bank transfer reference number"
                  />
                  <p className="text-xs text-tertiary mt-1">
                    Your bank's transaction reference (if available)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-brand-red focus:ring-offset-2 transition-colors resize-none"
                    style={inputStyles}
                    placeholder="Any special requests or questions..."
                  />
                </div>

                <div 
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'rgb(var(--color-brand-green) / 0.1)',
                    border: '1px solid rgb(var(--color-brand-green) / 0.2)',
                  }}
                >
                  <h4 className="font-medium text-primary mb-2 text-sm">📝 Important Notes:</h4>
                  <ul className="text-xs text-secondary space-y-1">
                    {config.notes.map((note, i) => (
                      <li key={i}>• {note}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4">
                  {onClose && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Generate Receipt
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 sm:p-8"
            >
              {/* Success Header */}
              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgb(var(--color-brand-green) / 0.2)' }}
                >
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-primary mb-2">
                  Receipt Generated!
                </h2>
                <p className="text-secondary">
                  Keep this receipt safe until your payment is confirmed
                </p>
              </div>

              {/* Receipt Details */}
              {receipt && (
                <div className="elevation-2 border-2 border-primary rounded-2xl p-6 mb-6">
                  <div className="space-y-3 text-sm">
                    <div 
                      className="flex justify-between pb-3 border-b"
                      style={{ borderColor: 'rgb(var(--color-border-secondary))' }}
                    >
                      <span className="text-secondary">Receipt ID:</span>
                      <span className="font-mono font-bold text-brand-red">{receipt.receipt_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Item:</span>
                      <span className="font-medium text-primary text-right">{receipt.item_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Amount:</span>
                      <span className="font-bold text-primary">JMD {receipt.amount_jmd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Name:</span>
                      <span className="font-medium text-primary">{receipt.payer_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary">Contact:</span>
                      <span className="font-medium text-primary">{receipt.payer_contact}</span>
                    </div>
                    {receipt.transfer_reference && (
                      <div className="flex justify-between">
                        <span className="text-secondary">Transfer Ref:</span>
                        <span className="font-mono text-primary">{receipt.transfer_reference}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-secondary">Status:</span>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-600 rounded-full text-xs font-medium">
                        Pending Confirmation
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  onClick={downloadReceipt}
                  variant="secondary"
                  className="w-full"
                >
                  📥 Download Receipt (JSON)
                </Button>

                <Button
                  onClick={copyWhatsAppMessage}
                  variant="outline"
                  className="w-full"
                >
                  💬 Copy WhatsApp Message
                </Button>

                <a
                  href={getMailtoLink()}
                  className="block"
                >
                  <Button
                    variant="ghost"
                    className="w-full"
                  >
                    📧 Send via Email
                  </Button>
                </a>
              </div>

              {/* Final Instructions */}
              <div 
                className="mt-6 rounded-xl p-4"
                style={{
                  backgroundColor: 'rgb(var(--color-brand-red) / 0.1)',
                  border: '1px solid rgb(var(--color-brand-red) / 0.2)',
                }}
              >
                <p className="text-sm text-primary font-medium mb-2">
                  ⏰ Next Steps:
                </p>
                <ol className="text-sm text-secondary space-y-1 list-decimal list-inside">
                  <li>Complete your bank transfer using the details provided</li>
                  <li>Keep your receipt ID: <span className="font-mono font-bold">{receipt?.receipt_id}</span></li>
                  <li>Send confirmation via WhatsApp or email</li>
                  <li>We'll confirm within 24-48 hours</li>
                </ol>
              </div>

              {onClose && (
                <div className="mt-6">
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
