"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const TOTAL_FRAMES = 160;

interface StoryPhase {
  id: string;
  headline: string;
  serifAccent: string;
  narrative: string;
  align: "left" | "right";
  hasCta?: boolean;
}

const STORY_PHASES: StoryPhase[] = [
  {
    id: "infusion",
    headline: "The Art of Absolute",
    serifAccent: "Refinement.",
    narrative: "Deliberate cold extraction distilled into singular digital clarity.",
    align: "left",
  },
  {
    id: "suspension",
    headline: "Elements in Kinetic",
    serifAccent: "Harmony.",
    narrative: "Spatial motion, craft, and architectural poise in suspension.",
    align: "right",
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const lastFrameDisplayRef = useRef<number>(1);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
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

      // Scrub frames over the first 88% of the scroll; hold the final frame for the remaining 12% (~1 scroll)
      const ANIMATION_END_PROGRESS = 0.88;
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

      const frameNumber = Math.min(Math.max(frameToDraw + 1, 1), TOTAL_FRAMES);
      if (lastFrameDisplayRef.current !== frameNumber) {
        lastFrameDisplayRef.current = frameNumber;
        setCurrentFrameDisplay(frameNumber);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Phase 0 (Left): 0 - 0.38 | Phase 1 (Right): 0.38 - 0.74 | Phase 2 (Full Banner Solo): 0.74 - 1.0
  const activePhaseIndex =
    scrollProgress >= 0.74 ? 2 : scrollProgress >= 0.38 ? 1 : 0;

  const getPhaseAnimation = (index: number, activeIndex: number) => {
    const isActive = index === activeIndex;
    const isPast = index < activeIndex;

    if (isActive) {
      return {
        wrapper: "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 pointer-events-auto",
        headline: "opacity-100 translate-x-0 translate-y-0",
        line: "w-12 opacity-100",
        narrative: "opacity-100 translate-x-0 translate-y-0",
        cta: "opacity-100 translate-y-0 scale-100 pointer-events-auto",
      };
    }

    if (isPast) {
      // Exiting upward smoothly as user scrolls down
      return {
        wrapper: "opacity-0 -translate-y-12 scale-95 blur-[2px] pointer-events-none",
        headline: "opacity-0 -translate-y-8",
        line: "w-0 opacity-0",
        narrative: "opacity-0 -translate-y-6",
        cta: "opacity-0 -translate-y-6 scale-95 pointer-events-none",
      };
    }

    // Future phase (Phase 02 on the right side, entering from the RIGHT)
    return {
      wrapper: "opacity-0 translate-x-16 scale-95 blur-[2px] pointer-events-none",
      headline: "opacity-0 translate-x-8",
      line: "w-0 opacity-0",
      narrative: "opacity-0 translate-x-6",
      cta: "opacity-0 translate-y-6 scale-95 pointer-events-none",
    };
  };

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-[#100a07]">
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

        {/* UI Content Layer - Fluid Kinetic Scroll Storytelling */}
        <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-24 pointer-events-none">
          {/* Full-width Single-cell CSS Grid: all phases share the exact same layer without layout shifts */}
          <div className="grid grid-cols-1 grid-rows-1 w-full relative">
            {STORY_PHASES.map((phase, idx) => {
              const anim = getPhaseAnimation(idx, activePhaseIndex);
              const isRight = phase.align === "right";

              return (
                <div
                  key={phase.id}
                  className={`col-start-1 row-start-1 w-full max-w-xl relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter] ${
                    isRight ? "justify-self-end text-left sm:text-right" : "justify-self-start text-left"
                  } ${anim.wrapper}`}
                >
                  {/* Editorial Shimmer Headline */}
                  <h2
                    className={`text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.03em] leading-[1.08] [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${anim.headline}`}
                  >
                    <span className="bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 bg-clip-text text-transparent">
                      {phase.headline}{" "}
                    </span>
                    <span className="font-serif italic font-normal text-amber-300 [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)] block sm:inline">
                      {phase.serifAccent}
                    </span>
                  </h2>

                  {/* Expanding Hairline Accent & Narrative */}
                  <div
                    className={`mt-5 flex items-center gap-3 ${
                      isRight ? "sm:flex-row-reverse sm:justify-start" : ""
                    }`}
                  >
                    <div
                      className={`h-[1px] bg-gradient-to-r from-amber-400 to-amber-400/20 transition-all duration-700 delay-150 ease-out ${anim.line}`}
                    />
                    <p
                      className={`text-xs sm:text-sm md:text-base text-zinc-200 font-light leading-relaxed max-w-md [text-shadow:_0_2px_14px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${anim.narrative}`}
                    >
                      {phase.narrative}
                    </p>
                  </div>

                  {/* Action CTA Group (Phase 03 Grand Finale) */}
                  {phase.hasCta && (
                    <div
                      className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${anim.cta}`}
                    >
                      <a
                        href="#inquiries"
                        className="group relative px-7 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black text-xs font-bold tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2.5 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 rounded-sm overflow-hidden"
                      >
                        <span className="relative z-10">Initiate Commission</span>
                        <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </a>

                      <a
                        href="#works"
                        className="px-7 py-3.5 bg-black/40 backdrop-blur-md border border-white/25 text-white hover:text-amber-300 text-xs font-medium tracking-[0.18em] uppercase hover:border-amber-400/60 transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 rounded-sm"
                      >
                        Explore Portfolio
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Right Live Frame Counter */}
        <div className="absolute bottom-8 sm:bottom-10 right-6 sm:right-12 md:right-16 lg:right-24 pointer-events-auto z-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase shadow-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-zinc-400">FRAME</span>
            <span className="text-amber-300 font-semibold font-mono">
              {String(currentFrameDisplay).padStart(3, "0")}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400 font-mono">{TOTAL_FRAMES}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
