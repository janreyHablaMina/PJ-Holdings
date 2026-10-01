"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Copy, Code2, Mail, MessageCircle, Plus, Send } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import { contact, contactChannels } from "@/data/contact";

const icons = { email: Mail, chat: MessageCircle, github: Code2 };
const topics = ["A new project", "A collaboration", "Just saying hello"];
const faqs = [
  ["Do I need a complete brief to get started?", "Not at all. Tell us about your idea, the challenge you are facing, or the change you want to make. A few clear first thoughts are enough to begin."],
  ["What kind of projects can we talk about?", "We work across venture development, brand identity, immersive experiences, and digital platforms. Whether you need a new website or a direction for your business, start with your goal."],
  ["How should I share a project brief?", "Send it by email or WhatsApp. Include any useful references, your ideal timeline, and a budget if you have one."],
  ["What happens after I reach out?", "We can discuss your goals, clarify the scope, and explore the right next steps together. Sharing an inquiry or a project outline does not commit you to a project."],
];
const fieldClass = "w-full rounded-lg border border-white/10 bg-[#08080a] px-4 py-3.5 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors focus:border-[#c8b58b] focus:outline-none focus:ring-1 focus:ring-[#c8b58b]";

export default function ContactExperience() {
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [draft, setDraft] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  async function copyText(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} copied.`);
    } catch {
      setCopyStatus("Copy is unavailable in this browser. Please select and copy the text instead.");
    }
  }

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [`Hello PJ Holdings,`, "", message.trim(), "", `Name: ${String(form.get("name")).trim()}`, `Email: ${form.get("email")}`, `Company: ${String(form.get("company")).trim() || "Not specified"}`, `Topic: ${topic}`].join("\n");
    setDraft(body);
    setCopyStatus("");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Let's talk: ${topic}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <>
      <section aria-labelledby="contact-title" className="contact-banner relative isolate overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pt-40 lg:pb-16 bg-[#08080a]">
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85"
            alt="Atmospheric architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40 mix-blend-overlay contrast-125 saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/60 to-[#08080a]/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,160,45,0.08),transparent_60%)]" />
        </div>
        <div aria-hidden="true" className="contact-banner-light relative z-10" />
        <div className="relative z-10 mx-auto max-w-7xl">

          <div className="py-14 text-center sm:py-20 lg:py-24">
            <p className="contact-entrance mb-6 text-xs tracking-[0.12em] text-zinc-400">YOUR IDEAS HAVE A PLACE HERE.</p>
            <h1 id="contact-title" className="contact-entrance text-[clamp(4.5rem,13vw,11rem)] font-light leading-[1.05] tracking-[-0.065em]">Let&apos;s <span className="font-serif italic text-[#c8b58b]">talk.</span></h1>
            <p className="contact-entrance mx-auto mt-7 max-w-md text-sm font-light leading-relaxed text-zinc-400 sm:text-base">Something to build. Something to ask. Something to imagine together. We&apos;re listening.</p>
            <a href="#connect" className="group mt-7 inline-flex min-h-11 items-center gap-3 text-xs text-[#d4c5a6] underline-offset-4 hover:underline">Explore our channels <ArrowDown aria-hidden="true" size={14} className="transition-transform group-hover:translate-y-1" /></a>
          </div>
          <div className="contact-entrance">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Make the first move</p>
            <div className="grid border-y border-[#c8b58b]/20 md:grid-cols-3">
              {topics.map((item, index) => (
                <a
                  key={item}
                  href="#message"
                  onClick={() => { setTopic(item); setDraft(""); }}
                  className="contact-starter group flex items-center gap-5 border-b border-[#c8b58b]/20 px-4 py-7 last:border-b-0 sm:px-6 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span className="font-mono text-[10px] text-[#c8b58b]/60">0{index + 1}</span>
                  <div className="flex-1">
                    <h2 className="text-lg font-light text-zinc-100 transition-colors group-hover:text-[#decda9]">{["I have a project", "Let's collaborate", "Just saying hello"][index]}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">{["Turn an idea into something real.", "Explore what we can do together.", "A simple introduction is enough."][index]}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.3} className="shrink-0 text-[#c8b58b] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="connect" aria-labelledby="connect-title" className="scroll-mt-28 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="contact-eyebrow">01 / Connect your way</p><h2 id="connect-title" className="mt-3 text-3xl font-light sm:text-4xl">Different channels. <span className="font-serif italic text-[#c8b58b]">Same people.</span></h2></div><p className="max-w-xs text-sm leading-relaxed text-zinc-400">Choose the place you feel most at home.</p></ScrollReveal>
          <div className="grid gap-4 md:grid-cols-3">
            {contactChannels.map((channel, index) => {
              const Icon = icons[channel.icon];
              return <ScrollReveal key={channel.name} delay={index * 90}><SpotlightCard className="h-full rounded-xl border border-white/10 bg-[#101012] transition-colors hover:border-[#c8b58b]/40"><a href={channel.href} target={channel.icon === "email" ? undefined : "_blank"} rel={channel.icon === "email" ? undefined : "noopener noreferrer"} className="group relative z-20 flex h-full flex-col rounded-xl p-6 focus-visible:outline-2 focus-visible:outline-[#c8b58b] sm:p-8"><div className="mb-10 flex items-center justify-between"><Icon size={24} strokeWidth={1.3} className="text-[#c8b58b]" /><span className="font-mono text-[10px] text-zinc-600">0{index + 1}</span></div><h3 className="text-2xl font-light">{channel.name}</h3><p className="mt-2 break-all text-xs text-[#c8b58b]">{channel.detail}</p><p className="mb-8 mt-4 text-sm leading-relaxed text-zinc-400">{channel.description}</p><span className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-xs text-zinc-300">{channel.action}<ArrowUpRight size={17} aria-hidden="true" className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span></a></SpotlightCard></ScrollReveal>;
            })}
          </div>
        </div>
      </section>

      <section id="message" aria-labelledby="message-title" className="scroll-mt-28 border-y border-white/[0.08] bg-[#0c0c0e] px-6 py-20 md:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <ScrollReveal>
            <p className="contact-eyebrow">02 / Drop us a line</p>
            <h2 id="message-title" className="mt-5 text-4xl font-light leading-tight sm:text-5xl">Your next chapter,<br /><span className="font-serif italic text-[#c8b58b]">in your own words.</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-400">No perfect pitch needed. Tell us a little about yourself and what you have in mind. We&apos;ll take it from there.</p>
            <div className="mt-10 border-l border-[#c8b58b]/30 pl-6"><p className="text-sm text-zinc-200">Prefer to write directly?</p><a className="mt-2 block break-all text-sm text-[#c8b58b] hover:underline" href={`mailto:${contact.email}`}>{contact.email}</a><button type="button" onClick={() => copyText(contact.email, "Email address")} className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs text-zinc-400 hover:text-white"><Copy size={13} aria-hidden="true" /> Copy email address</button><p role="status" className="mt-2 text-xs text-[#c8b58b]">{copyStatus}</p></div>
          </ScrollReveal>
          <form onSubmit={prepareEmail} onChange={() => setDraft("")} className="rounded-2xl border border-white/10 bg-[#111113] p-5 sm:p-8">
            <fieldset><legend className="mb-4 text-xs text-zinc-300">I&apos;m here for…</legend><div className="flex flex-wrap gap-2">{topics.map(item => <label key={item} className="cursor-pointer"><input type="radio" name="topic" value={item} checked={topic === item} onChange={() => setTopic(item)} className="peer sr-only" /><span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-400 transition-colors peer-checked:border-[#c8b58b]/60 peer-checked:bg-[#c8b58b]/10 peer-checked:text-[#decda9] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#c8b58b]">{topic === item && <Check size={12} aria-hidden="true" />}{item}</span></label>)}</div></fieldset>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="contact-label" htmlFor="contact-name">Your name <span className="text-[#c8b58b]">*</span><input id="contact-name" name="name" required pattern=".*\S.*" maxLength={100} autoComplete="name" placeholder="Alex Santos" className={fieldClass} /></label>
              <label className="contact-label" htmlFor="contact-email">Email address <span className="text-[#c8b58b]">*</span><input id="contact-email" name="email" type="email" required maxLength={150} autoComplete="email" placeholder="alex@company.com" className={fieldClass} /></label>
              <label className="contact-label sm:col-span-2" htmlFor="contact-company">Company / venture <span className="text-zinc-500">(optional)</span><input id="contact-company" name="company" maxLength={120} autoComplete="organization" placeholder="Who are you building with?" className={fieldClass} /></label>
              <label className="contact-label sm:col-span-2" htmlFor="contact-message">What&apos;s on your mind? <span className="text-[#c8b58b]">*</span><textarea id="contact-message" name="message" required minLength={10} maxLength={1500} rows={5} value={message} onChange={e => { setMessage(e.target.value); e.target.setCustomValidity(e.target.value.trim().length < 10 ? "Tell us a little more (at least 10 characters)." : ""); }} placeholder="A little about your idea, your goals, or what you'd like to explore together…" className={`${fieldClass} resize-y`} /><span className="block text-right text-[10px] text-zinc-500">{message.length} / 1,500</span></label>
            </div>
            <button type="submit" className="contact-primary mt-5 w-full justify-center">Prepare my email <Send size={15} aria-hidden="true" /></button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-zinc-500">Opens a draft in your email app. Review it and press send there.<br />Your message is not submitted through this website.</p>
            {draft && <div className="mt-5 rounded-lg border border-[#c8b58b]/30 bg-[#c8b58b]/5 p-4"><p role="status" className="text-sm text-[#decda9]">Your draft is ready. Send it from your email app.</p><p className="mt-2 text-xs leading-relaxed text-zinc-400">No email app opened? Copy the draft below and send it to {contact.email}.</p><textarea aria-label="Prepared email draft" readOnly value={draft} rows={5} className={`${fieldClass} mt-3`} /><button type="button" onClick={() => copyText(draft, "Message")} className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs text-[#c8b58b]"><Copy size={13} aria-hidden="true" />Copy my message</button></div>}
          </form>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24"><div><p className="contact-eyebrow">03 / Before we say hello</p><h2 id="faq-title" className="mt-4 text-3xl font-light sm:text-4xl">A little more <span className="font-serif italic text-[#c8b58b]">clarity.</span></h2></div><div>{faqs.map(([question, answer]) => <details key={question} className="group border-b border-white/10 first:border-t"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-sm text-zinc-200 hover:text-[#c8b58b] [&::-webkit-details-marker]:hidden">{question}<Plus aria-hidden="true" size={17} className="shrink-0 text-[#c8b58b] transition-transform group-open:rotate-45" /></summary><p className="max-w-xl pb-6 pr-8 text-sm leading-relaxed text-zinc-400">{answer}</p></details>)}</div></div>
      </section>
    </>
  );
}
