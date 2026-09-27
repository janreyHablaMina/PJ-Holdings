"use client";

import React, { useState } from "react";
import ThreeHeroCanvas from "./ThreeHeroCanvas";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const [objectType, setObjectType] = useState<"gyroscope" | "prism" | "sphere">("gyroscope");
  const [storyPill, setStoryPill] = useState<"vision" | "craft" | "impact">("vision");

  const storyContent = {
    vision: {
      tag: "01 / THE VISION",
      headline: "From Raw Concept to Category Monopoly.",
      desc: "PJ Holdings partners with ambitious founders and legacy institutions to architect digital flagships and venture ecosystems that command unmatched valuation.",
    },
    craft: {
      tag: "02 / THE ARCHITECTURAL CRAFT",
      headline: "Museum-Grade Design Meets High-Scale Tech.",
      desc: "We build hardware-accelerated 3D spatial platforms, bespoke typography, and Next.js applications engineered with sub-second performance.",
    },
    impact: {
      tag: "03 / THE VALUATION IMPACT",
      headline: "€580M+ Venture Value Created.",
      desc: "Our work isn't cosmetic; it is an unfair commercial advantage that accelerates funding rounds, commands premium pricing, and wins market share.",
    },
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between pt-32 pb-10 px-6 md:px-12 bg-[#08080a] overflow-hidden">
      {/* 3D WebGL Canvas with selected luxury object */}
      <ThreeHeroCanvas objectType={objectType} />

      {/* Subtle Vignette & Depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#08080a]/50 to-[#08080a] pointer-events-none z-0" />

      {/* Main Banner Headline & Clean Storytelling */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-8 md:pt-12">
        {/* Brand Tag */}
        <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
          <span>PJ Holdings • Venture Studio & Creative House</span>
        </div>

        {/* Commanding, Crisp Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-white tracking-[-0.035em] leading-[1.06] max-w-4xl">
          Architecting <span className="font-serif italic font-normal text-zinc-200">iconic</span> ventures
          and digital reality.
        </h1>

        {/* Clean, Non-Cluttered Storytelling Interactive Capsule */}
        <div className="mt-10 max-w-xl">
          {/* Story Pill Tabs */}
          <div className="flex items-center gap-2 mb-4">
            {(["vision", "craft", "impact"] as const).map((key) => (
              <button
                key={key}
                onClick={() => setStoryPill(key)}
                className={`px-3 py-1 text-[11px] font-mono tracking-widest uppercase transition-all duration-200 border ${
                  storyPill === key
                    ? "bg-white text-black border-white"
                    : "bg-[#0c0c10]/80 text-zinc-400 border-white/10 hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Dynamic Story Snapshot */}
          <div className="p-5 bg-[#0e0e14]/70 backdrop-blur-md luxury-border">
            <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-1">
              {storyContent[storyPill].tag}
            </span>
            <h4 className="text-base font-medium text-white mb-1.5">
              {storyContent[storyPill].headline}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {storyContent[storyPill].desc}
            </p>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <a
            href="#works"
            className="px-8 py-3.5 bg-white text-[#08080a] text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors duration-200 flex items-center gap-2"
          >
            <span>Explore Works</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#inquiries"
            className="px-8 py-3.5 bg-[#0e0e14] luxury-border text-zinc-300 hover:text-white text-xs font-medium tracking-[0.15em] uppercase hover:border-zinc-500 transition-all duration-200"
          >
            Initiate Commission
          </a>
        </div>
      </div>

      {/* Banner Bottom Controls: 3D Object Switcher + Practice Status */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 luxury-border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-zinc-400 text-[11px] font-mono tracking-widest uppercase">
        {/* 3D Object Switcher */}
        <div className="flex items-center gap-3">
          <span className="text-zinc-400">3D Sculpture:</span>
          <div className="flex items-center gap-1.5">
            {[
              { id: "gyroscope", label: "Precision Gyroscope" },
              { id: "prism", label: "Crystalline Prism" },
              { id: "sphere", label: "Obsidian Orb" },
            ].map((obj) => (
              <button
                key={obj.id}
                onClick={() => setObjectType(obj.id as any)}
                className={`px-2.5 py-1 text-[10px] tracking-widest uppercase transition-all duration-200 border ${
                  objectType === obj.id
                    ? "bg-zinc-200 text-black border-white"
                    : "bg-transparent text-zinc-400 border-white/10 hover:text-zinc-200"
                }`}
              >
                {obj.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hubs */}
        <div className="flex items-center gap-6">
          <span>London • Zurich • Tokyo</span>
          <span className="text-zinc-300">2 Commissions Open</span>
        </div>
      </div>
    </section>
  );
}
