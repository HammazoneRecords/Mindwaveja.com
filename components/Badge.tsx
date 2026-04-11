import clsx from 'clsx';

type BadgeVariant = 'default' | 'wave' | 'leaf' | 'success' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

// Theme-aware badge variants
const variants: Record<BadgeVariant, string> = {
  default: 'bg-secondary text-secondary border-primary',
  wave: 'bg-brand-red/10 text-brand-red border-brand-red/20',
  leaf: 'bg-brand-green/10 text-brand-green border-brand-green/20',
  success: 'bg-brand-green/10 text-brand-green border-brand-green/20',
  warning: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  info: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
};

const sizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
