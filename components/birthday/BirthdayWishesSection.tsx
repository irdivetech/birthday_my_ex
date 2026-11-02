"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayData } from "@/data/birthday";

export interface BirthdayWishesSectionProps {
  onNext?: () => void;
  className?: string;
}

export const BirthdayWishesSection: React.FC<BirthdayWishesSectionProps> = ({
  onNext,
  className = "",
}) => {
  const triggerSparkles = () => {
    try {
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors,
      });
    } catch {
      // Fallback
    }
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] md:w-[700px] h-[340px] sm:h-[560px] md:h-[700px] rounded-full bg-[#f472b6]/15 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] rounded-full bg-[#a855f7]/15 blur-[110px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "12%", left: "18%", size: 2, delay: "0.2s" },
          { top: "28%", left: "84%", size: 3, delay: "1.4s" },
          { top: "68%", left: "14%", size: 2, delay: "2.3s" },
          { top: "78%", left: "80%", size: 2.5, delay: "1.1s" },
          { top: "40%", left: "8%", size: 1.5, delay: "1.8s" },
        ].map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#fce7f3] star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              boxShadow: "0 0 10px rgba(244, 114, 182, 0.75)",
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* Centered Dark Glassmorphism Wishes Card                      */}
      {/* ============================================================ */}
      <div className="relative max-w-2xl w-full mx-auto z-10 flex flex-col items-center">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ A HEARTFELT PRAYER ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* The Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          className="relative w-full rounded-3xl p-7 sm:p-12 bg-[#1b0c23]/85 backdrop-blur-2xl border border-pink-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] text-center overflow-hidden"
        >
          {/* Subtle top light highlight inside glass */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-200/40 to-transparent" />

          {/* Large Title: Birthday Wishes */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.35)] mb-2">
            Birthday Wishes
          </h2>

          {/* Subtitle: Happy Birthday, my love 🤍 */}
          <p className="font-serif italic text-xl sm:text-2xl text-pink-300 font-light mb-8">
            Happy Birthday, my love 🤍
          </p>

          {/* Heartfelt Prayer Paragraphs */}
          <div className="space-y-4 sm:space-y-5 font-serif text-sm sm:text-base md:text-lg leading-relaxed text-[#fce7f3]/90 text-center max-w-xl mx-auto">
            <p>
              &ldquo;I wish you happiness, health, success, and endless blessings. May every step you take be filled with kindness, every dream you pursue find its sweetest way to come true, and every tomorrow be brighter than yesterday.&rdquo;
            </p>

            <p className="text-pink-100/80 font-light">
              Semoga hari-harimu selalu dikelilingi orang-orang yang tulus mencintaimu, hatimu selalu tenang dalam lindungan terbaik, dan senyuman manismu tidak pernah padam. Kamu adalah kado terindah di hidupku, dan aku akan selalu mendoakan yang terbaik untukmu.
            </p>
          </div>

          {/* Glowing Heart Icon Centerpiece */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            onClick={triggerSparkles}
            className="my-8 sm:my-10 inline-flex flex-col items-center cursor-pointer group"
            title="Klik untuk menyalakan cinta ✨"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-pink-500/15 border border-[#f472b6]/40 flex items-center justify-center shadow-[0_0_25px_rgba(244,114,182,0.4)] group-hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] group-hover:border-pink-300 transition-all duration-300">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#f472b6] fill-[#f472b6] animate-pulse drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
              <div className="absolute inset-0 rounded-full bg-[#f472b6]/20 blur-md pointer-events-none" />
            </div>
            <span className="font-sans text-[11px] text-pink-300/70 tracking-wider mt-2 group-hover:text-pink-200 transition-colors">
              tap the heart ♡
            </span>
          </motion.div>

          {/* Bottom Pill-Shaped Button: ONE MORE THING ✦ */}
          <div className="pt-2">
            <button
              onClick={onNext}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-full border border-[#f472b6]/60 bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 text-white shadow-[0_0_25px_rgba(244,114,182,0.45)] hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 font-sans tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
              aria-label="Lanjut ke bagian penutup: One more thing"
            >
              <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-bold">ONE MORE THING ✦</span>
              <ChevronRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayWishesSection;

