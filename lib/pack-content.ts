import fs from 'fs';
import path from 'path';
import type { PhasePack } from '@/lib/types';

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

/** Converts a string array to a markdown bullet list */
function toBulletList(items: string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

/** Converts a string array to a numbered list */
function toNumberedList(items: string[]): string {
  return items.map((item, i) => `${i + 1}. ${item}`).join('\n');
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

/**
 * Builds CanonFile[] from a PhasePack JSON object.
 * No disk reads — all content is generated from the JSON fields.
 * This is the production path — the filesystem-based getPackContent() is
 * only used when pack markdown files exist alongside the codebase.
 */
export function getPackContentFromJSON(pack: PhasePack): CanonFile[] {
  const files: CanonFile[] = [];

  if (pack.whatThisIs) {
    files.push({ slug: 'what-this-is', title: 'What This Is', content: `## What This Is\n\n${pack.whatThisIs}` });
  }
  if (pack.whoThisIsNotFor) {
    const items = Array.isArray(pack.whoThisIsNotFor) ? pack.whoThisIsNotFor : [pack.whoThisIsNotFor];
    if (items.length > 0) {
      files.push({ slug: 'who-this-is-not-for', title: 'Who This Is Not For', content: `## Who This Is Not For\n\n${toBulletList(items)}` });
    }
  }
  if (pack.whatYouNeed?.length) {
    files.push({ slug: 'what-you-need', title: 'What You Need', content: `## What You Need\n\n${toBulletList(pack.whatYouNeed)}` });
  }
  if (pack.firstSevenActions?.length) {
    files.push({ slug: 'first-seven-actions', title: 'First Seven Actions', content: `## First Seven Actions\n\n${toNumberedList(pack.firstSevenActions)}` });
  }
  if (pack.waitingTimeTasks?.length) {
    files.push({ slug: 'waiting-time-tasks', title: 'Waiting Time Tasks', content: `## Waiting Time Tasks\n\n${toBulletList(pack.waitingTimeTasks)}` });
  }
  if (pack.starterFolderContents?.length) {
    files.push({ slug: 'starter-folder', title: 'Starter Folder Contents', content: `## Starter Folder Contents\n\n${toBulletList(pack.starterFolderContents)}` });
  }
  if (pack.valueAddMenu?.length) {
    files.push({ slug: 'value-add-menu', title: 'Value Add Menu', content: `## Value Add Menu\n\n${toBulletList(pack.valueAddMenu)}` });
  }
  if (pack.salesMode) {
    files.push({ slug: 'sales-mode', title: 'Sales Mode', content: `## Sales Mode\n\n${pack.salesMode}` });
  }
  if (pack.dailyMinimum) {
    const dm = typeof pack.dailyMinimum === 'string' ? pack.dailyMinimum : JSON.stringify(pack.dailyMinimum);
    files.push({ slug: 'daily-minimum', title: 'Daily Minimum', content: `## Daily Minimum\n\n${dm}` });
  }
  if (pack.commonFailurePoints?.length) {
    files.push({ slug: 'common-failure-points', title: 'Common Failure Points', content: `## Common Failure Points\n\n${toBulletList(pack.commonFailurePoints)}` });
  }
  if (pack.ethicalCommunityRules?.length) {
    files.push({ slug: 'ethical-community-rules', title: 'Ethical Community Rules', content: `## Ethical Community Rules\n\n${toBulletList(pack.ethicalCommunityRules)}` });
  }
  if (pack.exitExpandPaths?.length) {
    files.push({ slug: 'exit-expand-paths', title: 'Exit & Expand Paths', content: `## Exit & Expand Paths\n\n${toBulletList(pack.exitExpandPaths)}` });
  }

  return files;
}
