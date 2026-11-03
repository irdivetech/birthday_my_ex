"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FallingPetals } from "@/components/birthday/FallingPetals";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import { CountdownSection } from "@/components/birthday/CountdownSection";
import { GiftBoxSection } from "@/components/birthday/GiftBoxSection";
import { MatrixCountdown } from "@/components/birthday/MatrixCountdown";
import { SpecialDaySection } from "@/components/birthday/SpecialDaySection";
import { LoveLetterModal } from "@/components/birthday/LoveLetterModal";
import { OurMemoriesSection } from "@/components/birthday/OurMemoriesSection";
import { VideoMessageSection } from "@/components/birthday/VideoMessageSection";
import { BirthdayWishesSection } from "@/components/birthday/BirthdayWishesSection";
import { AlwaysForeverSection } from "@/components/birthday/AlwaysForeverSection";

export type StepType = 1 | 2 | "2b" | 3 | 4 | 5 | 6 | 7;

export default function BirthdayPage() {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [triggerAudio, setTriggerAudio] = useState(false);
  const countdownAudioRef = useRef<HTMLAudioElement | null>(null);

  // Transition Step 1 -> Step 2 (Gift Box)
  const handleCountdownOpen = () => {
    setCurrentStep(2);
  };

  // Transition Step 2 -> Step 3 (Special Day)
  const handleGiftBoxOpen = () => {

    try {
      if (!countdownAudioRef.current) {
        countdownAudioRef.current = new Audio("/audio/1103.MP3");
      }
      countdownAudioRef.current.currentTime = 0;
      countdownAudioRef.current.volume = 1.0;
      countdownAudioRef.current.play().catch(() => {});
    } catch {}

    setTimeout(() => {
      setCurrentStep("2b");
    }, 250);
  };

  // Transition Step 3 -> Step 4 modal (Love Letter)
  const handleMatrixComplete = () => {
    setTriggerAudio(true);
    setCurrentStep(3);
  };

  const handleReadLetter = () => {
    setShowLetterModal(true);
  };

  // Transition from Love Letter -> Step 4 (Our Memories)
  const handleLetterToMemories = () => {
    setShowLetterModal(false);
    setCurrentStep(4);
  };

  // Transition Step 4 -> Step 5 (Video Message)
  const handleMemoriesToVideo = () => {
    setCurrentStep(5);
  };

  // Transition Step 5 -> Step 6 (Birthday Wishes)
  const handleVideoToWishes = () => {
    setCurrentStep(6);
  };

  // Transition Step 6 -> Step 7 (Closing / Always & Forever)
  const handleWishesToClosing = () => {
    setCurrentStep(7);
  };

  // Replay from beginning (Step 1)
  const handleReplayFromStart = () => {
    setCurrentStep(1);
    setShowLetterModal(false);
  };

  const stepsList: { step: StepType; label: string }[] = [
    { step: 1, label: "Countdown" },
    { step: 2, label: "Gift Box" },
    { step: 3, label: "Special Day" },
    { step: 4, label: "Memories" },
    { step: 5, label: "Video" },
    { step: 6, label: "Wishes" },
    { step: 7, label: "Forever" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-[#0a040e] text-[#fce7f3] overflow-hidden select-none">
      {/* Universal performant falling petals */}
      <FallingPetals density="medium" />

      {/* Floating Music Toggle (Bottom Right or triggered with audio) */}
      <MusicToggle autoStartTrigger={triggerAudio} />

      {/* Matrix Countdown fullscreen overlay */}
      {currentStep === "2b" && (
        <MatrixCountdown
          onComplete={handleMatrixComplete}
          audioSrc="/audio/1103.MP3"
          audioElement={countdownAudioRef.current}
        />
      )}

      {/* Quick Step Switcher Bar (Responsive Pill Navigation) */}
      {currentStep !== "2b" && (
        <nav
        aria-label="Navigasi 7 Halaman Ulang Tahun"
        className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] overflow-x-auto p-1 sm:p-1.5 rounded-full bg-[#1b0a24]/85 backdrop-blur-xl border border-pink-300/30 shadow-2xl flex items-center gap-1 scrollbar-none"
      >
        {stepsList.map((item) => (
          <button
            key={item.step}
            onClick={() => setCurrentStep(item.step)}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              currentStep === item.step
                ? "bg-gradient-to-r from-pink-500 to-[#f472b6] text-white font-bold shadow-[0_0_12px_rgba(244,114,182,0.7)] scale-105"
                : "text-pink-200/70 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {item.label}
          </button>
        ))}
        </nav>
      )}

      {/* ============================================================ */}
      {/* 7 Interactive Sequential Views (Single-Screen / No Scroll)   */}
      {/* ============================================================ */}
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {/* View 1: Countdown Section */}
          {currentStep === 1 && (
            <motion.div
              key="view-1-countdown"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <CountdownSection onOpenGift={handleCountdownOpen} />
            </motion.div>
          )}

          {/* View 2: Gift Box Section */}
          {currentStep === 2 && (
            <motion.div
              key="view-2-giftbox"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <GiftBoxSection onOpen={handleGiftBoxOpen} />
            </motion.div>
          )}

          {/* View 3: Special Day & Polaroid Gallery */}
          {currentStep === 3 && (
            <motion.div
              key="view-3-specialday"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <SpecialDaySection onReadLetter={handleReadLetter} />
            </motion.div>
          )}

          {/* View 4: Our Memories Gallery */}
          {currentStep === 4 && (
            <motion.div
              key="view-4-memories"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <OurMemoriesSection onNext={handleMemoriesToVideo} />
            </motion.div>
          )}

          {/* View 5: Video Message Section */}
          {currentStep === 5 && (
            <motion.div
              key="view-5-video"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <VideoMessageSection onNext={handleVideoToWishes} />
            </motion.div>
          )}

          {/* View 6: Birthday Wishes Card */}
          {currentStep === 6 && (
            <motion.div
              key="view-6-wishes"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <BirthdayWishesSection onNext={handleWishesToClosing} />
            </motion.div>
          )}

          {/* View 7: Closing / Always & Forever */}
          {currentStep === 7 && (
            <motion.div
              key="view-7-forever"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col justify-center items-center"
            >
              <AlwaysForeverSection onReplay={handleReplayFromStart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Love Letter Card Modal (Opened from View 3) */}
      <LoveLetterModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        onContinueToJourney={handleLetterToMemories}
      />
    </main>
  );
}
