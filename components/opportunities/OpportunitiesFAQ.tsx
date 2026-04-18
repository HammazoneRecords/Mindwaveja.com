"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need any experience?",
    a: "No. If you can listen and type, you can transcribe. We provide guidelines and examples to get you started.",
  },
  {
    q: "How do I get paid?",
    a: "After your transcription is graded and approved, payment is sent within 3 business days. Transcribers with a strong track record get same-day grading and payment.",
  },
  {
    q: "What if my transcription has errors?",
    a: "The grader will correct minor errors and you still get paid. If accuracy is too low, you'll get feedback to improve. Repeated low-quality submissions may reduce your priority in the queue.",
  },
  {
    q: "Can I pick which videos to transcribe?",
    a: "Yes. You browse available jobs and choose what interests you. Longer and more complex videos pay more.",
  },
  {
    q: "How do voucher rewards work?",
    a: "Certain transcription jobs are tagged as voucher rewards — instead of JMD cash, you earn a meal voucher, data top-up, or movie ticket. These are clearly labeled before you accept the job.",
  },
  {
    q: "How do I become a contractor (grader)?",
    a: "Grader positions are offered to transcribers who consistently deliver high-accuracy work. Once invited, you review others' transcriptions and earn J$20,000 per week.",
  },
  {
    q: "What does 'next tier starts after 30 seconds' mean?",
    a: "If a video is 10 minutes and 25 seconds, it still counts as the 3–10 minute tier. The higher rate only kicks in after 10 minutes and 30 seconds.",
  },
  {
    q: "What are the long video bonus rewards?",
    a: "Videos over 40 minutes earn a bonus reward on top of the base JMD payout — you pick one from the reward list (voucher, gift card, top-up, etc.). Videos over 60 minutes get even better: you pick one reward AND receive a second surprise random reward.",
  },
  {
    q: "I'm new — how many videos can I do per day?",
    a: "New transcribers start with 1–2 short videos (under 3 minutes) per day. This helps you build your accuracy score at a comfortable pace. Once you've established a track record, the full job board opens up.",
  },
];

export function OpportunitiesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "rgb(var(--color-bg-primary))" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: "rgb(var(--color-border-primary))",
                backgroundColor: "rgb(var(--color-bg-secondary))",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span
                  className="font-semibold text-sm sm:text-base pr-4"
                  style={{ color: "rgb(var(--color-text-primary))" }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  style={{ color: "rgb(var(--color-text-tertiary))" }}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p
                      className="px-6 pb-4 text-sm leading-relaxed"
                      style={{ color: "rgb(var(--color-text-secondary))" }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
