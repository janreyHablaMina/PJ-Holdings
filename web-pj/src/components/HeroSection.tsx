"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles, CheckCircle2, Play } from "lucide-react";

const TOTAL_FRAMES = 160;

interface StoryPhase {
  tag: string;
  badge: string;
  headline: string;
  serifAccent: string;
  narrative: string;
  services: string[];
}

const STORY_PHASES: StoryPhase[] = [
  {
    tag: "PHASE 01 // THE INITIATION",
    badge: "WE CAN DO",
    headline: "From Raw Vision to",
    serifAccent: "Market Reality.",
    narrative:
      "We reject generic templates and empty promises. PJ Holdings is built on a singular conviction: to engineer bold, high-valuation digital platforms and iconic brands that command attention.",
    services: ["Venture Strategy", "Brand Architecture", "Creative Direction"],
  },
  {
    tag: "PHASE 02 // PRECISION CRAFT",
    badge: "HUMAN-DRIVEN EXECUTION",
    headline: "Mastery at",
    serifAccent: "Your Fingertips.",
    narrative:
      "Strategic agency thinking meets relentless hands-on execution. Every line of code, camera angle, and narrative script is meticulously calibrated to captivate clients and elevate perception.",
    services: ["Full-Stack Next.js", "Studio Photoshoots", "Compelling Scripting"],
  },
  {
    tag: "PHASE 03 // FULL ECOSYSTEM",
    badge: "COMPLETE AGENCY POWER",
    headline: "The Complete",
    serifAccent: "Digital Powerhouse.",
    narrative:
      "Web Development. High-Production Content. Full-Funnel Advertising. Social Media & CRM. An integrated ecosystem engineered to turn attention into unstoppable valuation.",
    services: [
      "Web Development",
      "Content Creation",
      "Advertising",
      "Social Media",
      "Travel CRM",
    ],
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all 160 frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCounter = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/banner-frames/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loadedCounter++;
        // As soon as first frame is loaded, draw it immediately!
        if (i === 1 && canvasRef.current) {
          drawFrame(0);
        }
        if (loadedCounter >= TOTAL_FRAMES * 0.6) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    // Initial draw
    if (images[0] && images[0].complete) {
      drawFrame(0);
    }
  }, []);

  // Helper to draw a frame with object-fit: cover
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Calculate aspect ratio for 'cover'
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  };

  // Resize canvas to match window with devicePixelRatio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll position and map to target frame
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const p = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(p);

      // Map progress to target frame index (0 to TOTAL_FRAMES - 1)
      targetFrameRef.current = p * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Silky smooth render loop with lerp
    const renderLoop = () => {
      // Smooth interpolation
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.16;

      const frameToDraw = Math.round(currentFrameRef.current);
      drawFrame(frameToDraw);
      setCurrentFrameDisplay(frameToDraw + 1);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute active story phase (0, 1, or 2)
  const activePhaseIndex = Math.min(
    Math.floor(scrollProgress * STORY_PHASES.length),
    STORY_PHASES.length - 1
  );
  const activePhase = STORY_PHASES[activePhaseIndex];

  return (
    <section ref={containerRef} className="relative h-[340vh] bg-[#050608]">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 md:px-12 py-8 z-10">
        
        {/* Frame Animation Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />

        {/* Cinematic Vignette & Readability Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/80 pointer-events-none z-1" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#08080a]/30 to-[#08080a]/90 pointer-events-none z-1" />
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-gradient-to-r from-[#08080a]/90 via-[#08080a]/50 to-transparent pointer-events-none z-1" />

        {/* Top Bar: Live Frame Tracker & Chronicle Phases */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-12 md:pt-4">
          <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>PJ Holdings • Interactive Agency Chronicle</span>
          </div>

          {/* 3-Phase Scroll Tracker with Live Frame Number */}
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] font-mono tracking-widest uppercase">
            <span className="text-zinc-400 hidden sm:inline">
              FRAME {String(currentFrameDisplay).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>

            {STORY_PHASES.map((phase, i) => {
              const isActive = activePhaseIndex === i;
              return (
                <div key={phase.tag} className="flex items-center gap-2">
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? "text-cyan-300 font-bold" : "text-zinc-500"
                    }`}
                  >
                    PHASE 0{i + 1}
                  </span>
                  <div className="w-8 sm:w-12 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-cyan-400 to-white transition-all duration-300 ${
                        isActive
                          ? "w-full"
                          : scrollProgress > (i + 1) / 3
                          ? "w-full opacity-30"
                          : "w-0"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Storytelling Stage: Synchronized with Frame Progression */}
        <div className="relative z-10 max-w-4xl w-full my-auto py-6">
          {/* Phase Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/70 backdrop-blur-xl luxury-border text-[10px] font-mono tracking-[0.25em] text-cyan-300 uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>{activePhase.tag}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-300">{activePhase.badge}</span>
          </div>

          {/* Changing Cinematic Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-light text-white tracking-[-0.03em] leading-[1.06] transition-all duration-300">
            {activePhase.headline}{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-zinc-300 block sm:inline">
              {activePhase.serifAccent}
            </span>
          </h1>

          {/* Narrative Subtitle */}
          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl font-light leading-relaxed drop-shadow-md">
            {activePhase.narrative}
          </p>

          {/* Live Services & Ecosystem Chips */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {activePhase.services.map((service) => (
              <span
                key={service}
                className="px-3.5 py-1.5 rounded-sm bg-black/60 backdrop-blur-md luxury-border text-xs font-mono text-zinc-200 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{service}</span>
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="#inquiries"
              className="px-8 py-4 bg-white text-[#08080a] text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors duration-200 flex items-center gap-2 shadow-xl shadow-cyan-950/20"
            >
              <span>Launch Your Venture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#works"
              className="px-8 py-4 bg-black/60 backdrop-blur-md luxury-border text-zinc-300 hover:text-white text-xs font-medium tracking-[0.15em] uppercase hover:border-zinc-500 transition-all duration-200"
            >
              Explore Portfolio
            </a>
          </div>
        </div>

        {/* Bottom Pinned Status Bar */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 luxury-border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-zinc-400 text-[10px] font-mono tracking-widest uppercase">
          {/* Coordinates */}
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="text-zinc-200">PJ Holdings Creative Capital</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline">Mayfair • Zurich • Ginza • Manila</span>
          </div>

          {/* Scroll Prompt */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Scroll to animate frame-by-frame ({Math.round(scrollProgress * 100)}%)</span>
            </div>

            <a
              href="#works"
              className="hidden sm:inline-flex items-center gap-1 text-white hover:text-cyan-300 transition-colors"
            >
              <span>Skip to Works</span>
              <ArrowDown className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
