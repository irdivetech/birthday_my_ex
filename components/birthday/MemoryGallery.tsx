"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Heart } from "lucide-react";
import { birthdayData, MemoryItem } from "@/data/birthday";

export const MemoryGallery: React.FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const memories = birthdayData.memories.items;
  const currentItem = selectedItemIndex !== null ? memories[selectedItemIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % memories.length);
    }
  }, [selectedItemIndex, memories.length]);

  const handlePrev = useCallback(() => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + memories.length) % memories.length);
    }
  }, [selectedItemIndex, memories.length]);

  const handleClose = useCallback(() => {
    setSelectedItemIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemIndex, handleClose, handleNext, handlePrev]);

  return (
    <section
      id="memories"
      className="relative w-full py-28 px-6 md:px-12 bg-burgundy-dark text-cream-light overflow-hidden"
    >
      {/* Background ambience */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson-deep/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-medium mb-3"
          >
            {birthdayData.memories.tagline}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-cream-light mb-3"
          >
            {birthdayData.memories.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif italic text-rose-soft/80 text-lg sm:text-xl"
          >
            {birthdayData.memories.subtitle}
          </motion.p>
        </div>

        {/* Polaroid Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 items-center">
          {memories.map((item: MemoryItem, idx: number) => {
            const rotClass = item.rotation || (idx % 2 === 0 ? "-rotate-2" : "rotate-2");
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex justify-center"
              >
                <div
                  onClick={() => setSelectedItemIndex(idx)}
                  className={`group cursor-pointer relative bg-cream-light text-burgundy-dark p-3.5 pb-5 rounded-md shadow-polaroid transform ${rotClass} hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:z-20 transition-all duration-400 border border-gold/30 max-w-[280px] w-full`}
                  role="button"
                  tabIndex={0}
                  aria-label={`View memory: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedItemIndex(idx);
                    }
                  }}
                >
                  {/* Pin or Tape decorative motif */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-3.5 bg-rose-blush/40 rounded-sm border border-gold/30 rotate-1 shadow-sm opacity-80" />

                  {/* Polaroid Photo Box */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-neutral-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {/* Hover hint */}
                    <div className="absolute inset-0 bg-burgundy-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-cream-light/90 text-burgundy text-[11px] font-sans font-semibold tracking-wider uppercase shadow-md">
                        Enlarge
                      </span>
                    </div>
                  </div>

                  {/* Handwritten Polaroid Bottom Label */}
                  <div className="pt-3 px-1 text-center">
                    <p className="font-serif font-bold text-burgundy text-sm line-clamp-1">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-burgundy/70 mt-1 font-sans">
                      <span>{item.date}</span>
                      <Heart className="w-3 h-3 text-crimson fill-crimson/30" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-burgundy-night/90 backdrop-blur-md"
            onClick={handleClose}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full bg-cream-light text-burgundy-dark rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40 flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-burgundy-dark/70 text-cream-light hover:bg-crimson hover:text-white flex items-center justify-center transition-colors focus:outline-none shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Image View */}
              <div className="relative aspect-square md:aspect-auto md:w-3/5 min-h-[320px] md:min-h-[500px] bg-neutral-900">
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                />

                {/* Arrow navigation inside image for mobile/desktop */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-burgundy-dark/60 text-cream-light hover:bg-crimson flex items-center justify-center transition-colors shadow-md"
                  aria-label="Previous memory"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-burgundy-dark/60 text-cream-light hover:bg-crimson flex items-center justify-center transition-colors shadow-md"
                  aria-label="Next memory"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Memory Story & Details (Right column) */}
              <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between bg-parchment-pattern">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-crimson uppercase tracking-wider mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{currentItem.date}</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-burgundy mb-3">
                    {currentItem.title}
                  </h3>

                  {currentItem.location && (
                    <div className="flex items-center gap-1.5 text-xs text-burgundy/70 mb-4">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>{currentItem.location}</span>
                    </div>
                  )}

                  <div className="w-12 h-[1.5px] bg-crimson/30 mb-5" />

                  <p className="font-serif italic text-burgundy/90 text-base md:text-lg leading-relaxed">
                    &ldquo;{currentItem.caption}&rdquo;
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-crimson/15 flex items-center justify-between text-xs text-burgundy/60">
                  <span className="font-sans">
                    Memory {(selectedItemIndex ?? 0) + 1} of {memories.length}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="px-3 py-1 rounded bg-cream-dark/50 hover:bg-crimson hover:text-white transition-colors"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3 py-1 rounded bg-cream-dark/50 hover:bg-crimson hover:text-white transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
