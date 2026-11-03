"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, X, ChevronRight, Calendar, MapPin, ZoomIn } from "lucide-react";
import { birthdayData } from "@/data/birthday";

export interface OurMemoriesSectionProps {
  onNext?: () => void;
  className?: string;
}

interface MemoryPhoto {
  id: string;
  image: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  rotation: string;
  tapeColor?: string;
  fallbackGradient: string;
}

export const OurMemoriesSection: React.FC<OurMemoriesSectionProps> = ({
  onNext,
  className = "",
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const memories: MemoryPhoto[] = [
    {
      id: "mem-1",
      image: "/images/3.jpeg",
      title: "Hari Penuh Cerita & Bahagia",
      caption: "Di antara ramainya hari itu, senyumanmu selalu jadi yang paling bersinar dan mencuri perhatian.",
      date: "last School Days",
      location: "School",
      rotation: "-rotate-2 hover:-rotate-0",
      tapeColor: "bg-pink-300/40",
      fallbackGradient: "from-rose-950/70 via-purple-900/60 to-pink-900/50",
    },
    {
      id: "mem-2",
      image: "/images/7.jpeg",
      title: "Langkah Bersama di Hari Teduh",
      caption: "Berdiri di sampingmu selalu membuat hari yang biasa terasa begitu istimewa dan penuh tawa.",
      date: "Green Days",
      location: "school",
      rotation: "rotate-3 hover:rotate-0",
      tapeColor: "bg-rose-300/40",
      fallbackGradient: "from-purple-950/70 via-pink-900/60 to-rose-900/50",
    },
    {
      id: "mem-3",
      image: "/images/8.jpeg",
      title: "first date",
      caption: "Setiap cermin dan setiap tempat selalu punya cara tersendiri untuk mengabadikan keusilan manis kita berdua.",
      date: "Cinema Date",
      location: "Movie Date",
      rotation: "-rotate-1 hover:rotate-0",
      tapeColor: "bg-pink-400/40",
      fallbackGradient: "from-pink-950/70 via-purple-900/60 to-rose-950/50",
    },
    {
      id: "mem-4",
      image: "/images/10.jpeg",
      title: "Gemas & bawaannya pen makan",
      caption: "Gaya pose gemasmu yang selalu berhasil bikin aku tersenyum dan jatuh hati berkali-kali.",
      date: "Cinema Date",
      location: "Weekend Date",
      rotation: "rotate-2 hover:rotate-0",
      tapeColor: "bg-purple-300/40",
      fallbackGradient: "from-rose-950/70 via-pink-900/60 to-purple-900/50",
    },
    {
      id: "mem-5",
      image: "/images/11.jpeg",
      title: "Sfirst date",
      caption: "Tak perlu tempat mewah, jalan berdua denganmu sudah jadi momen terindah yang selalu kunantikan.",
      date: "Cinema Date",
      location: "Movie Date",
      rotation: "-rotate-3 hover:rotate-0",
      tapeColor: "bg-pink-300/40",
      fallbackGradient: "from-purple-950/70 via-rose-900/60 to-pink-950/50",
    },
    {
      id: "mem-6",
      image: "/images/12.jpeg",
      title: "Pipi Chubby Kesayangan",
      caption: "Tingkah lucu dan lucunya pipimu yang selalu bikin rindu. Semoga kita bisa terus tertawa bersama selamanya.",
      date: "Forever & Always",
      location: "school",
      rotation: "rotate-1 hover:rotate-0",
      tapeColor: "bg-rose-400/40",
      fallbackGradient: "from-pink-950/70 via-purple-900/60 to-rose-900/50",
    },
  ];

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* Background Soft Pink Glow & Stardust */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[750px] h-[340px] sm:h-[600px] md:h-[750px] rounded-full bg-[#f472b6]/15 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#a855f7]/10 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "10%", left: "12%", size: 2, delay: "0.2s" },
          { top: "22%", left: "86%", size: 3, delay: "1.3s" },
          { top: "72%", left: "14%", size: 2, delay: "2.1s" },
          { top: "85%", left: "82%", size: 2.5, delay: "0.9s" },
          { top: "45%", left: "6%", size: 1.5, delay: "1.7s" },
          { top: "55%", left: "94%", size: 2.5, delay: "0.5s" },
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
      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-10 w-full mb-12 sm:mb-16">
        {/* Top Subtitle Badge: ✦ every moment captured in love ✦ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ EVERY MOMENT CAPTURED IN LOVE ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* Main Heading: Our Memories */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.35)]"
        >
          Our Memories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-sm sm:text-base text-pink-200/80 tracking-wide font-light mt-3 max-w-md"
        >
          Kumpulan momen manis dan kenangan terindah yang selalu kuabadikan di hati.
        </motion.p>
      </div>

      {/* ============================================================ */}
      {/* Polaroid Collage Grid with Smooth Hover Effects              */}
      {/* ============================================================ */}
      <div className="relative max-w-6xl mx-auto w-full z-10 px-2 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 justify-items-center">
          {memories.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.12, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -8, zIndex: 30 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`group relative w-full max-w-[310px] p-4 pb-5 bg-[#fffdfa] rounded-xs shadow-[0_18px_40px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.4)] ${photo.rotation} transition-all duration-500 cursor-pointer`}
              role="button"
              tabIndex={0}
              aria-label={`Lihat memori: ${photo.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPhoto(photo);
                }
              }}
            >
              {/* Semi-transparent Washi Tape at Top */}
              <div
                className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 ${photo.tapeColor} backdrop-blur-sm border border-white/50 shadow-sm rounded-xs pointer-events-none rotate-1`}
              />

              {/* Photo Box */}
              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-900 shadow-inner">
                {!imgErrorMap[photo.id] ? (
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 350px"
                    onError={() => handleImageError(photo.id)}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${photo.fallbackGradient} flex flex-col items-center justify-center p-4 text-center`}
                  >
                    <Heart className="w-10 h-10 text-pink-300 fill-pink-300/40 mb-2 group-hover:scale-125 transition-transform" />
                    <span className="font-serif italic text-sm text-pink-100">{photo.title}</span>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#160b1e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-neutral-900 font-sans text-xs font-semibold shadow-lg">
                    <ZoomIn className="w-3.5 h-3.5 text-pink-600" />
                    <span>Perbesar</span>
                  </span>
                </div>
              </div>

              {/* Handwritten Bottom Label on Polaroid Chin */}
              <div className="pt-3 px-1 text-left">
                <p className="font-serif font-bold text-neutral-900 text-sm line-clamp-1 group-hover:text-pink-700 transition-colors">
                  {photo.title}
                </p>
                <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1 font-sans">
                  <span>{photo.date}</span>
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/30 group-hover:scale-125 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* Bottom Action Button to Step 6                               */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="mt-16 sm:mt-20 z-10"
      >
        <button
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full border border-[#f472b6]/60 bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 backdrop-blur-md text-white shadow-[0_0_25px_rgba(244,114,182,0.45)] hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 font-sans tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
          aria-label="Lanjut ke pesan video"
        >
          <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">✦ A SPECIAL VIDEO FOR YOU ✦</span>
          <ChevronRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>

      {/* ============================================================ */}
      {/* Lightbox Modal when a Polaroid is clicked                   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-[#0a040e]/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-lg w-full p-4 sm:p-6 bg-[#fffdfa] rounded-sm shadow-2xl z-10 text-neutral-900"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-neutral-200/80 hover:bg-neutral-300 flex items-center justify-center text-neutral-800 transition-colors"
                aria-label="Tutup foto"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-square w-full rounded-xs overflow-hidden bg-neutral-900 mb-4">
                {!imgErrorMap[selectedPhoto.id] ? (
                  <Image
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${selectedPhoto.fallbackGradient} flex flex-col items-center justify-center p-6 text-center`}
                  >
                    <Heart className="w-12 h-12 text-pink-300 fill-pink-300/40 mb-3" />
                    <span className="font-serif italic text-base text-pink-100">{selectedPhoto.title}</span>
                  </div>
                )}
              </div>

              <h3 className="font-serif font-bold text-xl text-neutral-900 mb-1">
                {selectedPhoto.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3 font-sans">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-600" />
                  {selectedPhoto.date}
                </span>
                {selectedPhoto.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-pink-600" />
                    {selectedPhoto.location}
                  </span>
                )}
              </div>

              <p className="font-serif text-sm text-neutral-700 leading-relaxed italic border-t border-neutral-200 pt-3">
                &ldquo;{selectedPhoto.caption}&rdquo;
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurMemoriesSection;

