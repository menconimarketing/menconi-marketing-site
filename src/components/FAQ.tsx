"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const faqs = [
  {
    q: "I\u2019ve been burned by a marketing company before. Why is this different?",
    a: "Because you don\u2019t pay for the next step until the current one is working. Phase 2 doesn\u2019t start until Phase 1 proves itself. That\u2019s the opposite of \u201Cpay us $2K a month and hope for the best.\u201D",
  },
  {
    q: "Will this work for my trade?",
    a: "I\u2019ve built for landscapers, plasterers, property maintenance companies, and more. The system works across trades. Scroll up and look at the sites.",
  },
  {
    q: "I don\u2019t have a website at all. Can I still start?",
    a: "That\u2019s the best scenario. No bad habits to undo. I build from scratch, and you skip the audit entirely.",
  },
  {
    q: "What if I already have a decent website?",
    a: "Then we start with an audit. If your site is already converting, we skip Phase 1 and go straight to ads. You only pay for what you need.",
  },
  {
    q: "How long does it take?",
    a: "A pilot takes about 5 business days. A full Phase 1 site build takes 4\u20138 weeks depending on scope. You\u2019ll see progress throughout, not just a big reveal at the end.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`faq-item-${index} border-b border-iron/40 group`}
    >
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
          open ? "max-h-48 pb-6" : "max-h-0"
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
