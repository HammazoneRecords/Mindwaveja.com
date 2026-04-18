"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, Banknote, Star } from "lucide-react";

const steps = [
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Pick a Video",
    description:
      "Browse available YouTube or social media videos. Choose one that matches your vibe and language comfort.",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Transcribe It",
    description:
      "Watch the video and type out what's being said — word for word. Upload your transcription when done.",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Grading (1–3 Days)",
    description:
      "A contracted grader reviews your work for accuracy and makes corrections. Standard turnaround is 3 days — trusted transcribers get same-day.",
  },
  {
    icon: <Banknote className="w-8 h-8" />,
    title: "Get Paid",
    description:
      "Once graded and approved, you receive your JMD payout. Good history = faster payments and priority access to higher-value jobs.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "rgb(var(--color-bg-secondary))" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            How It Works
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            Four simple steps from signup to payout. No experience needed — just
            ears and a keyboard.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="relative text-center p-6 rounded-2xl border"
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
                borderColor: "rgb(var(--color-border-primary))",
              }}
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  backgroundColor: "rgb(var(--color-brand-red))",
                  color: "#ffffff",
                }}
              >
                {i + 1}
              </div>
              <div
                className="flex justify-center mb-4 mt-2"
                style={{ color: "rgb(var(--color-brand-green))" }}
              >
                {step.icon}
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "rgb(var(--color-text-primary))" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
