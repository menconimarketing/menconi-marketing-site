"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const phases = [
  {
    n: "01",
    label: "Phase 1 \u2014 Position Discovered",
    title: "First, your position. Then, the website that proves it.",
    body: "Position-discovery isn\u2019t a quiz or a brand workshop. It\u2019s research: your customers, your competitors, the gaps in your market. Then I build the website that turns that position into something visitors can see, feel, and act on within five seconds of landing.",
    key: "I won\u2019t spend a dollar on your ads until your position is clear and your site converts.",
  },
  {
    n: "02",
    label: "Phase 2 \u2014 Position Distributed",
    title: "Now the right people see it.",
    body: "Once your position is locked and your site converts, I turn on Google Ads and Meta Ads \u2014 but only against the position you own. No broad blasts. No wasted budget chasing the same generic homeowner every other contractor in your zip code is chasing.",
    key: "Phase 2 doesn\u2019t start until Phase 1 proves your position. No exceptions.",
  },
  {
    n: "03",
    label: "Phase 3 \u2014 Position Defended",
    title: "Then customers stay where they are.",
    body: "Missed call? Auto-text in five minutes. Quote three days old? Follow-up fires on its own. Past customer going quiet? Reactivation sequence brings them back before they forget your name.",
    key: "No lead leaks. No customer forgets your name.",
  },
];

export default function Mechanism() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // ============= DESKTOP: scroll-pinned cinematic =============
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=300%",
            pin: ".mech-pin-wrap",
            scrub: 1,
            anticipatePin: 1,
          },
          defaults: { ease: "power2.inOut" },
        });

        // ---------- PHASE 1: build the website mockup ----------
        tl.addLabel("p1-start", 0)
          .to(".phase-indicator-0", { opacity: 1, scale: 1 }, "p1-start")
          .from(".text-phase-0", { y: 30, opacity: 0, duration: 0.4 }, "p1-start")
          // Browser chrome appears
          .from(".mock-site", { scale: 0.85, opacity: 0, duration: 0.5 }, "p1-start+=0.2")
          .from(".mock-chrome", { scaleY: 0, transformOrigin: "top", duration: 0.3 }, "p1-start+=0.4")
          // Page elements stagger in
          .from(".mock-line", { scaleX: 0, transformOrigin: "left", stagger: 0.1, duration: 0.3 }, "p1-start+=0.6")
          .from(".mock-cta", { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(2)" }, "p1-start+=1.1")
          .from(".mock-hero-block", { y: 20, opacity: 0, duration: 0.4 }, "p1-start+=0.7")
          .from(".mock-section", { y: 20, opacity: 0, stagger: 0.15, duration: 0.4 }, "p1-start+=0.9");

        // ---------- TRANSITION 1 → 2 ----------
        tl.addLabel("p2-start", "+=0.5")
          .to(".text-phase-0", { y: -30, opacity: 0, duration: 0.4 }, "p2-start")
          .to(".phase-indicator-0", { opacity: 0.3 }, "p2-start")
          .to(".phase-indicator-1", { opacity: 1, scale: 1 }, "p2-start")
          .from(".text-phase-1", { y: 30, opacity: 0, duration: 0.4 }, "p2-start+=0.2")
          // Site shrinks slightly to make room for ads
          .to(".mock-site", { scale: 0.78, duration: 0.5 }, "p2-start");

        // ---------- PHASE 2: ads fly in ----------
        tl.from(".ad-google", {
          x: -120,
          y: -60,
          opacity: 0,
          rotation: -5,
          duration: 0.6,
          ease: "power3.out",
        }, "p2-start+=0.3")
          .from(".ad-meta", {
            x: 120,
            y: -60,
            opacity: 0,
            rotation: 5,
            duration: 0.6,
            ease: "power3.out",
          }, "p2-start+=0.4")
          // Lines draw from ads to site
          .from(".ad-line-google", {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.5,
          }, "p2-start+=0.7")
          .from(".ad-line-meta", {
            scaleX: 0,
            transformOrigin: "right",
            duration: 0.5,
          }, "p2-start+=0.8")
          // Counter ticks up
          .from(".lead-counter", {
            opacity: 0,
            y: 10,
            duration: 0.3,
          }, "p2-start+=1");

        // ---------- TRANSITION 2 → 3 ----------
        tl.addLabel("p3-start", "+=0.5")
          .to(".text-phase-1", { y: -30, opacity: 0, duration: 0.4 }, "p3-start")
          .to(".phase-indicator-1", { opacity: 0.3 }, "p3-start")
          .to(".phase-indicator-2", { opacity: 1, scale: 1 }, "p3-start")
          .from(".text-phase-2", { y: 30, opacity: 0, duration: 0.4 }, "p3-start+=0.2")
          // Ads fade slightly to make room for phone
          .to([".ad-google", ".ad-meta"], { opacity: 0.4, scale: 0.85, duration: 0.4 }, "p3-start")
          .to(".mock-site", { scale: 0.65, x: -80, duration: 0.5 }, "p3-start");

        // ---------- PHASE 3: phone + auto-text + dashboard ----------
        tl.from(".phone-frame", {
          x: 200,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        }, "p3-start+=0.3")
          .from(".phone-bubble-incoming", {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(2)",
          }, "p3-start+=0.7")
          .from(".phone-bubble-auto", {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            ease: "back.out(2)",
          }, "p3-start+=1")
          .from(".dashboard-stat", {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.4,
          }, "p3-start+=1.2");
      });

      // ============= MOBILE: vertical stacked cards w/ scroll fades =============
      mm.add("(max-width: 767px)", () => {
        gsap.from(".mobile-phase-card", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mobile-phase-card",
            start: "top 80%",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: container }
  );

  return (
    <section
      id="how-it-works"
      ref={container}
      className="relative bg-void"
    >
      <div
        className="absolute top-0 left-0 w-full h-px z-10"
        style={{
          background: "linear-gradient(90deg, transparent, var(--iron), transparent)",
        }}
      />

      {/* ============= DESKTOP: pinned cinematic ============= */}
      <div className="hidden md:block">
        <div className="mech-pin-wrap relative h-screen overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
          {/* Accent glow */}
          <div
            className="absolute top-1/4 -left-40 w-[600px] h-[600px] opacity-[0.04] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Phase indicator rail */}
          <div className="absolute top-1/2 left-8 -translate-y-1/2 z-20 flex flex-col gap-6">
            {phases.map((p, i) => (
              <div
                key={p.n}
                className={`phase-indicator-${i} flex items-center gap-3 opacity-30 scale-90`}
              >
                <div className="w-2 h-2 bg-accent" />
                <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
                  {p.n}
                </span>
              </div>
            ))}
          </div>

          <div className="relative h-full max-w-[1280px] mx-auto px-6 grid grid-cols-12 gap-8 items-center">
            {/* Text column */}
            <div className="col-span-5 col-start-2 relative h-[420px]">
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                How I work
              </p>

              {phases.map((p, i) => (
                <div
                  key={p.n}
                  className={`text-phase-${i} absolute inset-0 ${i === 0 ? "" : "opacity-0"}`}
                >
                  <p className="text-accent/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                    {p.label}
                  </p>
                  <h3
                    className="font-[var(--font-afacad)] text-chalk font-extrabold leading-tight tracking-[-0.01em] mb-6"
                    style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.2rem)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-silver text-base leading-relaxed mb-6 font-[var(--font-afacad)]">
                    {p.body}
                  </p>
                  <div className="flex items-start gap-3 pt-4 border-t border-iron/40">
                    <div className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
                    <p className="text-bone font-medium text-sm font-[var(--font-afacad)]">
                      {p.key}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Canvas column */}
            <div className="col-span-6 relative h-[600px] flex items-center justify-center">
              {/* The website mockup - persists through all phases */}
              <div
                className="mock-site relative w-[440px] h-[300px] z-10"
                style={{
                  background: "rgba(15, 16, 18, 0.95)",
                  border: "1px solid rgba(168, 176, 196, 0.2)",
                  boxShadow:
                    "0 0 60px rgba(168, 176, 196, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Browser chrome */}
                <div className="mock-chrome flex items-center gap-2 px-3 py-2 border-b border-iron/40 bg-deep">
                  <span className="w-2 h-2 rounded-full bg-iron" />
                  <span className="w-2 h-2 rounded-full bg-iron" />
                  <span className="w-2 h-2 rounded-full bg-iron" />
                  <div className="ml-2 flex-1 h-3 bg-smoke/50" />
                </div>

                {/* Page content */}
                <div className="p-5 space-y-3">
                  <div className="mock-line h-2 w-3/4 bg-chalk/80" />
                  <div className="mock-line h-2 w-1/2 bg-chalk/80" />
                  <div className="mock-hero-block h-12 w-full bg-smoke/40 mt-4 flex items-center px-3">
                    <div className="w-12 h-1.5 bg-silver/40" />
                  </div>
                  <div className="mock-cta inline-block h-7 w-28 bg-accent mt-2" />
                  <div className="mock-section h-1.5 w-full bg-iron/60 mt-5" />
                  <div className="mock-section h-1.5 w-5/6 bg-iron/60" />
                  <div className="mock-section h-1.5 w-2/3 bg-iron/60" />
                </div>
              </div>

              {/* PHASE 2: Ad cards */}
              <div
                className="ad-google absolute top-12 left-0 w-44 p-3 z-20"
                style={{
                  background: "rgba(15, 16, 18, 0.95)",
                  border: "1px solid rgba(168, 176, 196, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[8px] font-bold tracking-wider text-accent uppercase">Sponsored</span>
                  <span className="text-[8px] text-graphite">Google</span>
                </div>
                <div className="text-bone text-[10px] font-bold leading-tight mb-1">
                  The roofer who guarantees the install date in writing.
                </div>
                <div className="text-graphite text-[8px]">yoursite.com</div>
              </div>

              <div
                className="ad-meta absolute top-12 right-0 w-44 z-20"
                style={{
                  background: "rgba(15, 16, 18, 0.95)",
                  border: "1px solid rgba(168, 176, 196, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="aspect-video bg-smoke/60 relative">
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="absolute bottom-1 left-1.5 w-2 h-2 bg-accent" />
                </div>
                <div className="p-2">
                  <div className="text-[7px] text-graphite uppercase tracking-wider mb-1">Sponsored \u00b7 Meta</div>
                  <div className="text-bone text-[10px] font-bold leading-tight">
                    Tired of contractors who never call back?
                  </div>
                </div>
              </div>

              {/* Connection lines (ads → site) */}
              <svg
                className="absolute inset-0 w-full h-full z-15 pointer-events-none"
                viewBox="0 0 600 600"
                preserveAspectRatio="none"
              >
                <line
                  className="ad-line-google"
                  x1="80"
                  y1="100"
                  x2="180"
                  y2="220"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  strokeDasharray="3 3"
                />
                <line
                  className="ad-line-meta"
                  x1="520"
                  y1="100"
                  x2="420"
                  y2="220"
                  stroke="var(--accent)"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  strokeDasharray="3 3"
                />
              </svg>

              {/* Lead counter (Phase 2) */}
              <div className="lead-counter absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2"
                style={{
                  background: "rgba(15, 16, 18, 0.9)",
                  border: "1px solid rgba(168, 176, 196, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="text-graphite text-[10px] uppercase tracking-wider">Leads this week</span>
                <span className="text-chalk font-[var(--font-afacad)] font-bold text-base">47</span>
              </div>

              {/* PHASE 3: Phone */}
              <div
                className="phone-frame absolute right-0 top-1/2 -translate-y-1/2 w-[180px] h-[360px] z-30"
                style={{
                  background: "rgba(8, 9, 10, 0.98)",
                  border: "1px solid rgba(168, 176, 196, 0.3)",
                  borderRadius: "24px",
                  boxShadow:
                    "0 0 40px rgba(168, 176, 196, 0.15), 0 30px 60px rgba(0, 0, 0, 0.6)",
                }}
              >
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-void rounded-b-2xl" />

                {/* Status bar */}
                <div className="absolute top-2 left-4 right-4 flex justify-between text-[8px] text-silver">
                  <span>9:41</span>
                  <span>\u25cf\u25cf\u25cf</span>
                </div>

                {/* Header */}
                <div className="pt-10 px-4 pb-3 border-b border-iron/40">
                  <div className="text-graphite text-[8px] uppercase tracking-wider">Customer</div>
                  <div className="text-chalk text-xs font-semibold">Mike Johnson</div>
                </div>

                {/* Messages */}
                <div className="p-4 space-y-3">
                  <div className="phone-bubble-incoming flex items-center gap-2 text-[9px]">
                    <div className="w-2 h-2 bg-graphite rounded-full" />
                    <span className="text-graphite">Missed call \u00b7 9:38 AM</span>
                  </div>

                  <div
                    className="phone-bubble-auto px-3 py-2 max-w-[85%]"
                    style={{
                      background: "var(--accent)",
                      color: "var(--void)",
                      borderRadius: "12px 12px 12px 2px",
                    }}
                  >
                    <p className="text-[10px] leading-snug font-medium">
                      Hey Mike! Sorry I missed you. Want me to call back at 3pm? &mdash; Joe, 606 Property
                    </p>
                    <p className="text-[7px] text-void/60 mt-1">Auto-sent in 4 min</p>
                  </div>
                </div>
              </div>

              {/* Dashboard stats (Phase 3) */}
              <div className="dashboard-stat absolute bottom-4 right-0 z-30 flex flex-col gap-1.5 px-3 py-2"
                style={{
                  background: "rgba(15, 16, 18, 0.9)",
                  border: "1px solid rgba(168, 176, 196, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-graphite text-[8px] uppercase tracking-wider">Reactivated</span>
                  <span className="text-chalk font-[var(--font-afacad)] font-bold text-sm">12</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-graphite text-[8px] uppercase tracking-wider">Avg response</span>
                  <span className="text-accent font-[var(--font-afacad)] font-bold text-sm">4 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============= MOBILE: stacked cards ============= */}
      <div className="md:hidden py-24 px-6 max-w-[600px] mx-auto">
        <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          How I work
        </p>
        <h2
          className="font-[var(--font-afacad)] text-chalk font-extrabold leading-tight tracking-[-0.01em] mb-12"
          style={{ fontSize: "clamp(1.75rem, 6vw, 2.2rem)" }}
        >
          I don&apos;t sell tactics. I sell a position.
        </h2>

        <div className="space-y-5">
          {phases.map((p) => (
            <div
              key={p.n}
              className="mobile-phase-card p-6"
              style={{
                background: "rgba(15, 16, 18, 0.5)",
                border: "1px solid rgba(34, 35, 38, 0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p className="text-accent/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                {p.label}
              </p>
              <h3 className="font-[var(--font-afacad)] text-chalk font-bold text-lg mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="text-silver text-sm leading-relaxed mb-4 font-[var(--font-afacad)]">
                {p.body}
              </p>
              <div className="flex items-start gap-2 pt-3 border-t border-iron/40">
                <div className="w-1 h-1 bg-accent mt-2 shrink-0" />
                <p className="text-bone font-medium text-xs font-[var(--font-afacad)]">
                  {p.key}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
