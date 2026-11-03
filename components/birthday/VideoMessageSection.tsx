"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, ChevronRight, RotateCcw } from "lucide-react";
import { romanticAudio } from "@/utils/romanticAudio";

export interface VideoMessageSectionProps {
  youtubeId?: string;
  onNext?: () => void;
  className?: string;
}

export const VideoMessageSection: React.FC<VideoMessageSectionProps> = ({
  youtubeId = "0fcsGS1dEro",
  onNext,
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
  );

  const handleStartPlay = () => {
    // Automatically pause/stop background music so it doesn't clash with video audio
    try {
      romanticAudio.stop();
    } catch {}

    setIsPlaying(true);
  };

  const handleResetCover = () => {
    setIsPlaying(false);
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] md:w-[720px] h-[340px] sm:h-[580px] md:h-[720px] rounded-full bg-[#f472b6]/15 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] rounded-full bg-[#a855f7]/15 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "14%", left: "15%", size: 2.5, delay: "0.3s" },
          { top: "25%", left: "80%", size: 3, delay: "1.2s" },
          { top: "75%", left: "12%", size: 2, delay: "2.2s" },
          { top: "82%", left: "85%", size: 2, delay: "1.0s" },
          { top: "45%", left: "6%", size: 1.5, delay: "1.8s" },
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
              boxShadow: "0 0 10px rgba(244, 114, 182, 0.75)",
            }}
          />
        ))}
      </div>

      {/* Header Container */}
      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center z-10 w-full mb-8 sm:mb-10">
        {/* Top Subtitle Badge: ✦ A SPECIAL VIDEO MESSAGE ✦ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ A SPECIAL VIDEO MESSAGE ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* Main Heading: A Moment For You */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.35)]"
        >
          A Moment For You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-sm sm:text-base text-pink-200/80 tracking-wide font-light mt-3 max-w-md"
        >
          Tadinya aku mau nampilin video atau momen-momen selama kita bareng, tapi aku baru inget kalau ternyata kita nggak pernah ambil video bareng (🥺). Makanya, aku tampilin yang ini aja dari YouTube, hehe...
        </motion.p>
      </div>

      {/* ============================================================ */}
      {/* Centered Glassmorphic Video Player Frame                     */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
        className="relative max-w-4xl w-full mx-auto rounded-3xl p-3 sm:p-5 bg-[#1a0b22]/85 backdrop-blur-2xl border border-pink-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] z-20 group"
      >
        {/* Inner Video / Iframe Wrapper */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-2xl">
          {isPlaying ? (
            /* Responsive YouTube Embed */
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Romantic Birthday Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0 rounded-2xl"
            />
          ) : (
            /* Romantic Interactive Cover */
            <div
              onClick={handleStartPlay}
              className="relative w-full h-full cursor-pointer flex flex-col items-center justify-center overflow-hidden group/cover"
              role="button"
              tabIndex={0}
              aria-label="Putar video ucapan ulang tahun"
            >
              {/* Thumbnail background */}
              <img
                src={thumbSrc}
                alt="Video thumbnail"
                onError={() =>
                  setThumbSrc(
                    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  )
                }
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/cover:scale-105 opacity-80"
              />

              {/* Dark tint gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35 backdrop-blur-[1px]" />

              {/* Glowing Pink Circular Play Button */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-pink-500 via-[#f472b6] to-rose-500 text-white flex items-center justify-center shadow-[0_0_35px_rgba(244,114,182,0.85)] border-2 border-white/60 transition-transform cursor-pointer"
              >
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5 text-white" />
              </motion.div>

              {/* Romantic Text Under Play Button */}
              <div className="relative z-10 mt-4 text-center px-4">
                <p className="font-serif font-bold text-base sm:text-xl text-pink-100 drop-shadow-md">
                  Sentuh Untuk Memutar Video ♡
                </p>
                <span className="text-xs sm:text-sm text-pink-200/80 font-sans tracking-wide mt-1 block">
                  Pesan video spesial di hari ulang tahunmu
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Small Switch Cover Button below player when video is playing */}
        {isPlaying && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleResetCover}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-pink-200/20 text-[11px] font-sans text-pink-200/80 hover:text-white transition-all"
            >
              <RotateCcw className="w-3 h-3 text-pink-300" />
              <span>Ganti ke Sampul</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* ============================================================ */}
      {/* Bottom Action Button to Step 6 (Birthday Wishes)            */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="mt-12 sm:mt-14 z-10"
      >
        <button
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full border border-[#f472b6]/60 bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 backdrop-blur-md text-white shadow-[0_0_25px_rgba(244,114,182,0.45)] hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 font-sans tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
          aria-label="Lanjut ke kartu ucapan ulang tahun"
        >
          <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">✦ READ MY WISHES FOR YOU ✦</span>
          <ChevronRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
};

export default VideoMessageSection;
