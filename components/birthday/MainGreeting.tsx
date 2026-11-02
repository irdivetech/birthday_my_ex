"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Moon, Sparkles } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export const MainGreeting: React.FC = () => {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="greeting"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 py-28 text-center overflow-hidden bg-burgundy-night"
    >
      {/* Background glow and celestial moonlight aura */}
      <div className="absolute top-16 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-crimson-deep/25 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Crescent Moon motif */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute top-24 right-12 md:right-24 pointer-events-none opacity-40 hidden sm:block"
      >
        <Moon className="w-10 h-10 text-gold-light stroke-[1.2] fill-gold-light/10" />
      </motion.div>

      <div className="max-w-3xl mx-auto flex flex-col items-center z-10">
        {/* Tagline / Filigree */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex items-center gap-3 mb-6 text-gold text-xs uppercase tracking-[0.3em] font-sans font-medium"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold/60" />
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{birthdayData.mainGreeting.tagline}</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-cream-light mb-2"
        >
          {birthdayData.mainGreeting.title}
        </motion.h2>

        {/* Subtitle in romantic script font */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-script text-4xl sm:text-6xl text-gold mb-8 drop-shadow-md"
        >
          {birthdayData.mainGreeting.subtitle}
        </motion.div>

        {/* Birthday message paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-serif italic text-cream/90 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-14"
        >
          &ldquo;{birthdayData.mainGreeting.message}&rdquo;
        </motion.p>

        {/* Floating Scroll Indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="group flex flex-col items-center gap-2 text-gold/70 hover:text-gold transition-colors focus:outline-none"
          aria-label="Scroll to about section"
        >
          <span className="text-[11px] tracking-widest uppercase font-sans font-medium text-cream-light/60 group-hover:text-cream-light transition-colors">
            {birthdayData.mainGreeting.scrollPrompt}
          </span>
          <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors animate-bounce">
            <ChevronDown className="w-4 h-4 text-gold" />
          </div>
        </motion.button>
      </div>

      {/* Decorative floral line accent */}
      <div className="absolute bottom-0 inset-x-0 flex justify-center items-center gap-4 py-4 text-gold/30 pointer-events-none">
        <span className="h-[1px] w-24 bg-gradient-to-r from-transparent to-gold/30" />
        <span className="text-xs">❦</span>
        <span className="h-[1px] w-24 bg-gradient-to-l from-transparent to-gold/30" />
      </div>
    </section>
  );
};
