"use client";

import { CAPABILITIES } from "@/data/agencyData";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";

export default function ServicesCapabilities() {
  return (
    <section id="capabilities" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,160,45,0.04),transparent_65%)]" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#c8b58b] uppercase flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-pulse" />
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
        </ScrollReveal>

        {/* Minimalist Architectural Grid with Staggered Entrance & Interactive Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08] luxury-border rounded-sm overflow-hidden">
          {CAPABILITIES.map((cap, index) => (
            <ScrollReveal
              key={cap.number}
              animation="fade-up"
              delay={index * 120}
              className="h-full"
            >
              <SpotlightCard
                className="p-8 sm:p-12 bg-[#08080a] hover:bg-[#0c0c11] transition-all duration-500 flex flex-col justify-between group h-full relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-light text-[#c8b58b] font-serif flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8b58b]/60 group-hover:bg-[#c8b58b] transition-colors" />
                      {cap.number}.
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.03] group-hover:bg-white/[0.08] border border-white/5 group-hover:border-white/20 flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-4 group-hover:text-zinc-200 transition-colors">
                    {cap.title}
                  </h3>

                  <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                    {cap.description}
                  </p>
                </div>

                {/* Deliverables with interactive badge pills */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono tracking-widest text-[#c8b58b] uppercase block mb-3">
                    Scope of Delivery
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                    {cap.deliverables.map((item) => (
                      <div 
                        key={item} 
                        className="flex items-center gap-2 p-1.5 -ml-1.5 rounded hover:bg-white/[0.03] hover:text-white transition-colors cursor-default"
                      >
                        <span className="w-1 h-1 rounded-full bg-zinc-500 group-hover:bg-[#c8b58b] transition-colors" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
