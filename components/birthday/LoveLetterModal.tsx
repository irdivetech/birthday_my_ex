"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import confetti from "canvas-confetti";

export interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueToJourney?: () => void;
  className?: string;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  onContinueToJourney,
  className = "",
}) => {
  const fullParagraphs = useMemo(
    () => [
      "Selamat ulang tahun, Anggifa Zahratusita! ❤️",
      "Mungkin hari ini adalah hari spesial banget bagi kamu, karena tepatnya 21 November 2026, kamu menginjak usia 18 tahun yaa? Atau 19 tahun? Lupa akuu, hehe... Pokoknya segitulah.",
      "Intinya, aku ikut seneng dan ikut bahagia di hari ini karena salah satu wanita yang spesial bagi aku udah nambah dewasa. Besar harapan aku, di tahun di mana kamu bertambah usia ini, kamu bisa jadi pribadi yang lebih baik, bisa lebih kuat, dan bahagia terus.",
      "Aku juga doain semoga semua hal yang kamu pengenin bisa tercapai di tahun ini. Semua impian, semua cita-cita yang pernah kamu ceritain ke aku dulu, semoga kelihatan arah atau hilalnya di tahun ini. Aku juga berdoa semoga kamu terus dikelilingi sama orang-orang baik dan lingkungan yang sehat.",
      "Ohh iyaa, maaf ya aku nggak bisa ngasih apa-apa selain ucapan ini. Hari ini aku lagi di Bekasi ikut pelatihan dan beresnya itu tanggal 5 Desember. Aku minta doanya aja, semoga aku baik-baik aja di sini. Insyaallah kalau aku udah pulang nanti, aku temuin kamu.",
      "Jujur, sebenernya aku maluu tau bikin ucapan kayak gini 🥺. Kita kan sekarang nggak ada hubungan apa-apa, apalagi sekarang udah nggak chattingan sama sekali, kan? Yaa, tapi nggak apa-apa. Aku lawan gengsiku, aku lawan egoku buat ngasihin ini ke kamu.",
      "Jujur, kalau masih ditanya sayang, yaa sayang. Orang kamu first experience aku selama di Cianjur. Bawaannya kalau ke Cianjur tuh inget kamu, hehe...",
      "Tapi abaikan semua itu. Sekarang rayakan dulu hari spesial ini dengan orang-orang tersayang kamu, bisa keluarga, teman, dan lain-lain. Yang intinya, aku pengen kamu hari ini lupain semua masalah dan anggap kamu udah berada di titik di mana semua yang kamu harapin, yang kamu inginkan, dan yang kamu pengenin sudah tercapai.",
      "Aku pengen kamu bahagia yaa, Anggi. Aku sayang kamuu....",
      "Sekali lagi, Happy Birthday to You!",
      "I love you more than words can ever say. ❤️",
    ],
    []
  );

  const fullMessage = useMemo(() => fullParagraphs.join("\n\n"), [fullParagraphs]);
  const [charIndex, setCharIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll as text types
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [charIndex]);

  // Typewriter effect logic
  useEffect(() => {
    if (!isOpen) {
      setCharIndex(0);
      return;
    }

    if (charIndex >= fullMessage.length) return;

    const currentChar = fullMessage[charIndex];
    // Natural cadence pause on punctuation
    const delay =
      currentChar === "." || currentChar === "!" || currentChar === "?"
        ? 160
        : currentChar === ","
        ? 80
        : 18;

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, charIndex, fullMessage]);

  const isFinished = charIndex >= fullMessage.length;

  const triggerCelebration = () => {
    try {
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });
    } catch {}
  };

  // Split displayed text back into paragraphs
  const displayedText = fullMessage.slice(0, charIndex);
  const displayedParagraphs = displayedText.split("\n\n");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto overflow-x-hidden select-none">
          {/* Backdrop with Deep Plum / Starry Night Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#08020c]/90 backdrop-blur-2xl -z-10"
            aria-hidden="true"
          />

          {/* Ambient Glowing Aura */}
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[620px] h-[340px] sm:h-[620px] rounded-full bg-[#f472b6]/20 blur-[150px] pointer-events-none -z-10"
            aria-hidden="true"
          />
          <div
            className="fixed top-1/3 left-1/3 w-[260px] sm:w-[450px] h-[260px] sm:h-[450px] rounded-full bg-[#9333ea]/15 blur-[130px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Floating Stardust Particles */}
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
            {[
              { top: "15%", left: "12%", size: 2, delay: "0.2s" },
              { top: "22%", left: "85%", size: 3, delay: "1.2s" },
              { top: "65%", left: "10%", size: 2.5, delay: "2.1s" },
              { top: "78%", left: "88%", size: 2, delay: "0.7s" },
              { top: "42%", left: "4%", size: 1.5, delay: "1.8s" },
              { top: "88%", left: "32%", size: 2.5, delay: "1.4s" },
              { top: "18%", left: "62%", size: 2, delay: "2.5s" },
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
                  boxShadow: "0 0 12px rgba(244, 114, 182, 0.8)",
                }}
              />
            ))}
          </div>

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 260 }}
            className={`relative w-full max-w-xl my-auto flex flex-col items-center ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-heading"
          >
            {/* Glowing Italic Serif Title: Happy Birthday */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-3 sm:mb-5"
            >
              <h2
                id="letter-heading"
                className="font-serif italic text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#fff1f2] drop-shadow-[0_0_28px_rgba(244,114,182,0.85)] leading-tight"
              >
                Happy Birthday
              </h2>
            </motion.div>

            {/* ============================================================ */}
            {/* Clean Frosted Dark-Glass Card Container                      */}
            {/* ============================================================ */}
            <div
              className="relative w-full rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-[#160a22]/85 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] text-left overflow-hidden transition-all duration-300 pb-6 sm:pb-8"
            >
              {/* Subtle top edge highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-200/50 to-transparent pointer-events-none" />

              {/* Header inside card */}
              <div className="mb-3.5 sm:mb-5 flex items-center justify-between border-b border-white/10 pb-3">
                <p className="font-sans font-bold text-xs sm:text-sm md:text-base text-pink-100 tracking-wider flex items-center gap-2 drop-shadow-sm">
                  <span>HAPPY BIRTHDAY, MY EX</span>
                  <span>🤍</span>
                </p>
              </div>

              {/* Typewritten Paragraphs with scrollable viewport */}
              <div
                ref={scrollContainerRef}
                className="space-y-3.5 sm:space-y-4 font-serif text-xs sm:text-sm md:text-base leading-relaxed text-[#fce7f3]/95 max-h-[44vh] sm:max-h-[48vh] overflow-y-auto pr-2 custom-scrollbar scroll-smooth"
              >
                {displayedParagraphs.map((para, idx) => {
                  const isCurrentPara = idx === displayedParagraphs.length - 1;
                  const isBold =
                    idx === 0 ||
                    idx === displayedParagraphs.length - 1 ||
                    idx === displayedParagraphs.length - 2;

                  return (
                    <p
                      key={idx}
                      className={`relative ${
                        isBold ? "font-semibold text-pink-100" : ""
                      }`}
                    >
                      {para}
                      {isCurrentPara && !isFinished && (
                        <span className="inline-block w-[2px] h-3.5 sm:h-4 bg-pink-200 ml-1.5 animate-[pulse_0.75s_infinite] align-middle shadow-[0_0_8px_rgba(244,114,182,1)]" />
                      )}
                    </p>
                  );
                })}
              </div>

              {/* ============================================================ */}
              {/* Bottom Actions Area: Optimized for Mobile UI                 */}
              {/* ============================================================ */}
              <div className="mt-4 sm:mt-5 pt-3.5 border-t border-white/10 flex flex-col items-center gap-3 w-full">
                {/* 1. BUTTON "Sentuh untuk cinta ✨" -> SELALU MUNCUL DARI AWAL */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerCelebration();
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-1.5 rounded-full bg-pink-500/10 border border-pink-300/35 hover:border-pink-300 hover:bg-pink-500/20 active:scale-95 transition-all text-xs text-pink-200 font-sans shadow-sm"
                  title="Sentuh untuk taburan cinta ✨"
                >
                  <Heart className="w-3.5 h-3.5 text-[#f472b6] fill-[#f472b6] group-hover:scale-125 transition-transform" />
                  <span className="tracking-wide">Sentuh untuk cinta ✨</span>
                </button>

                {/* 2. BUTTON "LANJUTKAN KISAH ↓" -> MUNCUL PAS TEKS BERES DENGAN TATA LETAK RAPI DI MOBILE */}
                <AnimatePresence>
                  {isFinished && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="w-full flex justify-center pt-0.5"
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          if (onContinueToJourney) {
                            onContinueToJourney();
                          }
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white font-sans font-bold text-xs sm:text-sm tracking-[0.18em] uppercase shadow-[0_0_25px_rgba(244,114,182,0.55)] hover:shadow-[0_0_35px_rgba(244,114,182,0.8)] active:scale-[0.98] transition-all"
                      >
                        <span>LANJUTKAN KISAH</span>
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoveLetterModal;
