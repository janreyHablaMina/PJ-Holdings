"use client";

import { useState } from "react";
import Image from "next/image";
import { MONOGRAPH_PRINCIPLES } from "@/data/agencyData";
import { ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";

export default function StorytellingSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const principle = MONOGRAPH_PRINCIPLES[activeIdx];

  return (
    <section id="monograph" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t overflow-hidden">
      {/* Subtle ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,160,45,0.06),transparent_70%)]" 
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header with entrance animation */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#c8b58b] uppercase flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-pulse" />
              The Monograph • Architectural Thesis
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-[-0.02em]">
              Principles of <span className="font-serif italic text-zinc-300">Quiet Authority</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base font-normal leading-relaxed">
            In an industry obsessed with noise and ephemeral gimmicks, we build with deliberate restraint. Every line,
            bevel, and transition is governed by timeless architectural standards.
          </p>
        </ScrollReveal>

        {/* Editorial Principle Tabs */}
        <ScrollReveal animation="fade-up" delay={150} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 luxury-border-b pb-8">
          {MONOGRAPH_PRINCIPLES.map((item, index) => {
            const isActive = activeIdx === index;
            return (
              <button
                key={item.number}
                onClick={() => setActiveIdx(index)}
                className={`text-left group transition-all duration-300 pb-2 cursor-pointer ${
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
                }`}
              >
                <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2 flex items-center gap-2">
                  <span>Principle {item.number}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h3>
                <div
                  className={`mt-4 h-[2px] transition-all duration-500 ease-out ${
                    isActive ? "bg-white w-full" : "bg-white/10 w-0 group-hover:w-1/3"
                  }`}
                />
              </button>
            );
          })}
        </ScrollReveal>

        {/* Monograph Detail Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <ScrollReveal animation="fade-right" delay={250} className="lg:col-span-6 space-y-8">
            <div key={`title-${activeIdx}`} className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-2">
              <span className="text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase">
                Section {principle.number} of {MONOGRAPH_PRINCIPLES.length}
              </span>
              <h3 className="text-2xl sm:text-4xl font-light text-white mt-3 leading-tight tracking-[-0.01em]">
                {principle.subtitle}
              </h3>
            </div>

            <div key={`body-${activeIdx}`} className="space-y-5 text-zinc-400 text-sm sm:text-base leading-relaxed font-light transition-all duration-500 animate-in fade-in">
              {principle.narrative.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {/* Editorial Pull Quote */}
            <div key={`quote-${activeIdx}`} className="pl-6 border-l-2 border-[#c8b58b]/60 py-2 bg-gradient-to-r from-[#c8b58b]/[0.03] to-transparent">
              <blockquote className="font-serif italic text-lg sm:text-xl text-zinc-200 font-light">
                &ldquo;{principle.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  setActiveIdx((prev) => (prev + 1) % MONOGRAPH_PRINCIPLES.length)
                }
                className="group inline-flex items-center gap-3 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-sm border border-white/10 hover:border-white/30 bg-white/[0.02]"
              >
                <span>Read Next Principle</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>

          {/* Exhibition Image */}
          <ScrollReveal animation="fade-left" delay={300} className="lg:col-span-6">
            <SpotlightCard className="relative aspect-[4/3] rounded-sm overflow-hidden luxury-border bg-[#101014] group shadow-2xl">
              <div key={`img-${activeIdx}`} className="w-full h-full relative transition-all duration-700 animate-in fade-in zoom-in-95">
                <Image
                  src={principle.image}
                  alt={principle.title}
                  fill
                  className="object-cover grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-300 uppercase bg-black/70 backdrop-blur-md px-4 py-2 border border-white/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c8b58b]" />
                  ARCHIVE {principle.number}
                </span>
                <span className="text-zinc-500">PJ HOLDINGS COMMISSION</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
