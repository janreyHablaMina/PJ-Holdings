"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MONOGRAPH_PRINCIPLES } from "@/data/agencyData";
import { ArrowRight } from "lucide-react";

export default function StorytellingSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const principle = MONOGRAPH_PRINCIPLES[activeIdx];

  return (
    <section id="monograph" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase block mb-3">
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
        </div>

        {/* Editorial Principle Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 luxury-border-b pb-8">
          {MONOGRAPH_PRINCIPLES.map((item, index) => {
            const isActive = activeIdx === index;
            return (
              <button
                key={item.number}
                onClick={() => setActiveIdx(index)}
                className={`text-left group transition-all duration-300 pb-2 ${
                  isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                }`}
              >
                <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">
                  Principle {item.number}
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-zinc-200">
                  {item.title}
                </h3>
                <div
                  className={`mt-4 h-[1px] transition-all duration-300 ${
                    isActive ? "bg-white w-full" : "bg-white/10 w-0 group-hover:w-1/3"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Monograph Detail Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                Section {principle.number} of {MONOGRAPH_PRINCIPLES.length}
              </span>
              <h3 className="text-2xl sm:text-4xl font-light text-white mt-3 leading-tight tracking-[-0.01em]">
                {principle.subtitle}
              </h3>
            </div>

            <div className="space-y-5 text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              {principle.narrative.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            {/* Editorial Pull Quote */}
            <div className="pl-6 border-l border-zinc-700 py-2">
              <blockquote className="font-serif italic text-lg sm:text-xl text-zinc-200 font-light">
                &ldquo;{principle.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  setActiveIdx((prev) => (prev + 1) % MONOGRAPH_PRINCIPLES.length)
                }
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white transition-colors"
              >
                <span>Read Next Principle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Exhibition Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden luxury-border bg-[#101014]">
              <Image
                src={principle.image}
                alt={principle.title}
                fill
                priority
                className="object-cover grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/[0.05]">
                <span>ARCHIVE {principle.number}</span>
                <span>PJ HOLDINGS COMMISSION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
