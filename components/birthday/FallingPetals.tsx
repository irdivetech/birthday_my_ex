"use client";

import React, { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  sway: number;
  swaySpeed: number;
  opacity: number;
  type: "rose" | "sparkle" | "gold";
  depth: number; // 0 (far/small) to 1 (near/large)
}

interface FallingPetalsProps {
  density?: "low" | "medium" | "high";
  interactive?: boolean;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({
  density = "medium",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

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

    // Determine count based on screen size & density
    const countMultiplier = density === "low" ? 0.5 : density === "high" ? 1.5 : 1.0;
    const isMobile = width < 768;
    const baseCount = isMobile ? 24 : 45;
    const totalPetals = Math.floor(baseCount * countMultiplier);

    // Helper to generate a petal
    const createPetal = (startY?: number): Petal => {
      const depth = Math.random();
      const isSparkle = Math.random() < 0.15;
      const isGold = !isSparkle && Math.random() < 0.1;

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height,
        size: isSparkle ? 2 + Math.random() * 3 : (8 + depth * 14),
        speedY: (0.7 + depth * 1.3) * (isSparkle ? 0.4 : 1),
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.015 + Math.random() * 0.02,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02,
        opacity: 0.4 + depth * 0.55,
        type: isSparkle ? "sparkle" : isGold ? "gold" : "rose",
        depth,
      };
    };

    const petals: Petal[] = Array.from({ length: totalPetals }, () => createPetal());

    // Draw single rose petal shape with natural curvature
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.cos(p.flip));

      if (p.type === "sparkle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 207, 141, ${p.opacity * 0.8})`;
        ctx.shadowColor = "#D7A85C";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        return;
      }

      // Rose or Gold Petal Path
      ctx.beginPath();
      const r = p.size;
      ctx.moveTo(0, -r);
      // Petal curves
      ctx.bezierCurveTo(r * 0.8, -r * 0.9, r * 1.1, r * 0.4, 0, r * 1.1);
      ctx.bezierCurveTo(-r * 1.1, r * 0.4, -r * 0.8, -r * 0.9, 0, -r);
      ctx.closePath();

      // Subtle gradient on each petal
      const grad = ctx.createLinearGradient(0, -r, 0, r);
      if (p.type === "gold") {
        grad.addColorStop(0, `rgba(240, 207, 141, ${p.opacity})`);
        grad.addColorStop(0.6, `rgba(215, 168, 92, ${p.opacity * 0.9})`);
        grad.addColorStop(1, `rgba(179, 133, 57, ${p.opacity * 0.8})`);
      } else {
        // Crimson velvet gradient with depth
        if (p.depth > 0.6) {
          grad.addColorStop(0, `rgba(232, 168, 176, ${p.opacity * 0.85})`); // soft highlight tip
          grad.addColorStop(0.35, `rgba(184, 34, 54, ${p.opacity})`);
          grad.addColorStop(1, `rgba(90, 15, 26, ${p.opacity})`); // deep shadow base
        } else {
          grad.addColorStop(0, `rgba(184, 34, 54, ${p.opacity * 0.7})`);
          grad.addColorStop(1, `rgba(60, 10, 18, ${p.opacity * 0.7})`);
        }
      }

      ctx.fillStyle = grad;
      if (p.depth > 0.7) {
        ctx.shadowColor = "rgba(114, 14, 27, 0.4)";
        ctx.shadowBlur = 4;
      }
      ctx.fill();
      ctx.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        // Physics update
        p.sway += p.swaySpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.sway) * 0.75;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Respawn if fell below screen or drifted far off sides
        if (p.y > height + 25) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      aria-hidden="true"
    />
  );
};
