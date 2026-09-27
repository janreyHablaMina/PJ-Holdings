"use client";

import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ProjectEstimatorSection() {
  const [nature, setNature] = useState("Digital Flagship & Platform");
  const [allocation, setAllocation] = useState("£60k – £120k");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    institution: "",
    email: "",
    brief: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const natures = [
    "Venture Incubation & Architecture",
    "Digital Flagship & Platform",
    "Brand Identity & Strategy",
    "Spatial 3D & Interactive WebGL",
  ];

  const allocations = [
    "£35,000 – £60,000",
    "£60,000 – £120,000",
    "£120,000 – £250,000+",
    "Strategic Equity / Co-Venture",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="inquiries" className="relative py-32 px-6 md:px-12 bg-[#08080a] luxury-border-t">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase block mb-3">
            Commission Dialogue • 2025/2026
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-[-0.02em]">
            Initiate a <span className="font-serif italic text-zinc-300">Dialogue</span>
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base font-light leading-relaxed">
            We limit our practice to a strictly curated number of commissions annually to preserve absolute craft and
            principal involvement.
          </p>
        </div>

        {submitted ? (
          <div className="p-12 sm:p-16 bg-[#0c0c10] luxury-border text-center max-w-xl mx-auto space-y-4 animate-in fade-in duration-300">
            <CheckCircle2 className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-2xl font-light text-white tracking-tight">
              Inquiry Acknowledged
            </h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">
              Thank you, <span className="text-white">{formData.name}</span>. Your brief regarding{" "}
              <span className="text-white">{formData.institution || "your venture"}</span> has been transmitted
              directly to our partners. We will respond within one business day.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-mono text-zinc-400 uppercase tracking-widest hover:text-white pt-4 transition-colors"
            >
              Submit Additional Details
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Nature of Commission */}
            <div>
              <label className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block mb-4">
                01 / Nature of Commission
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {natures.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setNature(item)}
                    className={`p-4 text-left luxury-border transition-all duration-200 text-xs font-mono ${
                      nature === item
                        ? "bg-white text-black border-white"
                        : "bg-[#0c0c10] text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Capital Allocation */}
            <div>
              <label className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block mb-4">
                02 / Capital Allocation
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {allocations.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setAllocation(item)}
                    className={`p-3 text-center luxury-border transition-all duration-200 text-xs font-mono ${
                      allocation === item
                        ? "bg-white text-black border-white"
                        : "bg-[#0c0c10] text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal & Organization Credentials */}
            <div>
              <label className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block mb-4">
                03 / Contact & Vision Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 bg-[#0c0c10] luxury-border text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-light"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Direct Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 bg-[#0c0c10] luxury-border text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-light"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Title / Role (e.g. Founder, CEO)"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-4 bg-[#0c0c10] luxury-border text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-light"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Company or Venture Name"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full p-4 bg-[#0c0c10] luxury-border text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-light"
                  />
                </div>
              </div>

              <div className="mt-4">
                <textarea
                  rows={4}
                  placeholder="Summary of the venture, aspirations, or challenge..."
                  value={formData.brief}
                  onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                  className="w-full p-4 bg-[#0c0c10] luxury-border text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-light resize-none"
                />
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.06]">
              <div className="text-[11px] font-mono text-zinc-400">
                Discretion Assured • Direct Partner Review within 24 Hours
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-4 bg-white text-[#08080a] text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Transmitting..." : "Initiate Consultation"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
