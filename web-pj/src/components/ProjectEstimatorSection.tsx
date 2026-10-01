"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const topics = ["A new project", "A collaboration", "Just saying hello"];

const steps = [
  { title: "Choose your direction", detail: "Start with the service closest to your goal. We can explore the wider scope together." },
  { title: "Set the context", detail: "Tell us what you want to achieve, who it is for, and any timing or budget considerations." },
  { title: "Bring a clearer brief", detail: "Send us an email with your project outline to start a conversation with our team." },
];

const fieldClass = "w-full rounded-lg border border-white/10 bg-[#08080a] px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-[#c8b58b] focus:outline-none focus:ring-1 focus:ring-[#c8b58b]";
const labelClass = "mb-2 block text-xs text-zinc-300";

export default function ProjectEstimatorSection() {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied.`);
    } catch {
      setCopyStatus("Copy is unavailable. Please select and copy instead.");
    }
  }

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      `Hello PJ Holdings,`, "",
      message.trim(), "",
      `Name: ${String(form.get("name")).trim()}`,
      `Email: ${form.get("email")}`,
      `Company: ${String(form.get("company")).trim() || "Not specified"}`,
      `Topic: ${topic}`
    ].join("\n");
    setDraft(body);
    setCopyStatus("");
    window.location.href = `mailto:janreydevmina@gmail.com?subject=${encodeURIComponent(`Let's talk: ${topic}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="inquiries" aria-labelledby="inquiries-title" className="relative overflow-hidden border-t border-white/[0.08] bg-[#0c0c0e] px-6 py-20 md:px-12 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-48 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(180,145,77,0.09),transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal animation="fade-up" className="mb-12 flex items-center gap-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8b58b] animate-ping" />
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c8b58b]">Your next chapter / PJ Holdings</p>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </ScrollReveal>

        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
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
              <Link href="/#capabilities" className="mt-5 inline-flex items-center gap-3 text-xs text-[#c8b58b] hover:text-white transition-colors">
                Explore our capabilities <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={150}>
            <form onSubmit={prepareEmail} onChange={() => setDraft("")} className="rounded-2xl border border-white/10 bg-[#111113] p-5 sm:p-8">
              <fieldset>
                <legend className="mb-4 text-xs text-zinc-300">I&apos;m here for…</legend>
                <div className="flex flex-wrap gap-2">
                  {topics.map(item => (
                    <label key={item} className="cursor-pointer">
                      <input type="radio" name="topic" value={item} checked={topic === item} onChange={() => setTopic(item)} className="peer sr-only" />
                      <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400 transition-colors peer-checked:border-[#c8b58b]/60 peer-checked:bg-[#c8b58b]/10 peer-checked:text-[#decda9] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#c8b58b]">
                        {topic === item && <Check size={12} aria-hidden="true" />}
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Your name <span className="text-[#c8b58b]">*</span></span>
                  <input name="name" required pattern=".*\S.*" maxLength={100} autoComplete="name" placeholder="Alex Santos" className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>Email address <span className="text-[#c8b58b]">*</span></span>
                  <input name="email" type="email" required maxLength={150} autoComplete="email" placeholder="alex@company.com" className={fieldClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelClass}>Company / venture <span className="text-zinc-500">(optional)</span></span>
                  <input name="company" maxLength={120} autoComplete="organization" placeholder="Who are you building with?" className={fieldClass} />
                </label>
                <label className="block sm:col-span-2">
                  <span className={labelClass}>What&apos;s on your mind? <span className="text-[#c8b58b]">*</span></span>
                  <textarea name="message" required minLength={10} maxLength={1500} rows={5} value={message} onChange={e => { setMessage(e.target.value); e.target.setCustomValidity(e.target.value.trim().length < 10 ? "Tell us a little more (at least 10 characters)." : ""); }} placeholder="A little about your idea, your goals, or what you'd like to explore together…" className={`${fieldClass} resize-y`} />
                  <span className="block text-right text-[10px] text-zinc-500">{message.length} / 1,500</span>
                </label>
              </div>

              <div className="mt-7">
                <button type="submit" className="group flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#d0bc91] px-5 py-3 text-sm font-medium text-[#111113] transition-all duration-300 hover:bg-[#dfcfab] hover:shadow-[0_0_25px_rgba(200,181,139,0.3)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8b58b]">
                  <span>Prepare my email</span>
                  <Send size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-zinc-500">
                  Opens a draft in your email app. Review it and press send there.<br />
                  Your message is not submitted through this website.
                </p>
                {draft && (
                  <div className="mt-5 rounded-lg border border-[#c8b58b]/30 bg-[#c8b58b]/5 p-4">
                    <p role="status" className="text-sm text-[#decda9]">Your draft is ready. Send it from your email app.</p>
                    <textarea aria-label="Prepared email draft" readOnly value={draft} rows={5} className={`${fieldClass} mt-3`} />
                    <button type="button" onClick={() => copyText(draft, "Message")} className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs text-[#c8b58b] hover:text-[#dfcfab]">
                      <Copy size={13} aria-hidden="true" />Copy my message
                    </button>
                    <p role="status" className="mt-2 text-xs text-[#c8b58b]">{copyStatus}</p>
                  </div>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
