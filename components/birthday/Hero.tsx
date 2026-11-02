"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface HeroProps {
  onOpenGift: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenGift }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-burgundy-night px-6 text-center select-none">
      {/* Deep atmospheric backdrop with radial gradient light source */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-crimson-deep/30 via-burgundy-dark/60 to-burgundy-night -z-10" />

      {/* Subtle night sky stars */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "12%", left: "18%", size: 2, delay: "0s" },
          { top: "25%", left: "82%", size: 3, delay: "1.2s" },
          { top: "68%", left: "14%", size: 2, delay: "2.4s" },
          { top: "42%", left: "75%", size: 1.5, delay: "0.7s" },
          { top: "18%", left: "64%", size: 2.5, delay: "1.8s" },
          { top: "78%", left: "86%", size: 2, delay: "2.1s" },
          { top: "35%", left: "28%", size: 2, delay: "1.5s" },
          { top: "55%", left: "48%", size: 3, delay: "0.3s" },
        ].map((star, idx) => (
          <span
            key={idx}
            className="absolute rounded-full bg-cream-light star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              boxShadow: "0 0 8px rgba(248, 232, 220, 0.8)",
            }}
          />
        ))}
      </div>

      {/* Center glowing aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[560px] h-[340px] md:h-[560px] bg-crimson/20 rounded-full blur-[110px] pointer-events-none -z-10 animate-pulse-glow" />

      {/* Main intro content with staggered reveal */}
      <div className="max-w-2xl mx-auto flex flex-col items-center z-10">
        {/* Subtle decorative crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="relative w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center glass-burgundy shadow-rose-glow">
            <Heart className="w-7 h-7 text-crimson-light fill-crimson/40" />
            <Sparkles className="w-4 h-4 text-gold absolute -top-1 -right-1 animate-spin" style={{ animationDuration: "10s" }} />
          </div>
        </motion.div>

        {/* Teaser text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-serif italic text-rose-soft/90 text-lg md:text-xl tracking-wide mb-4"
        >
          {birthdayData.opening.teaser}
        </motion.p>

        {/* Grand Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-cream-light mb-3"
        >
          <span className="text-crimson-gradient">{birthdayData.opening.title}</span>
        </motion.h1>

        {/* Subheading in romantic cursive script */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.5, ease: "easeOut" }}
          className="font-script text-3xl sm:text-4xl md:text-5xl text-gold mb-12 tracking-wide"
        >
          {birthdayData.opening.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.1, ease: "easeOut" }}
        >
          <button
            onClick={onOpenGift}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-crimson border border-gold/50 text-cream-light font-display text-base tracking-widest uppercase shadow-xl hover:border-gold hover:shadow-gold-glow transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <span className="relative z-10 font-semibold">{birthdayData.opening.ctaButton}</span>
            <span className="relative z-10 text-gold group-hover:translate-x-1 transition-transform duration-300">
              ✦
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-crimson via-crimson-light to-crimson opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm" />
          </button>
        </motion.div>
      </div>

      {/* Silhouette of roses along bottom */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none -z-10 flex justify-center opacity-60">
        <svg
          className="w-full h-full text-burgundy-dark"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 C150,90 200,105 350,75 C500,45 650,85 800,60 C950,35 1050,75 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
