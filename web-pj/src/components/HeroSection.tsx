"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-36 pb-12 px-6 md:px-12 bg-[#08080a] overflow-hidden">
      {/* Cinematic Architectural Background Image with Deep Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="PJ Holdings Architecture"
          fill
          priority
          className="object-cover object-center grayscale-[40%] contrast-[1.12] scale-105"
          sizes="100vw"
        />
        {/* Subtle Luxury Overlays */}
        <div className="absolute inset-0 bg-[#08080a]/75 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08080a]/50 to-[#08080a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/80" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-8 md:pt-16 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md luxury-border text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span>PJ Holdings • Venture Studio & Creative House</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-white tracking-[-0.035em] leading-[1.06] max-w-4xl">
          We shape <span className="font-serif italic font-normal text-zinc-200">enduring</span> ventures,{" "}
          <br className="hidden sm:inline" />
          digital flagships, and iconic identities.
        </h1>

        <p className="mt-8 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
          Operating at the rare intersection of sovereign venture capital and architectural design restraint. We partner
          with founders and institutions to engineer digital platforms that command market dominance.
        </p>

        {/* Quiet Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <a
            href="#works"
            className="px-8 py-4 bg-white text-[#08080a] text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors duration-200 flex items-center gap-2"
          >
            <span>Selected Works</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#inquiries"
            className="px-8 py-4 bg-[#0c0c10]/90 backdrop-blur-md luxury-border text-zinc-300 hover:text-white text-xs font-medium tracking-[0.15em] uppercase hover:border-zinc-500 transition-all duration-200"
          >
            Initiate Commission
          </a>
        </div>
      </div>

      {/* Architectural Bottom Indicator Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-12 luxury-border-t grid grid-cols-1 sm:grid-cols-3 gap-6 text-zinc-400 text-[11px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span>Status: 2 Engagements Open for 2025/2026</span>
        </div>
        <div className="sm:text-center">
          <span>Disciplines: Architecture • Capital • Spatial Design</span>
        </div>
        <div className="sm:text-right">
          <span>Mayfair • Zurich • Ginza • Madison</span>
        </div>
      </div>
    </section>
  );
}
