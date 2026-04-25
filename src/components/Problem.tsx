"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const painPoints = [
  {
    number: "01",
    text: "Your site was built by a friend four years ago. You\u2019re embarrassed to send people to it.",
  },
  {
    number: "02",
    text: "You paid an agency $2,000 a month. They sent reports. You never got a single call from it.",
  },
  {
    number: "03",
    text: "June you\u2019re turning down work. November you\u2019re wondering if you can keep your crew. Referrals keep the lights on, but they don\u2019t keep them steady.",
  },
  {
    number: "04",
    text: "Your competitor ranks above you on Google. You\u2019ve seen their work. It\u2019s not better than yours. They just showed up first.",
  },
];

export default function Problem() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".problem-label", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      painPoints.forEach((_, i) => {
        gsap.from(`.pain-card-${i}`, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.pain-card-${i}`,
            start: "top 85%",
          },
        });

        gsap.from(`.pain-number-${i}`, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: `.pain-card-${i}`,
            start: "top 82%",
          },
        });

        gsap.from(`.pain-line-${i}`, {
          scaleX: 0,
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: `.pain-card-${i}`,
            start: "top 82%",
          },
        });
      });

      gsap.from(".problem-closing", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".problem-closing",
          start: "top 85%",
        },
      });

      gsap.from(".problem-closing-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power2.inOut",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: ".problem-closing",
          start: "top 85%",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative py-32 md:py-44 overflow-hidden">
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--iron), transparent)",
        }}
      />

      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Accent glow - far right */}
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <p className="problem-label text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-20">
          The reality
        </p>

        <div className="space-y-10">
          {painPoints.map((point, i) => (
            <div
              key={point.number}
              className={`pain-card-${i} group relative`}
            >
              <div className="flex gap-6 md:gap-10 items-start">
                <span
                  className={`pain-number-${i} font-[var(--font-afacad)] text-accent/40 font-bold text-5xl md:text-6xl shrink-0 leading-none group-hover:text-accent/70 transition-colors duration-500 select-none`}
                >
                  {point.number}
                </span>
                <div className="pt-2 md:pt-3 flex-1">
                  <p className="text-bone text-lg md:text-xl leading-relaxed font-[var(--font-afacad)] group-hover:text-chalk transition-colors duration-500">
                    {point.text}
                  </p>
                </div>
              </div>
              <div
                className={`pain-line-${i} mt-8 h-px w-full`}
                style={{
                  background:
                    "linear-gradient(90deg, var(--iron), transparent 80%)",
                }}
              />
            </div>
          ))}
        </div>

        <div className="problem-closing mt-20 max-w-[860px] relative">
          <div
            className="problem-closing-line absolute -left-6 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent), var(--accent-dim), transparent)",
            }}
          />
          <p className="text-chalk text-xl md:text-2xl font-semibold leading-snug pl-6 font-[var(--font-afacad)]">
            This isn&apos;t a marketing problem. It&apos;s a{" "}
            <span className="text-gradient">system problem</span>. And the last
            person you hired to fix it didn&apos;t build you a system &mdash;
            they sold you a retainer and a dashboard you never looked at.
          </p>
        </div>
      </div>
    </section>
  );
}
