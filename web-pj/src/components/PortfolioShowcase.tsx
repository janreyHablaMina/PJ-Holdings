"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SELECTED_WORKS, ProjectItem } from "@/data/agencyData";
import { ArrowUpRight, X } from "lucide-react";

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    "All",
    "Ventures",
    "Digital Flagships",
    "Brand Identity",
    "Spatial Design",
  ];

  const filtered =
    activeCategory === "All"
      ? SELECTED_WORKS
      : SELECTED_WORKS.filter((item) => item.category === activeCategory);

  return (
    <section id="works" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase block mb-3">
              Selected Works • 2024–2025
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-[-0.02em]">
              Architectural <span className="font-serif italic text-zinc-300">Portfolio</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base font-light leading-relaxed">
            A curated index of venture incubations, high-complication digital flagships, and spatial computing
            commissions executed for sovereign institutions.
          </p>
        </div>

        {/* Minimal Category Filter */}
        <div className="flex items-center gap-6 overflow-x-auto pb-4 mb-16 border-b border-white/[0.06] text-xs font-mono tracking-widest uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 transition-colors duration-200 whitespace-nowrap relative ${
                activeCategory === cat ? "text-white" : "text-zinc-400 hover:text-zinc-300"
              }`}
            >
              <span>{cat}</span>
              {activeCategory === cat && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filtered.map((work) => (
            <div
              key={work.id}
              onClick={() => setActiveProject(work)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Restrained Zoom */}
                <div className="relative aspect-[16/11] w-full overflow-hidden luxury-border bg-[#101014] mb-6">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover object-center grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                  {/* Corner Index Tag */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/70 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

                {/* Typography Meta */}
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">
                  <span>{work.category}</span>
                  <span>{work.year}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-zinc-300 transition-colors">
                  {work.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2 line-clamp-2 leading-relaxed">
                  {work.tagline}
                </p>
              </div>

              {/* Disciplines Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="truncate">{work.client}</span>
                <span className="text-zinc-300">{work.metrics}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exhibition Case Study Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b0b0e] luxury-border p-8 sm:p-12 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-2">
              {activeProject.category} • {activeProject.client} • {activeProject.year}
            </div>

            <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              {activeProject.title}
            </h3>

            <p className="text-sm font-serif italic text-zinc-300 mt-2">
              &ldquo;{activeProject.statement}&rdquo;
            </p>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] w-full my-8 luxury-border overflow-hidden bg-black">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Narrative Overview */}
            <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
              <h4 className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
                Commission Overview
              </h4>
              <p>{activeProject.overview}</p>
            </div>

            {/* Disciplines & Impact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-white/[0.06]">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Disciplines Executed
                </span>
                <ul className="space-y-1.5 text-xs font-mono text-zinc-300">
                  {activeProject.disciplines.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-zinc-400" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block mb-3">
                  Key Benchmark
                </span>
                <div className="text-xl font-light text-white font-mono">
                  {activeProject.metrics}
                </div>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-8 mt-8 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">
                PJ Holdings Commission Archive
              </span>
              <a
                href="#inquiries"
                onClick={() => setActiveProject(null)}
                className="text-xs font-medium tracking-widest uppercase text-white hover:text-zinc-300 border-b border-white pb-0.5 transition-colors"
              >
                Inquire Concerning Similar Work
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
