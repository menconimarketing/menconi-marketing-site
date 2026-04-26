"use client";

import { Fragment, useState } from "react";
import Eyebrow from "./Eyebrow";
import SiteModal from "./SiteModal";

const PHASES = [
  {
    n: "01",
    title: "Websites",
    sub: "The foundation.",
    body:
      "I build the site first. Custom code. Conversion-built. Fast on a contractor’s phone in a parking lot. Indexed by Google in week one. This is the surface every dollar after this lands on.",
    stats: [
      ["9 days", "to launch · avg"],
      ["68%", "avg lift in form completions"],
      ["100/100", "pagespeed mobile · typical"],
    ] as [string, string][],
  },
  {
    n: "02",
    title: "Paid ads",
    sub: "On top of the site.",
    body:
      "Meta + Google lead-gen. Built around your CRM and call calendar — not vanity dashboards. Ads point at the new site, which converts at a rate the old one couldn’t, so the same dollar buys more calls.",
    stats: [
      ["$28", "avg cost per booked call"],
      ["62", "calls in first 30 days"],
      ["daily", "ad-spend monitoring · me"],
    ] as [string, string][],
  },
  {
    n: "03",
    title: "AI revenue",
    sub: "On top of the ads.",
    body:
      "Intake agents, follow-up automations, quote calculators. They answer the form fill at 11pm, qualify the lead, and book the call before a competitor calls back. Same ad spend, more booked jobs.",
    stats: [
      ["71%", "answer rate · iron range hvac"],
      ["<2 min", "avg follow-up time, 24/7"],
      ["+38%", "close rate vs. manual follow-up"],
    ] as [string, string][],
  },
];

const PHASE_1_DEMOS = [
  {
    name: "Acme Drywall",
    trade: "Drywall · Chicago, IL",
    url: "https://606propertyservices.menconimarketing.com",
  },
  {
    name: "Northshore Roofing",
    trade: "Roofing · Evanston, IL",
    url: "https://parabeachplastering.menconimarketing.com",
  },
  {
    name: "Lakeside Electric",
    trade: "Electrical · Chicago, IL",
    url: "https://martinezlandscaping.menconimarketing.com",
  },
];

export default function Mechanism() {
  const [activeDemo, setActiveDemo] = useState<
    (typeof PHASE_1_DEMOS)[0] | null
  >(null);

  return (
    <section
      id="how-it-works"
      data-screen-label="04 System"
      style={{ padding: "160px 48px", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="04" label="The system" />

        <div
          className="grid"
          style={{
            marginTop: 56,
            marginBottom: 96,
            gridTemplateColumns: "1.4fr 1fr",
            gap: 96,
            alignItems: "flex-end",
          }}
        >
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

        {/* Three equal-weight phase cards in a row, connected by arrows.
            No boxes around each phase. Compounding shown via arrows, not size. */}
        <div
          className="grid mm-phase-row"
          style={{
            gridTemplateColumns: "1fr 32px 1fr 32px 1fr",
            gap: 0,
            alignItems: "stretch",
          }}
        >
          {PHASES.map((p, idx) => (
            <Fragment key={p.n}>
              {/* Phase card — equal weight, no boxed container */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  paddingTop: 4,
                }}
              >
                {/* Top row: phase number + title */}
                <div>
                  <div
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 11,
                      color: "var(--mm-fg-3)",
                      letterSpacing: "0.18em",
                      marginBottom: 16,
                    }}
                  >
                    PHASE {p.n}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(28px, 3vw, 40px)",
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                      fontWeight: 600,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: 18,
                      color: "var(--mm-fg-3-inv)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.sub}
                  </p>
                </div>

                {/* Body */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--mm-fg-2)",
                  }}
                >
                  {p.body}
                </p>

                {/* Stats — single hairline on top, three quiet rows */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: 24,
                    borderTop: "1px solid var(--mm-charcoal)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {p.stats.map(([v, l]) => (
                    <div
                      key={l}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "var(--mm-fg-3)",
                          fontWeight: 500,
                        }}
                      >
                        {l}
                      </span>
                      <span
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          color: "var(--mm-fg-1)",
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Phase 1 — bring back the client demo thumbnails */}
                {idx === 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--mm-fg-3)",
                        fontWeight: 500,
                        marginBottom: 12,
                      }}
                    >
                      Live client sites
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {PHASE_1_DEMOS.map((d) => (
                        <button
                          key={d.url}
                          onClick={() => setActiveDemo(d)}
                          style={{
                            background: "transparent",
                            border: "1px solid var(--mm-charcoal)",
                            color: "var(--mm-fg-1)",
                            padding: "12px 14px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontFamily: "inherit",
                            cursor: "pointer",
                            transition:
                              "border-color 200ms cubic-bezier(0.2,0,0,1), background 200ms cubic-bezier(0.2,0,0,1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--mm-fg-3)";
                            e.currentTarget.style.background = "var(--mm-ink)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--mm-charcoal)";
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span style={{ textAlign: "left" }}>
                            <span
                              style={{
                                display: "block",
                                fontSize: 13,
                                fontWeight: 500,
                              }}
                            >
                              {d.name}
                            </span>
                            <span
                              style={{
                                display: "block",
                                fontSize: 11,
                                color: "var(--mm-fg-3)",
                                marginTop: 2,
                              }}
                            >
                              {d.trade}
                            </span>
                          </span>
                          <span
                            style={{
                              fontSize: 16,
                              color: "var(--mm-fg-3)",
                            }}
                          >
                            →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Phase 2 + 3 placeholder for future interactive proof */}
                {idx > 0 && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: "16px 14px",
                      border: "1px dashed var(--mm-border-soft)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--mm-fg-3)",
                      textAlign: "center",
                    }}
                  >
                    Interactive proof — coming soon
                  </div>
                )}
              </div>

              {/* Connecting arrow column — only between phases */}
              {idx < PHASES.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 80,
                  }}
                >
                  <svg
                    width="32"
                    height="14"
                    viewBox="0 0 32 14"
                    fill="none"
                    style={{ color: "var(--mm-accent)" }}
                  >
                    <line
                      x1="0"
                      y1="7"
                      x2="28"
                      y2="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="2 3"
                    />
                    <path
                      d="M22 1L31 7L22 13"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <SiteModal
        open={activeDemo !== null}
        onClose={() => setActiveDemo(null)}
        url={activeDemo?.url ?? ""}
        name={activeDemo?.name ?? ""}
        trade={activeDemo?.trade ?? ""}
        location=""
      />
    </section>
  );
}
