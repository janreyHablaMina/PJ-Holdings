"use client";

import { disciplines } from "@/data/heroData";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesMarquee() {
  return (
    <section aria-label="Our services" className="overflow-hidden bg-[#12110f]">
      <ul className="sr-only">
        {disciplines.map(({ number, title }) => <li key={number}>{title}</li>)}
      </ul>

      <ScrollReveal animation="fade" duration={1000}>
        <div className="marquee-window group" aria-hidden="true">
          <div className="marquee-row">
            {[0, 1].map((copy) => (
              <div 
                key={copy} 
                className="marquee-group flex min-w-full shrink-0 items-center justify-around group-hover:[animation-play-state:paused] transition-all"
              >
                {disciplines.map(({ number, title }) => (
                  <span 
                    key={number} 
                    className="inline-flex shrink-0 items-center gap-10 whitespace-nowrap px-5 font-mono text-[11px] font-medium uppercase text-[#c8b58b] md:gap-14 md:px-7 md:text-xs tracking-wider transition-colors hover:text-white cursor-default"
                  >
                    {title}
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#c8b58b]/60 transition-transform hover:scale-150" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
