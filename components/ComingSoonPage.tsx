'use client';

import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';

interface Feature {
  title: string;
  description: string;
}

interface ComingSoonPageProps {
  title: string;
  description: string;
  features: Feature[];
}

export function ComingSoonPage({ title, description, features }: ComingSoonPageProps) {
  return (
    <section className="min-h-screen pt-32 pb-20 sm:pt-40 bg-cream-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="wave" size="md" className="mb-6">
            Coming Soon
          </Badge>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Infinite Looping Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 rounded-3xl overflow-hidden shadow-card bg-charcoal-900 aspect-video relative"
        >
          {/* Video container - will loop infinitely */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Placeholder for video - replace with actual video element when ready */}
            <div className="relative w-full h-full bg-gradient-to-br from-charcoal-800 to-charcoal-900">
              {/* Animated wave pattern as placeholder until video is added */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                viewBox="0 0 1440 800"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#EC3237" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#A4CF4C" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#EC3237" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0 400 Q 360 300 720 400 T 1440 400"
                  stroke="url(#waveGrad1)"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </svg>
              
              {/* Centered text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="text-6xl mb-4">🚧</div>
                    <p className="text-cream-100 text-lg font-medium">
                      Building Something Amazing
                    </p>
                    <p className="text-charcoal-300 text-sm mt-2">
                      Video preview coming soon
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* 
              TO ADD ACTUAL VIDEO:
              Replace the placeholder div above with:
              
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/coming-soon-loop.mp4" type="video/mp4" />
              </video>
            */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white border border-charcoal-100 rounded-2xl p-6 shadow-soft"
            >
              <div className="w-10 h-10 bg-wave-50 rounded-xl flex items-center justify-center mb-4">
                <span className="text-wave-500 font-semibold">{index + 1}</span>
              </div>
              <h3 className="text-charcoal-900 font-semibold mb-2">{feature.title}</h3>
              <p className="text-charcoal-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-charcoal-500 mb-6">
            Want to be notified when this launches?
          </p>
          <Button href="/intake">
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
