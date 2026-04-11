'use client';

import { useEffect, useRef } from 'react';

const VIDEO_SRC = '/media/Black_Hole_Video_Simulation_Ready.mp4';

export function CommunityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        aria-label="Community background video"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
      {/* In-flow element so section has height (absolute child doesn't contribute) */}
      <div className="pointer-events-none h-screen w-full" aria-hidden="true" />
    </section>
  );
}
