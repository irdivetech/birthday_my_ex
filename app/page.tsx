"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FallingPetals } from "@/components/birthday/FallingPetals";
import { Navigation } from "@/components/birthday/Navigation";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import { CountdownSection } from "@/components/birthday/CountdownSection";
import { GiftBoxSection } from "@/components/birthday/GiftBoxSection";
import { SpecialDaySection } from "@/components/birthday/SpecialDaySection";
import { LoveLetterModal } from "@/components/birthday/LoveLetterModal";
import { OurMemoriesSection } from "@/components/birthday/OurMemoriesSection";
import { VideoMessageSection } from "@/components/birthday/VideoMessageSection";
import { BirthdayWishesSection } from "@/components/birthday/BirthdayWishesSection";
import { AlwaysForeverSection } from "@/components/birthday/AlwaysForeverSection";
import { MainGreeting } from "@/components/birthday/MainGreeting";
import { About } from "@/components/birthday/About";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { InteractiveFlower } from "@/components/birthday/InteractiveFlower";
import { JourneyTimeline } from "@/components/birthday/JourneyTimeline";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { Closing } from "@/components/birthday/Closing";

type StepType = 1 | 2 | 3 | 5 | 6 | 7 | 8;

export default function BirthdayPage() {
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [triggerAudio, setTriggerAudio] = useState(false);

  // Transition Step 1 -> Step 2
  const handleCountdownOpen = () => {
    setCurrentStep(2);
  };

  // Transition Step 2 -> Step 3
  const handleGiftBoxOpen = () => {
    setTriggerAudio(true);
    setCurrentStep(3);
  };

  // Transition Step 3 -> Step 4 (Love Letter Modal)
  const handleReadLetter = () => {
    setShowLetterModal(true);
  };

  // Transition Step 4 -> Step 5 (Memories Gallery)
  const handleLetterToMemories = () => {
    setShowLetterModal(false);
    setCurrentStep(5);
  };

  // Transition Step 5 -> Step 6 (Video Message)
  const handleMemoriesToVideo = () => {
    setCurrentStep(6);
  };

  // Transition Step 6 -> Step 7 (Birthday Wishes)
  const handleVideoToWishes = () => {
    setCurrentStep(7);
  };

  // Transition Step 7 -> Step 8 (Closing / Always & Forever)
  const handleWishesToClosing = () => {
    setCurrentStep(8);
  };

  // Reset entire flow back to Step 1 (Replay)
  const handleReplayFromStart = () => {
    setCurrentStep(1);
    setShowLetterModal(false);
    setHasOpenedGift(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Optional: Scroll down to full deep journey sections
  const handleScrollToDeepJourney = () => {
    setHasOpenedGift(true);
    setShowLetterModal(false);
    setTimeout(() => {
      const greetingEl = document.getElementById("greeting");
      if (greetingEl) {
        greetingEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  const stepsList: { step: StepType; label: string }[] = [
    { step: 1, label: "Countdown" },
    { step: 2, label: "Gift Box" },
    { step: 3, label: "Special Day" },
    { step: 5, label: "Memories" },
    { step: 6, label: "Video" },
    { step: 7, label: "Wishes" },
    { step: 8, label: "Forever" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-burgundy-night selection:bg-crimson selection:text-cream-light overflow-x-hidden">
      {/* Universal performant falling petals across the experience */}
      <FallingPetals density="medium" />

      {/* Floating Music Controls & Navigation */}
      <MusicToggle autoStartTrigger={triggerAudio} />

      {/* Navigation bar becomes visible once the deep journey is unlocked */}
      <AnimatePresence>
        {hasOpenedGift && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Navigation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Step Switcher Bar (Responsive Pill Navigation) */}
      <nav
        aria-label="Navigasi Halaman Ulang Tahun"
        className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] overflow-x-auto p-1 sm:p-1.5 rounded-full bg-[#1b0a24]/80 backdrop-blur-xl border border-pink-300/30 shadow-2xl flex items-center gap-1 scrollbar-none"
      >
        {stepsList.map((item) => (
          <button
            key={item.step}
            onClick={() => setCurrentStep(item.step)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              currentStep === item.step
                ? "bg-gradient-to-r from-pink-500 to-[#f472b6] text-white font-bold shadow-[0_0_12px_rgba(244,114,182,0.7)] scale-105"
                : "text-pink-200/70 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* Sequential Interactive Steps with Framer Motion Transitions */}
      {/* ============================================================ */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          {/* Step 1: Countdown Section */}
          {currentStep === 1 && (
            <motion.div
              key="step-1-countdown"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <CountdownSection onOpenGift={handleCountdownOpen} />
            </motion.div>
          )}

          {/* Step 2: Gift Box Section */}
          {currentStep === 2 && (
            <motion.div
              key="step-2-giftbox"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <GiftBoxSection onOpen={handleGiftBoxOpen} />
            </motion.div>
          )}

          {/* Step 3: Your Special Day & Polaroid Gallery */}
          {currentStep === 3 && (
            <motion.div
              key="step-3-specialday"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <SpecialDaySection onReadLetter={handleReadLetter} />
            </motion.div>
          )}

          {/* Step 5: Our Memories Section */}
          {currentStep === 5 && (
            <motion.div
              key="step-5-memories"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <OurMemoriesSection onNext={handleMemoriesToVideo} />
            </motion.div>
          )}

          {/* Step 6: Video Message Section */}
          {currentStep === 6 && (
            <motion.div
              key="step-6-video"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <VideoMessageSection onNext={handleVideoToWishes} />
            </motion.div>
          )}

          {/* Step 7: Birthday Wishes Card */}
          {currentStep === 7 && (
            <motion.div
              key="step-7-wishes"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <BirthdayWishesSection onNext={handleWishesToClosing} />
            </motion.div>
          )}

          {/* Step 8: Closing / Always & Forever Section */}
          {currentStep === 8 && (
            <motion.div
              key="step-8-forever"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="w-full"
            >
              <AlwaysForeverSection onReplay={handleReplayFromStart} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 4: Love Letter Modal / Card */}
      <LoveLetterModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        onContinueToJourney={handleLetterToMemories}
      />

      {/* ============================================================ */}
      {/* Full Deep Experience Journey (Accessible On Scroll)          */}
      {/* ============================================================ */}
      <div
        className={`transition-opacity duration-1000 ${
          hasOpenedGift ? "opacity-100" : "opacity-95"
        }`}
      >
        {/* Section 02: Main Birthday Greeting */}
        <MainGreeting />

        {/* Section 03: A Little About You (Warm Cream Paper) */}
        <About />

        {/* Section 04: Memory Gallery with Lightbox */}
        <MemoryGallery />

        {/* Section 05 & 06: Interactive Flower & Hidden Message */}
        <InteractiveFlower />

        {/* Section 07: Our Journey Timeline */}
        <JourneyTimeline />

        {/* Section 08: Final Birthday Surprise (Climax with Candle Wish) */}
        <FinalSurprise />

        {/* Section 09: Closing Night Sky */}
        <Closing />
      </div>
    </main>
  );
}
