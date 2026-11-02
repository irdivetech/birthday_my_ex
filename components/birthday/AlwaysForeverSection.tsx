"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayData } from "@/data/birthday";

export interface AlwaysForeverSectionProps {
  onReplay?: () => void;
  className?: string;
}

export const AlwaysForeverSection: React.FC<AlwaysForeverSectionProps> = ({
  onReplay,
  className = "",
}) => {
  const romanticPhrases = [
    "Happy Birthday",
    "With All My Love",
    "Always & Forever",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);

  // Transitioning text every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % romanticPhrases.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [romanticPhrases.length]);

  const handleReplayClick = () => {
    try {
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors,
      });
    } catch {
      // Fallback
    }

    if (onReplay) {
      onReplay();
    }
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] text-center ${className}`}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] md:w-[750px] h-[340px] sm:h-[580px] md:h-[750px] rounded-full bg-[#f472b6]/20 blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] rounded-full bg-[#a855f7]/15 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "14%", left: "15%", size: 2.5, delay: "0.2s" },
          { top: "25%", left: "82%", size: 3, delay: "1.3s" },
          { top: "72%", left: "12%", size: 2, delay: "2.1s" },
          { top: "85%", left: "86%", size: 2.5, delay: "0.9s" },
          { top: "42%", left: "6%", size: 1.5, delay: "1.6s" },
          { top: "60%", left: "92%", size: 2, delay: "0.4s" },
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
              boxShadow: "0 0 10px rgba(244, 114, 182, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative max-w-3xl mx-auto flex flex-col items-center z-10 w-full px-4">
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ WITH ALL MY HEART ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* Transitioning Animated Headings: Happy Birthday / With All My Love / Always & Forever */}
        <div className="relative h-24 sm:h-32 md:h-36 w-full flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h2
              key={romanticPhrases[phraseIndex]}
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_30px_rgba(244,114,182,0.45)] absolute text-center w-full"
            >
              {romanticPhrases[phraseIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Dynamic Indicator Dots for the Phrases */}
        <div className="flex items-center gap-2 mb-8">
          {romanticPhrases.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                phraseIndex === idx
                  ? "w-8 bg-[#f472b6] shadow-[0_0_10px_rgba(244,114,182,0.8)]"
                  : "w-2 bg-pink-300/30"
              }`}
            />
          ))}
        </div>

        {/* Sub-texts */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-[#fce7f3]/90 max-w-xl mb-6 font-light"
        >
          &ldquo;Thank you for being part of my life. I hope this little gift can make your special day even more beautiful.&rdquo;
        </motion.p>

        {/* Signature: Forever yours 🤍 with glowing heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2">
            <span className="font-script text-3xl sm:text-4xl text-pink-300">
              Forever yours
            </span>
            <span className="text-xl">🤍</span>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <span className="w-12 sm:w-16 h-[1px] bg-pink-400/30" />
            <div className="relative">
              <Heart className="w-4 h-4 text-[#f472b6] fill-[#f472b6] animate-pulse drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]" />
              <div className="absolute inset-0 bg-[#f472b6]/30 blur-sm rounded-full pointer-events-none" />
            </div>
            <span className="w-12 sm:w-16 h-[1px] bg-pink-400/30" />
          </div>

          <span className="text-xs font-sans text-pink-200/60 uppercase tracking-[0.3em] mt-2">
            {birthdayData.recipient.name} ♡
          </span>
        </motion.div>

        {/* Pill-Shaped Action Button: ↺ REPLAY FROM START */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        >
          <button
            onClick={handleReplayClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full border border-[#f472b6]/60 bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 backdrop-blur-md text-white shadow-[0_0_25px_rgba(244,114,182,0.45)] hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 font-sans tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            aria-label="Putar ulang pengalaman dari awal"
          >
            <RotateCcw className="w-4 h-4 text-pink-200 group-hover:-rotate-90 transition-transform duration-500" />
            <span className="font-bold">↺ REPLAY FROM START</span>
            <Sparkles className="w-4 h-4 text-pink-200 group-hover:scale-125 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AlwaysForeverSection;

