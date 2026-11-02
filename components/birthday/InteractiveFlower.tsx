"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";
import { HiddenMessage } from "./HiddenMessage";

export const InteractiveFlower: React.FC = () => {
  const [isBloomed, setIsBloomed] = useState(false);

  const handleRoseClick = () => {
    const nextState = !isBloomed;
    setIsBloomed(nextState);

    if (nextState) {
      // Trigger romantic petal burst confetti
      try {
        // Red velvet and gold particles burst outward
        confetti({
          particleCount: 55,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#9E1023", "#720E1B", "#E8A8B0", "#D7A85C", "#F8E8DC"],
          shapes: ["circle"],
          ticks: 200,
          gravity: 0.8,
          scalar: 1.2,
        });

        setTimeout(() => {
          confetti({
            particleCount: 35,
            spread: 100,
            angle: 60,
            origin: { x: 0.2, y: 0.65 },
            colors: ["#9E1023", "#D7A85C"],
            ticks: 180,
          });
          confetti({
            particleCount: 35,
            spread: 100,
            angle: 120,
            origin: { x: 0.8, y: 0.65 },
            colors: ["#720E1B", "#E8A8B0"],
            ticks: 180,
          });
        }, 250);
      } catch {
        // graceful confetti fallback
      }
    }
  };

  return (
    <section
      id="secret-rose"
      className="relative min-h-screen w-full py-28 px-6 flex flex-col items-center justify-center bg-burgundy-night text-cream-light overflow-hidden"
    >
      {/* Background radial glow that intensifies when bloomed */}
      <motion.div
        animate={{
          scale: isBloomed ? 1.3 : 1,
          opacity: isBloomed ? 0.7 : 0.35,
        }}
        transition={{ duration: 1.2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[radial-gradient(circle,_rgba(158,16,35,0.4)_0%,_rgba(90,15,26,0.15)_60%,_transparent_80%)] rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Floating sparkles in the background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-gold star-twinkle" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-rose-soft star-twinkle" style={{ animationDelay: "1.5s" }} />
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 rounded-full bg-gold star-twinkle" style={{ animationDelay: "0.8s" }} />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center z-10 w-full">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-medium mb-3"
        >
          {birthdayData.interactiveFlower.tagline}
        </motion.p>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cream-light mb-4"
        >
          {birthdayData.interactiveFlower.title}
        </motion.h2>

        {/* Teaser text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif italic text-rose-soft/90 text-lg sm:text-xl max-w-lg mb-10"
        >
          {birthdayData.interactiveFlower.teaser}
        </motion.p>

        {/* Interactive 3D Blooming Red Rose */}
        <div className="relative my-6 flex flex-col items-center">
          <motion.div
            onClick={handleRoseClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group cursor-pointer relative flex items-center justify-center p-8 rounded-full select-none focus:outline-none focus:ring-4 focus:ring-gold/50"
            role="button"
            tabIndex={0}
            aria-label={isBloomed ? birthdayData.interactiveFlower.resetPrompt : birthdayData.interactiveFlower.ctaPrompt}
            aria-expanded={isBloomed}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRoseClick();
              }
            }}
          >
            {/* Outer golden halo pulse */}
            <motion.div
              animate={{
                scale: isBloomed ? [1, 1.15, 1] : [1, 1.08, 1],
                opacity: isBloomed ? [0.6, 0.9, 0.6] : [0.3, 0.6, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-gold/40 bg-crimson-deep/20 blur-sm pointer-events-none"
            />

            {/* Glowing Rose SVG Structure */}
            <svg
              className="w-48 h-48 sm:w-64 sm:h-64 filter drop-shadow-[0_0_20px_rgba(158,16,35,0.6)]"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Velvet Crimson Gradient */}
                <radialGradient id="petalGrad1" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#C96373" />
                  <stop offset="40%" stopColor="#9E1023" />
                  <stop offset="100%" stopColor="#4D0711" />
                </radialGradient>
                <radialGradient id="petalGrad2" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#E8A8B0" />
                  <stop offset="50%" stopColor="#B82236" />
                  <stop offset="100%" stopColor="#30080F" />
                </radialGradient>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F0CF8D" />
                  <stop offset="40%" stopColor="#D7A85C" />
                  <stop offset="100%" stopColor="#9E1023" />
                </radialGradient>
              </defs>

              {/* Rose Stem & Calyx Leaves */}
              <motion.path
                d="M100 135 C100 165, 95 185, 90 200"
                stroke="#385E38"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Left Leaf */}
              <motion.path
                d="M96 155 C70 150, 60 165, 55 175 C70 175, 90 165, 96 155 Z"
                fill="#2E4F2E"
                stroke="#1B331B"
                strokeWidth="1.5"
                animate={{ rotate: isBloomed ? -12 : 0 }}
                style={{ transformOrigin: "96px 155px" }}
                transition={{ duration: 0.8 }}
              />
              {/* Right Leaf */}
              <motion.path
                d="M98 165 C125 160, 135 175, 140 185 C125 185, 105 175, 98 165 Z"
                fill="#2E4F2E"
                stroke="#1B331B"
                strokeWidth="1.5"
                animate={{ rotate: isBloomed ? 12 : 0 }}
                style={{ transformOrigin: "98px 165px" }}
                transition={{ duration: 0.8 }}
              />

              {/* Layer 1: Outer Petals (Bloom & Unfold Outward) */}
              {/* Outer Top Left Petal */}
              <motion.path
                d="M100 95 C60 50, 30 85, 45 125 C65 145, 95 130, 100 95 Z"
                fill="url(#petalGrad1)"
                stroke="#720E1B"
                strokeWidth="1.5"
                animate={{
                  scale: isBloomed ? 1.25 : 1,
                  rotate: isBloomed ? -22 : 0,
                  x: isBloomed ? -12 : 0,
                  y: isBloomed ? -8 : 0,
                }}
                style={{ transformOrigin: "100px 95px" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {/* Outer Top Right Petal */}
              <motion.path
                d="M100 95 C140 50, 170 85, 155 125 C135 145, 105 130, 100 95 Z"
                fill="url(#petalGrad1)"
                stroke="#720E1B"
                strokeWidth="1.5"
                animate={{
                  scale: isBloomed ? 1.25 : 1,
                  rotate: isBloomed ? 22 : 0,
                  x: isBloomed ? 12 : 0,
                  y: isBloomed ? -8 : 0,
                }}
                style={{ transformOrigin: "100px 95px" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {/* Outer Bottom Petal */}
              <motion.path
                d="M100 95 C65 110, 75 155, 100 155 C125 155, 135 110, 100 95 Z"
                fill="url(#petalGrad1)"
                stroke="#720E1B"
                strokeWidth="1.5"
                animate={{
                  scale: isBloomed ? 1.3 : 1,
                  y: isBloomed ? 14 : 0,
                }}
                style={{ transformOrigin: "100px 125px" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />

              {/* Layer 2: Middle Petals */}
              {/* Mid Left Petal */}
              <motion.path
                d="M100 90 C70 65, 55 95, 70 120 C85 130, 95 115, 100 90 Z"
                fill="url(#petalGrad2)"
                stroke="#9E1023"
                strokeWidth="1.5"
                animate={{
                  scale: isBloomed ? 1.2 : 1,
                  rotate: isBloomed ? -16 : 0,
                  x: isBloomed ? -8 : 0,
                }}
                style={{ transformOrigin: "100px 90px" }}
                transition={{ duration: 0.9, delay: 0.1 }}
              />
              {/* Mid Right Petal */}
              <motion.path
                d="M100 90 C130 65, 145 95, 130 120 C115 130, 105 115, 100 90 Z"
                fill="url(#petalGrad2)"
                stroke="#9E1023"
                strokeWidth="1.5"
                animate={{
                  scale: isBloomed ? 1.2 : 1,
                  rotate: isBloomed ? 16 : 0,
                  x: isBloomed ? 8 : 0,
                }}
                style={{ transformOrigin: "100px 90px" }}
                transition={{ duration: 0.9, delay: 0.1 }}
              />

              {/* Layer 3: Inner Rose Bud Spiral */}
              <motion.path
                d="M100 75 C85 75, 80 95, 95 105 C110 115, 120 90, 105 80 C95 72, 90 85, 100 88"
                fill="none"
                stroke="#C96373"
                strokeWidth="4"
                strokeLinecap="round"
                animate={{
                  scale: isBloomed ? 1.15 : 1,
                }}
                transition={{ duration: 0.8 }}
              />

              {/* Inner Glowing Stamen Core (Reveals golden radiance when bloomed) */}
              <motion.circle
                cx="100"
                cy="90"
                r="10"
                fill="url(#centerGlow)"
                animate={{
                  scale: isBloomed ? [1, 1.4, 1.2] : 0.8,
                  opacity: isBloomed ? 1 : 0.5,
                }}
                transition={{ duration: 1 }}
              />
            </svg>
          </motion.div>

          {/* CTA Instruction Button */}
          <motion.button
            onClick={handleRoseClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 px-6 py-2.5 rounded-full text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 border shadow-lg ${
              isBloomed
                ? "bg-crimson-deep/80 text-cream-light border-gold/40 shadow-rose-glow"
                : "glass-burgundy text-gold border-gold/50 hover:border-gold hover:shadow-gold-glow animate-pulse"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{isBloomed ? birthdayData.interactiveFlower.resetPrompt : birthdayData.interactiveFlower.ctaPrompt}</span>
            <Heart className="w-3.5 h-3.5 text-rose-soft fill-rose-soft/40" />
          </motion.button>
        </div>

        {/* Section 06: Hidden Message Card (Unfolds after blooming) */}
        <AnimatePresence>
          {isBloomed && <HiddenMessage isRevealed={isBloomed} />}
        </AnimatePresence>
      </div>
    </section>
  );
};
