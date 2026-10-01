"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import { SELECTED_WORKS, type ProjectItem } from "@/data/agencyData";
import { ArrowLeft, ArrowUpRight, Search, X, SlidersHorizontal, Sparkles, Layers, ShieldCheck, ExternalLink } from "lucide-react";

const allCategories = ["All", "Ventures", "Digital Flagships", "Brand Identity", "Spatial Design"] as const;
const allYears = ["All", "2025", "2024"] as const;

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Compute filtered projects based on category, year, and search query
  const filteredProjects = useMemo(() => {
    return SELECTED_WORKS.filter((work) => {
      // Category filter
      if (selectedCategory !== "All" && work.category !== selectedCategory) {
        return false;
      }
      // Year filter
      if (selectedYear !== "All" && work.year !== selectedYear) {
        return false;
      }
      // Search query (case-insensitive across title, client, tagline, category, overview, disciplines)
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = work.title.toLowerCase().includes(query);
        const matchesClient = work.client.toLowerCase().includes(query);
        const matchesTagline = work.tagline.toLowerCase().includes(query);
        const matchesCategory = work.category.toLowerCase().includes(query);
        const matchesOverview = work.overview.toLowerCase().includes(query);
        const matchesDisciplines = work.disciplines.some((d) => d.toLowerCase().includes(query));

        if (!matchesTitle && !matchesClient && !matchesTagline && !matchesCategory && !matchesOverview && !matchesDisciplines) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedYear]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedYear("All");
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All" || selectedYear !== "All";

  // Featured flagships for banner preview
  const featuredFlagships = SELECTED_WORKS.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Floating Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle ambient lighting effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,160,45,0.07),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[700px] right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.04),transparent_60%)]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Back Link */}
          <ScrollReveal animation="fade-down" className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#c8b58b]" />
              <span>Back to Overview</span>
            </Link>
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* CINEMATIC HERO SHOWCASE BANNER                                            */}
          {/* ========================================================================= */}
          <ScrollReveal animation="fade-up" className="mb-14">
            <div className="relative rounded-2xl overflow-hidden luxury-border bg-[#0a0a0e] shadow-[0_20px_70px_rgba(0,0,0,0.8)] p-8 sm:p-12 lg:p-16">
              {/* Atmospheric Background Image & Architectural Grids */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
                  alt="Architectural facade"
                  fill
                  priority
                  className="object-cover opacity-20 filter contrast-125 grayscale"
                />
                {/* Deep luxury gradient masks */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0e] via-[#0a0a0e]/90 to-[#0a0a0e]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-black/40" />
                {/* Geometric blueprint grid overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,#000_70%,transparent_100%)]"
                />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Left Column: Editorial Headline & Metrics */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8b58b]/10 border border-[#c8b58b]/25 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#c8b58b] uppercase">
                      Architectural Index • 2024–2025
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.02em] leading-[1.08]">
                    Selected Works &amp; <br className="hidden sm:inline" />
                    <span className="font-serif italic text-zinc-300">Digital Flagships.</span>
                  </h1>

                  <p className="text-zinc-300 max-w-xl text-sm sm:text-base font-light leading-relaxed">
                    A permanent directory of venture incubations, high-complication flagships, and spatial experiences
                    commissioned for sovereign institutions and category innovators.
                  </p>

                  {/* Benchmark Stats Grid */}
                  <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/[0.08] max-w-lg">
                    <div>
                      <span className="block text-2xl sm:text-3xl font-light font-mono text-white tracking-tight">
                        0{SELECTED_WORKS.length}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                        Total Commissions
                      </span>
                    </div>

                    <div>
                      <span className="block text-2xl sm:text-3xl font-light font-mono text-[#c8b58b] tracking-tight">
                        £1.2B+
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                        Value Represented
                      </span>
                    </div>

                    <div>
                      <span className="block text-2xl sm:text-3xl font-light font-mono text-white tracking-tight">
                        100%
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                        Bespoke Build
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Layered Flagship Highlight Cards */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="text-[10px] font-mono tracking-widest text-[#c8b58b] uppercase flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#c8b58b]" />
                      Featured Incubations
                    </span>
                    <span className="text-zinc-500">Live Deployments</span>
                  </div>

                  {/* Featured Mini Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                    {featuredFlagships.map((flagship) => (
                      <div
                        key={flagship.id}
                        onClick={() => setActiveProject(flagship)}
                        className="group relative flex items-center gap-4 p-3 rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 hover:border-[#c8b58b]/40 transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-zinc-900">
                          <Image
                            src={flagship.image}
                            alt={flagship.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono tracking-wider text-[#c8b58b] uppercase">
                              {flagship.category}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500">• {flagship.year}</span>
                          </div>
                          <h4 className="text-sm font-medium text-white group-hover:text-zinc-200 transition-colors truncate">
                            {flagship.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">{flagship.client}</p>
                        </div>

                        {/* Arrow Action */}
                        <div className="w-7 h-7 rounded-full bg-white/[0.04] group-hover:bg-[#c8b58b] group-hover:text-black text-zinc-400 flex items-center justify-center shrink-0 transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 text-center lg:text-left">
                    Click any featured commission above to inspect architectural specifications.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* INTERACTIVE SEARCH & FILTER TOOLBAR                                       */}
          {/* ========================================================================= */}
          <ScrollReveal animation="fade-up" delay={100} className="mb-12 space-y-6">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-lg border border-white/10 bg-[#0d0e12] shadow-2xl">
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, client, keyword, or discipline (e.g. LMS, 3D, Horology)..."
                  className="w-full pl-11 pr-10 py-3 rounded-md border border-white/5 bg-black/40 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-[#c8b58b] focus:ring-1 focus:ring-[#c8b58b] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Year Filter Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#c8b58b]" />
                  Year:
                </span>
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-md border border-white/5">
                  {allYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        selectedYear === year
                          ? "bg-white/15 text-white font-medium"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar">
                {allCategories.map((cat) => {
                  const count =
                    cat === "All"
                      ? SELECTED_WORKS.length
                      : SELECTED_WORKS.filter((w) => w.category === cat).length;
                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                        isSelected
                          ? "bg-[#c8b58b] text-black border-[#c8b58b] font-medium shadow-[0_0_20px_rgba(200,181,139,0.25)]"
                          : "bg-white/[0.02] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          isSelected ? "bg-black/20 text-black font-semibold" : "bg-white/5 text-zinc-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Status & Reset button */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span>
                  Showing <strong className="text-white">{filteredProjects.length}</strong> of {SELECTED_WORKS.length}
                </span>
                {isFiltered && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[#c8b58b] hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================================= */}
          {/* RESULTS GRID                                                              */}
          {/* ========================================================================= */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {filteredProjects.map((work, index) => (
                <ScrollReveal
                  key={work.id}
                  animation="fade-up"
                  delay={(index % 3) * 80}
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
                          className={`object-cover ${work.imagePosition || "object-center"} grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                        {/* Corner Index Tag */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </div>

                      {/* Typography Meta */}
                      <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase mb-2">
                        <span>{work.category}</span>
                        <span className="text-zinc-500">{work.year}</span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                        {work.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2 line-clamp-2 leading-relaxed">
                        {work.tagline}
                      </p>

                      {/* Discipline Tags preview */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {work.disciplines.slice(0, 3).map((discipline) => (
                          <span
                            key={discipline}
                            className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/5"
                          >
                            {discipline}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Disciplines Footer */}
                    <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="truncate max-w-[180px]">{work.client}</span>
                      <span className="text-zinc-300 font-medium group-hover:text-[#c8b58b] transition-colors">
                        {work.metrics}
                      </span>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Empty State */
            <ScrollReveal animation="fade-up" className="py-24 text-center border border-white/10 rounded-xl bg-white/[0.01] p-12">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-light text-white mb-2">No matching commissions found</h3>
              <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6 font-light">
                We couldn&apos;t find any projects matching &ldquo;<span className="text-white">{searchQuery}</span>&rdquo; in the selected criteria.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-zinc-100 text-black text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </ScrollReveal>
          )}

          {/* Bottom Inquiries CTA */}
          <ScrollReveal animation="fade-up" className="mt-32 pt-12 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-gradient-to-r from-white/[0.02] to-transparent p-8 sm:p-12 rounded-sm border border-white/5">
            <div>
              <p className="text-[11px] font-mono tracking-widest text-[#c8b58b] uppercase mb-2">
                Have a bespoke project in mind?
              </p>
              <h3 className="text-2xl sm:text-3xl font-light text-white">
                Let&apos;s build your next <span className="font-serif italic text-zinc-300">category leader.</span>
              </h3>
            </div>
            <Link
              href="/#inquiries"
              className="inline-flex items-center gap-4 px-8 py-4 rounded-sm bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(200,181,139,0.25)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </main>

      {/* Case Study Detail Modal */}
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
                className={`object-cover ${activeProject.imagePosition || "object-center"}`}
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

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
