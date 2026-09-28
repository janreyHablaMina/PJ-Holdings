"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

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
    tag: "PHASE 01 // THE INFUSION",
    badge: "THE CRAFT OF EXTRACTION",
    headline: "The Art of Absolute",
    serifAccent: "Refinement & Alchemy.",
    narrative:
      "Like cold extraction drop by drop, enduring ventures demand patience, pure ingredients, and deliberate precision. We distill raw vision into singular, irresistible digital clarity.",
    services: ["Artisanal Mastery", "Sovereign Strategy", "Pure Formulation"],
  },
  {
    tag: "PHASE 02 // KINETIC HARMONY",
    badge: "ELEMENTS IN SUSPENSION",
    headline: "Elements in Perfect",
    serifAccent: "Kinetic Balance.",
    narrative:
      "Roasted single-origin beans, warm caramel, and crystalline ice suspended in weightless harmony. We orchestrate high-tier design, spatial motion, and code into pure sensory impact.",
    services: ["Spatial Direction", "Kinetic Motion", "Aesthetic Equilibrium"],
  },
  {
    tag: "PHASE 03 // THE APEX",
    badge: "UNAPOLOGETIC PRESENCE",
    headline: "The Signature",
    serifAccent: "Momentum & Impact.",
    narrative:
      "A volcanic eruption of energy, bold texture, and monolithic presence that commands the room. Fueling category creators, visionary founders, and modern legacy institutions.",
    services: ["Brand Architecture", "Category Dominance", "Venture Scale"],
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all 160 coffee frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCounter = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/coffee-frames/ezgif-frame-${paddedIndex}.jpg`;

      img.onload = () => {
        loadedCounter++;
        // Draw frame 0 immediately upon first load
        if (i === 1 && canvasRef.current) {
          drawFrame(0);
        }
        if (loadedCounter >= TOTAL_FRAMES * 0.5) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;

    // Initial draw if cached
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
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
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

      // Scrub frames over the first 38% of the scroll; hold the final frame for the remaining 62% (~10 scrolls)
      const ANIMATION_END_PROGRESS = 0.38;
      const frameProgress = Math.min(p / ANIMATION_END_PROGRESS, 1);
      targetFrameRef.current = frameProgress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Silky smooth render loop with lerp
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.16;

      const frameToDraw = Math.round(currentFrameRef.current);
      drawFrame(frameToDraw);

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute active story phase (0, 1, or 2)
  // Phase 03 stays active throughout the final frame hold period (~10 scrolls)
  let activePhaseIndex = 0;
  if (scrollProgress >= 0.27) {
    activePhaseIndex = 2;
  } else if (scrollProgress >= 0.13) {
    activePhaseIndex = 1;
  } else {
    activePhaseIndex = 0;
  }

  return (
    <section ref={containerRef} className="relative h-[750vh] w-full bg-[#100a07]">
      {/* Sticky Fullscreen 100vh Viewport */}
      <div className="sticky top-0 w-full h-screen h-[100vh] min-h-[100vh] overflow-hidden flex flex-col justify-center z-10">
        
        {/* Frame Animation Canvas Layer - 100% Full Width, 100vh Display */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Minimal edge fades only (no dark opacity over the coffee animation) */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none z-1" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent pointer-events-none z-1" />

        {/* UI Content Layer - Vertically Centered Directional Storytelling */}
        <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-24 pointer-events-none">
          <div className="grid grid-cols-1 grid-rows-1 max-w-xl w-full">
            {STORY_PHASES.map((phase, i) => {
              const isActive = activePhaseIndex === i;

              // Directional animations:
              // Phase 01: Enters from LEFT
              // Phase 02: Enters from TOP
              // Phase 03: Enters from BOTTOM
              let animationClass = "";

              if (i === 0) {
                animationClass = isActive
                  ? "translate-x-0 opacity-100 pointer-events-auto scale-100"
                  : "-translate-x-24 opacity-0 pointer-events-none scale-95";
              } else if (i === 1) {
                animationClass = isActive
                  ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
                  : "-translate-y-20 opacity-0 pointer-events-none scale-95";
              } else {
                animationClass = isActive
                  ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
                  : "translate-y-20 opacity-0 pointer-events-none scale-95";
              }

              return (
                <div
                  key={phase.tag}
                  className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${animationClass}`}
                >
                {/* Phase Badge - Compact Pill with Glow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-amber-400/30 rounded-full text-[10px] font-mono tracking-[0.2em] text-amber-300 uppercase mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>{phase.tag}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-300">{phase.badge}</span>
                </div>

                {/* Cinematic Headline with Deep High-Contrast Drop Shadow */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.03em] leading-[1.08] [text-shadow:_0_3px_20px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                  {phase.headline}{" "}
                  <span className="font-serif italic font-normal text-amber-300 [text-shadow:_0_3px_20px_rgba(0,0,0,0.95)] block sm:inline">
                    {phase.serifAccent}
                  </span>
                </h1>

                {/* Narrative Subtitle */}
                <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-100 font-light leading-relaxed max-w-xl [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {phase.narrative}
                </p>

                {/* Live Services & Craft Chips */}
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {phase.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-zinc-100 flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.7)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{service}</span>
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#inquiries"
                    className="px-6 py-3 bg-amber-400 text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-amber-300 transition-all duration-200 flex items-center gap-2 shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:scale-105"
                  >
                    <span>Initiate Commission</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#works"
                    className="px-6 py-3 bg-black/60 backdrop-blur-md border border-white/25 text-white hover:text-amber-300 text-xs font-medium tracking-[0.15em] uppercase hover:border-amber-400/50 transition-all duration-200 shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:scale-105"
                  >
                    Explore Portfolio
                  </a>
                </div>
              </div>
            );
          })}
          </div>
        </div>

      </div>
    </section>
  );
}
