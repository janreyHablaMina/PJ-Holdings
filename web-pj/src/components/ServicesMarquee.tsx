import { disciplines } from "@/data/heroData";

export default function ServicesMarquee() {
  return (
    <section aria-label="Our services" className="overflow-hidden">
      <ul className="sr-only">
        {disciplines.map(({ number, title }) => <li key={number}>{title}</li>)}
      </ul>

      <div className="marquee-window" aria-hidden="true">
        <div className="marquee-row">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-group flex min-w-full shrink-0 items-center justify-around">
              {disciplines.map(({ number, title }) => (
                <span key={number} className="inline-flex shrink-0 items-center gap-10 whitespace-nowrap px-5 font-mono text-[11px] font-medium uppercase text-[#c8b58b] md:gap-14 md:px-7 md:text-xs">
                  {title}
                  <span className="h-1 w-1 rotate-45 bg-amber-300/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
