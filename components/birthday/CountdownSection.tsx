"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, Heart, Clock } from "lucide-react";
import confetti from "canvas-confetti";

export interface CountdownSectionProps {
  /** Optional custom target date. Defaults to November 21 (00:00:00) */
  targetDate?: Date | string;
  /** Callback triggered when the 'OPEN HER GIFT' button is clicked */
  onOpenGift?: () => void;
  /** Optional section HTML id */
  id?: string;
  /** Optional container class overrides */
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTargetReached: boolean;
  totalMilliseconds: number;
}

// Fixed or calculated default target date: November 21 (00:00:00)
function resolveTargetDate(customTarget?: Date | string): Date {
  if (customTarget) {
    return new Date(customTarget);
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  // Month is 0-indexed in JS Date: 10 represents November
  const targetThisYear = new Date(currentYear, 10, 21, 0, 0, 0, 0);

  // If Nov 21 has already passed by more than 24 hours, roll forward to next year's Nov 21
  const oneDayPast = new Date(targetThisYear.getTime() + 24 * 60 * 60 * 1000);
  if (now.getTime() > oneDayPast.getTime()) {
    return new Date(currentYear + 1, 10, 21, 0, 0, 0, 0);
  }

  return targetThisYear;
}

function calculateTimeRemaining(target: Date): TimeRemaining {
  const now = new Date().getTime();
  const targetTime = target.getTime();
  const difference = targetTime - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isTargetReached: true,
      totalMilliseconds: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isTargetReached: false,
    totalMilliseconds: difference,
  };
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  targetDate,
  onOpenGift,
  id = "countdown",
  className = "",
}) => {
  const resolvedTarget = useMemo(() => resolveTargetDate(targetDate), [targetDate]);

  // Prevent SSR hydration mismatch by initializing with null / mounted check
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTargetReached: false,
    totalMilliseconds: 0,
  });

  useEffect(() => {
    setIsMounted(true);
    // Initial immediate calculation on client
    setTimeLeft(calculateTimeRemaining(resolvedTarget));

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(resolvedTarget));
    }, 1000);

    return () => clearInterval(interval);
  }, [resolvedTarget]);

  // Celebratory confetti burst when opening gift
  const handleOpenGiftClick = useCallback(() => {
    try {
      // Romantic pink, rose, gold & champagne confetti
      const romanticColors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: romanticColors,
        ticks: 200,
        gravity: 0.9,
        scalar: 1.1,
      });

      // Secondary side bursts
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: romanticColors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: romanticColors,
        });
      }, 250);
    } catch {
      // Fallback gracefully if canvas is unavailable
    }

    if (onOpenGift) {
      onOpenGift();
    }
  }, [onOpenGift]);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const countdownUnits = [
    { label: "HARI", value: isMounted ? padZero(timeLeft.days) : "--" },
    { label: "JAM", value: isMounted ? padZero(timeLeft.hours) : "--" },
    { label: "MENIT", value: isMounted ? padZero(timeLeft.minutes) : "--" },
    { label: "DETIK", value: isMounted ? padZero(timeLeft.seconds) : "--" },
  ];

  return (
    <section
      id={id}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-20 text-center select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* ============================================================ */}
      {/* 1. Atmospheric Background Layers & Centered Pink Glow       */}
      {/* ============================================================ */}

      {/* Primary centered ambient soft pink glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[680px] h-[300px] sm:h-[500px] md:h-[680px] rounded-full bg-[#f472b6]/15 blur-[120px] sm:blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Secondary deep plum ambient aura */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[380px] h-[220px] sm:h-[380px] rounded-full bg-[#a855f7]/10 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Subtle twinkling romantic starfield */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "14%", left: "12%", size: 2, delay: "0s" },
          { top: "22%", left: "84%", size: 2.5, delay: "1.4s" },
          { top: "72%", left: "16%", size: 2, delay: "2.1s" },
          { top: "38%", left: "78%", size: 1.5, delay: "0.8s" },
          { top: "82%", left: "82%", size: 2.5, delay: "1.9s" },
          { top: "28%", left: "30%", size: 2, delay: "1.2s" },
          { top: "64%", left: "68%", size: 3, delay: "0.4s" },
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
              boxShadow: "0 0 10px rgba(244, 114, 182, 0.7)",
            }}
          />
        ))}
      </div>

      {/* Vignette border */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,4,14,0.75)_100%)] pointer-events-none -z-10" />

      {/* ============================================================ */}
      {/* 2. Main Content Container                                   */}
      {/* ============================================================ */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center z-10 w-full">
        {/* Top Badge: ✦ MENGHITUNG HARI ✦ */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)] transition-all duration-300 hover:border-[#f472b6]/60 hover:shadow-[0_0_25px_rgba(244,114,182,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ MENGHITUNG HARI ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* Main Headings */}
        <div className="mb-4 sm:mb-6 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.3)] leading-tight"
          >
            Her Special Day
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
            className="font-serif italic font-light text-pink-300 text-3xl sm:text-5xl md:text-6xl mt-1 sm:mt-2 tracking-wide drop-shadow-[0_2px_14px_rgba(244,114,182,0.35)]"
          >
            is Coming
          </motion.span>
        </div>

        {/* Subtitle / Catatan Kecil */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-sans text-sm sm:text-base md:text-lg text-pink-100/80 tracking-wide max-w-lg mb-10 sm:mb-14 px-4 font-light"
        >
          Sesuatu yang indah sedang menunggu untukmu 🤍
        </motion.p>

        {/* ============================================================ */}
        {/* 3. Countdown Timer: 4 Glassmorphism Cards Separated by ':'  */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl px-2 sm:px-4 mb-10 sm:mb-14"
        >
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
            {countdownUnits.map((unit, index) => (
              <React.Fragment key={unit.label}>
                {/* Glassmorphic Time Card */}
                <div className="group relative flex-1 min-w-[68px] sm:min-w-[96px] md:min-w-[110px] max-w-[130px]">
                  {/* Subtle outer glow on hover */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-[#f472b6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                  <div className="relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-pink-300/20 shadow-[0_8px_32px_0_rgba(15,5,20,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:border-[#f472b6]/50 hover:bg-white/[0.07] transition-all duration-300">
                    {/* Time digits */}
                    <div className="relative overflow-hidden h-9 sm:h-14 md:h-16 flex items-center justify-center">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={unit.value}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fce7f3] tracking-tight drop-shadow-[0_2px_8px_rgba(244,114,182,0.2)]"
                        >
                          {unit.value}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Unit Label */}
                    <span className="font-sans text-[9px] sm:text-[11px] md:text-xs font-semibold tracking-[0.22em] text-pink-200/75 uppercase mt-1 sm:mt-2">
                      {unit.label}
                    </span>
                  </div>
                </div>

                {/* Colon Separator between cards */}
                {index < countdownUnits.length - 1 && (
                  <div
                    className="flex flex-col items-center justify-center pb-4 sm:pb-6 select-none"
                    aria-hidden="true"
                  >
                    <span className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#f472b6] font-bold animate-pulse leading-none opacity-80 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]">
                      :
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* 4. Bottom Section: Dynamic Status & Glowing Button          */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="flex flex-col items-center w-full px-4"
        >
          {/* Dynamic Status Text */}
          <div className="mb-6 flex items-center gap-2">
            {timeLeft.isTargetReached ? (
              <span className="inline-flex items-center gap-2 font-serif italic text-sm sm:text-base text-pink-200 drop-shadow-sm">
                <Sparkles className="w-4 h-4 text-[#f472b6] animate-spin" style={{ animationDuration: "6s" }} />
                <span>Hari ini adalah hari spesialnya! ✨</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm text-pink-200/80 tracking-wide">
                <Clock className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
                <span>Tunggu sampai waktunya tiba...</span>
              </span>
            )}
          </div>

          {/* Interactive Pill-Shaped CTA Button */}
          <button
            onClick={handleOpenGiftClick}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-sans font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm text-[#fce7f3] border border-[#f472b6]/60 bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 backdrop-blur-md shadow-[0_0_25px_rgba(244,114,182,0.4)] hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] hover:border-pink-300 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f472b6] focus:ring-offset-2 focus:ring-offset-[#100718]"
            aria-label="Open her birthday gift"
          >
            {/* Ambient hover glow inside button */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-[#f472b6] to-rose-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 pointer-events-none" />

            {/* Icon */}
            <Gift className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-pink-100 group-hover:rotate-12 transition-transform duration-300" />

            {/* Button Text */}
            <span className="relative z-10 font-bold drop-shadow-sm">
              ✦ OPEN HER GIFT ✦
            </span>

            {/* Star icon */}
            <Sparkles className="relative z-10 w-4 h-4 text-pink-200 group-hover:scale-125 transition-transform duration-300" />
          </button>

          {/* Small decorative heart line at the very bottom */}
          <div className="flex items-center justify-center gap-2 mt-8 text-pink-400/40 text-xs">
            <span className="w-8 sm:w-12 h-[1px] bg-pink-400/20" />
            <Heart className="w-3 h-3 text-[#f472b6] fill-[#f472b6]/30" />
            <span className="w-8 sm:w-12 h-[1px] bg-pink-400/20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownSection;

