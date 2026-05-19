'use client';

import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../Section';

export function EmailCapture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Enter a valid email address.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || 'Something went wrong. Try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Could not connect. Check your internet and try again.');
      setStatus('error');
    }
  }

  return (
    <Section background="wave">
      <div ref={ref} className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-wave-300 mb-3">
            MindWave Community
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fog-50 mb-4">
            New packs drop regularly.
            <br />
            <span className="text-wave-300">Don't miss the next one.</span>
          </h2>
          <p className="text-fog-400 text-base mb-8 max-w-md mx-auto">
            Join Jamaican entrepreneurs getting new Phase Packs, business insights, and early access — straight to their inbox.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-leaf-500/20 border border-leaf-500/40 rounded-2xl px-6 py-4"
            >
              <svg className="w-5 h-5 text-leaf-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-leaf-300 font-medium">You're in. We'll send new packs your way.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl bg-navy-800/60 border border-navy-600 text-fog-100 placeholder-fog-600 focus:outline-none focus:border-wave-400 transition-colors text-sm"
                disabled={status === 'loading'}
                autoComplete="email"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-wave-600 hover:bg-wave-500 text-white font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === 'loading' ? 'Joining…' : 'Stay Updated'}
              </button>
            </form>
          )}

          {errorMsg && (
            <p className="mt-3 text-sm text-red-400">{errorMsg}</p>
          )}

          <p className="mt-4 text-fog-600 text-xs">
            No spam. Unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
