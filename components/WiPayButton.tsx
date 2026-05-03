import Link from 'next/link';

const WIPAY_BASE = 'https://jm.wipayfinancial.com/to_me/mindwaveja';

function parseJMD(price: string, priceNote?: string): number | null {
  // "JMD 6,500" or "JMD 1,450"
  const direct = price.match(/JMD\s*([\d,]+)/i);
  if (direct) return parseInt(direct[1].replace(/,/g, ''), 10);
  // "$5,200 USD" → fall back to priceNote "JMD 832,468 · one-time"
  if (priceNote) {
    const fromNote = priceNote.match(/JMD\s*([\d,]+)/i);
    if (fromNote) return parseInt(fromNote[1].replace(/,/g, ''), 10);
  }
  return null;
}

interface WiPayButtonProps {
  price: string;
  priceNote?: string;
  description: string;
  className?: string;
  size?: 'sm' | 'lg';
}

export function WiPayButton({ price, priceNote, description, className = '', size = 'lg' }: WiPayButtonProps) {
  const amountJMD = parseJMD(price, priceNote);
  if (!amountJMD) return null;

  const url = `${WIPAY_BASE}?amount=${amountJMD}&desc=${encodeURIComponent(description)}`;

  const baseClass = size === 'lg'
    ? 'block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90'
    : 'block w-full text-center py-2 px-4 rounded-xl font-semibold text-xs transition-opacity hover:opacity-90';

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${className}`}
      style={{ backgroundColor: '#0b5fff', color: '#ffffff' }}
    >
      Pay J${amountJMD.toLocaleString('en-JM')} with WiPay
    </Link>
  );
}

interface WiPayPackButtonProps {
  packPrice: number;
  packName: string;
  className?: string;
}

export function WiPayPackButton({ packPrice, packName, className = '' }: WiPayPackButtonProps) {
  if (packPrice === 0) return null;
  const url = `${WIPAY_BASE}?amount=${packPrice}&desc=${encodeURIComponent(packName)}`;
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90 ${className}`}
      style={{ backgroundColor: '#0b5fff', color: '#ffffff' }}
    >
      Pay J$1,450 with WiPay
    </Link>
  );
}
