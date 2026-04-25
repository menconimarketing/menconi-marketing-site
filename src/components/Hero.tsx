"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Eyebrow from "./Eyebrow";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute bottom-[12%] left-0 right-0 h-[160px] pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(168, 176, 196, 0.18) 35%, rgba(232, 212, 154, 0.16) 65%, transparent)",
        filter: "blur(50px)",
        opacity: 0.6,
      }}
    />
  ),
});

const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "";
const SplineScene = SPLINE_SCENE_URL
  ? dynamic(() => import("./SplineScene"), { ssr: false })
  : null;

const STATS: [string, string][] = [
  ["62", "booked calls · 30 days"],
  ["9", "days to launch · avg"],
  ["$5K", "starting · monthly"],
  ["1", "person · no account managers"],
];

export default function Hero() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 350);
    const t3 = setTimeout(() => setStage(3), 600);
    const t4 = setTimeout(() => setStage(4), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const reveal = (n: number): React.CSSProperties => ({
    opacity: stage >= n ? 1 : 0,
    transform: stage >= n ? "translateY(0)" : "translateY(16px)",
    transition:
      "opacity 250ms cubic-bezier(0.2,0,0,1), transform 250ms cubic-bezier(0.2,0,0,1)",
  });

  return (
    <section
      id="top"
      className="relative mm-atmosphere"
      style={{
        padding: "192px 48px 192px",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* 3D layer (smoke→amber recolored wave or Spline) — sits behind content */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden
      >
        {SPLINE_SCENE_URL && SplineScene ? (
          <SplineScene sceneUrl={SPLINE_SCENE_URL} />
        ) : (
          <HeroCanvas />
        )}
      </div>

      <div
        className="relative max-w-[1400px] mx-auto"
        style={{ zIndex: 10 }}
      >
        <div style={{ ...reveal(1), marginBottom: 48 }}>
          <Eyebrow number="00" label="Chicago, IL — by appointment" />
        </div>

        <h1
          style={{
            ...reveal(2),
            margin: 0,
            fontSize: "clamp(64px, 10vw, 152px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            fontWeight: 600,
            maxWidth: 1400,
          }}
        >
          Websites, ad systems,
          <br />
          and AI revenue tools
          <br />
          <span
            style={{
              color: "var(--mm-fg-3-inv)",
              display: "inline-block",
              paddingBottom: 6,
              backgroundImage: "var(--mm-gradient)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0 100%",
              backgroundSize: "100% 2px",
            }}
          >
            for service businesses.
          </span>
        </h1>

        <div
          style={{
            ...reveal(3),
            marginTop: 64,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 64,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 20,
              lineHeight: 1.45,
              color: "var(--mm-fg-2)",
              maxWidth: 520,
            }}
          >
            One-person studio. Direct work, no agency layer. Three deliverables, fixed scope, three-month minimum.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexShrink: 0,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              className="mm-btn-primary"
              style={{ fontSize: 14, padding: "16px 24px" }}
            >
              Book a call <span aria-hidden>→</span>
            </a>
            <a href="#results" className="mm-btn-ghost" style={{ fontSize: 14 }}>
              <span
                className="mm-btn-ghost-inner"
                style={{ padding: "15px 23px" }}
              >
                View work
              </span>
            </a>
          </div>
        </div>

        <div
          style={{
            ...reveal(4),
            marginTop: 96,
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
            borderTop: "1px solid var(--mm-charcoal)",
            paddingTop: 32,
          }}
          className="md:!grid-cols-4"
        >
          {STATS.map(([v, l]) => (
            <div key={l}>
              <div
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {v}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
