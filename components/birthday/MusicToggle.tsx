"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { romanticAudio } from "@/utils/romanticAudio";
import { birthdayData } from "@/data/birthday";

interface MusicToggleProps {
  autoStartTrigger?: boolean;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({ autoStartTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (autoStartTrigger && !hasInteracted) {
      setHasInteracted(true);
      romanticAudio.start(birthdayData.audio.src).then((started) => {
        setIsPlaying(started);
      });
    }
  }, [autoStartTrigger, hasInteracted]);

  const toggleMusic = () => {
    setHasInteracted(true);
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
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Track Label Tooltip (visible on hover or when playing) */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass-burgundy border border-gold/30 text-xs text-cream-light/90 shadow-lg transition-all duration-300 ${
          isPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <Music className="w-3.5 h-3.5 text-gold animate-bounce" />
        <span className="font-serif italic">{birthdayData.audio.title}</span>
      </div>

      {/* Main Floating Button */}
      <button
        onClick={toggleMusic}
        className={`group relative w-12 h-12 rounded-full glass-burgundy flex items-center justify-center border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold shadow-xl ${
          isPlaying
            ? "border-gold text-gold shadow-gold-glow scale-105"
            : "border-gold/30 text-cream-light/75 hover:text-cream-light hover:border-gold/60"
        }`}
        aria-label={isPlaying ? "Mute romantic background music" : "Play romantic background music"}
        title={isPlaying ? "Mute romantic music" : "Play romantic music"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-gold animate-pulse" />
            {/* Animated sound wave bars */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
