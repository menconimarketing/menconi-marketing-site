"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingEmbed from "./BookingEmbed";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTA() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-headline", {
        y: 60,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".cta-body", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".cta-body",
          start: "top 85%",
        },
      });

      gsap.from(".cta-button", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".cta-button",
          start: "top 88%",
        },
      });

      gsap.from(".cta-micro", {
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".cta-micro",
          start: "top 90%",
        },
      });

      // Pulsing glow animation
      gsap.to(".cta-glow", {
        scale: 1.15,
        opacity: 0.06,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  return (
    <section
      id="contact"
      ref={container}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-dim), transparent)",
        }}
      />

      {/* Pulsing background glow */}
      <div
        className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-[820px] mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            Book your call
          </p>

          <h2
            className="cta-headline font-[var(--font-syne)] font-extrabold leading-tight tracking-[-0.01em] mb-6"
          >
            <span className="text-gradient" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Get your positioning audit.
            </span>
          </h2>

          <p className="cta-body text-silver text-lg leading-relaxed font-[var(--font-afacad)]">
            15 minutes. I&apos;ll pull up your current site, show you where you&apos;re positioned today, who you&apos;re competing with, and the unowned space you could own.
          </p>
        </div>

        <div className="cta-button">
          <BookingEmbed />
        </div>

        <p className="cta-micro mt-6 text-graphite text-sm text-center">
          Free. No commitment. If it doesn&apos;t make sense, I&apos;ll tell you on the call.
        </p>
      </div>
    </section>
  );
}
