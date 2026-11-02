"use client";

import React from "react";
import { motion } from "framer-motion";
import { Moon, ArrowUp, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export const Closing: React.FC = () => {
  const { closing } = birthdayData;

  const handleReturnToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full pt-28 pb-16 px-6 bg-burgundy-night text-cream-light overflow-hidden text-center">
      {/* Calm moonlight and stars background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gold/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Gentle Moon */}
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center glass-burgundy shadow-sm">
          <Moon className="w-6 h-6 text-gold-light stroke-[1.5] fill-gold-light/20" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto z-10">
        {/* Prelude */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-rose-soft/80 text-base mb-2"
        >
          {closing.prelude}
        </motion.p>

        {/* Closing Title */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-bold text-cream-light mb-2"
        >
          {closing.title}
        </motion.h3>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-script text-3xl sm:text-4xl text-gold mb-6"
        >
          {closing.subtitle}
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-serif text-cream/90 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          {closing.message}
        </motion.p>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-14"
        >
          <p className="font-script text-3xl sm:text-4xl text-crimson-light">
            {closing.signature}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-gold/60 text-xs">
            <span className="w-10 h-[1px] bg-gold/30" />
            <Heart className="w-3.5 h-3.5 text-crimson fill-crimson/40" />
            <span className="w-10 h-[1px] bg-gold/30" />
          </div>
        </motion.div>

        {/* Return to Top Button */}
        <motion.button
          onClick={handleReturnToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-burgundy border border-gold/30 text-cream-light/80 hover:text-gold hover:border-gold transition-colors text-xs font-sans tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-gold"
          aria-label="Return to top of page"
        >
          <ArrowUp className="w-3.5 h-3.5 text-gold" />
          <span>{closing.returnToTop}</span>
        </motion.button>
      </div>

      {/* Silhouette of flowers at bottom footer */}
      <div className="mt-16 text-burgundy-dark/40 select-none pointer-events-none text-2xl tracking-[1em]">
        ❦ ❦ ❦
      </div>
    </footer>
  );
};
