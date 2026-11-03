"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Heart, ArrowDown, ChevronLeft } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayData } from "@/data/birthday";

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
  const triggerCelebration = () => {
    try {
      const colors = ["#f472b6", "#ec4899", "#fb7185", "#fce7f3", "#d7a85c"];
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors,
      });
    } catch {
      // Audio/canvas fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
          {/* Backdrop with Deep Plum Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a040e]/85 backdrop-blur-xl -z-10"
            aria-hidden="true"
          />

          {/* Centered Ambient Pink Radial Aura Behind Modal */}
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-[#f472b6]/20 blur-[150px] pointer-events-none -z-10"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className={`relative w-full max-w-2xl my-8 flex flex-col items-center ${className}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-heading"
          >
            {/* Top Heading: Happy Birthday */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 text-pink-300 text-xs tracking-[0.3em] uppercase font-sans font-semibold mb-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#f472b6]" />
                <span>SPECIAL BIRTHDAY MESSAGE</span>
                <Sparkles className="w-3.5 h-3.5 text-[#f472b6]" />
              </motion.div>

              <motion.h2
                id="letter-heading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.4)]"
              >
                Happy Birthday
              </motion.h2>
            </div>

            {/* Close Button Top Right */}
            <button
              onClick={onClose}
              className="absolute -top-3 right-0 sm:right-2 w-10 h-10 rounded-full bg-white/[0.06] border border-pink-300/30 text-pink-200 hover:text-white hover:border-[#f472b6] hover:bg-white/[0.12] transition-colors flex items-center justify-center backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
              aria-label="Tutup surat cinta"
            >
              <X className="w-5 h-5" />
            </button>

            {/* ============================================================ */}
            {/* Main Content Box: Dark Glassmorphism Card                   */}
            {/* ============================================================ */}
            <div className="relative w-full rounded-3xl p-6 sm:p-10 md:p-12 bg-[#1b0c23]/85 backdrop-blur-2xl border border-pink-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.18)] text-left overflow-hidden">
              {/* Subtle top light highlight inside glass */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-pink-200/40 to-transparent" />

              {/* Heart watermark in the corner */}
              <Heart className="absolute -bottom-10 -right-10 w-44 h-44 text-[#f472b6]/5 fill-[#f472b6]/5 pointer-events-none -rotate-12" />

              {/* First Line: HAPPY BIRTHDAY SAYANGKUUU 💕 */}
              <div className="mb-6 pb-4 border-b border-pink-300/15">
                <p className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-pink-200 tracking-wide drop-shadow-[0_2px_10px_rgba(244,114,182,0.3)]">
                  HAPPY BIRTHDAY SAYANGKUUU 💕
                </p>
                <span className="font-serif italic text-xs sm:text-sm text-pink-300/70 mt-1 block">
                  Untuk {birthdayData.recipient.name}, seseorang yang selalu paling berharga di hatiku.
                </span>
              </div>

              {/* Warm, Romantic Paragraphs */}
              <div className="space-y-4 sm:space-y-5 font-serif text-sm sm:text-base md:text-lg leading-relaxed text-[#fce7f3]/95 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <p>
                  Selamat ulang tahun ya cintaa! Hari ini hari yang spesial banget karena hari ini adalah hari lahir orang yang paling berarti di hidupku. Dari sekian banyak orang di dunia ini, aku bersyukur luar biasa bisa mengenalmu dan menjadi bagian dari ceritamu.
                </p>

                <p>
                  Terima kasih ya sudah selalu ada dengan senyuman manismu yang selalu berhasil menenangkan hariku yang berat. Setiap tawa yang kita bagi bersama, setiap percakapan panjang hingga larut malam, dan setiap tatapan hangatmu adalah anugerah yang selalu aku syukuri setiap hari.
                </p>

                <p>
                  Kamu punya hati yang begitu lembut, kebaikan yang tulus, dan cara pandang yang indah. Bersamamu membuat duniaku terasa jauh lebih hangat dan bermakna. Tidak ada yang lebih membahagiakan selain melihatmu tersenyum bahagia.
                </p>

                <p>
                  Di usiamu yang baru ini, aku berdoa semoga semua impian indah dan harapan terbaikmu pelan-pelan terwujud satu per satu. Semoga kamu selalu dikelilingi kebahagiaan, kesehatan yang sempurna, rezeki yang melimpah, dan cinta yang tak pernah habis. Apapun jalan di depan, ketahuilah bahwa aku akan selalu ada di sampingmu untuk mendukungmu dan menggenggam tanganmu erat-erat.
                </p>

                <p className="font-serif italic text-pink-200 pt-2">
                  Selamat hari ulang tahun, kesayanganku. I love you more than words can ever say. 🤍
                </p>
              </div>

              {/* Signature & Wax Seal */}
              <div className="mt-8 pt-6 border-t border-pink-300/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-script text-2xl sm:text-3xl text-pink-300">
                    With all my love, always
                  </p>
                  <p className="font-serif text-xs text-pink-200/60 mt-0.5">
                    {birthdayData.recipient.nickname ? `Untuk ${birthdayData.recipient.nickname}` : "Selamanya untukmu"} ♡
                  </p>
                </div>

                {/* Wax seal decoration */}
                <div
                  onClick={triggerCelebration}
                  className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-300/30 hover:border-pink-300 hover:bg-pink-500/20 transition-all text-xs text-pink-200 font-sans"
                  title="Sentuh untuk taburan cinta ✨"
                >
                  <Heart className="w-3.5 h-3.5 text-[#f472b6] fill-[#f472b6] group-hover:scale-125 transition-transform" />
                  <span className="tracking-wider">Sentuh untuk cinta ✨</span>
                </div>
              </div>

              {/* Action Buttons: Continue to Journey */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onContinueToJourney) {
                      onContinueToJourney();
                    }
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white font-sans font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(244,114,182,0.4)] hover:shadow-[0_0_30px_rgba(244,114,182,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Lanjutkan Kisah Kita</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-pink-300/30 text-pink-200 hover:text-white hover:border-pink-300 bg-white/[0.04] font-sans text-xs sm:text-sm tracking-[0.15em] uppercase transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoveLetterModal;

