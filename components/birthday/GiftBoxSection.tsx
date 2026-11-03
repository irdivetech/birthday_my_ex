"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { romanticAudio } from "@/utils/romanticAudio";
import { birthdayData } from "@/data/birthday";

export interface GiftBoxSectionProps {
  onOpen?: () => void;
  className?: string;
}

export const GiftBoxSection: React.FC<GiftBoxSectionProps> = ({
  onOpen,
  className = "",
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleBoxClick = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // Trigger onOpen immediately so sound starts exactly when the gift box explodes
    if (onOpen) {
      onOpen();
    }

    // Confetti celebratory burst
    try {
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.55 },
        colors,
        ticks: 200,
        gravity: 0.85,
        scalar: 1.1,
      });

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.6 },
          colors,
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.6 },
          colors,
        });
      }, 200);
    } catch {
      // Ignore fallback
    }

    setTimeout(() => {
      setIsOpened(true);
    }, 250);
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-20 text-center select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* Centered Ambient Pink Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] md:w-[650px] h-[320px] sm:h-[520px] md:h-[650px] rounded-full bg-[#f472b6]/20 blur-[130px] pointer-events-none -z-10 animate-pulse-glow"
        aria-hidden="true"
      />

      {/* Secondary Soft Violet Aura */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[380px] h-[240px] sm:h-[380px] rounded-full bg-[#a855f7]/15 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "18%", left: "15%", size: 2, delay: "0.2s" },
          { top: "26%", left: "82%", size: 3, delay: "1.1s" },
          { top: "68%", left: "12%", size: 2, delay: "2.3s" },
          { top: "42%", left: "88%", size: 1.5, delay: "0.7s" },
          { top: "80%", left: "75%", size: 2.5, delay: "1.8s" },
          { top: "32%", left: "25%", size: 2, delay: "1.5s" },
          { top: "58%", left: "70%", size: 3, delay: "0.5s" },
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

      {/* Container */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center z-10 w-full">
        {/* Top text: ✦ ADA SESUATU UNTUKMU ✦ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)] transition-all duration-300 hover:border-[#f472b6]/60 hover:shadow-[0_0_25px_rgba(244,114,182,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ ADA SESUATU UNTUKMU ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* Minimalist Gift Box Graphic with Glowing Ribbon & Ambient Glow */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
          className="relative my-4 sm:my-8 flex flex-col items-center justify-center cursor-pointer group"
          onClick={handleBoxClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBoxClick();
            }
          }}
          aria-label="Buka kotak kado"
        >
          {/* Radial pedestal light under the gift box */}
          <div className="absolute -bottom-6 w-52 sm:w-64 h-12 bg-[#f472b6]/25 rounded-full blur-xl group-hover:bg-[#f472b6]/45 transition-all duration-500 pointer-events-none" />

          {/* Floating gift box wrapper */}
          <motion.div
            animate={
              isOpening
                ? { scale: [1, 1.12, 1.05], y: -10 }
                : { y: [0, -10, 0] }
            }
            transition={
              isOpening
                ? { duration: 0.5, ease: "easeInOut" }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative flex flex-col items-center"
          >
            {/* Box Lid & Glowing Ribbon Bow */}
            <motion.div
              animate={
                isOpening
                  ? { y: -70, rotate: -18, opacity: 0 }
                  : { y: 0, rotate: 0 }
              }
              transition={{ duration: 0.6, ease: "backOut" }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Glowing Ribbon Bow (Handcrafted SVG) */}
              <div className="relative -mb-1 flex items-center justify-center drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]">
                <svg
                  className="w-20 h-14 sm:w-24 sm:h-16 text-[#f472b6]"
                  viewBox="0 0 100 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left Bow Loop */}
                  <path
                    d="M50 35 C30 10, 5 20, 10 38 C14 50, 36 44, 50 35 Z"
                    fill="url(#ribbonGradient)"
                    stroke="#fbcfe8"
                    strokeWidth="1.5"
                  />
                  {/* Right Bow Loop */}
                  <path
                    d="M50 35 C70 10, 95 20, 90 38 C86 50, 64 44, 50 35 Z"
                    fill="url(#ribbonGradient)"
                    stroke="#fbcfe8"
                    strokeWidth="1.5"
                  />
                  {/* Ribbon Tails */}
                  <path
                    d="M44 38 Q32 55 24 58"
                    stroke="url(#ribbonGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M56 38 Q68 55 76 58"
                    stroke="url(#ribbonGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Center Ribbon Knot */}
                  <circle
                    cx="50"
                    cy="35"
                    r="7"
                    fill="#f472b6"
                    stroke="#fdf2f8"
                    strokeWidth="1.5"
                  />
                  {/* Star sparkle in knot */}
                  <circle cx="50" cy="35" r="2.5" fill="#fff" />
                  <defs>
                    <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="50%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* The Lid Itself */}
              <div className="relative w-44 sm:w-56 h-10 sm:h-12 rounded-xl bg-gradient-to-b from-[#2e123b] via-[#220c2e] to-[#16061f] border border-[#f472b6]/50 shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-center justify-center overflow-hidden">
                {/* Horizontal Ribbon Across Lid */}
                <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-[#ec4899] via-[#f472b6] to-[#ec4899] shadow-[0_0_12px_rgba(244,114,182,0.8)] border-y border-pink-200/40" />
                {/* Vertical Ribbon Center Lid */}
                <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-[#ec4899] via-[#f472b6] to-[#ec4899] shadow-[0_0_12px_rgba(244,114,182,0.8)] border-x border-pink-200/40" />
                {/* Lid top highlight rim */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30" />
              </div>
            </motion.div>

            {/* The Box Body */}
            <div className="relative -mt-1 w-40 sm:w-52 h-36 sm:h-44 rounded-b-2xl rounded-t-sm bg-gradient-to-b from-[#220c2e] via-[#1a0724] to-[#12041a] border-x border-b border-[#f472b6]/40 shadow-[0_15px_35px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.15)] flex items-center justify-center overflow-hidden group-hover:border-[#f472b6]/70 transition-colors duration-300">
              {/* Internal burst glow during opening */}
              <AnimatePresence>
                {isOpening && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.8, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-gradient-to-t from-pink-400 via-rose-300 to-amber-200 rounded-b-2xl blur-md"
                  />
                )}
              </AnimatePresence>

              {/* Vertical Glowing Ribbon */}
              <div className="absolute inset-y-0 w-6 bg-gradient-to-b from-[#ec4899] via-[#f472b6] to-[#db2777] shadow-[0_0_14px_rgba(244,114,182,0.75)] border-x border-pink-200/40" />

              {/* Horizontal Glowing Ribbon */}
              <div className="absolute inset-x-0 h-5 bg-gradient-to-r from-[#ec4899] via-[#f472b6] to-[#db2777] shadow-[0_0_14px_rgba(244,114,182,0.75)] border-y border-pink-200/40" />

              {/* Central Ribbon Intersection Gem */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 text-[#ec4899] fill-[#ec4899]" />
              </div>

              {/* Subtle box sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom instruction: ✨ klik untuk membuka hadiahmu ✨ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-6 sm:mt-10"
        >
          <button
            onClick={handleBoxClick}
            className="group inline-flex items-center gap-2 font-serif italic text-base sm:text-lg text-pink-200 hover:text-white transition-colors duration-300 drop-shadow-[0_0_12px_rgba(244,114,182,0.5)] focus:outline-none"
            aria-label="Klik untuk membuka hadiahmu"
          >
            <Sparkles className="w-4 h-4 text-[#f472b6] group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 animate-pulse" />
            <span className="tracking-wide">✨ klik untuk membuka hadiahmu ✨</span>
            <Sparkles className="w-4 h-4 text-[#f472b6] group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300 animate-pulse" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftBoxSection;

