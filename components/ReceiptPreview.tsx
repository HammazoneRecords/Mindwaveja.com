'use client';

import { motion } from 'framer-motion';
import type { Receipt, PhasePack } from '@/lib/types';
import type { GatewayMode } from './intake/IntakeForm';
import { formatTimestamp } from '@/utils/format';
import { Button } from './Button';

interface ReceiptPreviewProps {
  receipt: Receipt;
  recommendedPacks?: PhasePack[];
  gatewayMode?: GatewayMode;
}

const pathLabels: Record<string, string> = {
  'service': 'Service Inquiry',
  'phase-pack': 'Phase Pack Interest',
  'store-product': 'Marketplace Product Request',
  'just-an-idea': 'Idea Consultation',
};

const gatewayLabel: Record<string, string> = {
  idea: 'I have an idea',
  capital: 'I have the money',
  both: 'I have an idea and the money',
};

export function ReceiptPreview({ receipt, recommendedPacks = [], gatewayMode }: ReceiptPreviewProps) {
  const handleDownload = () => {
    const dataStr = JSON.stringify(receipt, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindwave-receipt-${receipt.receipt_id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const consultationSubject = encodeURIComponent(`Free Consultation Request — ${receipt.receipt_id}`);
  const consultationBody = encodeURIComponent(
    `Hi MindWave Jamaica,\n\nI just submitted an inquiry (Receipt ID: ${receipt.receipt_id}) and would like to book a free consultation.\n\nMy name is ${receipt.payload.name}.\n\nLooking forward to hearing from you.`
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-lg mx-auto"
    >
      {/* Receipt Card */}
      <div className="bg-navy-800 border border-navy-600 rounded-3xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-wave-600/20 rounded-full mb-4">
            <svg className="w-8 h-8 text-wave-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-display font-bold text-fog-50 mb-2">
            Submission Received
          </h2>
          <p className="text-fog-400">
            We will review your inquiry and respond within 48 hours.
          </p>
        </div>

        {/* Receipt Details */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between py-3 border-b border-navy-700">
            <span className="text-fog-400">Receipt ID</span>
            <span className="text-fog-100 font-mono text-sm">{receipt.receipt_id}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-navy-700">
            <span className="text-fog-400">Submitted</span>
            <span className="text-fog-100">{formatTimestamp(receipt.timestamp)}</span>
          </div>
          {gatewayMode && (
            <div className="flex justify-between py-3 border-b border-navy-700">
              <span className="text-fog-400">Starting Point</span>
              <span className="text-wave-400 font-medium">{gatewayLabel[gatewayMode]}</span>
            </div>
          )}
          <div className="flex justify-between py-3 border-b border-navy-700">
            <span className="text-fog-400">Request Type</span>
            <span className="text-wave-400 font-medium">
              {pathLabels[receipt.selected_path] || receipt.selected_path}
            </span>
          </div>
          {receipt.payload.selectedItem && (
            <div className="flex justify-between py-3 border-b border-navy-700">
              <span className="text-fog-400">Selected Item</span>
              <span className="text-fog-100">{receipt.payload.selectedItem}</span>
            </div>
          )}
          <div className="flex justify-between py-3 border-b border-navy-700">
            <span className="text-fog-400">Name</span>
            <span className="text-fog-100">{receipt.payload.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-navy-700">
            <span className="text-fog-400">Contact</span>
            <span className="text-fog-100">{receipt.payload.email}</span>
          </div>
        </div>

        {/* Idea Summary */}
        {receipt.payload.ideaDescription && (
          <div className="bg-navy-900/50 rounded-2xl p-4 mb-8">
            <h3 className="text-fog-300 text-sm font-medium mb-2">Your Summary</h3>
            <p className="text-fog-100 text-sm leading-relaxed">
              {receipt.payload.ideaDescription}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Receipt (JSON)
          </Button>
          <Button href="/" variant="ghost" className="w-full">
            Return Home
          </Button>
        </div>

        <p className="text-fog-500 text-xs text-center mt-6">
          A copy has been saved to your browser. Check your email for confirmation.
        </p>
      </div>

      {/* Pack Recommendations */}
      {recommendedPacks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-navy-800 border border-navy-600 rounded-3xl p-6 sm:p-8"
        >
          <h3 className="font-display text-lg font-bold text-fog-50 mb-1">
            Packs matched to your situation
          </h3>
          <p className="text-fog-400 text-sm mb-6">
            Based on your budget and starting point, these Phase Packs are your strongest fits.
          </p>

          <div className="space-y-4">
            {recommendedPacks.map((pack) => (
              <a
                key={pack.slug}
                href={`/phase-packs/${pack.slug}`}
                className="block p-4 rounded-2xl border border-navy-700 bg-navy-900/40 hover:border-wave-600/50 hover:bg-wave-600/5 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs text-wave-500 font-medium uppercase tracking-wider">
                      {pack.category}
                    </span>
                    <h4 className="text-fog-100 font-semibold mt-0.5 group-hover:text-wave-400 transition-colors">
                      {pack.name}
                    </h4>
                    <p className="text-fog-500 text-xs mt-1">
                      JMD {pack.capitalRange.min.toLocaleString()} – {pack.capitalRange.max.toLocaleString()} · {pack.timeToFirstSale}
                    </p>
                  </div>
                  <span className="text-fog-600 group-hover:text-wave-500 transition-colors shrink-0 mt-1">→</span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-4 text-center">
            <a href="/phase-packs" className="text-wave-500 text-sm hover:text-wave-400 transition-colors">
              Browse all Phase Packs →
            </a>
          </div>
        </motion.div>
      )}

      {/* Free Consultation CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="bg-wave-600/10 border border-wave-600/30 rounded-3xl p-6 sm:p-8 text-center"
      >
        <div className="text-2xl mb-3">🤝</div>
        <h3 className="font-display text-lg font-bold text-fog-50 mb-2">
          Not sure where to start?
        </h3>
        <p className="text-fog-400 text-sm mb-6 max-w-sm mx-auto">
          Book a free 30-minute consultation with the MindWave team. We will review your submission and point you to the right path — no commitment required.
        </p>
        <a
          href={`mailto:payments@mindwavejamaica.com?subject=${consultationSubject}&body=${consultationBody}`}
          className="inline-flex items-center gap-2 bg-wave-600 hover:bg-wave-500 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Book Free Consultation
        </a>
        <p className="text-fog-600 text-xs mt-4">
          Your receipt ID will be included automatically.
        </p>
      </motion.div>
    </motion.div>
  );
}
