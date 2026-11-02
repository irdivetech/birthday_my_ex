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
import { MainGreeting } from "@/components/birthday/MainGreeting";
import { About } from "@/components/birthday/About";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { InteractiveFlower } from "@/components/birthday/InteractiveFlower";
import { JourneyTimeline } from "@/components/birthday/JourneyTimeline";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { Closing } from "@/components/birthday/Closing";

export default function BirthdayPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
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

  // Transition Step 3 -> Step 4
  const handleReadLetter = () => {
    setShowLetterModal(true);
  };

  // Continue to the full romantic journey after reading letter
  const handleContinueToJourney = () => {
    setHasOpenedGift(true);
    setShowLetterModal(false);

    // Smoothly scroll down to the main greeting
    setTimeout(() => {
      const greetingEl = document.getElementById("greeting");
      if (greetingEl) {
        greetingEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <main className="relative min-h-screen w-full bg-burgundy-night selection:bg-crimson selection:text-cream-light overflow-x-hidden">
      {/* Universal performant falling petals across the experience */}
      <FallingPetals density="medium" />

      {/* Floating Music Controls & Navigation */}
      <MusicToggle autoStartTrigger={triggerAudio} />

      {/* Navigation bar becomes visible once the full journey is unlocked */}
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

      {/* Quick Step Switcher Pill Bar (Allows easy jumping between Step 1, 2, 3) */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1 rounded-full bg-white/[0.06] backdrop-blur-xl border border-pink-300/25 shadow-xl">
        <button
          onClick={() => setCurrentStep(1)}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
            currentStep === 1
              ? "bg-[#f472b6] text-neutral-950 font-bold shadow-[0_0_12px_rgba(244,114,182,0.6)]"
              : "text-pink-200/70 hover:text-white"
          }`}
        >
          1. Countdown
        </button>
        <button
          onClick={() => setCurrentStep(2)}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
            currentStep === 2
              ? "bg-[#f472b6] text-neutral-950 font-bold shadow-[0_0_12px_rgba(244,114,182,0.6)]"
              : "text-pink-200/70 hover:text-white"
          }`}
        >
          2. Gift Box
        </button>
        <button
          onClick={() => setCurrentStep(3)}
          className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
            currentStep === 3
              ? "bg-[#f472b6] text-neutral-950 font-bold shadow-[0_0_12px_rgba(244,114,182,0.6)]"
              : "text-pink-200/70 hover:text-white"
          }`}
        >
          3. Special Day
        </button>
      </div>

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
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
              transition={{ duration: 0.6, ease: "easeInOut" }}
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
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full"
            >
              <SpecialDaySection onReadLetter={handleReadLetter} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step 4: Love Letter Modal / Card */}
      <LoveLetterModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        onContinueToJourney={handleContinueToJourney}
      />

      {/* ============================================================ */}
      {/* Experience Journey (Revealed/accessible on scroll)          */}
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
