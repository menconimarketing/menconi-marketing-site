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
  ["1", "person · no agency layer"],
];

export default function Hero() {
  const [stage, setStage] = useState(0);
  const [mins, setMins] = useState(7);

  useEffect(() => {
    const ts = [
      setTimeout(() => setStage(1), 80),
      setTimeout(() => setStage(2), 280),
      setTimeout(() => setStage(3), 520),
      setTimeout(() => setStage(4), 800),
      setTimeout(() => setStage(5), 1100),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setMins((m) => m + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const reveal = (n: number): React.CSSProperties => ({
    opacity: stage >= n ? 1 : 0,
    transform: stage >= n ? "translateY(0)" : "translateY(14px)",
    transition:
      "opacity 280ms cubic-bezier(0.2,0,0,1), transform 280ms cubic-bezier(0.2,0,0,1)",
  });

  return (
    <section
      id="top"
      data-screen-label="01 Hero"
      style={{
        padding: "120px 48px 64px",
        position: "relative",
        background:
          "radial-gradient(ellipse at 85% 15%, rgba(168,176,196,0.09) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(232,212,154,0.04) 0%, transparent 50%)",
        overflow: "hidden",
        height: "100vh",
        minHeight: 720,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Wave canvas — sits behind everything */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        {SPLINE_SCENE_URL && SplineScene ? (
          <SplineScene sceneUrl={SPLINE_SCENE_URL} />
        ) : (
          <HeroCanvas />
        )}
      </div>

      {/* Faint film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.025,
          zIndex: 2,
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>")',
        }}
      />

      {/* Top eyebrow row */}
      <div
        style={{ position: "relative", zIndex: 10, marginBottom: 48 }}
      >
        <div style={reveal(1)}>
          <Eyebrow number="00" label="Chicago, IL — by appointment" />
        </div>
      </div>

      {/* Main split: Left = headline+sub+CTAs, Right = booking pill + stats column */}
      <div
        className="grid"
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          gridTemplateColumns: "1fr 280px",
          gap: 64,
          alignItems: "stretch",
        }}
      >
        {/* LEFT — headline column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <h1
            style={{
              ...reveal(2),
              margin: 0,
              fontSize: "clamp(40px, 6.5vw, 96px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              fontWeight: 600,
              maxWidth: 1100,
            }}
          >
            I build websites,
            <br />
            ad systems, and AI
            <br />
            tools{" "}
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
              that book service jobs.
            </span>
          </h1>

          <p
            style={{
              ...reveal(3),
              margin: "32px 0 0",
              fontSize: 19,
              lineHeight: 1.45,
              color: "var(--mm-fg-2)",
              maxWidth: 580,
            }}
          >
            One-person studio in Chicago. I build the site, run the ads, and write the AI follow-up — for contractors, trades, and home-service operators doing $300K–$2M a year. No account managers. You get me.
          </p>

          <div
            style={{
              ...reveal(3),
              marginTop: 32,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <a
              href="#contact"
              className="mm-btn-primary"
              style={{ fontSize: 13, padding: "16px 24px" }}
            >
              Book a 30-min call <span aria-hidden>→</span>
            </a>
            <a href="#audit" className="mm-btn-ghost" style={{ fontSize: 13 }}>
              <span
                className="mm-btn-ghost-inner"
                style={{ padding: "15px 23px" }}
              >
                Audit my positioning
              </span>
            </a>
          </div>
        </div>

        {/* RIGHT — booking pill + stats column */}
        <aside
          className="mm-hero-rail"
          style={{
            ...reveal(4),
            display: "flex",
            flexDirection: "column",
            gap: 24,
            paddingLeft: 32,
            borderLeft: "1px solid var(--mm-charcoal)",
          }}
        >
          {/* Booking pill at the top of the column */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mm-fg-3)",
              fontWeight: 500,
              paddingBottom: 24,
              borderBottom: "1px solid var(--mm-charcoal)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                background: "var(--mm-positive)",
                boxShadow: "0 0 0 4px rgba(111,207,151,0.15)",
              }}
            />
            <span>Booking — May 2026</span>
          </div>

          {/* Stats stacked vertically */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            {STATS.map(([v, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontSize: "clamp(36px, 3.6vw, 56px)",
                    fontWeight: 600,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    letterSpacing: "0.16em",
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
        </aside>
      </div>

      {/* Bottom status row — thin, doesn't compete with wave */}
      <div
        style={{
          ...reveal(5),
          position: "relative",
          zIndex: 10,
          marginTop: 32,
          paddingTop: 16,
          borderTop: "1px solid var(--mm-charcoal)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--mm-fg-3)",
          fontWeight: 500,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>Last call booked — {mins} min ago</span>
        <span style={{ fontFamily: "ui-monospace, monospace" }}>
          v1.0 · CHI · 41.88°N
        </span>
      </div>
    </section>
  );
}
