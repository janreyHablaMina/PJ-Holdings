import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";
import { disciplines } from "@/data/heroData";
import ScrollReveal from "@/components/ScrollReveal";

const linkClassName = "inline-flex min-h-9 items-center text-sm transition-all duration-200 text-zinc-400 hover:text-white hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#060608] px-6 pb-8 pt-16 text-zinc-400 md:px-12 md:pt-20 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(217,160,45,0.03),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <ScrollReveal animation="fade-up" className="flex flex-col items-start justify-between gap-8 border-b border-white/[0.08] pb-12 md:flex-row md:items-center">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase text-[#c8b58b] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b]" />
              Have something in mind?
            </p>
            <h2 className="text-3xl font-light text-zinc-100 sm:text-4xl">
              Let&apos;s build <span className="font-serif italic text-zinc-300">what&apos;s next.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex min-h-12 items-center gap-8 rounded-sm border border-white/20 px-6 py-3 text-xs font-medium text-zinc-100 transition-all duration-300 hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
          >
            Start a conversation
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </Link>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100} className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="PJ Holdings home" className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100 group">
              <span className="block h-12 w-12 overflow-hidden rounded-full border border-amber-300/25 bg-black shadow-[0_0_15px_rgba(217,160,45,0.1)] group-hover:border-amber-300/40 transition-colors">
                <Image src="/logo.png" alt="" width={48} height={48} sizes="48px" className="h-full w-full object-cover" />
              </span>
              <span className="text-sm font-medium text-zinc-100">PJ Holdings<span className="text-zinc-500">.</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-zinc-400">
              We help businesses take shape through venture development, brand identity, digital experiences, and creative design.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="mb-4 text-xs font-medium text-zinc-200 font-mono uppercase tracking-wider">Explore</h3>
            <ul className="space-y-1">
              {[...navigation, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClassName}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-xs font-medium text-zinc-200 font-mono uppercase tracking-wider">What we do</h3>
            <ul className="space-y-1">
              {disciplines.map((discipline) => (
                <li key={discipline.number}>
                  <Link href="/#capabilities" className={linkClassName}>{discipline.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium text-zinc-200 font-mono uppercase tracking-wider">Connect</h3>
            <ul className="space-y-1">
              <li>
                <Link href="https://wa.me/639619174255" className={linkClassName}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-zinc-500 group-hover:text-zinc-300">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link href="mailto:janreydevmina@gmail.com" className={linkClassName}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-zinc-500 group-hover:text-zinc-300">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  Email
                </Link>
              </li>
              <li>
                <Link href="https://github.com/janreyHablaMina" target="_blank" rel="noopener noreferrer" className={linkClassName}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-zinc-500 group-hover:text-zinc-300">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-start justify-between gap-5 border-t border-white/[0.08] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} PJ Holdings. All rights reserved.</p>
          <Link href="#top" className="inline-flex min-h-9 items-center gap-3 transition-colors hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100 group">
            Back to top
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
