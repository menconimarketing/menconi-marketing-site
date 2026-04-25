"use client";

import { useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TRADES, getTrade, pickWedge, Trade } from "@/data/auditTemplates";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Stage = "idle" | "scanning" | "results";
type Snapshot = {
  businessName: string;
  trade: Trade;
  city: string;
  wedge: string;
};

const SCANNING_STEPS = [
  "Pulling your competitor list\u2026",
  "Mapping where they\u2019re positioned\u2026",
  "Finding the unowned space in your market\u2026",
];

export default function PositioningAudit() {
  const container = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [scanStep, setScanStep] = useState(0);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);

  // form state
  const [businessName, setBusinessName] = useState("");
  const [tradeId, setTradeId] = useState("");
  const [city, setCity] = useState("");

  useGSAP(
    () => {
      gsap.from(".audit-header", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".audit-form-row", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".audit-form",
          start: "top 80%",
        },
      });
    },
    { scope: container }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !tradeId || !city.trim()) return;

    const trade = getTrade(tradeId);
    const wedge = pickWedge(trade, businessName, city);
    setSnapshot({
      businessName: businessName.trim(),
      trade,
      city: city.trim(),
      wedge,
    });

    setStage("scanning");
    setScanStep(0);

    // Step through the scanning messages
    const stepInterval = 700;
    let step = 0;
    const tick = () => {
      step++;
      if (step < SCANNING_STEPS.length) {
        setScanStep(step);
        setTimeout(tick, stepInterval);
      } else {
        setTimeout(() => {
          setStage("results");
          // Animate results in after they mount
          requestAnimationFrame(() => {
            if (!resultsRef.current) return;
            gsap.from(".result-card", {
              y: 60,
              opacity: 0,
              duration: 0.9,
              stagger: 0.18,
              ease: "power3.out",
            });
            gsap.from(".result-card-3 .wedge-pulse", {
              scale: 0,
              opacity: 0,
              duration: 0.6,
              delay: 0.8,
              ease: "back.out(2)",
            });
          });
        }, stepInterval);
      }
    };
    setTimeout(tick, stepInterval);
  };

  const reset = () => {
    setStage("idle");
    setSnapshot(null);
    setBusinessName("");
    setTradeId("");
    setCity("");
  };

  return (
    <section
      id="audit"
      ref={container}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent-dim), transparent)",
        }}
      />

      {/* Background accent */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="audit-header text-center mb-12 max-w-[760px] mx-auto">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            See it before you buy it
          </p>
          <h2
            className="font-[var(--font-afacad)] text-chalk font-extrabold leading-tight tracking-[-0.01em] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Audit your positioning. <span className="text-gradient">Right now.</span>
          </h2>
          <p className="text-silver text-lg leading-relaxed font-[var(--font-afacad)]">
            Type your business below. I&apos;ll show you where you&apos;re positioned today,
            who you&apos;re competing with, and the unowned space you could own.
            No email. No call. Just the audit.
          </p>
        </div>

        {/* ====== FORM STAGE ====== */}
        {stage === "idle" && (
          <form
            onSubmit={handleSubmit}
            className="audit-form max-w-[760px] mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="audit-form-row">
                <label className="block text-graphite text-[10px] uppercase tracking-[0.15em] mb-2">
                  Business name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Joe&rsquo;s Roofing"
                  className="w-full bg-deep border border-iron focus:border-accent text-chalk px-4 py-3 outline-none transition-colors duration-300 text-base font-[var(--font-afacad)]"
                  required
                />
              </div>
              <div className="audit-form-row">
                <label className="block text-graphite text-[10px] uppercase tracking-[0.15em] mb-2">
                  Trade
                </label>
                <select
                  value={tradeId}
                  onChange={(e) => setTradeId(e.target.value)}
                  className="w-full bg-deep border border-iron focus:border-accent text-chalk px-4 py-3 outline-none transition-colors duration-300 text-base font-[var(--font-afacad)] appearance-none cursor-pointer"
                  required
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%235A5B5F' stroke-width='1.5'><path d='M3 5l3 3 3-3'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                  }}
                >
                  <option value="" disabled>Pick one</option>
                  {TRADES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="audit-form-row">
                <label className="block text-graphite text-[10px] uppercase tracking-[0.15em] mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Chicago"
                  className="w-full bg-deep border border-iron focus:border-accent text-chalk px-4 py-3 outline-none transition-colors duration-300 text-base font-[var(--font-afacad)]"
                  required
                />
              </div>
            </div>

            <div className="audit-form-row text-center">
              <MagneticButton
                type="submit"
                data-cursor="cta"
                className="group relative inline-flex items-center gap-3 bg-accent text-void px-10 py-4 text-base font-bold transition-all duration-300"
                style={{
                  boxShadow:
                    "0 0 40px rgba(168, 176, 196, 0.2), 0 0 80px rgba(168, 176, 196, 0.1)",
                }}
              >
                Run my positioning audit
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M2 7h9M8 4l3 3-3 3" />
                </svg>
              </MagneticButton>
              <p className="mt-4 text-graphite text-xs">
                Free. Instant. No email required.
              </p>
            </div>
          </form>
        )}

        {/* ====== SCANNING STAGE ====== */}
        {stage === "scanning" && snapshot && (
          <div className="max-w-[600px] mx-auto py-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-[11px] uppercase tracking-[0.2em] font-bold">
                Scanning {snapshot.businessName} \u00b7 {snapshot.city}
              </span>
            </div>
            <div className="space-y-4">
              {SCANNING_STEPS.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    i <= scanStep ? "opacity-100" : "opacity-20"
                  }`}
                >
                  <div className="w-5 h-5 border border-accent flex items-center justify-center shrink-0">
                    {i < scanStep && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <path d="M2 5l2 2 4-4" />
                      </svg>
                    )}
                    {i === scanStep && (
                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-bone text-base font-[var(--font-afacad)] text-left">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====== RESULTS STAGE ====== */}
        {stage === "results" && snapshot && (
          <div ref={resultsRef} className="max-w-[1200px] mx-auto">
            {/* Snapshot header */}
            <div className="result-card text-center mb-10">
              <p className="text-accent text-[11px] uppercase tracking-[0.2em] font-bold mb-3">
                Positioning snapshot
              </p>
              <p className="text-chalk text-2xl md:text-3xl font-[var(--font-afacad)] font-bold tracking-tight">
                {snapshot.businessName}
              </p>
              <p className="text-silver text-sm mt-1">
                {snapshot.trade.label} \u00b7 {snapshot.city}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {/* Card 1: Where you are now */}
              <div
                className="result-card result-card-1 p-7"
                style={{
                  background: "rgba(15, 16, 18, 0.6)",
                  border: "1px solid rgba(90, 91, 95, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-graphite text-[10px] uppercase tracking-[0.2em] font-bold">
                    01 \u00b7 Where you are now
                  </span>
                </div>
                <p className="text-bone leading-relaxed text-sm font-[var(--font-afacad)] mb-5">
                  {snapshot.trade.currentPosition.replace(
                    /your business/i,
                    snapshot.businessName
                  )}
                </p>
                <div className="pt-4 border-t border-iron/40 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-graphite" />
                  <span className="text-graphite text-xs font-medium">
                    Verdict: Commodity
                  </span>
                </div>
              </div>

              {/* Card 2: Where competitors are */}
              <div
                className="result-card result-card-2 p-7"
                style={{
                  background: "rgba(15, 16, 18, 0.6)",
                  border: "1px solid rgba(90, 91, 95, 0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-silver text-[10px] uppercase tracking-[0.2em] font-bold">
                    02 \u00b7 Where competitors are
                  </span>
                </div>
                <div className="space-y-4">
                  {snapshot.trade.competitorArchetypes.map((c, i) => (
                    <div key={i}>
                      <p className="text-chalk text-xs font-bold font-[var(--font-afacad)] mb-1">
                        {c.name}
                      </p>
                      <p className="text-silver text-xs leading-snug font-[var(--font-afacad)]">
                        {c.position}
                      </p>
                      <p className="text-graphite text-[10px] italic mt-1">
                        Weakness: {c.weakness}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: The unowned position */}
              <div
                className="result-card result-card-3 relative p-7 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(168, 176, 196, 0.12), rgba(15, 16, 18, 0.8))",
                  border: "1px solid rgba(168, 176, 196, 0.5)",
                  backdropFilter: "blur(8px)",
                  boxShadow:
                    "0 0 60px rgba(168, 176, 196, 0.15), inset 0 0 40px rgba(168, 176, 196, 0.04)",
                }}
              >
                {/* Pulsing glow corner */}
                <div className="wedge-pulse absolute -top-12 -right-12 w-32 h-32 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 176, 196, 0.3) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 bg-accent animate-pulse" />
                    <span className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold">
                      03 \u00b7 The unowned position
                    </span>
                  </div>
                  <p className="text-chalk text-base leading-snug font-[var(--font-afacad)] font-bold mb-4">
                    &ldquo;{snapshot.wedge}&rdquo;
                  </p>
                  <p className="text-silver text-xs leading-relaxed font-[var(--font-afacad)] mb-5">
                    None of your competitors own this. Whoever claims it first wins the customers who care about it most &mdash; and they&apos;re the customers who pay full price.
                  </p>
                  <div className="pt-4 border-t border-accent/20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    <span className="text-accent text-xs font-bold">
                      Verdict: Yours, if you claim it
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA after results */}
            <div className="result-card text-center mt-12">
              <p className="text-bone text-base mb-6 max-w-[600px] mx-auto font-[var(--font-afacad)]">
                This is the surface of what I do on a real audit. Want to see what your actual competitor list looks like &mdash; and the full positioning play I&apos;d build for {snapshot.businessName}?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  href="#contact"
                  data-cursor="cta"
                  className="inline-flex items-center gap-3 bg-accent text-void px-8 py-3.5 text-base font-bold transition-all duration-300"
                  style={{
                    boxShadow: "0 0 40px rgba(168, 176, 196, 0.25)",
                  }}
                >
                  Get the full audit on a call
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 7h9M8 4l3 3-3 3" />
                  </svg>
                </MagneticButton>
                <button
                  onClick={reset}
                  data-cursor="link"
                  className="text-silver hover:text-chalk text-sm transition-colors duration-300 underline-offset-4 hover:underline"
                >
                  Try another business
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
