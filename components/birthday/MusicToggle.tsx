"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { romanticAudio } from "@/utils/romanticAudio";
import { birthdayData } from "@/data/birthday";

interface MusicToggleProps {
  autoStartTrigger?: boolean;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ autoStartTrigger = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play immediately on mount + unlock on first user interaction
  useEffect(() => {
    const playAudio = () => {
      romanticAudio.start(birthdayData.audio.src).then((started) => {
        if (started) {
          setIsPlaying(true);
        }
      });
    };

    // 1. Try immediate autoplay on page load
    playAudio();

    // 2. Modern browser autoplay safeguard:
    // If the browser blocks unmuted audio before initial gesture,
    // trigger on the very first touch/click anywhere on the screen
    const handleFirstGesture = () => {
      if (!romanticAudio.getPlaying()) {
        playAudio();
      }
    };

    window.addEventListener("click", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true, passive: true });
    window.addEventListener("pointerdown", handleFirstGesture, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("pointerdown", handleFirstGesture);
    };
  }, []);

  // When autoStartTrigger becomes true from parent
  useEffect(() => {
    if (autoStartTrigger && !romanticAudio.getPlaying()) {
      romanticAudio.start(birthdayData.audio.src).then((started) => {
        if (started) {
          setIsPlaying(true);
        }
      });
    }
  }, [autoStartTrigger]);

  // Keep state synchronized with romanticAudio engine
  useEffect(() => {
    const checkInterval = setInterval(() => {
      setIsPlaying(romanticAudio.getPlaying());
    }, 500);

    return () => clearInterval(checkInterval);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      romanticAudio.stop();
      setIsPlaying(false);
    } else {
      romanticAudio.start(birthdayData.audio.src).then((started) => {
        setIsPlaying(started);
      });
    }
  };

  return (
    <>
      {/* ============================================================ */}
      {/* 1. BOTTOM LEFT: Pill Playing Indicator ("ılı 🎵 playing")     */}
      {/* ============================================================ */}
      <aside
        className="fixed bottom-5 sm:bottom-6 left-5 sm:left-6 z-40 pointer-events-auto select-none"
        aria-label="Status pemutar musik"
      >
        <button
          onClick={toggleMusic}
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#1b0a24]/85 backdrop-blur-xl border border-[#f472b6]/35 shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(244,114,182,0.25)] hover:border-[#f472b6]/70 hover:shadow-[0_0_25px_rgba(244,114,182,0.4)] active:scale-95 transition-all duration-300 text-xs font-sans text-pink-200"
          title={isPlaying ? "Jeda musik latar" : "Putar musik latar"}
        >
          {/* Animated sound wave bars when playing */}
          {isPlaying ? (
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
            {isPlaying ? "🎵 playing" : "🎵 paused"}
          </span>
        </button>
      </aside>

      {/* ============================================================ */}
      {/* 2. BOTTOM RIGHT: Circular Speaker Icon Button                */}
      {/* ============================================================ */}
      <aside
        className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40 pointer-events-auto select-none"
        aria-label="Tombol suara"
      >
        <button
          onClick={toggleMusic}
          className={`group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1b0a24]/85 backdrop-blur-xl flex items-center justify-center border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f472b6] shadow-xl ${
            isPlaying
              ? "border-[#f472b6] text-pink-200 shadow-[0_0_20px_rgba(244,114,182,0.4)] scale-105"
              : "border-pink-300/30 text-pink-200/70 hover:text-white hover:border-[#f472b6]/60"
          }`}
          aria-label={isPlaying ? "Matikan suara musik latar" : "Nyalakan musik latar"}
          title={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-pink-200 animate-pulse" />
              {/* Animated glowing ping dot */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f472b6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f472b6]"></span>
              </span>
            </div>
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      </aside>
    </>
  );
};

export default MusicToggle;
