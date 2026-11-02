"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface HiddenMessageProps {
  isRevealed: boolean;
}

export const HiddenMessage: React.FC<HiddenMessageProps> = ({ isRevealed }) => {
  const { hiddenMessage, recipient } = birthdayData;

  if (!isRevealed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto my-12"
    >
      {/* Parchment Letter Card */}
      <div className="relative p-8 sm:p-12 bg-parchment-pattern rounded-3xl shadow-2xl border-2 border-gold/40 text-burgundy-dark overflow-hidden">
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-crimson/40 pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-crimson/40 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-crimson/40 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-crimson/40 pointer-events-none" />

        {/* Wax seal stamp at the top center */}
        <div className="flex justify-center -mt-4 mb-8">
          <div className="wax-seal w-16 h-16 rounded-full flex items-center justify-center text-cream-light border border-gold/50 shadow-lg relative">
            <Heart className="w-6 h-6 fill-cream-light text-cream-light animate-pulse" />
            <span className="absolute -bottom-2 text-[9px] font-sans uppercase tracking-widest text-gold font-bold bg-burgundy-dark px-2 py-0.5 rounded-full border border-gold/30">
              {hiddenMessage.sealText}
            </span>
          </div>
        </div>

        {/* Letter Salutation */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-6 border-b border-crimson/15 pb-4">
          <h4 className="font-display font-bold text-2xl sm:text-3xl text-burgundy">
            {hiddenMessage.letterTitle}
          </h4>
          <span className="font-sans text-xs uppercase tracking-widest text-crimson/70 font-semibold mt-1 sm:mt-0">
            {hiddenMessage.letterDate}
          </span>
        </div>

        {/* Letter Body */}
        <div className="space-y-4 font-serif text-lg sm:text-xl text-burgundy/90 leading-relaxed">
          {hiddenMessage.letterBody.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Letter Signature */}
        <div className="mt-10 pt-6 border-t border-crimson/15 flex flex-col items-end">
          <p className="font-script text-3xl sm:text-4xl text-crimson">
            {hiddenMessage.signature}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-burgundy/70 mt-1 font-sans">
            <span>Always & Forever</span>
            <Sparkles className="w-3 h-3 text-gold" />
            <span>for {recipient.name}</span>
          </div>
        </div>

        {/* Postscript */}
        {hiddenMessage.postscript && (
          <div className="mt-6 pt-4 border-t border-dashed border-crimson/20 text-xs text-burgundy/80 font-serif italic text-center">
            {hiddenMessage.postscript}
          </div>
        )}
      </div>
    </motion.div>
  );
};
