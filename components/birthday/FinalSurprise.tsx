"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Flame } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export const FinalSurprise: React.FC = () => {
  const [candleBlown, setCandleBlown] = useState(false);
  const { finalSurprise, recipient } = birthdayData;

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);

    // Multi-stage grand celebration confetti
    try {
      const end = Date.now() + 3000;
      const colors = ["#9E1023", "#D7A85C", "#E8A8B0", "#F8E8DC", "#720E1B"];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="surprise"
      className="relative min-h-screen w-full py-32 px-6 flex flex-col items-center justify-center bg-burgundy-night text-cream-light overflow-hidden text-center"
    >
      {/* Deepest atmospheric backdrop with dramatic golden & crimson radial light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-crimson-deep/30 via-burgundy-night to-burgundy-night pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-crimson/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Celestial Stars */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "15%", left: "10%", delay: "0.2s" },
          { top: "22%", left: "85%", delay: "1.5s" },
          { top: "75%", left: "20%", delay: "2.8s" },
          { top: "80%", left: "80%", delay: "0.9s" },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold star-twinkle"
            style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto z-10 flex flex-col items-center">
        {/* Crest Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-gold text-xs uppercase tracking-[0.35em] font-sans font-semibold mb-6"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span>{finalSurprise.tagline}</span>
          <Sparkles className="w-4 h-4 text-gold" />
        </motion.div>

        {/* Grand Headline */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-cream-light mb-2"
        >
          <span className="text-crimson-gradient">{finalSurprise.title}</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-script text-4xl sm:text-6xl text-gold mb-8"
        >
          {finalSurprise.subtitle}
        </motion.div>

        {/* Poetic Climax Wish Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif italic text-cream/95 text-lg sm:text-2xl leading-relaxed max-w-2xl mb-14"
        >
          &ldquo;{finalSurprise.climaxWish}&rdquo;
        </motion.p>

        {/* Interactive Candle / Birthday Wish Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="my-6 flex flex-col items-center"
        >
          <div
            onClick={handleBlowCandle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleBlowCandle();
              }
            }}
            className="group cursor-pointer relative flex flex-col items-center p-6 rounded-2xl glass-card border border-gold/30 hover:border-gold transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-gold/50"
            aria-label="Blow birthday candle and make a wish"
          >
            {/* Candle Flame & Wick */}
            <div className="relative flex flex-col items-center h-24 justify-end mb-2">
              <AnimatePresence>
                {!candleBlown ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex items-center justify-center animate-flicker"
                  >
                    {/* Flame outer glow */}
                    <div className="absolute w-12 h-12 bg-amber-400/30 rounded-full blur-md candle-glow pointer-events-none" />
                    {/* Inner flame icon */}
                    <Flame className="w-9 h-9 text-amber-300 fill-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: [0, 0.7, 0], y: -25 }}
                    transition={{ duration: 1.5 }}
                    className="text-xs text-cream-light/60 font-serif italic"
                  >
                    💨 Whispered to the stars...
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle Wick */}
              <div className="w-[3px] h-3 bg-neutral-900 rounded-t" />

              {/* Candle Body */}
              <div className="w-10 h-16 rounded-t-sm bg-gradient-to-b from-cream-light via-cream to-rose-soft/50 border border-gold/30 shadow-md relative overflow-hidden">
                {/* Wax drip details */}
                <div className="absolute top-0 left-1 w-2 h-4 bg-cream-light rounded-full" />
                <div className="absolute top-0 right-2 w-2.5 h-6 bg-cream-light rounded-full" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-crimson/20" />
              </div>

              {/* Candle Saucer / Stand */}
              <div className="w-16 h-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-dark border border-gold/60 shadow-sm" />
            </div>

            {/* Candle Prompt or Blown Message */}
            <div className="mt-4">
              <AnimatePresence mode="wait">
                {!candleBlown ? (
                  <motion.p
                    key="prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-serif italic text-gold text-sm sm:text-base flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: "8s" }} />
                    <span>{finalSurprise.candlePrompt}</span>
                  </motion.p>
                ) : (
                  <motion.p
                    key="wish-made"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display font-semibold text-rose-soft text-base sm:text-lg text-gold-gradient"
                  >
                    {finalSurprise.candleBlownMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Small Heartfelt CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-crimson border border-gold/40 text-cream-light font-display text-sm tracking-widest uppercase">
            <Heart className="w-4 h-4 text-crimson fill-crimson animate-pulse" />
            <span>{finalSurprise.ctaHeart}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
