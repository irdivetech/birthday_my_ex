"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MatrixCountdownProps {
  onComplete: () => void;
  audioSrc?: string;
  audioElement?: HTMLAudioElement | null;
}

export const MatrixCountdown: React.FC<MatrixCountdownProps> = ({
  onComplete,
  audioSrc = "/audio/1103.MP3",
  audioElement = null,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(audioElement);
  const [currentDisplay, setCurrentDisplay] = useState<string>("3");

  // ============================================================
  // Audio Synchronization (Started when Gift Box explodes)
  // ============================================================
  useEffect(() => {
    let audio: HTMLAudioElement | null = audioElement || audioRef.current;
    let didCreateAudio = false;
    let endedHandler: (() => void) | null = null;
    let safetyTimeout: NodeJS.Timeout | null = null;

    // If audio was not passed or not playing, instantiate and play it as fallback
    if (!audio && audioSrc) {
      try {
        audio = new Audio(audioSrc);
        audio.volume = 1.0;
        audio.play().catch(() => {});
        didCreateAudio = true;
      } catch {
        // Fallback
      }
    }

    if (audio) {
      audioRef.current = audio;
      endedHandler = () => {
        setTimeout(() => {
          onComplete();
        }, 350);
      };
      audio.addEventListener("ended", endedHandler);
    }

    // Safety timeout in case audio is interrupted
    safetyTimeout = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      if (safetyTimeout) clearTimeout(safetyTimeout);
      if (audio) {
        if (endedHandler) audio.removeEventListener("ended", endedHandler);
        if (didCreateAudio) {
          audio.pause();
          audio.currentTime = 0;
        }
      }
    };
  }, [audioSrc, audioElement, onComplete]);

  // ============================================================
  // Matrix Rain via HTML5 Canvas (Matching Reference Photo)
  // ============================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Romantic words stream matching the reference photo
    const words = [
      "HAPPYBIRTHDAY",
      "SAYANGKU",
      "ILOVEYOU",
      "AURACANTIK",
      "FOREVER",
      "MYLOVE",
      "HARIINI",
      "SPESIAL",
      "CINTAKU",
      "TERINDAH",
    ];
    const fullText = words.join("");

    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);

    // Each column has a drop position and word offset
    const drops = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * -30)
    );
    const speed = Array.from({ length: columns }, () => 1 + Math.random() * 0.8);
    const colWordIdx = Array.from({ length: columns }, () =>
      Math.floor(Math.random() * fullText.length)
    );

    const draw = () => {
      // Deep black fade for dramatic falling trails
      ctx.fillStyle = "rgba(4, 2, 7, 0.16)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `bold ${fontSize}px 'Courier New', Courier, monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < drops.length; i++) {
        const charIdx = (colWordIdx[i] + Math.floor(drops[i])) % fullText.length;
        const char = fullText[Math.abs(charIdx) % fullText.length] || "♡";
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        // Head character is glowing white-pink, trail is neon magenta-pink
        if (Math.random() > 0.88) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ff2a85";
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = "#ff2a85";
          ctx.shadowColor = "#f43f5e";
          ctx.shadowBlur = 4;
        }

        ctx.fillText(char, x, y);

        // Reset drop to top with randomized height once it leaves the bottom
        if (y > height && Math.random() > 0.96) {
          drops[i] = 0;
          colWordIdx[i] = Math.floor(Math.random() * fullText.length);
        }

        drops[i] += speed[i];
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ============================================================
  // Countdown Visual Sequence: Synchronized with Audio Hardware Clock
  // Locks directly to audio.currentTime to prevent any drift/lag
  // ============================================================
  useEffect(() => {
    let animId: number;
    const startFallback = performance.now();

    const checkTime = () => {
      const audio = audioRef.current;
      // Real-time audio playback timestamp
      const time =
        audio && audio.currentTime > 0
          ? audio.currentTime
          : (performance.now() - startFallback) / 1000;

      // Accelerated timing thresholds ("agak cepetin dikit")
      if (time >= 3.25) {
        setCurrentDisplay((prev) => (prev !== "💕" ? "💕" : prev));
      } else if (time >= 2.15) {
        setCurrentDisplay((prev) => (prev !== "1" ? "1" : prev));
      } else if (time >= 1.05) {
        setCurrentDisplay((prev) => (prev !== "2" ? "2" : prev));
      } else {
        setCurrentDisplay((prev) => (prev !== "3" ? "3" : prev));
      }

      animId = requestAnimationFrame(checkTime);
    };

    animId = requestAnimationFrame(checkTime);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] overflow-hidden select-none"
      role="region"
      aria-label="Animasi Hitungan Mundur"
    >
      {/* Import Pixel Font from Google Fonts for authentic 8-bit reference match */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@700&display=swap');
      `}</style>

      {/* HTML5 Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Soft Center Pink Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-[#ff2a85]/20 blur-[130px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Dark Vignette around edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Center Pixelated Countdown Display */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDisplay}
            initial={{ scale: 2.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.45, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
              duration: 0.35,
            }}
            className="flex items-center justify-center"
          >
            {currentDisplay === "💕" ? (
              <span
                className="text-8xl sm:text-9xl md:text-[13rem] animate-pulse select-none"
                style={{
                  filter:
                    "drop-shadow(0 0 35px #ff2a85) drop-shadow(0 0 70px #ec4899)",
                }}
              >
                💕
              </span>
            ) : (
              <span
                className="select-none leading-none tracking-tighter text-[#ff70a6] font-bold"
                style={{
                  fontFamily: "'Silkscreen', 'Press Start 2P', monospace",
                  fontSize: "clamp(5rem, 20vw, 12rem)",
                  textShadow:
                    "0 0 15px #ff2a85, 0 0 35px #ff2a85, 0 0 65px #be185d",
                  imageRendering: "pixelated",
                }}
              >
                {currentDisplay}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MatrixCountdown;
