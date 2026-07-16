import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogData from '@/content/blog/posts.json';

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  readTime: string;
  body: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (blogData.posts as Post[]).find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = (blogData.posts as Post[]).find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="max-w-[720px] mx-auto px-4 sm:px-6 pt-20 pb-16">
      {/* Back */}
      <Link
        href="/blog"
        style={{
          fontSize: 13, color: 'var(--color-text-secondary, #888)',
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40,
        }}
      >
        ← Back to Blog
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #666)', fontWeight: 600 }}>
            {new Date(post.date).toLocaleDateString('en-JM', { year: 'numeric', month: 'short', day: 'numeric' })}
          </span>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #555)' }}>·</span>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #666)', fontWeight: 600 }}>
            {post.readTime}
          </span>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #555)' }}>·</span>
          <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #666)' }}>{post.author}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 12 }}>
          {post.title}
        </h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary, #888)', lineHeight: 1.7 }}>
          {post.description}
        </p>
      </div>

      {/* Body */}
      <div className="blog-content" style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--color-text-secondary, #ccc)' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 style={{ fontSize: 26, fontWeight: 900, marginTop: 40, marginBottom: 16, color: 'var(--color-text-primary, #fff)' }}>{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 36, marginBottom: 14, color: 'var(--color-text-primary, #fff)' }}>{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 28, marginBottom: 10, color: 'var(--color-text-primary, #fff)' }}>{children}</h3>
            ),
            p: ({ children }) => (
              <p style={{ marginBottom: 16, lineHeight: 1.85 }}>{children}</p>
            ),
            ul: ({ children }) => (
              <ul style={{ marginBottom: 16, paddingLeft: 20 }}>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol style={{ marginBottom: 16, paddingLeft: 20 }}>{children}</ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: 6, lineHeight: 1.7 }}>{children}</li>
            ),
            strong: ({ children }) => (
              <strong style={{ fontWeight: 700, color: 'var(--color-text-primary, #eee)' }}>{children}</strong>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                style={{ color: '#a4cf4c', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                {children}
              </a>
            ),
            table: ({ children }) => (
              <div style={{ overflowX: 'auto', marginBottom: 20 }}>
                <table style={{
                  width: '100%', borderCollapse: 'collapse',
                  fontSize: 13,
                }}>
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => <thead>{children}</thead>,
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>{children}</tr>
            ),
            th: ({ children }) => (
              <th style={{
                textAlign: 'left', padding: '10px 14px', fontWeight: 700,
                color: 'var(--color-text-primary, #fff)', background: 'rgba(255,255,255,0.03)',
                fontSize: 13,
              }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td style={{ padding: '10px 14px', color: 'var(--color-text-secondary, #ccc)' }}>{children}</td>
            ),
            hr: () => (
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '32px 0' }} />
            ),
            code: ({ children }) => (
              <code style={{
                background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: 4,
                fontSize: 13, fontFamily: 'monospace',
              }}>
                {children}
              </code>
            ),
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      {/* Tags */}
      <div style={{
        marginTop: 48, paddingTop: 24,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, color: 'var(--color-text-tertiary, #666)', fontWeight: 600 }}>Tags:</span>
        {post.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 6,
              background: 'rgba(255,255,255,0.04)', color: 'var(--color-text-tertiary, #777)',
              fontWeight: 600,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div style={{
        marginTop: 40, padding: '28px 24px', borderRadius: 16,
        background: 'rgba(164,207,76,0.06)', border: '1px solid rgba(164,207,76,0.15)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--color-text-primary, #fff)' }}>
          Ready to build your digital territory?
        </p>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary, #999)', marginBottom: 20 }}>
          See which artists already own their domain — or start a custom build.
        </p>
        <Link
          href="/marketplace/artist-digital-territory-license"
          style={{
            display: 'inline-block', padding: '10px 24px', borderRadius: 10,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            background: '#a4cf4c', color: '#0f1117',
          }}
        >
          View Artist Domains →
        </Link>
      </div>
    </main>
  );
}
