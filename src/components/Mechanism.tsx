"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

const PHASES = [
  {
    n: "01",
    letter: "A",
    title: "Websites",
    sub: "The foundation.",
    body:
      "I build the site first. Custom code. Conversion-built. Fast on a contractor’s phone in a parking lot. Indexed by Google in week one. This is the surface every dollar after this lands on.",
    stats: [
      ["9 days", "to launch · avg"],
      ["68%", "avg lift in form completions"],
      ["100/100", "pagespeed mobile · typical"],
    ] as [string, string][],
    depends: "Required first.",
  },
  {
    n: "02",
    letter: "B",
    title: "Paid ads",
    sub: "On top of the site.",
    body:
      "Meta + Google lead-gen. Built around your CRM and call calendar — not vanity dashboards. Ads point at the new site, which converts at a rate the old one couldn’t, so the same dollar buys more calls.",
    stats: [
      ["$28", "avg cost per booked call"],
      ["62", "calls in first 30 days · acme drywall"],
      ["daily", "ad-spend monitoring · me"],
    ] as [string, string][],
    depends: "Compounds on phase 01.",
  },
  {
    n: "03",
    letter: "C",
    title: "AI revenue",
    sub: "On top of the ads.",
    body:
      "Intake agents, follow-up automations, quote calculators. They answer the form fill at 11pm, qualify the lead, and book the call before a competitor calls back. Same ad spend, more booked jobs.",
    stats: [
      ["71%", "answer rate · iron range hvac"],
      ["<2 min", "avg follow-up time, 24/7"],
      ["+38%", "close rate vs. manual follow-up"],
    ] as [string, string][],
    depends: "Compounds on phase 02.",
  },
];

const HEIGHTS = [40, 70, 100];

export default function Mechanism() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      data-screen-label="04 System"
      style={{ padding: "160px 48px", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 96,
            gap: 64,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Eyebrow number="04" label="The system" />
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px, 5vw, 76px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                fontWeight: 600,
                maxWidth: 1100,
              }}
            >
              Three phases.
              <br />
              <span style={{ color: "var(--mm-fg-3-inv)" }}>
                Each one feeds the next.
              </span>
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 380,
              flexShrink: 0,
            }}
          >
            Every client starts at phase 01. You can stop there. Most don&apos;t — because by the time the site is paying for itself, phase 02 is just math.
          </p>
        </div>

        {/* Compounding bar visualization */}
        <div
          className="grid"
          style={{
            marginBottom: 64,
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
            border: "1px solid var(--mm-charcoal)",
          }}
        >
          {PHASES.map((p, i) => (
            <div
              key={p.n}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                padding: 32,
                borderRight:
                  i < 2 ? "1px solid var(--mm-charcoal)" : "none",
                background: active === i ? "var(--mm-ink)" : "transparent",
                cursor: "pointer",
                transition: "background 200ms cubic-bezier(0.2,0,0,1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  height: 120,
                }}
              >
                <div
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    color: "var(--mm-fg-3)",
                    letterSpacing: "0.16em",
                  }}
                >
                  {p.n}
                </div>
                <div
                  style={{
                    width: 80,
                    height: HEIGHTS[i] + "%",
                    background:
                      i === 2
                        ? "linear-gradient(180deg, #A8B0C4 0%, #E8D49A 100%)"
                        : i === 1
                        ? "var(--mm-accent)"
                        : "var(--mm-fg-4)",
                    transition: "height 400ms cubic-bezier(0.2,0,0,1)",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  marginBottom: 6,
                }}
              >
                {p.depends}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>
                {p.title}
              </div>
            </div>
          ))}
        </div>

        {/* Active phase detail */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.2fr",
            gap: 96,
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 12,
                color: "var(--mm-fg-3)",
                letterSpacing: "0.16em",
                marginBottom: 20,
              }}
            >
              PHASE {PHASES[active].n} / {PHASES[active].letter}
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(36px, 4.8vw, 68px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                fontWeight: 600,
              }}
            >
              {PHASES[active].title}.
            </h3>
            <div
              style={{
                marginTop: 24,
                fontSize: 28,
                color: "var(--mm-fg-3-inv)",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              {PHASES[active].sub}
            </div>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 19,
                lineHeight: 1.55,
                color: "var(--mm-fg-1)",
                maxWidth: 580,
              }}
            >
              {PHASES[active].body}
            </p>
            <div
              style={{
                marginTop: 56,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                borderTop: "1px solid var(--mm-charcoal)",
                paddingTop: 24,
                gap: 16,
              }}
            >
              {PHASES[active].stats.map(([v, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
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
        </div>

        {/* Phase tabs at bottom */}
        <div
          style={{
            marginTop: 64,
            display: "flex",
            gap: 0,
            borderTop: "1px solid var(--mm-charcoal)",
          }}
        >
          {PHASES.map((p, i) => (
            <button
              key={p.n}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                borderTop:
                  active === i ? "1px solid #E8D49A" : "1px solid transparent",
                marginTop: -1,
                padding: "24px 0",
                textAlign: "left",
                cursor: "pointer",
                color: active === i ? "var(--mm-fg-1)" : "var(--mm-fg-3)",
                fontFamily: "inherit",
                transition:
                  "color 200ms cubic-bezier(0.2,0,0,1), border-color 200ms cubic-bezier(0.2,0,0,1)",
              }}
            >
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                }}
              >
                {p.n}
              </span>
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  marginLeft: 16,
                  textTransform: "uppercase",
                }}
              >
                {p.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
