import { ArrowDown, ArrowUpRight } from "lucide-react";

const disciplines = [
  { number: "01", title: "Venture development" },
  { number: "02", title: "Brand identity" },
  { number: "03", title: "Digital experiences" },
  { number: "04", title: "Spatial & 3D design" },
];

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#08080a] px-6 pt-36 md:px-12 md:pt-44"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_35%,rgba(161,161,170,0.07),transparent_55%)]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 pb-16 lg:min-h-[540px] lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:pb-24">
          <div>
            <p className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 sm:text-[11px]">
              <span className="h-px w-8 shrink-0 bg-zinc-500" aria-hidden="true" />
              Independent venture & creative practice
            </p>
            <h1
              id="hero-heading"
              className="text-[clamp(3.25rem,6.5vw,6.5rem)] font-light leading-[1.02] tracking-[-0.055em] text-zinc-100"
            >
              We build brands,
              <br />
              businesses &
              <br />
              <span className="font-serif italic tracking-[-0.04em] text-zinc-300">
                digital experiences.
              </span>
            </h1>
            <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-zinc-400 sm:text-base">
              PJ Holdings brings strategy, design, and technology together to
              turn ambitious ideas into lasting businesses.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
              <a
                href="#works"
                className="group inline-flex min-h-12 items-center gap-6 rounded-sm bg-zinc-100 px-6 py-3 text-xs font-medium text-zinc-950 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
              >
                Explore our work
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
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

          <div aria-hidden="true" className="relative mx-auto hidden aspect-square w-full max-w-[420px] items-center justify-center lg:flex">
            <div className="absolute inset-3 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-12 rounded-full border border-white/[0.09]" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.06]" />
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.06]" />
            <div className="relative flex h-[68%] w-[68%] items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(145deg,#242426_0%,#111113_45%,#08080a_100%)] shadow-[20px_30px_70px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)]">
              <span className="-translate-x-2 font-serif text-[150px] font-light leading-none tracking-[-0.09em] text-zinc-300">pj.</span>
            </div>
            <span className="absolute -bottom-4 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
              Vision. Craft. Enterprise.
            </span>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pb-8 pt-6">
          <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <span>Our expertise</span>
            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
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
    </section>
  );
}
