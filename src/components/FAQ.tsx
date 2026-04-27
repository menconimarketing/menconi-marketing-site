"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "./Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAQS: { q: string; a: string }[] = [
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
    a: "Depends on what we’re building. A site-only build is different from a full site + ads + AI engagement. After a 30-minute call, you get a fixed number in an email — no ongoing surprises. No fixed minimum until we both know what we’re scoping.",
  },
];

function FAQItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className={`faq-item-${index}`}
      style={{ borderTop: "1px solid var(--mm-charcoal)" }}
    >
      <button
        onClick={onToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          background: hover || open ? "var(--mm-ink)" : "transparent",
          border: "none",
          padding: "28px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          cursor: "pointer",
          fontFamily: "inherit",
          color: "inherit",
          textAlign: "left",
          transition: "background 200ms cubic-bezier(0.2,0,0,1)",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "var(--mm-fg-1)",
            paddingRight: 16,
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontSize: 22,
            color: hover || open ? "var(--mm-accent)" : "var(--mm-fg-3)",
            transition:
              "color 200ms cubic-bezier(0.2,0,0,1), transform 200ms cubic-bezier(0.2,0,0,1)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 320 : 0,
          overflow: "hidden",
          transition: "max-height 380ms cubic-bezier(0.2,0,0,1)",
        }}
      >
        <div style={{ padding: "0 24px 28px" }}>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--mm-fg-2)",
              maxWidth: 720,
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const container = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".faq-headline", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });
      FAQS.forEach((_, i) => {
        gsap.from(`.faq-item-${i}`, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: `.faq-item-${i}`, start: "top 90%" },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      data-screen-label="06 FAQ"
      style={{ padding: "160px 48px", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="06" label="Common questions" />

        <div
          className="grid"
          style={{
            marginTop: 56,
            marginBottom: 80,
            gridTemplateColumns: "1.4fr 1fr",
            gap: 96,
            alignItems: "flex-end",
          }}
        >
          <h2
            className="faq-headline"
            style={{
              margin: 0,
              fontSize: "clamp(36px, 5vw, 76px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              fontWeight: 600,
              color: "var(--mm-fg-1)",
            }}
          >
            Common questions.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 380,
            }}
          >
            The honest answers to the questions I get on every first call.
          </p>
        </div>

        <div style={{ borderBottom: "1px solid var(--mm-charcoal)" }}>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              index={i}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
