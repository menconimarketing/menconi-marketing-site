"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fmt = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : n >= 1000
    ? `$${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`
    : `$${Math.round(n).toLocaleString()}`;

export default function Calculator() {
  const container = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const [jobValue, setJobValue] = useState(5000);
  const [monthlyLeads, setMonthlyLeads] = useState(15);

  // 25% close rate as industry baseline.
  // 30% lead increase from owned positioning (top-player teardown observation).
  const CLOSE_RATE = 0.25;
  const POSITION_LIFT = 0.3;

  const currentRevenue = jobValue * monthlyLeads * CLOSE_RATE;
  const newLeads = monthlyLeads * (1 + POSITION_LIFT);
  const newRevenue = jobValue * newLeads * CLOSE_RATE;
  const monthlyDelta = newRevenue - currentRevenue;
  const yearlyDelta = monthlyDelta * 12;

  // Animate the big number on slider change
  const animatedRef = useRef(monthlyDelta);
  useEffect(() => {
    if (!numberRef.current) return;
    const start = animatedRef.current;
    const end = monthlyDelta;
    const obj = { v: start };
    gsap.to(obj, {
      v: end,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = fmt(obj.v);
        }
      },
      onComplete: () => {
        animatedRef.current = end;
      },
    });
  }, [monthlyDelta]);

  useGSAP(
    () => {
      gsap.from(".calc-label", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });
      gsap.from(".calc-headline", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: container.current, start: "top 75%" },
      });
      gsap.from(".calc-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".calc-card", start: "top 85%" },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, var(--iron), transparent)",
        }}
      />
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="text-center mb-12 max-w-[760px] mx-auto">
          <p className="calc-label text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            What it&apos;s worth
          </p>
          <h2
            className="calc-headline font-[var(--font-syne)] text-chalk font-extrabold leading-tight tracking-[-0.01em] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Owning a position isn&apos;t a brand exercise.
            <br />
            <span className="text-gradient">It&apos;s revenue you&apos;re not collecting.</span>
          </h2>
          <p className="text-silver text-lg leading-relaxed font-[var(--font-afacad)]">
            Move the sliders. The number on the right is what your business is leaving on the table because no one knows what makes you different.
          </p>
        </div>

        <div
          className="calc-card grid md:grid-cols-2 gap-8 p-8 md:p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(15, 16, 18, 0.95), rgba(22, 23, 25, 0.85))",
            border: "1px solid rgba(94, 106, 210, 0.25)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 0 60px rgba(94, 106, 210, 0.1), inset 0 0 40px rgba(94, 106, 210, 0.03)",
          }}
        >
          {/* Left: sliders */}
          <div className="space-y-10">
            {/* Job value slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-graphite text-[10px] uppercase tracking-[0.15em] font-bold">
                  Average job value
                </label>
                <span className="text-chalk font-[var(--font-syne)] font-bold text-xl">
                  {fmt(jobValue)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={jobValue}
                onChange={(e) => setJobValue(Number(e.target.value))}
                data-cursor="link"
                className="calc-slider"
                style={{
                  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${
                    ((jobValue - 500) / (50000 - 500)) * 100
                  }%, var(--iron) ${
                    ((jobValue - 500) / (50000 - 500)) * 100
                  }%, var(--iron) 100%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-graphite mt-2">
                <span>$500</span>
                <span>$50K</span>
              </div>
            </div>

            {/* Monthly leads slider */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-graphite text-[10px] uppercase tracking-[0.15em] font-bold">
                  Current monthly leads
                </label>
                <span className="text-chalk font-[var(--font-syne)] font-bold text-xl">
                  {monthlyLeads}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="1"
                value={monthlyLeads}
                onChange={(e) => setMonthlyLeads(Number(e.target.value))}
                data-cursor="link"
                className="calc-slider"
                style={{
                  background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${
                    ((monthlyLeads - 5) / 95) * 100
                  }%, var(--iron) ${
                    ((monthlyLeads - 5) / 95) * 100
                  }%, var(--iron) 100%)`,
                }}
              />
              <div className="flex justify-between text-[10px] text-graphite mt-2">
                <span>5</span>
                <span>100</span>
              </div>
            </div>

            <div className="text-graphite text-xs leading-relaxed pt-4 border-t border-iron/40">
              <p>
                Math: avg job value &times; monthly leads &times; 25% close rate &times; 30% lead lift from owned positioning. The lift is the average top-position gain seen across the contractor sites I\u2019ve built.
              </p>
            </div>
          </div>

          {/* Right: result */}
          <div className="relative flex flex-col justify-center">
            <p className="text-accent text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
              Money on the table
            </p>
            <div
              ref={numberRef}
              className="font-[var(--font-syne)] text-chalk font-extrabold leading-none mb-2"
              style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
            >
              {fmt(monthlyDelta)}
            </div>
            <p className="text-silver text-base mb-8">
              more revenue per month
              <span className="block text-accent text-sm mt-1">
                &mdash; {fmt(yearlyDelta)} per year at this rate
              </span>
            </p>

            <div className="space-y-3 pt-6 border-t border-iron/40 text-sm font-[var(--font-afacad)]">
              <div className="flex justify-between text-silver">
                <span>You today</span>
                <span className="text-bone font-semibold">{fmt(currentRevenue)}/mo</span>
              </div>
              <div className="flex justify-between text-silver">
                <span>You with positioning</span>
                <span className="text-accent font-semibold">{fmt(newRevenue)}/mo</span>
              </div>
            </div>

            <div className="mt-8">
              <MagneticButton
                href="#audit"
                data-cursor="cta"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-bright text-sm font-semibold transition-colors duration-300"
              >
                Run my positioning audit
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6h7M6 3l3 3-3 3" />
                </svg>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Slider styles */}
      <style jsx global>{`
        .calc-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          outline: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          background: var(--chalk);
          border: 2px solid var(--accent);
          cursor: pointer;
          transition: transform 0.2s;
          box-shadow: 0 0 12px rgba(94, 106, 210, 0.5);
        }
        .calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .calc-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          background: var(--chalk);
          border: 2px solid var(--accent);
          cursor: pointer;
          box-shadow: 0 0 12px rgba(94, 106, 210, 0.5);
        }
      `}</style>
    </section>
  );
}
