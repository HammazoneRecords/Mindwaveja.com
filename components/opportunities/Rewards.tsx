"use client";

import { motion } from "framer-motion";
import {
  Utensils,
  Fuel,
  Film,
  Wifi,
  Music,
  ShoppingBag,
  Trophy,
  TrendingUp,
  Users,
  Gift,
  Sparkles,
} from "lucide-react";

const voucherRewards = [
  { icon: <Utensils className="w-6 h-6" />, label: "KFC Meal Vouchers" },
  { icon: <Utensils className="w-6 h-6" />, label: "Burger King Vouchers" },
  { icon: <Utensils className="w-6 h-6" />, label: "Popeyes Vouchers" },
  { icon: <Utensils className="w-6 h-6" />, label: "Domino's Pizza Vouchers" },
  { icon: <Fuel className="w-6 h-6" />, label: "Gas Station Credits" },
  { icon: <Film className="w-6 h-6" />, label: "Movie Tickets" },
  { icon: <Wifi className="w-6 h-6" />, label: "Digicel / FLOW Top-Up" },
  { icon: <Music className="w-6 h-6" />, label: "Spotify / YouTube Premium Gift Codes" },
  { icon: <Gift className="w-6 h-6" />, label: "Amazon Gift Cards" },
  { icon: <ShoppingBag className="w-6 h-6" />, label: "MindWave Store Credit" },
];

const newUserPerks = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: "New Transcriber Welcome",
    description:
      "Brand new? Start with 1–2 short videos (under 3 minutes) per day while you get your footing. Build your accuracy score, then unlock the full job board.",
  },
];

const growthPerks = [
  {
    icon: <Trophy className="w-7 h-7" />,
    title: "Transcriber of the Week",
    description:
      "Top performers get featured on the site and priority access to premium jobs.",
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Tiered Badges",
    description:
      "Bronze, Silver, Gold, Diamond — higher tiers unlock better pay rates and same-day grading.",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Referral Bonus",
    description:
      "Bring a friend — when they complete their first transcription, you both earn a bonus.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export function Rewards() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "rgb(var(--color-bg-secondary))" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            More Than Just Cash
          </h2>
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            Special transcription jobs pay in meal vouchers, data top-ups, movie
            tickets, and more. Real rewards, not just numbers on a screen.
          </p>
        </div>

        {/* Voucher Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {voucherRewards.map((reward) => (
            <motion.div
              key={reward.label}
              variants={itemVariants}
              className="flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
                borderColor: "rgb(var(--color-border-primary))",
              }}
            >
              <div style={{ color: "rgb(var(--color-brand-red))" }}>
                {reward.icon}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "rgb(var(--color-text-primary))" }}
              >
                {reward.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* New User Perk */}
        <div className="mb-16">
          {newUserPerks.map((perk) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-2xl border text-center sm:text-left"
              style={{
                backgroundColor: "rgba(var(--color-brand-green), 0.06)",
                borderColor: "rgba(var(--color-brand-green), 0.3)",
              }}
            >
              <div
                className="flex-shrink-0"
                style={{ color: "rgb(var(--color-brand-green))" }}
              >
                {perk.icon}
              </div>
              <div>
                <h4
                  className="text-lg font-bold mb-1"
                  style={{ color: "rgb(var(--color-text-primary))" }}
                >
                  {perk.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgb(var(--color-text-secondary))" }}
                >
                  {perk.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Growth Perks */}
        <div className="text-center mb-10">
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: "rgb(var(--color-text-primary))" }}
          >
            Grow With Us
          </h3>
          <p
            className="text-base"
            style={{ color: "rgb(var(--color-text-secondary))" }}
          >
            The more you contribute, the more doors open.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {growthPerks.map((perk) => (
            <motion.div
              key={perk.title}
              variants={itemVariants}
              className="text-center p-6 rounded-2xl border"
              style={{
                backgroundColor: "rgb(var(--color-bg-primary))",
                borderColor: "rgb(var(--color-border-primary))",
              }}
            >
              <div
                className="flex justify-center mb-4"
                style={{ color: "rgb(var(--color-brand-green))" }}
              >
                {perk.icon}
              </div>
              <h4
                className="text-lg font-bold mb-2"
                style={{ color: "rgb(var(--color-text-primary))" }}
              >
                {perk.title}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgb(var(--color-text-secondary))" }}
              >
                {perk.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
