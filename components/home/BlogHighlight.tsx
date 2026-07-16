import { Section, SectionHeader } from '../Section';
import { Button } from '../Button';
import Link from 'next/link';
import blogData from '@/content/blog/posts.json';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  readTime: string;
}

export function BlogHighlight() {
  const posts = (blogData.posts as Post[]).slice(0, 2);

  return (
    <Section background="default">
      <SectionHeader
        title="Latest from the Blog"
        subtitle="Practical guides for dancehall artists and Jamaican entrepreneurs. No theory — just what works."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 rounded-2xl transition-colors no-underline hover:border-green-500/20"
            style={{
              backgroundColor: 'rgb(var(--color-bg-elevated))',
              border: '1px solid rgb(var(--color-border-primary))',
            }}
          >
            <div className="flex gap-3 items-center mb-2">
              <span className="text-xs font-semibold" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                {new Date(post.date).toLocaleDateString('en-JM', { month: 'short', day: 'numeric' })}
              </span>
              <span style={{ color: 'rgb(var(--color-text-tertiary))' }}>·</span>
              <span className="text-xs font-semibold" style={{ color: 'rgb(var(--color-text-tertiary))' }}>
                {post.readTime}
              </span>
            </div>
            <h3 className="text-lg font-extrabold mb-2" style={{ color: 'rgb(var(--color-text-primary))' }}>
              {post.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--color-text-secondary))' }}>
              {post.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Button href="/blog" variant="outline" size="lg">
          Read All Posts →
        </Button>
      </div>
    </Section>
  );
}
