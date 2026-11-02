"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full py-28 px-6 md:px-12 bg-parchment-pattern text-burgundy-dark overflow-hidden"
    >
      {/* Top transition curved separator */}
      <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-burgundy-night to-transparent pointer-events-none opacity-20" />

      {/* Decorative corner filigree */}
      <div className="absolute top-6 left-6 text-crimson/20 text-3xl select-none pointer-events-none hidden sm:block">
        ❧
      </div>
      <div className="absolute top-6 right-6 text-crimson/20 text-3xl select-none pointer-events-none hidden sm:block">
        ☙
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-crimson text-xs uppercase tracking-[0.25em] font-sans font-bold mb-3"
          >
            <span>✦</span>
            <span>{birthdayData.aboutHer.tagline}</span>
            <span>✦</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-burgundy"
          >
            {birthdayData.aboutHer.title}
          </motion.h2>

          <div className="w-16 h-[2px] bg-crimson/40 mx-auto mt-4" />
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Framed Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group w-full max-w-md">
              {/* Outer romantic gold/burgundy frame */}
              <div className="relative p-3 bg-cream-light rounded-2xl shadow-polaroid border border-gold/40 transition-transform duration-500 group-hover:-rotate-1">
                {/* Photo container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-burgundy-dark/10">
                  <Image
                    src={birthdayData.aboutHer.photo}
                    alt={birthdayData.recipient.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                  />
                  {/* Subtle warm vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Bottom caption sticker */}
                <div className="pt-4 pb-2 px-2 text-center flex items-center justify-between">
                  <span className="font-serif italic text-burgundy/80 text-sm font-medium">
                    {birthdayData.recipient.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-crimson">
                    <Heart className="w-3.5 h-3.5 fill-crimson" />
                    <span className="font-script text-lg">{birthdayData.recipient.nickname}</span>
                  </div>
                </div>
              </div>

              {/* Decorative blooming rose sticker accent */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-crimson border-2 border-cream-light shadow-md flex items-center justify-center text-cream-light transform rotate-12 group-hover:rotate-0 transition-transform">
                <Sparkles className="w-5 h-5 text-gold-light" />
              </div>
            </div>
          </motion.div>

          {/* Thoughtful Prose & Traits (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            {/* Paragraphs */}
            <div className="space-y-4">
              {birthdayData.aboutHer.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-serif text-lg sm:text-xl text-burgundy/90 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Trait Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {birthdayData.aboutHer.traits.map((trait, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-cream-light/80 border border-crimson/15 shadow-sm hover:border-crimson/30 transition-all"
                >
                  <h4 className="font-display font-semibold text-burgundy text-base mb-1">
                    {trait.label}
                  </h4>
                  <p className="text-xs text-burgundy/75 leading-normal font-sans">
                    {trait.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Closing Phrase */}
            <div className="pt-6 border-t border-crimson/15 flex items-center justify-between">
              <p className="font-script text-2xl sm:text-3xl text-crimson">
                {birthdayData.aboutHer.closingPhrase}
              </p>
              <span className="text-crimson/40 text-xl">❦</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
