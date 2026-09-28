"use client";

import { useState } from "react";
import { ENDORSEMENTS, CORE_METRICS } from "@/data/agencyData";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialsMetrics() {
  const [activeQuote, setActiveQuote] = useState(0);
  const current = ENDORSEMENTS[activeQuote];

  const prev = () => {
    setActiveQuote((idx) => (idx === 0 ? ENDORSEMENTS.length - 1 : idx - 1));
  };

  const next = () => {
    setActiveQuote((idx) => (idx === ENDORSEMENTS.length - 1 ? 0 : idx + 1));
  };

  return (
    <section className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Grounded Key Measures */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-24 border-b border-white/[0.06]">
          {CORE_METRICS.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-mono tracking-tight">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-300 mt-3">
                {metric.label}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 mt-1">
                {metric.context}
              </span>
            </div>
          ))}
        </div>

        {/* Editorial Endorsement Feature */}
        <div className="pt-24 max-w-4xl mx-auto">
          <div className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase mb-8 text-center">
            Institutional Endorsements
          </div>

          <div className="min-h-[220px] flex flex-col justify-between text-center">
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-zinc-200 font-light leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-12">
              <div className="text-sm font-medium text-white tracking-wider uppercase">
                {current.author}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-1">
                {current.role} • <span className="text-zinc-300">{current.institution}</span>
              </div>
            </div>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="p-3 text-zinc-400 hover:text-white transition-colors"
              aria-label="Previous endorsement"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-400 tracking-widest">
              0{activeQuote + 1} / 0{ENDORSEMENTS.length}
            </span>
            <button
              onClick={next}
              className="p-3 text-zinc-400 hover:text-white transition-colors"
              aria-label="Next endorsement"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
