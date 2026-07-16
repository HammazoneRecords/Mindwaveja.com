import { Button } from './Button';

const WIPAY_URL = 'https://jm.wipayfinancial.com/to_me/mindwaveja';

function parseJMD(price: string, priceNote?: string): string | null {
  const direct = price.match(/JMD\s*([\d,]+)/i);
  if (direct) return `J$${direct[1]}`;
  if (priceNote) {
    const fromNote = priceNote.match(/JMD\s*([\d,]+)/i);
    if (fromNote) return `J$${fromNote[1]}`;
  }
  return null;
}

interface WiPayButtonProps {
  price: string;
  priceNote?: string;
  description?: string;
  className?: string;
}

export function WiPayButton({ price, priceNote, className = '' }: WiPayButtonProps) {
  const displayPrice = parseJMD(price, priceNote);
  if (!displayPrice) return null;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <a
        href={WIPAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 bg-[#e8a020] text-white hover:bg-[#d4921a]"
      >
        Pay with WiPay
      </a>
      <p className="text-xs text-center text-fog-500">
        Enter <strong className="text-fog-300">{displayPrice}</strong> when prompted on the payment page
      </p>
    </div>
  );
}

interface WiPayPackButtonProps {
  packPrice: number;
  className?: string;
}

export function WiPayPackButton({ packPrice, className = '' }: WiPayPackButtonProps) {
  if (packPrice === 0) return null;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <a
        href={WIPAY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 bg-[#e8a020] text-white hover:bg-[#d4921a]"
      >
        Pay with WiPay
      </a>
      <p className="text-xs text-center text-fog-500">
        Enter <strong className="text-fog-300">J${packPrice.toLocaleString('en-JM')}</strong> when prompted on the payment page
      </p>
    </div>
  );
}
