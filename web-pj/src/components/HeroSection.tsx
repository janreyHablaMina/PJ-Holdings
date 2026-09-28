"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const TOTAL_FRAMES = 160;

interface StoryPhase {
  tag: string;
  headline: string;
  serifAccent: string;
  narrative: string;
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
  hasCta?: boolean;
}

const STORY_PHASES: StoryPhase[] = [
  {
    tag: "01 // THE INFUSION",
    headline: "The Art of Absolute",
    serifAccent: "Refinement.",
    narrative: "Deliberate precision distilled into singular digital clarity.",
    enterStart: -0.1,
    enterEnd: 0.0,
    exitStart: 0.16,
    exitEnd: 0.26,
  },
  {
    tag: "02 // SUSPENSION",
    headline: "Elements in Kinetic",
    serifAccent: "Harmony.",
    narrative: "Spatial motion, craft, and architectural poise in suspension.",
    enterStart: 0.22,
    enterEnd: 0.30,
    exitStart: 0.46,
    exitEnd: 0.56,
  },
  {
    tag: "03 // THE APEX",
    headline: "Unapologetic",
    serifAccent: "Presence.",
    narrative: "A volcanic eruption of craft. Fueling ventures built to endure.",
    enterStart: 0.52,
    enterEnd: 0.66,
    exitStart: 1.0,
    exitEnd: 1.0,
    hasCta: true,
  },
];

// Helper to compute smooth scroll-linked cross-dissolve and vertical drift
function getPhraseStyle(
  p: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number
) {
  if (p < enterStart) {
    return {
      opacity: 0,
      transform: "translateY(24px)",
      pointerEvents: "none" as const,
      visibility: "hidden" as const,
    };
  }
  if (p < enterEnd) {
    const t = (p - enterStart) / (enterEnd - enterStart);
    return {
      opacity: t,
      transform: `translateY(${24 * (1 - t)}px)`,
      pointerEvents: "none" as const,
      visibility: "visible" as const,
    };
  }
  if (p <= exitStart) {
    return {
      opacity: 1,
      transform: "translateY(0px)",
      pointerEvents: "auto" as const,
      visibility: "visible" as const,
    };
  }
  if (p < exitEnd) {
    const t = (p - exitStart) / (exitEnd - exitStart);
    return {
      opacity: 1 - t,
      transform: `translateY(${-24 * t}px)`,
      pointerEvents: "none" as const,
      visibility: "visible" as const,
    };
  }
  return {
    opacity: 0,
    transform: "translateY(-24px)",
    pointerEvents: "none" as const,
    visibility: "hidden" as const,
  };
}

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

      // Scrub frames over the first 68% of the scroll; hold the final frame for the remaining 32% (~3 full scrolls)
      const ANIMATION_END_PROGRESS = 0.68;
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

  return (
    <section ref={containerRef} className="relative h-[480vh] w-full bg-[#100a07]">
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

        {/* UI Content Layer - Fluid Continuous Scroll Storytelling */}
        <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-24 pointer-events-none">
          <div className="grid grid-cols-1 grid-rows-1 max-w-xl w-full">
            {STORY_PHASES.map((phase) => {
              const style = getPhraseStyle(
                scrollProgress,
                phase.enterStart,
                phase.enterEnd,
                phase.exitStart,
                phase.exitEnd
              );

              return (
                <div
                  key={phase.tag}
                  style={style}
                  className="col-start-1 row-start-1 transition-[transform,opacity] duration-150 ease-out will-change-[transform,opacity]"
                >
                  {/* Subtle Monospaced Tag */}
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-amber-300 uppercase mb-3 drop-shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{phase.tag}</span>
                  </div>

                  {/* Editorial Serif Headline */}
                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.03em] leading-[1.08] [text-shadow:_0_3px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
                    {phase.headline}{" "}
                    <span className="font-serif italic font-normal text-amber-300 [text-shadow:_0_3px_24px_rgba(0,0,0,0.95)] block sm:inline">
                      {phase.serifAccent}
                    </span>
                  </h2>

                  {/* Refined One-Line Subtitle */}
                  <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-200 font-light leading-relaxed max-w-md [text-shadow:_0_2px_12px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    {phase.narrative}
                  </p>

                  {/* Action CTA Group (Grand Finale Phase Only) */}
                  {phase.hasCta && (
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href="#inquiries"
                        className="px-6 py-3 bg-amber-400 text-black text-xs font-semibold tracking-[0.15em] uppercase hover:bg-amber-300 transition-all duration-200 flex items-center gap-2 shadow-[0_4px_24px_rgba(245,158,11,0.4)] hover:scale-105"
                      >
                        <span>Initiate Commission</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href="#works"
                        className="px-6 py-3 bg-black/60 backdrop-blur-md border border-white/25 text-white hover:text-amber-300 text-xs font-medium tracking-[0.15em] uppercase hover:border-amber-400/50 transition-all duration-200 shadow-lg hover:scale-105"
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
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/55 backdrop-blur-xl border border-white/15 text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase shadow-2xl">
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
