'use client';

import { useState } from 'react';

interface FeedbackWidgetProps {
  product?: string; // pre-fill product — if omitted, user selects
}

export default function FeedbackWidget({ product }: FeedbackWidgetProps) {
  const [open, setOpen] = useState(false);

  const params = product ? `?product=${encodeURIComponent(product)}` : '';
  const feedbackUrl = `/feedback${params}`;

  return (
    <>
      {/* Floating tab on right edge */}
      <a
        href={feedbackUrl}
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%) rotate(180deg)',
          background: '#00e5ff',
          color: '#000',
          writingMode: 'vertical-rl',
          padding: '12px 8px',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderRadius: '0 0 8px 8px',
          zIndex: 9999,
          transition: 'background 0.2s, padding 0.2s',
          boxShadow: '-2px 0 12px rgba(0,229,255,0.15)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#00c4db';
          (e.currentTarget as HTMLAnchorElement).style.paddingTop = '16px';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#00e5ff';
          (e.currentTarget as HTMLAnchorElement).style.paddingTop = '12px';
        }}
        aria-label="Give feedback"
      >
        Feedback
      </a>
    </>
  );
}
