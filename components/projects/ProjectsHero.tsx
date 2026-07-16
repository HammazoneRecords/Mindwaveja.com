"use client";

export function ProjectsHero() {
  return (
    <section
      className="relative w-full min-h-[70vh] flex flex-col justify-center overflow-hidden pt-28 sm:pt-32 pb-16"
      style={{
        backgroundColor: 'rgb(var(--color-bg-primary))',
      }}
    >
      {/* Background Video — deprecated, gradient fallback handles it */}

      {/* Layer A: Text protection — dark gradient, mode-agnostic */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Layer B: Bottom page fade — bleeds into page bg, no hard cut */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '45%',
          background: 'linear-gradient(to bottom, transparent 0%, rgb(var(--color-bg-primary)) 100%)',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div className="relative z-[10] max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <p
          className="text-sm font-semibold tracking-wider uppercase mb-4 animate-fadeIn"
          style={{ color: 'rgb(var(--color-brand-red))' }}
        >
          MindWave Innovation Projects
        </p>
        <h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fadeIn"
          style={{ color: 'rgb(var(--color-text-primary))' }}
        >
          Real Solutions in Motion
        </h1>
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto animate-fadeIn"
          style={{ color: 'rgb(var(--color-text-secondary))' }}
        >
          Innovative tools and platforms transforming how Jamaica operates. From AI-powered education to government transparency, explore projects driving real impact.
        </p>
      </div>
    </section>
  );
}
