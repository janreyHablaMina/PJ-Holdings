"use client";

import { useEffect, useRef, useState } from "react";
import { ENDORSEMENTS, CORE_METRICS, type CoreMetric } from "@/data/agencyData";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      { threshold: 0.35 },
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
    <section className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Grounded Key Measures */}
        <div ref={metricsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-24 border-b border-white/[0.06]">
          {CORE_METRICS.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-mono tracking-tight">
                <MetricCounter metric={metric} active={metricsActive} />
              </span>
              <span className="text-xs sm:text-sm font-medium text-zinc-300 mt-3">
                {metric.label}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 mt-1">
                {metric.context}
              </span>
            </div>
          ))}
        </div>

        {/* Editorial Endorsement Feature */}
        <div className="pt-24 max-w-4xl mx-auto">
          <div className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase mb-8 text-center">
            Institutional Endorsements
          </div>

          <div className="min-h-[220px] flex flex-col justify-between text-center">
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-zinc-200 font-light leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-12">
              <div className="text-sm font-medium text-white tracking-wider uppercase">
                {current.author}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-1">
                {current.role} • <span className="text-zinc-300">{current.institution}</span>
              </div>
            </div>
          </div>

          {/* Minimal Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="p-3 text-zinc-400 hover:text-white transition-colors"
              aria-label="Previous endorsement"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-zinc-400 tracking-widest">
              0{activeQuote + 1} / 0{ENDORSEMENTS.length}
            </span>
            <button
              onClick={next}
              className="p-3 text-zinc-400 hover:text-white transition-colors"
              aria-label="Next endorsement"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
