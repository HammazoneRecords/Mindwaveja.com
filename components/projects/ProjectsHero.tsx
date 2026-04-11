"use client";

import { useState, useRef, useEffect } from "react";

export function ProjectsHero() {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Force video to play on mount
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing successfully");
          })
          .catch((error) => {
            console.log("Video autoplay prevented:", error);
            // Don't set error, just log it - video might still load
          });
      }
    }
  }, []);

  return (
    <section
      className="relative w-full min-h-[70vh] flex flex-col justify-center overflow-hidden pt-28 sm:pt-32 pb-16"
      style={{
        backgroundColor: 'rgb(var(--color-bg-primary))',
      }}
    >
      {/* Background Video - Always render, z-index 0, ensure visibility */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          filter: 'brightness(0.5) contrast(1.1)',
          zIndex: 0,
          minWidth: '100%',
          minHeight: '100%',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        onError={(e) => {
          console.error("Video failed to load:", e);
          setVideoError(true);
        }}
        onLoadedData={() => {
          console.log("Video loaded successfully");
          setVideoLoaded(true);
          // Force play after load
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              // Ignore autoplay errors
            });
          }
        }}
        onCanPlay={() => {
          console.log("Video can play");
          if (videoRef.current) {
            videoRef.current.play().catch(() => {
              // Ignore autoplay errors
            });
          }
        }}
        onLoadStart={() => {
          console.log("Video load started");
        }}
      >
        <source src="https://jstfdpysuahhmixegqmo.supabase.co/storage/v1/object/public/mw_com/herobkgvideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

      {/* Fallback background if video fails */}
      {videoError && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--color-bg-primary)) 0%, rgb(var(--color-bg-secondary)) 100%)',
            zIndex: 0,
          }}
        />
      )}

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
