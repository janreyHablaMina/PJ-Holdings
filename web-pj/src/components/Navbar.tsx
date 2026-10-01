"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { navigation } from "@/data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-6 transition-colors duration-300 motion-reduce:transition-none md:px-12 ${
        scrolled || mobileMenuOpen
          ? "bg-[#08080a]/95 backdrop-blur-xl"
          : "bg-[#08080a]/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 border-b border-white/[0.08] md:h-24">
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="PJ Holdings home"
          className="group flex shrink-0 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100"
        >
          <span aria-hidden="true" className="relative block h-12 w-12 overflow-hidden rounded-full border border-amber-300/25 bg-black shadow-[0_0_24px_rgba(217,160,45,0.12)] transition-colors group-hover:border-amber-200/45">
            <Image
              src="/logo.png"
              alt=""
              width={96}
              height={96}
              priority
              sizes="48px"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-sm font-medium tracking-[-0.02em] text-zinc-100">
            PJ Holdings<span className="text-zinc-500">.</span>
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileMenuOpen}
          aria-controls="primary-navigation"
          className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/10 text-zinc-300 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100 md:hidden"
        >
          {mobileMenuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </button>

        <nav
          id="primary-navigation"
          aria-label="Main navigation"
          className={`${mobileMenuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col gap-1 border-b border-white/[0.08] bg-[#08080a] px-6 pb-6 pt-3 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 lg:gap-10`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex min-h-11 items-center text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100 md:text-xs"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="group mt-3 inline-flex min-h-11 items-center justify-between gap-6 rounded-sm border border-white/20 px-5 py-3 text-xs font-medium text-zinc-100 transition-colors hover:border-zinc-100 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-100 md:ml-3 md:mt-0"
          >
            Let&apos;s talk
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
