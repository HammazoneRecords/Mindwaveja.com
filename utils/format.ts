/**
 * Format currency with Jamaican Dollar support
 */
export function formatCurrency(
  amount: number,
  currency: string = 'JMD'
): string {
  const formatter = new Intl.NumberFormat('en-JM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}

/**
 * Format a capital range
 */
export function formatCapitalRange(
  min: number,
  max: number,
  currency: string = 'JMD'
): string {
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
}

/**
 * Format a date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-JM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a timestamp for receipts
 */
export function formatTimestamp(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-JM', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

/**
 * Format skill level with visual indicator - brand colors
 */
export function getSkillLevelColor(level: string): string {
  switch (level) {
    case 'Beginner':
      return 'text-leaf-500';
    case 'Intermediate':
      return 'text-yellow-600';
    case 'Advanced':
      return 'text-wave-500';
    default:
      return 'text-charcoal-500';
  }
}
