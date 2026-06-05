'use client';

import Link from 'next/link';
import { useState, useRef, MouseEvent } from 'react';

interface Props {
  href: string;
  children: React.ReactNode;
  accent?: string; // CSS color for the accent (border + ripple)
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function HeroCTAButton({ href, children, accent = 'rgb(var(--color-brand-red))' }: Props) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLAnchorElement>(null);
  const counter = useRef(0);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = counter.current++;
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
  };

  return (
    <Link
      ref={ref}
      href={href}
      onClick={handleClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px 32px',
        borderRadius: '14px',
        fontFamily: 'var(--font-playfair), serif',
        fontSize: '17px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        textDecoration: 'none',
        border: `2px solid ${accent}`,
        background: accent,
        color: '#0f1117',
        transition: 'background 0.25s ease, color 0.25s ease',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
        (e.currentTarget as HTMLAnchorElement).style.color = accent;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = accent;
        (e.currentTarget as HTMLAnchorElement).style.color = '#0f1117';
      }}
    >
      {children}
      {ripples.map(r => (
        <span
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            transform: 'translate(-50%, -50%) scale(0)',
            animation: 'cta-ripple 0.65s ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
      <style>{`
        @keyframes cta-ripple {
          to {
            transform: translate(-50%, -50%) scale(28);
            opacity: 0;
          }
        }
      `}</style>
    </Link>
  );
}
