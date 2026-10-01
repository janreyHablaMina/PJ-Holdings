"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import { SELECTED_WORKS, type ProjectItem } from "@/data/agencyData";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1541881452423-f3689a7442ec?auto=format&fit=crop&w=2400&q=85"
];

const allCategories = ["All", "Ventures", "Digital Flagships", "Brand Identity", "Spatial Design"] as const;
const allYears = ["All", "2025", "2024"] as const;
const ITEMS_PER_PAGE = 6;

export default function PortfolioPage() {
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedYear("All");
    setCurrentPage(1);
  };

  const isFiltered = searchQuery.trim() !== "" || selectedCategory !== "All" || selectedYear !== "All";

  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Floating Global Navbar */}
      <Navbar />

      {/* ========================================================================= */}
      {/* OPEN, UNCONTAINED FULL-WIDTH HERO BANNER WITH ATMOSPHERIC IMAGE           */}
      {/* ========================================================================= */}
      <section className="relative pt-32 sm:pt-44 pb-24 px-6 md:px-12 border-b border-white/[0.08] bg-[#06070a] overflow-hidden">
        {/* Full-bleed Banner Image with Deep Black Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeBannerIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 8, ease: "linear" }
              }}
              className="absolute inset-0"
            >
              <Image
                src={BANNER_IMAGES[activeBannerIndex]}
                alt="Architectural structure"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-70 sm:opacity-80 contrast-105"
              />
            </motion.div>
          </AnimatePresence>

          {/* Targeted Black Gradients: Deep on left for text legibility, clear on right for image visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06070a]/95 via-[#06070a]/70 to-[#06070a]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/20 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#06070a]/80 to-transparent" />

          {/* Subtle Ambient Radial Warmth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(217,160,45,0.08),transparent_55%)]" />

          {/* Fine Blueprint Architectural Hairline Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_60%,transparent_100%)]"
          />
        </div>

        {/* Seamless Bottom Gradient Fade into Page Content */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06070a] to-transparent z-[1]" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <ScrollReveal animation="fade-down" className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#c8b58b]" />
              <span>Back to Overview</span>
            </Link>
          </ScrollReveal>

          {/* Main Editorial Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8 space-y-6">
              <ScrollReveal animation="fade-up">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-pulse" />
                  <span className="text-[11px] font-mono tracking-[0.25em] text-[#c8b58b] uppercase">
                    The Archive • 2024–2025 Index
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-[-0.02em] leading-[1.05] drop-shadow-lg">
                  Architectural <br />
                  <span className="font-serif italic text-zinc-200">Commissions.</span>
                </h1>

                <p className="text-zinc-300 max-w-2xl text-base sm:text-lg font-light leading-relaxed mt-6 drop-shadow-sm">
                  A permanent exhibition of venture incubations, high-complication digital flagships, and spatial
                  computing environments built with quiet authority and architectural permanence.
                </p>
              </ScrollReveal>
            </div>

            {/* Quick Metrics Bar on Right */}
            <div className="lg:col-span-4">
              <ScrollReveal animation="fade-left" delay={150}>
                <div className="grid grid-cols-2 gap-px bg-white/[0.08] p-px rounded-sm luxury-border shadow-2xl overflow-hidden backdrop-blur-md">
                  <div className="p-5 bg-[#090a0d]/75 backdrop-blur-md">
                    <span className="block text-3xl font-light font-mono text-white tracking-tight">
                      0{SELECTED_WORKS.length}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Total Projects
                    </span>
                  </div>

                  <div className="p-5 bg-[#090a0d]/75 backdrop-blur-md">
                    <span className="block text-3xl font-light font-mono text-[#c8b58b] tracking-tight">
                      100%
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Custom Crafted
                    </span>
                  </div>

                  <div className="p-5 bg-[#090a0d]/75 backdrop-blur-md">
                    <span className="block text-3xl font-light font-mono text-white tracking-tight">
                      ₱1.2B+
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Client Capital
                    </span>
                  </div>

                  <div className="p-5 bg-[#090a0d]/75 backdrop-blur-md">
                    <span className="block text-3xl font-light font-mono text-[#c8b58b] tracking-tight">
                      4
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-1 block">
                      Disciplines
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN GALLERY & INTERACTIVE SEARCH CONTENT                                 */}
      {/* ========================================================================= */}
      <main className="flex-1 py-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* ========================================================================= */}
          {/* OPEN, MINIMALIST FILTER & SEARCH ROW (ZERO CONTAINERS)                    */}
          {/* ========================================================================= */}
          <ScrollReveal animation="fade-up" className="mb-14 space-y-5">
            {/* Top Row: Categories on Left, Minimalist Open Search on Right */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-1">
              {/* Category Filter Tabs with Underline Indicator */}
              <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-2 text-xs font-mono tracking-widest uppercase hide-scrollbar">
                {allCategories.map((cat) => {
                  const count =
                    cat === "All"
                      ? SELECTED_WORKS.length
                      : SELECTED_WORKS.filter((w) => w.category === cat).length;
                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage(1);
                      }}
                      className={`pb-3 transition-all duration-300 whitespace-nowrap relative cursor-pointer group flex items-center gap-2 ${
                        isSelected ? "text-white font-medium" : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] ${isSelected ? "text-[#c8b58b]" : "text-zinc-500"}`}>
                        ({count})
                      </span>
                      {isSelected ? (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c8b58b] to-white transition-all duration-300" />
                      ) : (
                        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-transparent group-hover:bg-white/20 transition-all duration-300" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Minimalist Open Search Line (No Box, Just Sleek Underline) */}
              <div className="relative w-full md:w-80 border-b border-white/20 focus-within:border-[#c8b58b] transition-colors pb-3">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-0 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search commissions..."
                  className="w-full pl-6 pr-6 bg-transparent text-xs font-mono text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Bottom Sub-row: Year Toggles & Live Result Counter */}
            <div className="flex items-center justify-between gap-4 flex-wrap text-xs font-mono pt-1">
              <div className="flex items-center gap-4 text-zinc-400">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500">Year:</span>
                <div className="flex items-center gap-4">
                  {allYears.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setCurrentPage(1);
                      }}
                      className={`cursor-pointer transition-colors ${
                        selectedYear === year
                          ? "text-white font-medium underline underline-offset-4 decoration-[#c8b58b]"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-zinc-400">
                <span>
                  Showing <strong className="text-white">{filteredProjects.length}</strong> of {SELECTED_WORKS.length}
                </span>
                {isFiltered && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[#c8b58b] hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Results Grid (Paginated to 6 items per page) */}
          {filteredProjects.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {paginatedProjects.map((work, index) => (
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

              {/* Minimalist Architectural Pagination */}
              {totalPages > 1 && (
                <div className="mt-20 pt-8 border-t border-white/[0.08] flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      currentPage === 1 ? "text-zinc-600 cursor-not-allowed" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  {/* Page Indicator Numbers */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 380, behavior: "smooth" });
                        }}
                        className={`w-9 h-9 rounded-sm font-mono text-xs flex items-center justify-center transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#c8b58b] text-black font-semibold shadow-[0_0_15px_rgba(200,181,139,0.3)]"
                            : "border border-white/10 text-zinc-400 hover:border-white/30 hover:text-white bg-white/[0.02]"
                        }`}
                      >
                        0{pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      currentPage === totalPages ? "text-zinc-600 cursor-not-allowed" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
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
