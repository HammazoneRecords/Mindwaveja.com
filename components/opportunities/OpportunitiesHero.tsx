"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, Shield } from "lucide-react";

const highlights = [
  { icon: <DollarSign className="w-5 h-5" />, text: "Real JMD Payouts" },
  { icon: <Clock className="w-5 h-5" />, text: "3-Day Turnaround" },
  { icon: <Shield className="w-5 h-5" />, text: "Trusted Graders" },
];

export function OpportunitiesHero() {
  return (
    <section
      className="relative w-full min-h-[75vh] flex flex-col justify-center overflow-hidden pt-28 sm:pt-32 pb-16"
      style={{ backgroundColor: "rgb(var(--color-bg-primary))" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(var(--color-brand-green), 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(var(--color-brand-red), 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-wider uppercase mb-4"
          style={{ color: "rgb(var(--color-brand-green))" }}
        >
          Earn With MindWave
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          Transcribe. Earn. Grow.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          Get paid real JMD for transcribing YouTube videos and social media
          content. Fast payouts, meal vouchers, and a path to steady contract
          work — all from your phone or laptop.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {highlights.map((h) => (
            <div
              key={h.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(var(--color-brand-green), 0.1)",
                color: "rgb(var(--color-brand-green))",
              }}
            >
              {h.icon}
              {h.text}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-base transition-all hover:scale-105"
            style={{
              backgroundColor: "rgb(var(--color-brand-red))",
              color: "#ffffff",
            }}
          >
            Start Earning Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
