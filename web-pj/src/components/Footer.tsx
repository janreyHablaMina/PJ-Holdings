import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";
import { disciplines } from "@/data/heroData";

const linkClassName = "inline-flex min-h-9 items-center text-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#060608] px-6 pb-8 pt-16 text-zinc-400 md:px-12 md:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.08] pb-12 md:flex-row md:items-center">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase text-zinc-500">Have something in mind?</p>
            <h2 className="text-3xl font-light text-zinc-100 sm:text-4xl">
              Let&apos;s build <span className="font-serif italic text-zinc-300">what&apos;s next.</span>
            </h2>
          </div>
          <a href="#inquiries" className="group inline-flex min-h-12 items-center gap-8 rounded-sm border border-white/20 px-6 py-3 text-xs font-medium text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100">
            Start a conversation
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </a>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" aria-label="PJ Holdings home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100">
              <span className="block h-12 w-12 overflow-hidden rounded-full border border-amber-300/25 bg-black">
                <Image src="/logo.png" alt="" width={48} height={48} sizes="48px" className="h-full w-full object-cover" />
              </span>
              <span className="text-sm font-medium text-zinc-100">PJ Holdings<span className="text-zinc-500">.</span></span>
            </a>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed">
              We help businesses take shape through venture development, brand identity, digital experiences, and creative design.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-xs font-medium text-zinc-200">Explore</h3>
            <ul className="space-y-1">
              {[...navigation, { label: "Contact", href: "#inquiries" }].map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClassName}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-medium text-zinc-200">What we do</h3>
            <ul className="space-y-1">
              {disciplines.map((discipline) => (
                <li key={discipline.number}>
                  <a href="#capabilities" className={linkClassName}>{discipline.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/[0.08] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} PJ Holdings. All rights reserved.</p>
          <a href="#top" className="inline-flex min-h-9 items-center gap-3 transition-colors hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100">
            Back to top
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
