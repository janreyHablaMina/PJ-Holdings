"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [times, setTimes] = useState({
    london: "",
    zurich: "",
    tokyo: "",
    newyork: "",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatTime = (timeZone: string) =>
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone,
        }).format(now);

      setTimes({
        london: formatTime("Europe/London"),
        zurich: formatTime("Europe/Zurich"),
        tokyo: formatTime("Asia/Tokyo"),
        newyork: formatTime("America/New_York"),
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#060608] luxury-border-t pt-24 pb-12 px-6 md:px-12 text-zinc-400">
      <div className="max-w-7xl mx-auto">
        {/* World Practice Clocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-white/[0.06]">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              London / Mayfair
            </div>
            <div className="text-lg font-mono text-zinc-200 mt-1">
              {times.london || "12:00:00"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              Zurich / Seefeld
            </div>
            <div className="text-lg font-mono text-zinc-200 mt-1">
              {times.zurich || "13:00:00"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              Tokyo / Ginza
            </div>
            <div className="text-lg font-mono text-zinc-200 mt-1">
              {times.tokyo || "20:00:00"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              New York / Madison
            </div>
            <div className="text-lg font-mono text-zinc-200 mt-1">
              {times.newyork || "07:00:00"}
            </div>
          </div>
        </div>

        {/* Editorial Navigation */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Practice Statement */}
          <div className="md:col-span-6 space-y-4">
            <div className="text-sm font-medium tracking-[0.2em] text-white uppercase">
              PJ Holdings
            </div>
            <p className="text-sm text-zinc-400 font-light max-w-md leading-relaxed">
              An independent venture and creative practice dedicated to the architectural execution of digital flagships,
              sovereign brands, and venture capital enterprises.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-300">
              Inquiries: partners@pjholdings.com
            </div>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[11px] font-mono tracking-widest text-white uppercase">
              Index
            </div>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li><a href="#monograph" className="hover:text-white transition-colors">The Monograph</a></li>
              <li><a href="#works" className="hover:text-white transition-colors">Selected Works</a></li>
              <li><a href="#capabilities" className="hover:text-white transition-colors">Practice Disciplines</a></li>
              <li><a href="#inquiries" className="hover:text-white transition-colors">Private Commissions</a></li>
            </ul>
          </div>

          {/* Practice Notes & Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-white uppercase mb-3">
                Representation
              </div>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                Direct partner representation for institutional founders, venture creators, and luxury houses.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-zinc-400 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} PJ Holdings Group. Timeless Architectural Practice.
          </div>
          <div className="flex items-center gap-6">
            <span>All Rights Reserved</span>
            <span>Discretion Strictly Maintained</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
