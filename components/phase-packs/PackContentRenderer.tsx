'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import type { CanonFile } from '@/lib/pack-content';

interface PackContentRendererProps {
  files: CanonFile[];
}

/** CSS variable theme tokens used across all markdown components */
const t = (token: string) => `rgb(var(${token}))`;

const components: Components = {
  h2: ({ children, ...props }) => (
    <h2
      className="font-display text-2xl sm:text-3xl font-bold mt-12 mb-4 pb-2 border-b"
      style={{
        color: t('--color-text-primary'),
        borderColor: t('--color-border-primary'),
      }}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-display text-xl font-semibold mt-8 mb-3"
      style={{ color: t('--color-text-primary') }}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="font-semibold text-base mt-6 mb-2"
      style={{ color: t('--color-text-secondary') }}
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-base leading-relaxed mb-4"
      style={{ color: t('--color-text-secondary') }}
      {...props}
    >
      {children}
    </p>
  ),
  strong: ({ children, ...props }) => (
    <strong
      className="font-semibold"
      style={{ color: t('--color-text-primary') }}
      {...props}
    >
      {children}
    </strong>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc pl-6 mb-4 space-y-1.5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal pl-6 mb-4 space-y-1.5" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="text-base leading-relaxed"
      style={{ color: t('--color-text-secondary') }}
      {...props}
    >
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border" style={{ borderColor: t('--color-border-primary') }}>
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead style={{ backgroundColor: t('--color-bg-secondary') }} {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider"
      style={{
        color: t('--color-text-tertiary'),
        borderBottom: `1px solid ${t('--color-border-primary')}`,
      }}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-4 py-2.5"
      style={{
        color: t('--color-text-secondary'),
        borderBottom: `1px solid ${t('--color-border-secondary')}`,
      }}
      {...props}
    >
      {children}
    </td>
  ),
  hr: ({ ...props }) => (
    <hr
      className="my-8"
      style={{ borderColor: t('--color-border-primary') }}
      {...props}
    />
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 pl-5 py-2 my-4 rounded-r-lg"
      style={{
        borderColor: t('--color-brand-red'),
        backgroundColor: `${t('--color-bg-secondary')}`,
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded text-sm font-mono"
          style={{
            backgroundColor: t('--color-bg-secondary'),
            color: t('--color-brand-red'),
          }}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className={`block p-4 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed my-4 ${className ?? ''}`}
        style={{
          backgroundColor: t('--color-bg-secondary'),
          color: t('--color-text-primary'),
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="underline underline-offset-2 hover:opacity-80 transition-opacity"
      style={{ color: t('--color-brand-red') }}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
};

export function PackContentRenderer({ files }: PackContentRendererProps) {
  if (!files.length) {
    return (
      <p className="text-center py-20" style={{ color: t('--color-text-tertiary') }}>
        No content available for this pack yet.
      </p>
    );
  }

  return (
    <div className="max-w-none">
      {files.map((file) => (
        <section
          key={file.slug}
          id={`section-${file.slug}`}
          className="scroll-mt-24"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {file.content}
          </ReactMarkdown>
        </section>
      ))}
    </div>
  );
}
