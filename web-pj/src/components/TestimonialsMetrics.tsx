"use client";

import { useEffect, useRef, useState } from "react";
import { ENDORSEMENTS, CORE_METRICS, type CoreMetric } from "@/data/agencyData";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const COUNTER_DURATION = 1400;

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function MetricCounter({ metric, active }: { metric: CoreMetric; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frameId = 0;

    if (reduceMotion) {
      frameId = requestAnimationFrame(() => setCount(metric.value));
      return () => cancelAnimationFrame(frameId);
    }

    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / COUNTER_DURATION, 1);
      setCount(Math.round(metric.value * easeOutCubic(progress)));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [active, metric.value]);

  const formattedCount = count.toLocaleString("en-US", {
    minimumIntegerDigits: metric.minimumIntegerDigits ?? 1,
  });
  const readableValue = `${metric.prefix ?? ""}${metric.value.toLocaleString("en-US", {
    minimumIntegerDigits: metric.minimumIntegerDigits ?? 1,
  })}${metric.suffix ?? ""}`;

  return (
    <span aria-label={readableValue}>
      {metric.prefix}
      {formattedCount}
      {metric.suffix}
    </span>
  );
}

export default function TestimonialsMetrics() {
  const [activeQuote, setActiveQuote] = useState(0);
  const [metricsActive, setMetricsActive] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);
  const current = ENDORSEMENTS[activeQuote];

  useEffect(() => {
    const section = metricsRef.current;

    if (!section || metricsActive) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [metricsActive]);

  const prev = () => {
    setActiveQuote((idx) => (idx === 0 ? ENDORSEMENTS.length - 1 : idx - 1));
  };

  const next = () => {
    setActiveQuote((idx) => (idx === ENDORSEMENTS.length - 1 ? 0 : idx + 1));
  };

  return (
    <section className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,160,45,0.04),transparent_65%)]" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Grounded Key Measures with Staggered Entrance */}
        <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-24 border-b border-white/[0.06]">
          {CORE_METRICS.map((metric, i) => (
            <ScrollReveal
              key={i}
              animation="fade-up"
              delay={i * 100}
              className="flex flex-col group p-4 -m-4 rounded hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-mono tracking-tight group-hover:text-[#c8b58b] transition-colors">
                <MetricCounter metric={metric} active={metricsActive} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-300 mt-3">
                {metric.label}
              </span>
              <span className="text-[11px] font-mono text-zinc-500 mt-1">
                {metric.context}
              </span>
            </ScrollReveal>
          ))}
        </div>

        {/* Editorial Endorsement Feature with Entrance Animation */}
        <ScrollReveal animation="fade-up" delay={200} className="pt-24 max-w-4xl mx-auto">
          <div className="text-[11px] font-mono tracking-[0.25em] text-[#c8b58b] uppercase mb-8 text-center flex items-center justify-center gap-2">
            <Quote className="w-3.5 h-3.5 text-[#c8b58b]" />
            Institutional Endorsements
          </div>

          <div 
            key={`quote-${activeQuote}`}
            className="min-h-[220px] flex flex-col justify-between text-center transition-all duration-500 animate-in fade-in slide-in-from-bottom-2"
          >
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-zinc-200 font-light leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-12">
              <div className="text-sm font-medium text-white tracking-wider uppercase">
                {current.author}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-1">
                {current.role} • <span className="text-[#c8b58b]">{current.institution}</span>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prev}
              className="p-3 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5"
              aria-label="Previous endorsement"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            {/* Indicator dots */}
            <div className="flex items-center gap-2">
              {ENDORSEMENTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuote(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    activeQuote === idx ? "w-6 bg-[#c8b58b]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5"
              aria-label="Next endorsement"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
