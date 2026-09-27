"use client";

import React from "react";
import { CAPABILITIES } from "@/data/agencyData";
import { ArrowUpRight } from "lucide-react";

export default function ServicesCapabilities() {
  return (
    <section id="capabilities" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase block mb-3">
              Practice Disciplines
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-[-0.02em]">
              The Scope of <span className="font-serif italic text-zinc-300">Craft</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base font-light leading-relaxed">
            We provide comprehensive architectural capability—from foundational venture capitalization to high-precision
            spatial computing and digital flagships.
          </p>
        </div>

        {/* Minimalist Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] luxury-border">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.number}
              className="p-8 sm:p-12 bg-[#08080a] hover:bg-[#0c0c10] transition-colors duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-light text-zinc-400 font-serif">
                    {cap.number}.
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-4">
                  {cap.title}
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                  {cap.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-6 border-t border-white/[0.05]">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Scope of Delivery
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                  {cap.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
