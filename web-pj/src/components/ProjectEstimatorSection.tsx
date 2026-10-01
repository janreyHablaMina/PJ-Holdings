"use client";

import { useState, type FormEvent } from "react";
import { ArrowDownToLine, ArrowUpRight, Check, Compass, Globe2, Layers3, Sparkles } from "lucide-react";
import { CAPABILITIES } from "@/data/agencyData";
import ScrollReveal from "@/components/ScrollReveal";

const services = [
  { title: "Launch a venture", description: "Shape an idea into a product with a clear direction and a plan to grow.", icon: Compass, capability: 0 },
  { title: "Build a brand", description: "Create a distinctive identity, from positioning to the details people remember.", icon: Sparkles, capability: 1 },
  { title: "Create an immersive experience", description: "Bring products and spaces to life through interactive 3D and motion.", icon: Layers3, capability: 2 },
  { title: "Design a digital platform", description: "Build a website, online store, or portal around what your business needs.", icon: Globe2, capability: 3 },
];
const steps = [
  { title: "Choose your direction", detail: "Start with the service closest to your goal. We can explore the wider scope together." },
  { title: "Set the context", detail: "Tell us what you want to achieve, who it is for, and any timing or budget considerations." },
  { title: "Bring a clearer brief", detail: "Save your project outline to share when you start a conversation with our team." },
];
const fields = [
  { name: "name", label: "Your name", type: "text", autoComplete: "name", required: true },
  { name: "email", label: "Email address", type: "email", autoComplete: "email", required: true },
  { name: "company", label: "Company / venture", type: "text", autoComplete: "organization", required: false },
];
const fieldClass = "w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-[#c8b58b] focus:outline-none focus:ring-1 focus:ring-[#c8b58b] transition-all duration-300";
const labelClass = "mb-2 block text-xs text-zinc-300";

export default function ProjectEstimatorSection() {
  const [selected, setSelected] = useState(3);
  const [downloaded, setDownloaded] = useState(false);
  const service = services[selected];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const brief = [
      "PJ HOLDINGS / PROJECT BRIEF", `Service: ${service.title}`,
      `Name: ${data.get("name")}`, `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not specified"}`,
      `Target timeline: ${data.get("timeline")}`,
      `Indicative budget (PHP): ${data.get("budget") || "To be discussed"}`,
      "", "PROJECT GOALS", String(data.get("brief")),
      "", "POTENTIAL SCOPE", ...CAPABILITIES[service.capability].deliverables.map((item) => `- ${item}`),
      "", "Prepared locally. This brief has not been sent to PJ Holdings.",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "pj-holdings-project-brief.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  }

  return (
    <section id="inquiries" aria-labelledby="inquiries-title" className="relative overflow-hidden border-t border-white/[0.08] bg-[#08080a] px-6 py-20 md:px-12 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,145,77,0.09),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal animation="fade-up" className="mb-12 flex items-center gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-ping" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c8b58b]">Your next chapter / PJ Holdings</p>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </ScrollReveal>

        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <ScrollReveal animation="fade-right" className="space-y-10">
            <div>
              <h2 id="inquiries-title" className="max-w-lg text-4xl font-light leading-[1.12] tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
                Big ideas start with <span className="font-serif italic text-[#c8b58b]">a little clarity.</span>
              </h2>
              <p className="mt-6 max-w-md text-base font-light leading-relaxed text-zinc-400">
                A new business. A stronger brand. A better digital experience. Tell us where you want to go, and start shaping what comes next.
              </p>
            </div>

            <ol className="space-y-7">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4 group">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c8b58b]/30 bg-[#c8b58b]/[0.05] font-mono text-[10px] text-[#c8b58b] group-hover:border-[#c8b58b] group-hover:bg-[#c8b58b]/20 transition-all duration-300">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm text-zinc-200 group-hover:text-white transition-colors">{step.title}</h3>
                    <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-zinc-400">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-xl border border-[#c8b58b]/20 bg-[#c8b58b]/[0.04] p-6 hover:border-[#c8b58b]/40 transition-colors">
              <p className="text-sm text-[#d8c8a5] font-medium">Still exploring? That is a good place to start.</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                You do not need a finished plan. A challenge, an idea, or a clear ambition is enough to begin your brief.
              </p>
              <a href="#capabilities" className="mt-5 inline-flex items-center gap-3 text-xs text-[#c8b58b] hover:text-white transition-colors">
                Explore our capabilities <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="border-t border-[#c8b58b]/20 pt-8">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#c8b58b]">From possibility to purpose</p>
              <p className="max-w-md text-3xl font-light leading-snug tracking-tight text-zinc-200 sm:text-4xl">
                You bring the ambition.<br />
                <span className="font-serif italic text-[#c8b58b]">Together, we give it form.</span>
              </p>
              <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-zinc-400">
                A brand people remember. A product they enjoy using. A business ready for its next chapter. Let&apos;s start with what matters to you.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={150}>
            <form onSubmit={handleSubmit} onChange={() => setDownloaded(false)} className="rounded-2xl border border-white/10 bg-[#111113] p-5 sm:p-8 shadow-2xl relative">
              <div className="mb-7 flex items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#c8b58b]">Project planner</p>
                  <h3 className="mt-2 text-xl font-light text-zinc-100">What would you like to build?</h3>
                </div>
                <span aria-hidden="true" className="font-serif text-4xl italic text-[#c8b58b]/40">PJ.</span>
              </div>
              <fieldset>
                <legend className="mb-4 text-xs text-zinc-400 font-mono uppercase tracking-wider">01 / Choose your focus</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = selected === index;
                    return (
                      <label key={item.title} className="relative cursor-pointer">
                        <input type="radio" name="service" value={item.title} checked={isSelected} onChange={() => setSelected(index)} className="peer sr-only" />
                        <span className={`flex h-full flex-col rounded-xl border p-4 transition-all duration-300 ${
                          isSelected
                            ? "border-[#c8b58b] bg-[#c8b58b]/[0.1] shadow-[0_0_20px_rgba(200,181,139,0.12)]"
                            : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-white/[0.02]"
                        }`}>
                          <span className="mb-4 flex items-center justify-between text-[#c8b58b]">
                            <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.3} />
                            <span className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                              isSelected ? "border-[#c8b58b] bg-[#c8b58b] text-[#111113]" : "border-zinc-600"
                            }`}>
                              {isSelected && <Check aria-hidden="true" className="h-3 w-3 stroke-[3]" />}
                            </span>
                          </span>
                          <span className="text-sm font-medium text-zinc-100">{item.title}</span>
                          <span className="mt-2 text-xs leading-relaxed text-zinc-400">{item.description}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-4 border-l-2 border-[#c8b58b] py-2 pl-4 bg-gradient-to-r from-[#c8b58b]/[0.04] to-transparent rounded-r" aria-live="polite" aria-atomic="true">
                  <p className="mb-1 text-[10px] uppercase tracking-widest text-[#c8b58b] font-mono">Your project could include</p>
                  <p className="text-xs leading-relaxed text-zinc-300 font-light">{CAPABILITIES[service.capability].deliverables.join(" · ")}</p>
                </div>
              </fieldset>
              <fieldset className="mt-8">
                <legend className="mb-4 text-xs text-zinc-400 font-mono uppercase tracking-wider">02 / A little about your project</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="project-budget" className={labelClass}>Budget in PHP <span className="text-zinc-500">(optional)</span></label>
                    <input id="project-budget" name="budget" type="number" min="0" step="any" placeholder="e.g. 150000" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="project-timeline" className={labelClass}>When would you like to start?</label>
                    <select id="project-timeline" name="timeline" defaultValue="Flexible / exploring" className={`${fieldClass} scheme-dark cursor-pointer`}>
                      {["Flexible / exploring", "As soon as possible", "Within 1–3 months", "Within 3–6 months", "More than 6 months"].map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="project-brief" className={labelClass}>What would success look like? <span className="text-[#c8b58b]">*</span></label>
                  <textarea id="project-brief" name="brief" required rows={4} placeholder="Tell us about your idea, your audience, and the problem you want to solve…" className={`${fieldClass} resize-y`} />
                </div>
              </fieldset>
              <fieldset className="mt-7">
                <legend className="mb-4 text-xs text-zinc-400 font-mono uppercase tracking-wider">03 / Introduce yourself</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  {fields.map(({ label, ...field }) => (
                    <div key={field.name} className={field.name === "company" ? "sm:col-span-2" : ""}>
                      <label htmlFor={`project-${field.name}`} className={labelClass}>{label} {field.required ? <span className="text-[#c8b58b]">*</span> : <span className="text-zinc-500">(optional)</span>}</label>
                      <input {...field} id={`project-${field.name}`} className={fieldClass} />
                    </div>
                  ))}
                </div>
              </fieldset>
              <div className="mt-7 border-t border-white/[0.08] pt-6">
                <button type="submit" className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#c8b58b] px-5 py-3 text-sm font-medium text-[#111113] transition-all duration-300 hover:bg-[#dfcfab] hover:shadow-[0_0_25px_rgba(200,181,139,0.3)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8b58b]">
                  <span>Save your project brief</span>
                  <ArrowDownToLine aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </button>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-zinc-500">Download your outline to keep or share. This does not send an inquiry.</p>
                {downloaded && (
                  <p role="status" className="mt-2 text-center text-xs text-[#c8b58b] animate-in fade-in slide-in-from-bottom-1 font-mono">
                    ✓ Your brief is ready. Check your downloads for the text file.
                  </p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
