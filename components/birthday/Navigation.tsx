"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Heart } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface NavigationProps {
  onMusicToggle?: () => void;
  isPlayingMusic?: boolean;
}

export const Navigation: React.FC<NavigationProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("greeting");

  const navItems = [
    { label: "Home", href: "#greeting" },
    { label: "About Her", href: "#about" },
    { label: "Memories", href: "#memories" },
    { label: "Secret Rose", href: "#secret-rose" },
    { label: "Our Journey", href: "#journey" },
    { label: "Surprise", href: "#surprise" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);

      // Simple active section spy
      const sections = navItems.map((item) => item.href.substring(1));
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-burgundy shadow-lg shadow-black/40 py-3 border-b border-gold/15"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Brand/Monogram */}
          <a
            href="#greeting"
            onClick={(e) => handleNavClick(e, "#greeting")}
            className="group flex items-center gap-2 text-cream-light hover:text-gold transition-colors"
          >
            <span className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center bg-burgundy-dark/60 shadow-sm group-hover:border-gold transition-colors">
              <Heart className="w-3.5 h-3.5 text-rose-soft fill-rose-soft/30 group-hover:scale-110 transition-transform" />
            </span>
            <div className="flex flex-col">
              <span className="font-display font-semibold tracking-wider text-sm text-cream-light group-hover:text-gold transition-colors">
                {birthdayData.recipient.name}
              </span>
              <span className="text-[10px] tracking-widest text-gold/80 font-sans uppercase -mt-0.5">
                {birthdayData.recipient.birthDate}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 glass-card border border-gold/20">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 ${
                    isActive
                      ? "text-gold font-semibold shadow-sm"
                      : "text-cream-light/75 hover:text-cream-light"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-crimson-deep/80 rounded-full -z-10 border border-gold/30"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full glass-burgundy flex items-center justify-center text-cream-light border border-gold/30 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden glass-burgundy rounded-2xl p-6 border border-gold/30 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-cream-light hover:bg-crimson/30 hover:text-gold transition-colors font-display text-base"
                >
                  <span>{item.label}</span>
                  <Sparkles className="w-3.5 h-3.5 text-gold/60" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
