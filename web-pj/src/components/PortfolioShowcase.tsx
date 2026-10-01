"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SELECTED_WORKS, type ProjectItem } from "@/data/agencyData";
import { ArrowUpRight, X } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";

const categories = ["All", ...new Set(SELECTED_WORKS.map((work) => work.category))];

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? SELECTED_WORKS
      : SELECTED_WORKS.filter((item) => item.category === activeCategory);

  // Display max 6 cards on the landing page
  const displayedProjects = filtered.slice(0, 6);

  return (
    <section id="works" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05),transparent_70%)]" 
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Header with entrance animation & Archive counter link */}
        <ScrollReveal animation="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-[#c8b58b] uppercase flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-pulse" />
              Selected Works • 2024–2025
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-[-0.02em]">
              Architectural <span className="font-serif italic text-zinc-300">Portfolio</span>
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-3 max-w-md">
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              A curated index of venture incubations, high-complication digital flagships, and spatial computing
              commissions executed for sovereign institutions.
            </p>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#c8b58b] hover:text-white transition-colors group mt-1"
            >
              <span>Explore All {SELECTED_WORKS.length} Commissions</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Minimal Category Filter */}
        <ScrollReveal animation="fade-up" delay={100} className="flex items-center gap-6 overflow-x-auto pb-4 mb-16 border-b border-white/[0.06] text-xs font-mono tracking-widest uppercase hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 transition-all duration-300 whitespace-nowrap relative cursor-pointer group flex items-center gap-2 ${
                activeCategory === cat ? "text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>{cat}</span>
              {activeCategory === cat ? (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c8b58b] to-white transition-all duration-300" />
              ) : (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-transparent group-hover:bg-white/20 transition-all duration-300" />
              )}
            </button>
          ))}
        </ScrollReveal>

        {/* Editorial Project Grid (Limited to 6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayedProjects.map((work, index) => (
            <ScrollReveal
              key={work.id}
              animation="fade-up"
              delay={(index % 3) * 120}
              className="h-full"
            >
              <SpotlightCard
                onClick={() => setActiveProject(work)}
                className="group cursor-pointer flex flex-col justify-between h-full p-4 -m-4 rounded-lg hover:bg-white/[0.02] border border-transparent hover:border-white/10 transition-all duration-500"
              >
                <div>
                  {/* Image Container with Restrained Zoom */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-sm luxury-border bg-[#101014] mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className={`object-cover ${work.imagePosition || 'object-center'} grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Corner Index Tag with interactive hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Typography Meta */}
                  <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase mb-2">
                    <span>{work.category}</span>
                    <span className="text-zinc-500">{work.year}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                    {work.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {work.tagline}
                  </p>
                </div>

                {/* Disciplines Footer */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate">{work.client}</span>
                  <span className="text-zinc-300 font-medium group-hover:text-[#c8b58b] transition-colors">{work.metrics}</span>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Projects CTA Banner */}
        <ScrollReveal animation="fade-up" delay={200} className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-8 bg-gradient-to-r from-white/[0.02] via-[#c8b58b]/[0.02] to-transparent p-8 sm:p-10 rounded-sm border border-white/5">
          <div className="text-center sm:text-left space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8b58b]" />
              Archive Index • {SELECTED_WORKS.length} Total Projects
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              Looking for our complete catalog of work?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg leading-relaxed">
              Browse our full commission directory featuring custom category filters, live keyword search, and detailed architectural case studies.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-sm bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(200,181,139,0.25)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </ScrollReveal>
      </div>

      {/* Exhibition Case Study Modal with smooth interactive backdrop */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b0b0e] luxury-border p-8 sm:p-12 text-left rounded-sm shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase mb-2">
              {activeProject.category} • {activeProject.client} • {activeProject.year}
            </div>

            <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              {activeProject.title}
            </h3>

            <p className="text-sm font-serif italic text-zinc-300 mt-2">
              &ldquo;{activeProject.statement}&rdquo;
            </p>

            {/* Hero Image */}
            <div className="relative aspect-[16/9] w-full my-8 luxury-border overflow-hidden bg-black rounded-sm">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className={`object-cover ${activeProject.imagePosition || 'object-center'}`}
              />
            </div>

            {/* Narrative Overview */}
            <div className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
              <h4 className="text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase">
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
                      <span className="w-1 h-1 rounded-full bg-[#c8b58b]" />
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
              <div className="text-xs text-zinc-400 font-mono flex items-center gap-6">
                <span className="hidden sm:inline">PJ Holdings Archive</span>
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c8b58b] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Visit Live Site <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <Link
                href="/#inquiries"
                onClick={() => setActiveProject(null)}
                className="text-xs font-medium tracking-widest uppercase text-white hover:text-[#c8b58b] border-b border-white hover:border-[#c8b58b] pb-0.5 transition-colors"
              >
                Inquire Concerning Similar Work
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
