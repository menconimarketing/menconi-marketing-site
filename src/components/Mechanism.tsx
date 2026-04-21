"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const phases = [
  {
    number: "01",
    label: "Phase 1 \u2014 Position Discovered",
    title: "First, your position. Then, the website that proves it.",
    body: "Position-discovery isn\u2019t a quiz or a brand workshop. It\u2019s research: your customers, your competitors, the gaps in your market. Then I build the website that turns that position into something visitors can see, feel, and act on within five seconds of landing.",
    proof: "You\u2019re looking at a Phase 1 site right now.",
    key: "I won\u2019t spend a dollar on your ads until your position is clear and your site converts.",
  },
  {
    number: "02",
    label: "Phase 2 \u2014 Position Distributed",
    title: "Now the right people see it.",
    body: "Once your position is locked and your site converts, I turn on Google Ads and Meta Ads &mdash; but only against the position you own. No broad blasts. No wasted budget chasing the same generic homeowner every other contractor in your zip code is chasing.",
    proof: null,
    key: "Phase 2 doesn\u2019t start until Phase 1 proves your position. No exceptions.",
  },
  {
    number: "03",
    label: "Phase 3 \u2014 Position Defended",
    title: "Then customers stay where they are.",
    body: "Missed call? Auto-text in five minutes. Quote three days old? Follow-up fires on its own. Past customer going quiet? Reactivation sequence brings them back before they forget your name. Your position becomes a system that protects itself.",
    proof: null,
    key: "No lead leaks. No customer forgets your name.",
  },
];

function PhaseCard({
  phase,
  index,
}: {
  phase: (typeof phases)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mx", `${x}%`);
    cardRef.current.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      className={`phase-card phase-card-${index} group relative p-8 md:p-10 transition-all duration-500 cursor-default`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        background: hovered
          ? "rgba(15, 16, 18, 0.8)"
          : "rgba(15, 16, 18, 0.4)",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(94, 106, 210, 0.3)"
          : "rgba(34, 35, 38, 0.6)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(94, 106, 210, 0.06), transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="font-[var(--font-syne)] text-accent text-4xl md:text-5xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-500">
            {phase.number}
          </span>
          <div>
            <span className="text-accent text-xs font-bold tracking-[0.15em] uppercase block">
              {phase.label}
            </span>
            <h3
              className="font-[var(--font-syne)] text-chalk font-bold mt-1"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
            >
              {phase.title}
            </h3>
          </div>
        </div>

        <p className="text-silver leading-relaxed mb-5 font-[var(--font-afacad)] text-base md:text-lg">
          {phase.body}
        </p>

        {phase.proof && (
          <p className="text-accent/80 text-sm mb-5 flex items-center gap-2">
            <span className="w-4 h-px bg-accent" />
            {phase.proof}
          </p>
        )}

        <div className="flex items-start gap-3 pt-4 border-t border-iron/40">
          <div className="w-1.5 h-1.5 bg-accent mt-2 shrink-0" />
          <p className="text-bone font-medium font-[var(--font-afacad)]">
            {phase.key}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Mechanism() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".mechanism-label", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      gsap.from(".mechanism-headline", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".mechanism-intro", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".mechanism-intro",
          start: "top 85%",
        },
      });

      phases.forEach((_, i) => {
        gsap.from(`.phase-card-${i}`, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.phase-card-${i}`,
            start: "top 85%",
          },
        });
      });

      gsap.from(".progress-fill", {
        scaleY: 0,
        duration: 2,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      id="how-it-works"
      ref={container}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--iron), transparent)",
        }}
      />

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Accent glow - left side */}
      <div
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="mb-20">
          <p className="mechanism-label text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
            How I work
          </p>
          <h2
            className="mechanism-headline font-[var(--font-syne)] text-chalk font-extrabold leading-tight tracking-[-0.01em]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            I don&apos;t sell tactics. I sell a position.
            <br className="hidden md:block" /> Then I prove it works one phase at a time.
          </h2>
          <p className="mechanism-intro mt-6 text-silver text-lg max-w-[640px] leading-relaxed font-[var(--font-afacad)]">
            Most marketing companies sell you everything at once and hope something sticks. That&apos;s a gamble, not a strategy. This is three phases. In order. Each one earns the next &mdash; and each one defends the position you own.
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-iron/30">
            <div
              className="progress-fill absolute inset-0 w-full"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), var(--accent-dim), transparent)",
              }}
            />
          </div>

          <div className="space-y-6 md:pl-12">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.number} phase={phase} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
