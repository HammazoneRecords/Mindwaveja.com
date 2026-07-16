import Link from 'next/link';
import blogData from '@/content/blog/posts.json';

interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  readTime: string;
}

export default function BlogPage() {
  const posts = blogData.posts as Post[];

  return (
    <main className="max-w-[900px] mx-auto px-4 sm:px-6 pt-20 pb-16">
      {/* Back */}
      <Link
        href="/"
        style={{
          fontSize: 13, color: 'var(--color-text-secondary, #888)',
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 40,
        }}
      >
        ← Back to MindWave
      </Link>

      <div style={{ marginBottom: 48 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'rgb(var(--color-brand-red, 236 50 55))', marginBottom: 12, display: 'block',
        }}>
          Blog
        </span>
        <h1 style={{ fontSize: 'clamp(22px, 6vw, 36px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          Practical Guides. No Theory.
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.7, maxWidth: 620, color: 'var(--color-text-secondary, #888)' }}>
          For dancehall artists building digital territory. For Jamaican entrepreneurs launching businesses.
          Real steps, real prices, real examples.
        </p>
      </div>

      {/* Post list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: 'block', textDecoration: 'none',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '28px 24px',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #666)', fontWeight: 600 }}>
                {new Date(post.date).toLocaleDateString('en-JM', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #555)' }}>·</span>
              <span style={{ fontSize: 11, color: 'var(--color-text-tertiary, #666)', fontWeight: 600 }}>
                {post.readTime}
              </span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: 'var(--color-text-primary, #fff)' }}>
              {post.title}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary, #888)', lineHeight: 1.6, marginBottom: 14 }}>
              {post.description}
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
          </Link>
        ))}
      </div>
    </main>
  );
}
