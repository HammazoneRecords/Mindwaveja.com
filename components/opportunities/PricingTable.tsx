"use client";

import { motion } from "framer-motion";

const tiers = [
  { duration: "Under 3 minutes", pay: "200", note: "Quick clips, reels, shorts" },
  { duration: "3 – 10 minutes", pay: "500", note: "Standard social media videos" },
  { duration: "10 – 20 minutes", pay: "900", note: "Interviews, vlogs, tutorials" },
  { duration: "20 – 45 minutes", pay: "1,380", note: "Podcasts, deep dives" },
  { duration: "45 – 70 minutes", pay: "3,500", note: "Full lectures, documentaries" },
];

const contractorInfo = {
  pay: "20,000",
  role: "Grader / Quality Reviewer",
  schedule: "Weekly payout",
};

export function PricingTable() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "rgb(var(--color-bg-primary))" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Transcriber Pay Rates
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            Paid per video based on duration. The next tier starts after 30
            seconds past the boundary — no guesswork.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border overflow-hidden mb-12"
          style={{
            borderColor: "rgb(var(--color-border-primary))",
            backgroundColor: "rgb(var(--color-bg-secondary))",
          }}
        >
          {/* Header */}
          <div
            className="grid grid-cols-3 px-6 py-4 text-sm font-semibold border-b"
            style={{
              borderColor: "rgb(var(--color-border-primary))",
              color: "rgb(var(--color-text-tertiary))",
            }}
          >
            <span>Video Length</span>
            <span className="text-center">Pay (JMD)</span>
            <span className="text-right hidden sm:block">Content Type</span>
          </div>

          {/* Rows */}
          {tiers.map((tier, i) => (
            <div
              key={tier.duration}
              className="grid grid-cols-3 items-center px-6 py-5 border-b last:border-b-0 transition-colors hover:bg-opacity-50"
              style={{
                borderColor: "rgb(var(--color-border-primary))",
                backgroundColor:
                  i % 2 === 0
                    ? "transparent"
                    : "rgba(var(--color-bg-primary), 0.5)",
              }}
            >
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: "rgb(var(--color-text-primary))" }}
              >
                {tier.duration}
              </span>
              <span
                className="text-center text-xl sm:text-2xl font-bold"
                style={{ color: "rgb(var(--color-brand-green))" }}
              >
                ${tier.pay}
              </span>
              <span
                className="text-right text-sm hidden sm:block"
                style={{ color: "rgb(var(--color-text-tertiary))" }}
              >
                {tier.note}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Contractor Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border p-8 text-center"
          style={{
            borderColor: "rgb(var(--color-brand-red))",
            backgroundColor: "rgb(var(--color-bg-secondary))",
          }}
        >
          <p
            className="text-sm font-semibold tracking-wider uppercase mb-2"
            style={{ color: "rgb(var(--color-brand-red))" }}
          >
            Contractor Position
          </p>
          <h3
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            {contractorInfo.role}
          </h3>
          <p
            className="text-4xl font-bold mb-2"
            style={{ color: "rgb(var(--color-brand-green))" }}
          >
            ${contractorInfo.pay}
            <span
              className="text-base font-normal ml-1"
              style={{ color: "rgb(var(--color-text-tertiary))" }}
            >
              JMD / week
            </span>
          </p>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            Review and grade transcriptions for accuracy. Steady weekly income
            with room to grow into a team lead position.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
