"use client";

import React, { useState, useEffect, useRef } from "react";

const TOTAL_FRAMES = 160;

interface StoryPhase {
  id: string;
  banner: 1 | 2;
  headline: string;
  serifAccent: string;
  narrative: string;
  align: "left" | "right";
  accentColor: "amber" | "cyan";
}

const STORY_PHASES: StoryPhase[] = [
  // Banner 1: Coffee Infusion
  {
    id: "infusion",
    banner: 1,
    headline: "The Art of Absolute",
    serifAccent: "Refinement.",
    narrative: "Deliberate cold extraction distilled into singular digital clarity.",
    align: "left",
    accentColor: "amber",
  },
  {
    id: "suspension",
    banner: 1,
    headline: "Elements in Kinetic",
    serifAccent: "Harmony.",
    narrative: "Spatial motion, craft, and architectural poise in suspension.",
    align: "right",
    accentColor: "amber",
  },
  // Banner 2: Tech Capabilities
  {
    id: "velocity",
    banner: 2,
    headline: "Engineering",
    serifAccent: "Velocity.",
    narrative: "High-performance digital ventures, custom platforms, and surgical execution.",
    align: "left",
    accentColor: "cyan",
  },
  {
    id: "capabilities",
    banner: 2,
    headline: "Full-Spectrum",
    serifAccent: "Capabilities.",
    narrative: "Creative direction, software architecture, and global media campaigns in harmony.",
    align: "right",
    accentColor: "cyan",
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas1Ref = useRef<HTMLCanvasElement>(null);
  const canvas2Ref = useRef<HTMLCanvasElement>(null);
  const images1Ref = useRef<HTMLImageElement[]>([]);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const currentFrame1Ref = useRef<number>(0);
  const targetFrame1Ref = useRef<number>(0);
  const currentFrame2Ref = useRef<number>(0);
  const targetFrame2Ref = useRef<number>(0);
  const scrollProgressRef = useRef<number>(0);
  const lastFrameDisplayRef = useRef<number>(1);
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Helper to draw a frame onto a canvas with object-fit: cover
  const drawToCanvas = (
    canvas: HTMLCanvasElement | null,
    images: HTMLImageElement[],
    frameIndex: number
  ) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, cx, cy, nw, nh);
  };

  // Preload all 160 coffee frames and 160 banner frames
  useEffect(() => {
    const images1: HTMLImageElement[] = [];
    const images2: HTMLImageElement[] = [];

    // Preload Coffee frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/coffee-frames/ezgif-frame-${paddedIndex}.jpg`;
      if (i === 1) {
        img.onload = () => {
          if (canvas1Ref.current) {
            drawToCanvas(canvas1Ref.current, [img], 0);
          }
        };
      }
      images1.push(img);
    }
    images1Ref.current = images1;

    // Preload Tech / Banner 2 frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/banner-frames/ezgif-frame-${paddedIndex}.jpg`;
      if (i === 1) {
        img.onload = () => {
          if (canvas2Ref.current) {
            drawToCanvas(canvas2Ref.current, [img], 0);
          }
        };
      }
      images2.push(img);
    }
    images2Ref.current = images2;
  }, []);

  // Resize canvases to match viewport dimensions with devicePixelRatio
  useEffect(() => {
    const handleResize = () => {
      const canvas1 = canvas1Ref.current;
      const canvas2 = canvas2Ref.current;
      if (!canvas1 || !canvas2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas1.parentElement?.clientWidth || window.innerWidth;
      const height = canvas1.parentElement?.clientHeight || window.innerHeight;

      canvas1.width = Math.round(width * dpr);
      canvas1.height = Math.round(height * dpr);
      canvas2.width = Math.round(width * dpr);
      canvas2.height = Math.round(height * dpr);

      drawToCanvas(canvas1, images1Ref.current, Math.round(currentFrame1Ref.current));
      drawToCanvas(canvas2, images2Ref.current, Math.round(currentFrame2Ref.current));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll position and scrub both banners
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
      scrollProgressRef.current = p;

      // Banner 1 scrubs from 0 to 0.32, then holds frame 159 through shrink
      const b1Progress = Math.min(p / 0.32, 1);
      targetFrame1Ref.current = b1Progress * (TOTAL_FRAMES - 1);

      // Banner 2 scrubs from 0.62 to 0.88, then holds frame 159 for ~1 scroll finale
      if (p < 0.62) {
        targetFrame2Ref.current = 0;
      } else {
        const b2Progress = Math.min((p - 0.62) / 0.26, 1);
        targetFrame2Ref.current = b2Progress * (TOTAL_FRAMES - 1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Silky smooth render loop with lerp for both canvas layers
    const renderLoop = () => {
      const diff1 = targetFrame1Ref.current - currentFrame1Ref.current;
      currentFrame1Ref.current += diff1 * 0.16;
      const f1 = Math.round(currentFrame1Ref.current);
      drawToCanvas(canvas1Ref.current, images1Ref.current, f1);

      const diff2 = targetFrame2Ref.current - currentFrame2Ref.current;
      currentFrame2Ref.current += diff2 * 0.16;
      const f2 = Math.round(currentFrame2Ref.current);
      drawToCanvas(canvas2Ref.current, images2Ref.current, f2);

      const isBanner2Active = scrollProgressRef.current >= 0.50;
      const currentF = isBanner2Active ? f2 : f1;
      const frameNumber = Math.min(Math.max(currentF + 1, 1), TOTAL_FRAMES);
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

  // Compute shrink / switch / expand transformation states
  let cardScale = 1.0;
  let cardRadius = 0;
  let banner1Opacity = 1.0;
  let banner2Opacity = 0.0;
  const isBanner2 = scrollProgress >= 0.50;

  if (scrollProgress < 0.38) {
    // Stage 1: Banner 1 full screen
    cardScale = 1.0;
    cardRadius = 0;
    banner1Opacity = 1.0;
    banner2Opacity = 0.0;
  } else if (scrollProgress < 0.47) {
    // Stage 2: Shrink Banner 1 into black background
    const t = (scrollProgress - 0.38) / 0.09;
    cardScale = 1.0 - t * 0.28; // 1.0 -> 0.72
    cardRadius = t * 28; // 0 -> 28px
    banner1Opacity = 1.0;
    banner2Opacity = 0.0;
  } else if (scrollProgress < 0.53) {
    // Stage 3: Switch from Banner 1 to Banner 2 while shrunken
    const t = (scrollProgress - 0.47) / 0.06;
    cardScale = 0.72;
    cardRadius = 28;
    banner1Opacity = Math.max(0, 1.0 - t);
    banner2Opacity = Math.min(1.0, t);
  } else if (scrollProgress < 0.62) {
    // Stage 4: Banner 2 expands / gets bigger to full screen
    const t = (scrollProgress - 0.53) / 0.09;
    cardScale = 0.72 + t * 0.28; // 0.72 -> 1.0
    cardRadius = 28 * (1.0 - t); // 28px -> 0px
    banner1Opacity = 0.0;
    banner2Opacity = 1.0;
  } else {
    // Stage 5: Banner 2 full screen
    cardScale = 1.0;
    cardRadius = 0;
    banner1Opacity = 0.0;
    banner2Opacity = 1.0;
  }

  // Active story phase index mapping across the 800vh scroll
  let activePhaseIndex = -1;
  if (scrollProgress >= 0.0 && scrollProgress < 0.15) {
    activePhaseIndex = 0; // Banner 1 Left
  } else if (scrollProgress >= 0.15 && scrollProgress < 0.30) {
    activePhaseIndex = 1; // Banner 1 Right
  } else if (scrollProgress >= 0.30 && scrollProgress < 0.63) {
    activePhaseIndex = -1; // Text-free: Coffee explosion & Shrink & Switch & Expand!
  } else if (scrollProgress >= 0.63 && scrollProgress < 0.74) {
    activePhaseIndex = 2; // Banner 2 Left
  } else if (scrollProgress >= 0.74 && scrollProgress < 0.85) {
    activePhaseIndex = 3; // Banner 2 Right
  } else {
    activePhaseIndex = -1; // Text-free: Full 7-service icons reveal & ~1 scroll finale hold!
  }

  const getPhaseAnimation = (index: number, activeIndex: number, align: "left" | "right") => {
    const isActive = index === activeIndex;
    const isPast = index < activeIndex;

    if (isActive) {
      return {
        wrapper: "opacity-100 translate-x-0 translate-y-0 scale-100 blur-0 pointer-events-auto",
        headline: "opacity-100 translate-x-0 translate-y-0",
        line: "w-12 opacity-100",
        narrative: "opacity-100 translate-x-0 translate-y-0",
      };
    }

    if (isPast) {
      return {
        wrapper: "opacity-0 -translate-y-12 scale-95 blur-[2px] pointer-events-none",
        headline: "opacity-0 -translate-y-8",
        line: "w-0 opacity-0",
        narrative: "opacity-0 -translate-y-6",
      };
    }

    // Future phase
    const translateX = align === "right" ? "translate-x-16" : "-translate-x-16";
    return {
      wrapper: `opacity-0 ${translateX} scale-95 blur-[2px] pointer-events-none`,
      headline: `opacity-0 ${align === "right" ? "translate-x-8" : "-translate-x-8"}`,
      line: "w-0 opacity-0",
      narrative: `opacity-0 ${align === "right" ? "translate-x-6" : "-translate-x-6"}`,
    };
  };

  return (
    <section ref={containerRef} className="relative h-[800vh] w-full bg-black">
      {/* Sticky Fullscreen 100vh Viewport with pure black background */}
      <div className="sticky top-0 w-full h-screen h-[100vh] min-h-[100vh] overflow-hidden flex items-center justify-center bg-black z-10">
        
        {/* Animated Card Container that shrinks and expands */}
        <div
          className="relative w-full h-full overflow-hidden transition-[transform,border-radius,box-shadow] duration-75 ease-out will-change-[transform,border-radius]"
          style={{
            transform: `scale(${cardScale})`,
            borderRadius: `${cardRadius}px`,
            boxShadow:
              cardRadius > 2
                ? "0 25px 80px -10px rgba(0,0,0,0.95), 0 0 0 1px rgba(255,255,255,0.12)"
                : "none",
          }}
        >
          {/* Banner 1 Canvas: Coffee Sequence */}
          <canvas
            ref={canvas1Ref}
            className="absolute inset-0 w-full h-full block z-0 pointer-events-none transition-opacity duration-150"
            style={{ opacity: banner1Opacity, width: "100%", height: "100%" }}
          />

          {/* Banner 2 Canvas: Tech / Services Mouse Sequence */}
          <canvas
            ref={canvas2Ref}
            className="absolute inset-0 w-full h-full block z-0 pointer-events-none transition-opacity duration-150"
            style={{ opacity: banner2Opacity, width: "100%", height: "100%" }}
          />

          {/* Minimal edge fades */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none z-1" />
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-1" />

          {/* UI Content Layer - Fluid Kinetic Scroll Storytelling */}
          <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 md:px-16 lg:px-24 pointer-events-none">
            <div className="grid grid-cols-1 grid-rows-1 w-full relative">
              {STORY_PHASES.map((phase, idx) => {
                const anim = getPhaseAnimation(idx, activePhaseIndex, phase.align);
                const isRight = phase.align === "right";
                const isCyan = phase.accentColor === "cyan";

                return (
                  <div
                    key={phase.id}
                    className={`col-start-1 row-start-1 w-full max-w-xl relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity,filter] ${
                      isRight
                        ? "justify-self-end text-left sm:text-right"
                        : "justify-self-start text-left"
                    } ${anim.wrapper}`}
                  >
                    {/* Editorial Shimmer Headline */}
                    <h2
                      className={`text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.03em] leading-[1.08] [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${anim.headline}`}
                    >
                      <span
                        className={
                          isCyan
                            ? "bg-gradient-to-r from-cyan-100 via-cyan-300 to-teal-100 bg-clip-text text-transparent"
                            : "bg-gradient-to-r from-amber-100 via-amber-300 to-amber-100 bg-clip-text text-transparent"
                        }
                      >
                        {phase.headline}{" "}
                      </span>
                      <span
                        className={`font-serif italic font-normal ${
                          isCyan ? "text-cyan-300" : "text-amber-300"
                        } [text-shadow:_0_4px_24px_rgba(0,0,0,0.95)] block sm:inline`}
                      >
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
                        className={`h-[1px] ${
                          isCyan
                            ? "bg-gradient-to-r from-cyan-400 to-cyan-400/20"
                            : "bg-gradient-to-r from-amber-400 to-amber-400/20"
                        } transition-all duration-700 delay-150 ease-out ${anim.line}`}
                      />
                      <p
                        className={`text-xs sm:text-sm md:text-base text-zinc-200 font-light leading-relaxed max-w-md [text-shadow:_0_2px_14px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] transition-all duration-700 delay-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${anim.narrative}`}
                      >
                        {phase.narrative}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Right Live Frame & Active Slide Pill */}
        <div className="absolute bottom-8 sm:bottom-10 right-6 sm:right-12 md:right-16 lg:right-24 pointer-events-auto z-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/65 backdrop-blur-xl border border-white/15 text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase shadow-2xl">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isBanner2 ? "bg-cyan-400" : "bg-amber-400"
              } animate-pulse`}
            />
            <span className="text-zinc-500 font-semibold">
              {isBanner2 ? "02 // CAPABILITIES" : "01 // INFUSION"}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">FRAME</span>
            <span
              className={`${
                isBanner2 ? "text-cyan-300" : "text-amber-300"
              } font-semibold font-mono`}
            >
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
