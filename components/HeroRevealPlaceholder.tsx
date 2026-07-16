'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * HeroRevealPlaceholder Component
 * 
 * SWAP POINT DOCUMENTATION:
 * --------------------------
 * This component automatically detects and uses hero media in the following priority:
 * 
 * 1. /media/herobkgvideo.mp4 - Local hero background video (public/media/herobkgvideo.mp4)
 * 2. /public/hero.gif - GIF fallback
 * 3. SVG Placeholder - Animated SVG waves if no media is available
 * 
 * To change the hero video: replace public/media/herobkgvideo.mp4 (or update the src below).
 * The component respects prefers-reduced-motion for accessibility.
 */

type MediaType = 'video' | 'gif' | 'placeholder';

const HERO_VIDEO_SRC = '/media/herobkgvideo-compressed.mp4';
const HERO_VIDEO_POSTER = '/media/herobkgvideo-poster.webp';
const LOOP_HANDOFF_SEC = 0.05; // Switch to other video this many seconds before end (avoids seek flash)

export function HeroRevealPlaceholder() {
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState<0 | 1>(0); // Which video is on top (0 = A, 1 = B)
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const handoffDoneRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  // Dual-video seamless loop: two elements alternate so we never seek on the visible one
  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    const playIfAllowed = (v: HTMLVideoElement) => {
      if (!prefersReducedMotion && v.paused) {
        v.play().catch(() => { });
      }
    };

    const handleCanPlay = (e: Event) => {
      const v = e.target as HTMLVideoElement;
      console.log('Hero video loaded successfully', { src: HERO_VIDEO_SRC, duration: v.duration });
      setMediaLoaded(true);
      playIfAllowed(v);
    };

    const handleError = (e: Event) => {
      const video = e.target as HTMLVideoElement;
      console.warn('Hero background video failed to load', {
        src: HERO_VIDEO_SRC,
        error: video.error,
        networkState: video.networkState,
        readyState: video.readyState,
      });
      setMediaType('placeholder');
      setMediaLoaded(true);
    };

    const handleTimeUpdate = (e: Event) => {
      const v = e.target as HTMLVideoElement;
      const dur = v.duration;
      if (!Number.isFinite(dur) || dur <= 0) return;
      const isA = v === videoA;
      const other = isA ? videoB : videoA;
      if (handoffDoneRef.current) {
        if (v.currentTime > 0.15) handoffDoneRef.current = false;
        return;
      }
      if (v.currentTime >= dur - LOOP_HANDOFF_SEC) {
        handoffDoneRef.current = true;
        other.currentTime = 0;
        other.play().catch(() => { });
        setActiveVideo(isA ? 1 : 0);
      }
    };

    const onCanPlayA = (e: Event) => handleCanPlay(e);
    const onCanPlayB = (e: Event) => handleCanPlay(e);
    const onErrorA = (e: Event) => handleError(e);
    const onErrorB = (e: Event) => handleError(e);
    const onTimeUpdateA = (e: Event) => handleTimeUpdate(e);
    const onTimeUpdateB = (e: Event) => handleTimeUpdate(e);

    videoA.addEventListener('canplay', onCanPlayA);
    videoA.addEventListener('canplaythrough', onCanPlayA);
    videoA.addEventListener('error', onErrorA);
    videoA.addEventListener('timeupdate', onTimeUpdateA);
    videoB.addEventListener('canplay', onCanPlayB);
    videoB.addEventListener('canplaythrough', onCanPlayB);
    videoB.addEventListener('error', onErrorB);
    videoB.addEventListener('timeupdate', onTimeUpdateB);

    if (videoA.readyState === 0) videoA.load();
    if (videoB.readyState === 0) videoB.load();
    if (!prefersReducedMotion && videoA.readyState >= 2) videoA.play().catch(() => { });

    return () => {
      videoA.removeEventListener('canplay', onCanPlayA);
      videoA.removeEventListener('canplaythrough', onCanPlayA);
      videoA.removeEventListener('error', onErrorA);
      videoA.removeEventListener('timeupdate', onTimeUpdateA);
      videoB.removeEventListener('canplay', onCanPlayB);
      videoB.removeEventListener('canplaythrough', onCanPlayB);
      videoB.removeEventListener('error', onErrorB);
      videoB.removeEventListener('timeupdate', onTimeUpdateB);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dual-video background: alternate which is on top for seamless loop (no seek on visible video) */}
      <video
        ref={videoARef}
        autoPlay={!prefersReducedMotion}
        muted
        playsInline
        preload="metadata"
        poster={HERO_VIDEO_POSTER}
        className="absolute inset-0 w-full h-full object-cover hero-video-dark-invert transition-all duration-700"
        style={{
          objectPosition: 'center',
          display: mediaType === 'video' ? 'block' : 'none',
          zIndex: activeVideo === 0 ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="metadata"
        poster={HERO_VIDEO_POSTER}
        className="absolute inset-0 w-full h-full object-cover hero-video-dark-invert transition-all duration-700"
        style={{
          objectPosition: 'center',
          display: mediaType === 'video' ? 'block' : 'none',
          zIndex: activeVideo === 1 ? 1 : 0,
        }}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* GIF Background */}
      {mediaType === 'gif' && (
        <img
          src="/hero.gif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setMediaLoaded(true)}
          aria-hidden="true"
        />
      )}

      {/* SVG Placeholder Animation */}
      {mediaType === 'placeholder' && (
        <PlaceholderAnimation reducedMotion={prefersReducedMotion || false} />
      )}

      {/* Overlay - Only show for placeholder, not for video */}
      {mediaType !== 'video' && (
        <div className="absolute inset-0 brand-overlay" aria-hidden="true" />
      )}

      {/* === LAYER A: Text protection ===
          Dark gradient at the top — keeps text readable in BOTH light and dark mode
          regardless of what the background animation is doing.
          Never use bg-primary here — grey in light mode kills contrast. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)',
          zIndex: 2,
        }}
        aria-hidden="true"
      />

      {/* === LAYER B: Bottom page fade ===
          Fades the hero into the page background colour so there's no hard cut.
          Uses bg-primary so it always matches the next section's canvas colour. */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '45%',
          background: 'linear-gradient(to bottom, transparent 0%, rgb(var(--color-bg-primary)) 100%)',
          zIndex: 3,
        }}
        aria-hidden="true"
      />

      {/* Caption */}
      {mediaType === 'placeholder' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ zIndex: 4 }}>
          <span className="text-charcoal-400 text-xs tracking-wider uppercase opacity-60">
            Motion reveal in progress
          </span>
        </div>
      )}
    </div>
  );
}

function PlaceholderAnimation({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute inset-0 bg-primary">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(236, 50, 55, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 100%, rgba(164, 207, 76, 0.1) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Animated Waves SVG - Brand Colors */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Red wave gradients */}
          <linearGradient id="redWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(236, 50, 55, 0.08)" />
            <stop offset="50%" stopColor="rgba(236, 50, 55, 0.15)" />
            <stop offset="100%" stopColor="rgba(236, 50, 55, 0.08)" />
          </linearGradient>
          <linearGradient id="redWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(237, 161, 167, 0.1)" />
            <stop offset="50%" stopColor="rgba(237, 161, 167, 0.18)" />
            <stop offset="100%" stopColor="rgba(237, 161, 167, 0.1)" />
          </linearGradient>
          {/* Green wave gradients */}
          <linearGradient id="greenWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(164, 207, 76, 0.08)" />
            <stop offset="50%" stopColor="rgba(164, 207, 76, 0.15)" />
            <stop offset="100%" stopColor="rgba(164, 207, 76, 0.08)" />
          </linearGradient>
          <linearGradient id="greenWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(138, 184, 58, 0.06)" />
            <stop offset="50%" stopColor="rgba(138, 184, 58, 0.12)" />
            <stop offset="100%" stopColor="rgba(138, 184, 58, 0.06)" />
          </linearGradient>
        </defs>

        {/* Red Wave 1 - Top */}
        <motion.path
          d="M0 200 Q 360 150 720 200 T 1440 200 L 1440 0 L 0 0 Z"
          fill="url(#redWaveGradient1)"
          initial={{ y: 0 }}
          animate={reducedMotion ? {} : { y: [0, -15, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Red Wave 2 */}
        <motion.path
          d="M0 280 Q 360 230 720 280 T 1440 280 L 1440 100 L 0 100 Z"
          fill="url(#redWaveGradient2)"
          initial={{ y: 0 }}
          animate={reducedMotion ? {} : { y: [0, 12, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3,
          }}
        />

        {/* Green Wave 1 - Bottom */}
        <motion.path
          d="M0 550 Q 360 500 720 550 T 1440 550 L 1440 350 L 0 350 Z"
          fill="url(#greenWaveGradient1)"
          initial={{ y: 0 }}
          animate={reducedMotion ? {} : { y: [0, 18, 0] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />

        {/* Green Wave 2 */}
        <motion.path
          d="M0 650 Q 360 600 720 650 T 1440 650 L 1440 450 L 0 450 Z"
          fill="url(#greenWaveGradient2)"
          initial={{ y: 0 }}
          animate={reducedMotion ? {} : { y: [0, -10, 0] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        {/* Subtle particles/dots in brand colors */}
        {!reducedMotion && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={`red-${i}`}
                cx={80 + (i * 120)}
                cy={150 + (i % 3) * 80}
                r={2 + (i % 3)}
                fill={i % 2 === 0 ? 'rgba(236, 50, 55, 0.25)' : 'rgba(237, 161, 167, 0.3)'}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={`green-${i}`}
                cx={100 + (i * 120)}
                cy={500 + (i % 3) * 80}
                r={2 + (i % 3)}
                fill={i % 2 === 0 ? 'rgba(164, 207, 76, 0.25)' : 'rgba(138, 184, 58, 0.3)'}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Center focal element with brand gradient */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-72 h-72 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 50, 55, 0.06) 0%, rgba(164, 207, 76, 0.04) 50%, transparent 70%)',
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={reducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
