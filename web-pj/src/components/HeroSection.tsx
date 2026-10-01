"use client";

import Image from "next/image";
import { slides, disciplines } from "@/data/heroData";
import { useSectionProgress } from "@/hooks/useSectionProgress";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export default function HeroSection() {
  const { sectionRef, progress } = useSectionProgress();

  const sceneProgress = clamp(progress * slides.length - 0.5, 0, slides.length - 1);
  const segment = Math.floor(sceneProgress);
  const phase = sceneProgress - segment;
  const galleryPosition = segment + phase * phase * (3 - 2 * phase);
  const activeIndex = Math.round(galleryPosition);
  const activeSlide = slides[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate h-[340vh] bg-[#08080a]"
    >
      <div className="sticky top-0 h-[100dvh] min-h-screen overflow-hidden px-6 pt-24 md:px-12 md:pt-32 flex flex-col">
        {/* Mobile Fading Background Images (Full 100vh) */}
        <div className="absolute inset-0 z-[-5] block lg:hidden pointer-events-none w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#08080a]/60" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/90 via-transparent to-[#08080a]" />
            </div>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_28%,rgba(217,160,45,0.12),transparent_36%),radial-gradient(ellipse_at_18%_72%,rgba(20,184,166,0.09),transparent_34%)]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08080a] to-transparent" />

        <div className="mx-auto flex h-full min-h-[calc(100vh-6rem)] max-w-7xl flex-col justify-center grow">
          <div className="grid h-full lg:h-auto items-stretch lg:items-center gap-6 pb-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">

            {/* Unified Text Container (Fades on Scroll) */}
            <div className="relative z-10 max-w-2xl w-full flex flex-col h-full lg:block pt-8 lg:pt-0">
              <div className="grid min-h-[236px] sm:min-h-[282px]">
                {slides.map((slide, index) => (
                  <div
                    key={slide.number}
                    aria-hidden={activeIndex !== index}
                    className={`col-start-1 row-start-1 transition-[opacity,transform,filter] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeIndex === index
                        ? "relative translate-y-0 opacity-100 blur-0 duration-700 delay-150"
                        : `pointer-events-none opacity-0 blur-[2px] duration-300 delay-0 ${index < activeIndex ? "-translate-y-5" : "translate-y-5"}`
                    }`}
                  >
                    <p className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase text-zinc-400 sm:text-[11px]">
                      <span className="h-px w-8 shrink-0 bg-zinc-500" aria-hidden="true" />
                      {slide.kicker}
                    </p>
                    <span className="mb-5 block font-mono text-[11px] text-zinc-500">
                      {slide.number} / {slide.metric}
                    </span>
                    <h1
                      id={activeIndex === index ? "hero-heading" : undefined}
                      className="text-5xl font-light leading-none text-zinc-100 sm:text-6xl lg:text-7xl"
                    >
                      {slide.title}
                      <span className="mt-2 block font-serif italic text-zinc-300">
                        {slide.accent}
                      </span>
                    </h1>
                    <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-zinc-400 sm:text-base">
                      {slide.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-auto lg:mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 pb-8 lg:pb-0">
                <a
                  href="#works"
                  className="group inline-flex min-h-12 items-center gap-6 rounded-sm bg-zinc-100 px-6 py-3 text-xs font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
                >
                  Explore our work
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#inquiries"
                  className="group inline-flex min-h-12 items-center gap-3 text-xs text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
                >
                  Start a conversation
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Desktop 3D Orbit */}
            <div className="relative isolate hidden lg:block min-h-[340px] sm:min-h-[420px] lg:min-h-[560px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[12%] bottom-[13%] h-10 rounded-[50%] bg-black/60 blur-xl"
              />
              <div
                className="absolute inset-0 isolate"
              >
                {slides.map((slide, index) => {
                  const angle = ((index - galleryPosition) * Math.PI * 2) / slides.length;
                  const horizontal = Math.sin(angle);
                  const depth = (1 - Math.cos(angle)) / 2;
                  const scale = 1 - depth * 0.48;

                  return (
                    <div
                      key={slide.image}
                      aria-hidden={activeIndex !== index}
                      className="absolute left-1/2 top-1/2 h-[68%] w-[66%] max-w-[620px] overflow-hidden rounded-sm border border-white/15 bg-zinc-950 shadow-[0_24px_65px_rgba(0,0,0,0.5)] sm:w-[66%] lg:h-[66%]"
                      style={{
                        zIndex: Math.round((1 - depth) * 100),
                        opacity: 1 - depth * 0.72,
                        transform: `translate(calc(-50% + ${horizontal * 57}%), calc(-50% - ${depth * 54}px)) perspective(1000px) rotateY(${-horizontal * 34}deg) scale(${scale})`,
                      }}
                    >
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 48vw, 92vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-zinc-400">
                            {slide.number} / {slide.metric}
                          </p>
                          <p className="mt-2 max-w-[15rem] text-lg font-light text-white sm:text-2xl">
                            {slide.kicker}
                          </p>
                        </div>
                        <div className="hidden flex-wrap justify-end gap-2 sm:flex">
                          {slide.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[9px] uppercase text-zinc-300 backdrop-blur"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
              <div className="absolute inset-x-0 bottom-1 hidden lg:flex items-center justify-center gap-4 font-mono text-[10px] uppercase text-zinc-500">
                <span className="motion-reduce:hidden">Scroll to explore</span>
                <div aria-hidden="true" className="flex items-center gap-1.5">
                  {slides.map((slide, index) => (
                    <span
                      key={slide.number}
                      className={`h-0.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-7 bg-amber-200/80" : "w-2 bg-white/20"}`}
                    />
                  ))}
                </div>
                <span className="text-zinc-300">{activeSlide.number} / {String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.08] pb-7 pt-5 hidden lg:block">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase text-zinc-500">
              <span>Our expertise</span>
              <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-4">
              {disciplines.map((discipline) => (
                <a
                  key={discipline.number}
                  href="#capabilities"
                  className="group flex items-baseline gap-3 py-2 text-xs text-zinc-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100 sm:text-sm"
                >
                  <span className="font-mono text-[10px] text-zinc-500">{discipline.number}</span>
                  <span>{discipline.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
