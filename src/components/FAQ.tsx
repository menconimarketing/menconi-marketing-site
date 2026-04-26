"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const faqs = [
  {
    q: "I’ve been burned by an agency before. Why is this different?",
    a: "You hired a sales rep and got handed to a junior team. Here you get me — the person doing the work — every week. No proxy layer. If the work slips, you hear it from me first.",
  },
  {
    q: "You only have one live client. Why should I trust the system?",
    a: "Fair question. The site you’re looking at IS the system. The other sites in Recent Work are spec builds for prospects I’m actively talking to. Click through every one. I’d rather show you real in-progress work than fabricate case studies.",
  },
  {
    q: "Will this work for my trade?",
    a: "I’ve built for landscapers, plasterers, property maintenance, and lawn care so far. The mechanism doesn’t care about the trade. It cares whether you’re willing to claim a position your competitors aren’t.",
  },
  {
    q: "I don’t have a website at all. Can I still start?",
    a: "Best scenario. No bad habits to undo. I build from scratch.",
  },
  {
    q: "What if I already have a decent website?",
    a: "We audit it. If it’s converting, we skip Phase 1 and go straight to ads. You pay for what you need.",
  },
  {
    q: "How long does it take?",
    a: "Site: 4–8 weeks. Ads turn on the week the site goes live. AI follow-up the week after. Progress every week. No big reveal at the end.",
  },
  {
    q: "How much does it cost?",
    a: "Starts at $5,000/month. Three-month minimum on monthly engagements. One-time projects billed 50% up front. Booked through email after a 30-minute call.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item-${index} border-b border-iron/40 group`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <span className="text-bone text-lg font-medium pr-8 group-hover:text-chalk transition-colors duration-300 font-[var(--font-afacad)]">
          {q}
        </span>
        <span
          className={`text-accent shrink-0 transition-all duration-300 ${
            open ? "rotate-45 text-accent-bright" : ""
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="9" y1="3" x2="9" y2="15" />
            <line x1="3" y1="9" x2="15" y2="9" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-400 ease-out ${
          open ? "max-h-64 pb-6" : "max-h-0"
        }`}
      >
        <p className="text-silver leading-relaxed pr-12 font-[var(--font-afacad)]">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".faq-headline", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      faqs.forEach((_, i) => {
        gsap.from(`.faq-item-${i}`, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.faq-item-${i}`,
            start: "top 90%",
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative py-32 md:py-44 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--iron), transparent)",
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h2
          className="faq-headline font-[var(--font-afacad)] text-chalk font-extrabold mb-12 tracking-[-0.01em]"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
        >
          Common questions.
        </h2>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
