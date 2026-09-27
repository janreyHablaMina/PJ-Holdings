"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-4 bg-[#08080a]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <a href="#" className="flex items-baseline gap-3 group">
          <span className="font-medium tracking-[0.2em] text-sm text-zinc-100 uppercase">
            PJ Holdings
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-[0.25em] text-zinc-400 uppercase font-mono">
            / Private Practice
          </span>
        </a>

        {/* Minimalist Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#monograph"
            className="text-xs uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Principles
          </a>
          <a
            href="#works"
            className="text-xs uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Selected Works
          </a>
          <a
            href="#capabilities"
            className="text-xs uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Disciplines
          </a>
          <a
            href="#inquiries"
            className="text-xs uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors duration-200"
          >
            Commission
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-6">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            London • Zurich • Tokyo
          </span>

          <a
            href="#inquiries"
            className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.15em] uppercase text-zinc-200 hover:text-white pb-0.5 border-b border-white/20 hover:border-white transition-all duration-200"
          >
            <span>Initiate Dialogue</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08080a]/98 backdrop-blur-xl border-b border-white/[0.08] px-6 py-8 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-300">
          <a
            href="#monograph"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
          >
            Principles & Monograph
          </a>
          <a
            href="#works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
          >
            Selected Works
          </a>
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
          >
            Disciplines
          </a>
          <a
            href="#inquiries"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm tracking-[0.15em] uppercase text-zinc-300 hover:text-white py-2 border-b border-white/[0.04]"
          >
            Private Inquiries
          </a>
          <div className="pt-2 text-xs font-mono text-zinc-400">
            London • Zurich • Tokyo
          </div>
        </div>
      )}
    </header>
  );
}
