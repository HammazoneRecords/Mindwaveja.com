import fs from 'fs';
import path from 'path';

export interface CanonFile {
  /** Slug derived from filename, e.g. "04-what-you-need" */
  slug: string;
  /** The first # heading in the file, or the filename */
  title: string;
  /** Full markdown content */
  content: string;
}

const PACKS_ROOT = path.join(process.cwd(), '..', 'packs');

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

/**
 * Reads all canon .md files for a given pack slug.
 * Files are sorted by their numeric prefix (00, 00b, 01, 02...).
 */
export function getPackContent(slug: string): CanonFile[] {
  const canonDir = path.join(PACKS_ROOT, slug, 'canon');

  if (!fs.existsSync(canonDir)) {
    return [];
  }

  const entries = fs.readdirSync(canonDir);
  const mdFiles = entries.filter((f) => f.endsWith('.md'));

  // Sort by numeric prefix: strip non-numeric/letter chars, compare
  mdFiles.sort((a, b) => {
    const aNum = a.match(/^(\d+[a-z]?)/)?.[1] ?? a;
    const bNum = b.match(/^(\d+[a-z]?)/)?.[1] ?? b;
    return aNum.localeCompare(bNum, undefined, { numeric: true });
  });

  return mdFiles.map((file) => {
    const raw = fs.readFileSync(path.join(canonDir, file), 'utf-8');
    const fileSlug = file.replace(/\.md$/, '');
    const title = extractTitle(raw) || fileSlug;
    return {
      slug: fileSlug,
      title,
      content: raw,
    };
  });
}
