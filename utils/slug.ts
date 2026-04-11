/**
 * Convert a string to a URL-friendly slug
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert a slug back to a readable title
 */
export function fromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Generate a unique ID with optional prefix
 */
export function generateId(prefix?: string): string {
  const random = Math.random().toString(36).substring(2, 9);
  const timestamp = Date.now().toString(36);
  return prefix ? `${prefix}_${timestamp}${random}` : `${timestamp}${random}`;
}
