"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  Heart,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

export interface VideoMessageSectionProps {
  videoSrc?: string;
  onNext?: () => void;
  className?: string;
}

export const VideoMessageSection: React.FC<VideoMessageSectionProps> = ({
  videoSrc = "/video/birthday.mp4",
  onNext,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Simulated timer for fallback preview if video file is not on disk yet
  const [simulatedTime, setSimulatedTime] = useState(0);
  const simulatedDuration = 135; // 2 minutes 15 seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (videoError && isPlaying) {
      timer = setInterval(() => {
        setSimulatedTime((prev) => (prev >= simulatedDuration ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [videoError, isPlaying]);

  const togglePlay = () => {
    if (videoRef.current && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setVideoError(true);
            setIsPlaying(true);
          });
      }
    } else {
      // Toggle simulated playback
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current && !videoError) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current && !videoError) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    } else {
      setSimulatedTime(newTime);
    }
  };

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const activeCurrentTime = videoError ? simulatedTime : currentTime;
  const activeDuration = videoError ? simulatedDuration : duration || simulatedDuration;
  const progressPercent = activeDuration > 0 ? (activeCurrentTime / activeDuration) * 100 : 0;

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-24 select-none bg-gradient-to-b from-[#160b1e] via-[#100718] to-[#0a040e] text-[#fce7f3] ${className}`}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[580px] md:w-[720px] h-[340px] sm:h-[580px] md:h-[720px] rounded-full bg-[#f472b6]/15 blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Floating Stardust */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        {[
          { top: "14%", left: "15%", size: 2.5, delay: "0.3s" },
          { top: "25%", left: "80%", size: 3, delay: "1.2s" },
          { top: "75%", left: "12%", size: 2, delay: "2.2s" },
          { top: "82%", left: "85%", size: 2, delay: "1.0s" },
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
      <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center z-10 w-full mb-10 sm:mb-12">
        {/* Top Subtitle Badge: ✦ a special video message ✦ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#f472b6]/40 bg-[#f472b6]/10 text-pink-200 backdrop-blur-md shadow-[0_0_20px_rgba(244,114,182,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-pink-100 drop-shadow-sm">
              ✦ A SPECIAL VIDEO MESSAGE ✦
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#f472b6] animate-pulse" />
          </div>
        </motion.div>

        {/* Main Heading: A Moment For You */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fce7f3] drop-shadow-[0_4px_24px_rgba(244,114,182,0.35)]"
        >
          A Moment For You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans text-sm sm:text-base text-pink-200/80 tracking-wide font-light mt-3 max-w-md"
        >
          Sepotong video manis dan kata-kata tulus yang kusimpan khusus untuk hari bahagiamu.
        </motion.p>
      </div>

      {/* ============================================================ */}
      {/* Centered Glassmorphic Video Player Frame                     */}
      {/* ============================================================ */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
        className="relative max-w-4xl w-full mx-auto rounded-3xl p-3 sm:p-5 bg-[#1a0b22]/85 backdrop-blur-2xl border border-pink-300/30 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.18)] z-20 group"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Inner Video Wrapper */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-2xl">
          {/* Native HTML5 Video Element */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onError={() => setVideoError(true)}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Cinematic Romantic Fallback Screen (if video file not present) */}
          {videoError && (
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1b0a24] via-[#2d123b] to-[#12051a] flex flex-col items-center justify-center p-6 text-center">
              {/* Animated Floating Hearts Reel */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-[#f472b6]/20 flex items-center justify-center border border-[#f472b6]/40 shadow-[0_0_30px_rgba(244,114,182,0.4)] animate-pulse">
                  <Heart className="w-12 h-12 text-[#f472b6] fill-[#f472b6]/40 animate-pulse" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-300 animate-spin" style={{ animationDuration: "8s" }} />
              </div>

              <h3 className="font-serif font-bold text-xl sm:text-2xl text-pink-100 mb-1">
                A Cinematic Birthday Reel For You
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-pink-200/80 max-w-md">
                {isPlaying
                  ? "Playing your dedicated romantic birthday video... 🎬✨"
                  : "Putar untuk menyaksikan pesan video spesial ulang tahunmu ♡"}
              </p>

              {/* Progress Bar Animation Simulation */}
              {isPlaying && (
                <div className="mt-4 flex items-center gap-2 text-xs text-pink-300 font-sans">
                  <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                  <span>Streaming with love: {formatTime(simulatedTime)}</span>
                </div>
              )}
            </div>
          )}

          {/* Prominent Pink Circular Play Button Overlay */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[2px] cursor-pointer transition-all duration-300 z-10"
              role="button"
              tabIndex={0}
              aria-label="Putar video"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-pink-500 via-[#f472b6] to-rose-500 text-white flex items-center justify-center shadow-[0_0_35px_rgba(244,114,182,0.85)] border-2 border-white/60 transition-transform cursor-pointer"
              >
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white translate-x-0.5 text-white" />
              </motion.div>
            </div>
          )}

          {/* Bottom Video Control Bar */}
          <div
            className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 transition-opacity duration-300 z-20 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Scrubber Progress Bar */}
            <div className="relative w-full flex items-center group/scrubber cursor-pointer">
              <input
                type="range"
                min="0"
                max={activeDuration || 100}
                value={activeCurrentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#f472b6] hover:h-2 transition-all"
                aria-label="Video timeline scrubber"
              />
              {/* Highlight bar */}
              <div
                className="absolute left-0 h-1.5 bg-gradient-to-r from-pink-500 to-[#f472b6] rounded-l-lg pointer-events-none shadow-[0_0_10px_rgba(244,114,182,0.8)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Buttons & Indicators */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-pink-100 font-sans">
              <div className="flex items-center gap-3">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label={isPlaying ? "Jeda video" : "Putar video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  )}
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                  aria-label={isMuted ? "Bunyikan video" : "Bisukan video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Time Display */}
                <span className="text-[11px] sm:text-xs text-pink-200/80 font-mono tracking-wider">
                  {formatTime(activeCurrentTime)} / {formatTime(activeDuration)}
                </span>
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullScreen}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Layar penuh"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* Bottom Action Button to Step 7 (Birthday Wishes)            */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="mt-14 sm:mt-16 z-10"
      >
        <button
          onClick={onNext}
          className="group relative inline-flex items-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full border border-[#f472b6]/60 bg-gradient-to-r from-pink-600/80 via-rose-500/80 to-pink-600/80 backdrop-blur-md text-white shadow-[0_0_25px_rgba(244,114,182,0.45)] hover:shadow-[0_0_35px_rgba(244,114,182,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 font-sans tracking-[0.2em] uppercase font-semibold text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#f472b6]"
          aria-label="Lanjut ke kartu ucapan ulang tahun"
        >
          <Sparkles className="w-4 h-4 text-pink-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-bold">✦ READ MY WISHES FOR YOU ✦</span>
          <ChevronRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </motion.div>
    </section>
  );
};

export default VideoMessageSection;

