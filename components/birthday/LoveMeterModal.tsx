"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Heart, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

export interface LoveMeterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoveTier {
  min: number;
  max: number;
  label: string;
  emoji: string;
}

const LOVE_TIERS: LoveTier[] = [
  { min: 0, max: 15, label: "Masa cuma segini? Tekan lagii! 🥺", emoji: "🥺" },
  { min: 16, max: 35, label: "Dikit banget, buktiin dong! 😤", emoji: "😤" },
  { min: 36, max: 50, label: "Mulai kerasa sayangnya... 😏", emoji: "😏" },
  { min: 51, max: 70, label: "Hampir sampai! 🤩", emoji: "🤩" },
  { min: 71, max: 85, label: "Makin sayangg bangett! 🥰✨", emoji: "🥰" },
  { min: 86, max: 99, label: "Dikit lagii mentokk! 💖🔥", emoji: "😍" },
  { min: 100, max: 100, label: "CINTAKU UDAH FULL 100% UNTUKMU! 🥳🎉💕", emoji: "🥳" },
];

export const LoveMeterModal: React.FC<LoveMeterModalProps> = ({ isOpen, onClose }) => {
  const [percentage, setPercentage] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine current tier message and emoji
  const currentTier =
    LOVE_TIERS.find((t) => percentage >= t.min && percentage <= t.max) || LOVE_TIERS[0];

  const triggerCelebrationConfetti = useCallback(() => {
    try {
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.6 },
          colors,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.6 },
          colors,
        });
      }, 250);
    } catch {
      // Audio or canvas fallback
    }
  }, []);

  // Handle continuous fill when holding down the button
  useEffect(() => {
    if (isPressing && percentage < 100) {
      holdIntervalRef.current = setInterval(() => {
        setPercentage((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            setIsComplete(true);
            setIsPressing(false);
            triggerCelebrationConfetti();
            return 100;
          }
          return next;
        });
      }, 40); // 40ms * 100 = ~4 seconds to fill 100% if held continuously
    } else {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
    }

    return () => {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, [isPressing, percentage, triggerCelebrationConfetti]);

  // Handle click / tap increment
  const handleSingleTap = () => {
    if (percentage >= 100) return;
    setPercentage((prev) => {
      const next = Math.min(100, prev + 4);
      if (next >= 100) {
        setIsComplete(true);
        triggerCelebrationConfetti();
      }
      return next;
    });
  };

  const handleReset = () => {
    setPercentage(0);
    setIsComplete(false);
    setIsPressing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a040e]/90 backdrop-blur-xl -z-10"
        />

        {/* Ambient Center Glow */}
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-[#f472b6]/20 blur-[140px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-md w-full p-6 sm:p-8 rounded-3xl bg-[#1a0b22]/90 backdrop-blur-2xl border border-pink-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] text-center flex flex-col items-center"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-pink-300/20 text-pink-200 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Tutup Love Meter"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Badge: 💌 LOVE METER 💌 */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-400/40 bg-pink-500/10 text-pink-200 text-xs font-sans tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(244,114,182,0.25)]">
            <span>❤️</span>
            <span className="font-bold">LOVE METER</span>
            <span>❤️</span>
          </div>

          {/* Title: Seberapa Sayang Kamu Aku? */}
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#fce7f3] tracking-tight leading-snug mb-6 drop-shadow-[0_2px_15px_rgba(244,114,182,0.4)]">
            Seberapa Sayang <br /> Kamu Aku?
          </h2>

          {/* ============================================================ */}
          {/* SVG Heart Container with Dynamic Fill Level (Bottom to Top) */}
          {/* ============================================================ */}
          <div className="relative w-44 h-40 sm:w-52 sm:h-48 my-2 flex items-center justify-center">
            {/* Pulsing Aura behind heart */}
            <div
              className="absolute inset-0 rounded-full bg-[#f472b6]/25 blur-xl transition-all duration-300 pointer-events-none"
              style={{
                transform: `scale(${1 + percentage / 350})`,
                opacity: 0.3 + percentage / 150,
              }}
            />

            <svg
              className="w-full h-full filter drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]"
              viewBox="0 0 100 90"
            >
              <defs>
                {/* Heart Shape Mask */}
                <clipPath id="heartClip">
                  <path d="M50 85 C50 85 10 55 10 30 C10 12 25 5 38 12 C45 16 48 22 50 25 C52 22 55 16 62 12 C75 5 90 12 90 30 C90 55 50 85 50 85 Z" />
                </clipPath>

                {/* Heart Fill Gradient */}
                <linearGradient id="heartFillGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#db2777" />
                  <stop offset="45%" stopColor="#ec4899" />
                  <stop offset="85%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#fbcfe8" />
                </linearGradient>
              </defs>

              {/* Heart Background Base (Empty / Dark) */}
              <path
                d="M50 85 C50 85 10 55 10 30 C10 12 25 5 38 12 C45 16 48 22 50 25 C52 22 55 16 62 12 C75 5 90 12 90 30 C90 55 50 85 50 85 Z"
                fill="rgba(40, 16, 50, 0.6)"
              />

              {/* Dynamic Fill Liquid (Controlled via Y-offset from bottom) */}
              <g clipPath="url(#heartClip)">
                <rect
                  x="0"
                  y={`${100 - percentage}%`}
                  width="100"
                  height="100"
                  fill="url(#heartFillGrad)"
                  className="transition-all duration-150 ease-out"
                />

                {/* Shimmer wave effect across liquid top */}
                <rect
                  x="0"
                  y={`${Math.max(0, 100 - percentage - 2)}%`}
                  width="100"
                  height="4"
                  fill="rgba(255, 255, 255, 0.45)"
                  className="transition-all duration-150 ease-out"
                />
              </g>

              {/* Heart Outer Stroke Border */}
              <path
                d="M50 85 C50 85 10 55 10 30 C10 12 25 5 38 12 C45 16 48 22 50 25 C52 22 55 16 62 12 C75 5 90 12 90 30 C90 55 50 85 50 85 Z"
                fill="none"
                stroke="#f472b6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* ============================================================ */}
          {/* Percentage & Dynamic Status Text with Emojis                */}
          {/* ============================================================ */}
          <div className="my-3 flex flex-col items-center">
            {/* Percentage Display */}
            <div className="font-display font-black text-3xl sm:text-4xl text-[#fce7f3] drop-shadow-[0_2px_10px_rgba(244,114,182,0.5)]">
              {percentage}%
            </div>

            {/* Dynamic Status Text & Emojis */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTier.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-1.5 mt-1 font-serif text-sm sm:text-base text-pink-200"
              >
                <span>{currentTier.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ============================================================ */}
          {/* Interactive Button: Tahan buktiin cintamu                    */}
          {/* ============================================================ */}
          <div className="mt-4 w-full flex flex-col items-center gap-3">
            <button
              onMouseDown={() => setIsPressing(true)}
              onMouseUp={() => setIsPressing(false)}
              onMouseLeave={() => setIsPressing(false)}
              onTouchStart={() => setIsPressing(true)}
              onTouchEnd={() => setIsPressing(false)}
              onClick={handleSingleTap}
              disabled={isComplete}
              className={`group relative w-full sm:w-auto min-w-[240px] px-8 py-3.5 rounded-full border-2 transition-all duration-300 font-sans font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 select-none shadow-xl ${
                isComplete
                  ? "bg-gradient-to-r from-emerald-600 to-teal-500 border-emerald-300 text-white cursor-default"
                  : isPressing
                  ? "bg-gradient-to-r from-pink-600 to-rose-600 border-white text-white scale-95 shadow-[0_0_30px_rgba(244,114,182,0.8)]"
                  : "bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 hover:bg-pink-600 border-pink-300/60 text-[#fce7f3] hover:shadow-[0_0_25px_rgba(244,114,182,0.6)] hover:scale-102"
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isPressing ? "scale-125 text-white fill-white animate-ping" : "text-pink-100 fill-pink-100"
                }`}
              />
              <span>{isComplete ? "CINTA SUDAH FULL 100%! 💕" : "Tahan buktiin cintamu"}</span>
              <Sparkles className="w-4 h-4 text-pink-200" />
            </button>

            {/* Helper Hint */}
            <span className="text-[11px] font-sans text-pink-200/60 italic">
              (Tekan & tahan tombol atau klik berkali-kali sampai 100%)
            </span>

            {/* Reset Button if completed */}
            {isComplete && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleReset}
                className="mt-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-pink-300/30 bg-white/[0.04] text-xs font-sans text-pink-200 hover:text-white hover:border-pink-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi dari 0%</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoveMeterModal;

