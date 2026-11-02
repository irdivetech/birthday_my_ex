"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart } from "lucide-react";
import { birthdayData, JourneyMilestone } from "@/data/birthday";

export const JourneyTimeline: React.FC = () => {
  const { journey } = birthdayData;

  return (
    <section
      id="journey"
      className="relative w-full py-28 px-6 md:px-12 bg-burgundy-dark text-cream-light overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-crimson-deep/20 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-gold/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-medium mb-3"
          >
            {journey.tagline}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cream-light mb-3"
          >
            {journey.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-rose-soft/80 text-lg sm:text-xl"
          >
            {journey.subtitle}
          </motion.p>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative">
          {/* Central Stem Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold/50 via-crimson to-gold/50 md:-translate-x-1/2" />

          {/* Timeline Milestones */}
          <div className="space-y-16">
            {journey.milestones.map((item: JourneyMilestone, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing Node Icon on the stem */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-burgundy-night border-2 border-gold flex items-center justify-center shadow-gold-glow">
                      <Sparkles className="w-4 h-4 text-gold animate-pulse" />
                    </div>
                  </div>

                  {/* Milestone Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isEven ? "md:pl-12" : "md:pr-12"
                    } w-full`}
                  >
                    <div className="glass-card rounded-2xl p-6 md:p-8 border border-gold/25 hover:border-gold/50 transition-all duration-300 shadow-xl group">
                      {/* Milestone Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-display font-bold text-2xl text-gold">
                          {item.year}
                        </span>
                        {item.dateBadge && (
                          <span className="px-3 py-1 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase bg-crimson-deep/60 border border-gold/30 text-cream-light">
                            {item.dateBadge}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-cream-light mb-3 group-hover:text-rose-soft transition-colors">
                        {item.title}
                      </h3>

                      {/* Image if available */}
                      {item.image && (
                        <div className="relative aspect-[16/9] w-full mb-4 overflow-hidden rounded-xl border border-gold/20 shadow-md">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="font-serif text-cream/90 text-base sm:text-lg leading-relaxed">
                        {item.description}
                      </p>

                      {/* Bottom filigree accent */}
                      <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-rose-soft/70">
                        <span className="font-sans italic">{item.tag || "Chapter"}</span>
                        <Heart className="w-3.5 h-3.5 text-crimson fill-crimson/30" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
