"use client";

import { motion } from "framer-motion";

export function OpportunitiesCTA() {
  return (
    <section
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "rgb(var(--color-bg-secondary))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto text-center rounded-3xl p-10 sm:p-14 border"
        style={{
          backgroundColor: "rgb(var(--color-bg-primary))",
          borderColor: "rgb(var(--color-border-primary))",
        }}
      >
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "rgb(var(--color-text-primary))" }}
        >
          Ready fi Earn?
        </h2>
        <p
          className="text-base mb-8"
          style={{ color: "rgb(var(--color-text-secondary))" }}
        >
          Sign up, pick a video, and start your first transcription today. No
          interview. No resume. Just show up and deliver.
        </p>
        <a
          href="https://earn.mindwaveja.com/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-base transition-all hover:scale-105"
          style={{
            backgroundColor: "rgb(var(--color-brand-red))",
            color: "#ffffff",
          }}
        >
          Sign Up Now
        </a>
        <p
          className="text-xs mt-4"
          style={{ color: "rgb(var(--color-text-tertiary))" }}
        >
          Currently accepting transcribers across Jamaica
        </p>
      </motion.div>
    </section>
  );
}
