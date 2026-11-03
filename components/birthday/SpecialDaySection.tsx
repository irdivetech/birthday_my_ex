"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Heart, Volume2, VolumeX } from "lucide-react";
import { romanticAudio } from "@/utils/romanticAudio";
import { birthdayData } from "@/data/birthday";

export interface SpecialDaySectionProps {
  onReadLetter?: () => void;
  className?: string;
}

interface PolaroidItem {
  id: string;
  image: string;
  caption: string;
  date: string;
  rotation: string;
  side: "left" | "right";
  fallbackGradient: string;
}

export const SpecialDaySection: React.FC<SpecialDaySectionProps> = ({
  onReadLetter,
  className = "",
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  // Sync music state with romanticAudio engine
  useEffect(() => {
    setIsPlayingMusic(romanticAudio.getPlaying());

    const interval = setInterval(() => {
      setIsPlayingMusic(romanticAudio.getPlaying());
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleToggleMusic = () => {
    const nextState = romanticAudio.toggle(birthdayData.audio.src);
    setIsPlayingMusic(nextState);
  };

  // 4 scattered Polaroid items on left and right sides
  const polaroids: PolaroidItem[] = [
    {
      id: "pol-1",
      image: "/images/16.jpeg",
      caption: "cantik nya pacar aku ♡",
      date: "MBG",
      rotation: "-rotate-6 md:-rotate-12",
      side: "left",
      fallbackGradient: "from-rose-900/60 via-purple-900/50 to-pink-900/40",
    },
    {
      id: "pol-2",
      image: "/images/9.jpeg",
      caption: "Cantiknya Kesayanganku ✨",
      date: "My Favorite Girl",
      rotation: "rotate-4 md:rotate-6",
      side: "left",
      fallbackGradient: "from-pink-950/60 via-purple-900/50 to-rose-900/40",
    },
    {
      id: "pol-3",
      image: "/images/5.jpeg",
      caption: "last school 🤍",
      date: "Happy Days",
      rotation: "rotate-6 md:rotate-12",
      side: "right",
      fallbackGradient: "from-purple-950/60 via-pink-900/50 to-rose-950/40",
    },
    {
      id: "pol-4",
      image: "/images/15.jpeg",
      caption: "Senyum Terindahmu 🌸",
      date: "Always With You",
      rotation: "-rotate-4 md:-rotate-6",
      side: "right",
      fallbackGradient: "from-rose-950/60 via-pink-900/50 to-purple-900/40",
    },
  ];

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 text-center select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* Centered Ambient Pink & Deep Purple Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[720px] h-[340px] sm:h-[540px] md:h-[720px] rounded-full bg-[#f472b6]/15 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] rounded-full bg-[#9333ea]/15 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "12%", left: "20%", size: 2.5, delay: "0.4s" },
          { top: "25%", left: "78%", size: 3, delay: "1.6s" },
          { top: "70%", left: "15%", size: 2, delay: "2.5s" },
          { top: "82%", left: "80%", size: 2, delay: "1.1s" },
          { top: "45%", left: "5%", size: 2.5, delay: "0.8s" },
          { top: "52%", left: "92%", size: 2.5, delay: "1.9s" },
        ].map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#fce7f3] star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              boxShadow: "0 0 10px rgba(244, 114, 182, 0.8)",
            }}
          />
        ))}
      </div>

      {/* ============================================================ */}
      {/* Decorative Scattered Polaroids - Desktop Side Positioning    */}
      {/* ============================================================ */}

      {/* Left Scattered Polaroids (Desktop) */}
      <div className="hidden lg:flex flex-col gap-10 absolute left-6 xl:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
        {polaroids
          .filter((p) => p.side === "left")
          .map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -60, rotate: idx === 0 ? -20 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 + idx * 0.2 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
              className={`relative w-44 xl:w-52 p-3 pb-4 bg-[#fffdfa] rounded-sm shadow-[0_16px_35px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.4)] ${item.rotation} transition-transform duration-500 cursor-pointer`}
            >
              {/* Semi-transparent Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-pink-300/40 backdrop-blur-sm border border-white/40 -rotate-2 shadow-sm rounded-xs pointer-events-none" />

              {/* Polaroid Photo Box */}
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-900">
                {!imgErrorMap[item.id] ? (
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="220px"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${item.fallbackGradient} flex flex-col items-center justify-center p-3 text-center`}
                  >
                    <Heart className="w-8 h-8 text-pink-300 fill-pink-300/40 mb-1 animate-pulse" />
                    <span className="font-serif italic text-xs text-pink-100/90">{item.caption}</span>
                  </div>
                )}
              </div>

              {/* Handwritten Bottom Label */}
              <div className="pt-2 px-1 text-center">
                <p className="font-serif italic font-semibold text-neutral-800 text-xs sm:text-sm line-clamp-1">
                  {item.caption}
                </p>
                <span className="text-[10px] font-sans text-neutral-500 block mt-0.5">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Right Scattered Polaroids (Desktop) */}
      <div className="hidden lg:flex flex-col gap-10 absolute right-6 xl:right-12 top-1/2 -translate-y-1/2 z-10 pointer-events-auto">
        {polaroids
          .filter((p) => p.side === "right")
          .map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 60, rotate: idx === 0 ? 20 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 + idx * 0.2 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 30 }}
              className={`relative w-44 xl:w-52 p-3 pb-4 bg-[#fffdfa] rounded-sm shadow-[0_16px_35px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.4)] ${item.rotation} transition-transform duration-500 cursor-pointer`}
            >
              {/* Semi-transparent Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-pink-300/40 backdrop-blur-sm border border-white/40 rotate-3 shadow-sm rounded-xs pointer-events-none" />

              {/* Polaroid Photo Box */}
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-900">
                {!imgErrorMap[item.id] ? (
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="220px"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${item.fallbackGradient} flex flex-col items-center justify-center p-3 text-center`}
                  >
                    <Heart className="w-8 h-8 text-pink-300 fill-pink-300/40 mb-1 animate-pulse" />
                    <span className="font-serif italic text-xs text-pink-100/90">{item.caption}</span>
                  </div>
                )}
              </div>

              {/* Handwritten Bottom Label */}
              <div className="pt-2 px-1 text-center">
                <p className="font-serif italic font-semibold text-neutral-800 text-xs sm:text-sm line-clamp-1">
                  {item.caption}
                </p>
                <span className="text-[10px] font-sans text-neutral-500 block mt-0.5">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
      </div>

      {/* ============================================================ */}
      {/* Main Center Content Container                               */}
      {/* ============================================================ */}
      <div className="relative max-w-2xl mx-auto flex flex-col items-center z-20 w-full">
        {/* Top badge: ✦ A LOVE LETTER FOR YOU ✦ */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)] transition-all duration-300 hover:border-[#f472b6]/60 hover:shadow-[0_0_25px_rgba(244,114,182,0.4)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ A LOVE LETTER FOR YOU ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* Main Heading: Your Special Day */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.35)] leading-tight mb-3"
        >
          Your Special Day
        </motion.h1>

        {/* Subtitle: Created with love, just for you */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-sm sm:text-base md:text-lg text-pink-200/80 tracking-wide font-light mb-10 sm:mb-14"
        >
          Created with love, just for you
        </motion.p>

        {/* Mobile/Tablet Polaroids Carousel (Visible on screens < lg) */}
        <div className="lg:hidden w-full max-w-md px-2 mb-10 flex justify-center gap-3 sm:gap-4 overflow-x-auto py-3">
          {polaroids.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + idx * 0.15 }}
              className={`relative flex-shrink-0 w-28 sm:w-36 p-2 pb-3 bg-[#fffdfa] rounded-sm shadow-xl ${idx === 0 ? "-rotate-4" : idx === 1 ? "rotate-3" : "-rotate-2"}`}
            >
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-900">
                {!imgErrorMap[item.id] ? (
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover"
                    sizes="140px"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${item.fallbackGradient} flex items-center justify-center`}
                  >
                    <Heart className="w-5 h-5 text-pink-300 fill-pink-300/40" />
                  </div>
                )}
              </div>
              <p className="font-serif italic text-neutral-800 text-[11px] sm:text-xs text-center mt-1.5 truncate">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Pill-Shaped Outline Button: ✦ READ MY LETTER ✦ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <button
            onClick={onReadLetter}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full border-2 border-[#f472b6]/70 text-pink-100 bg-[#f472b6]/10 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.3)] hover:shadow-[0_0_35px_rgba(244,114,182,0.65)] hover:border-pink-300 hover:bg-[#f472b6]/25 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 font-sans tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
            aria-label="Baca surat cinta"
          >
            <Sparkles className="w-4 h-4 text-[#f472b6] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-bold tracking-[0.2em]">✦ READ MY LETTER ✦</span>
            <Sparkles className="w-4 h-4 text-[#f472b6] group-hover:scale-125 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* Bottom Right: Music Player Status Indicator ("🎵 playing")   */}
      {/* ============================================================ */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-40"
        aria-label="Indikator pemutar musik"
      >
        <button
          onClick={handleToggleMusic}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1e0d29]/80 backdrop-blur-xl border border-[#f472b6]/35 shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(244,114,182,0.25)] hover:border-[#f472b6]/70 hover:shadow-[0_0_25px_rgba(244,114,182,0.4)] transition-all duration-300 text-xs font-sans text-pink-200"
          title={isPlayingMusic ? "Jeda musik latar" : "Putar musik latar"}
        >
          {/* Animated sound wave bars when playing */}
          {isPlayingMusic ? (
            <div className="flex items-end gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 bg-[#f472b6] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-0.5 bg-pink-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2" />
              <span className="w-0.5 bg-[#f472b6] rounded-full animate-[pulse_0.75s_ease-in-out_infinite] h-3.5" />
            </div>
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-pink-300/60" />
          )}

          {/* Music status label */}
          <span className="tracking-wide font-medium">
            {isPlayingMusic ? "🎵 playing" : "🎵 paused"}
          </span>
        </button>
      </motion.aside>
    </section>
  );
};

export default SpecialDaySection;

