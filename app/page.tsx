"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FallingPetals } from "@/components/birthday/FallingPetals";
import { Navigation } from "@/components/birthday/Navigation";
import { MusicToggle } from "@/components/birthday/MusicToggle";
import { Hero } from "@/components/birthday/Hero";
import { MainGreeting } from "@/components/birthday/MainGreeting";
import { About } from "@/components/birthday/About";
import { MemoryGallery } from "@/components/birthday/MemoryGallery";
import { InteractiveFlower } from "@/components/birthday/InteractiveFlower";
import { JourneyTimeline } from "@/components/birthday/JourneyTimeline";
import { FinalSurprise } from "@/components/birthday/FinalSurprise";
import { Closing } from "@/components/birthday/Closing";

export default function BirthdayPage() {
  const [hasOpenedGift, setHasOpenedGift] = useState(false);
  const [triggerAudio, setTriggerAudio] = useState(false);

  const handleOpenGift = () => {
    setHasOpenedGift(true);
    setTriggerAudio(true);

    // Smoothly scroll to the main greeting after opening
    setTimeout(() => {
      const greetingEl = document.getElementById("greeting");
      if (greetingEl) {
        greetingEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <main className="relative min-h-screen w-full bg-burgundy-night selection:bg-crimson selection:text-cream-light">
      {/* Universal performant falling petals across the experience */}
      <FallingPetals density="medium" />

      {/* Floating Music Controls & Navigation */}
      <MusicToggle autoStartTrigger={triggerAudio} />

      {/* Navigation bar becomes visible once gift is opened */}
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

      {/* Section 01: Opening Intro Screen */}
      <Hero onOpenGift={handleOpenGift} />

      {/* Experience Journey (Revealed/accessible on scroll) */}
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
