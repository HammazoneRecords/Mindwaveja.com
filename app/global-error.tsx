'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F2F4EB',
          padding: '1rem',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#363435',
              marginBottom: '1rem',
            }}>
              Something went wrong
            </h1>
            <p style={{
              color: '#5d5d5d',
              marginBottom: '2rem',
            }}>
              We encountered an unexpected error. Please try again.
            </p>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#EC3237',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
