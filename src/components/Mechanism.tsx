"use client";

import { useState } from "react";
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
      ["68%", "form completion lift"],
      ["100/100", "pagespeed mobile"],
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
      ["62", "calls in 30 days"],
      ["daily", "monitored by me"],
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
      ["<2 min", "follow-up · 24/7"],
      ["+38%", "close rate vs manual"],
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

// Phase 2 — fake-realistic ads dashboard mock
function AdsDashboard() {
  const days = [3, 5, 4, 6, 8, 5, 7, 9, 6, 8, 11, 7, 9, 10];
  const max = Math.max(...days);
  return (
    <div
      style={{
        background: "var(--mm-ink)",
        border: "1px solid var(--mm-charcoal)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--mm-charcoal)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mm-fg-3)",
            fontWeight: 500,
          }}
        >
          Acme Drywall · Meta + Google · Last 30 days
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mm-positive)",
            fontWeight: 500,
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
          Live
        </div>
      </div>

      {/* Big metrics row */}
      <div
        style={{
          padding: "32px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          borderBottom: "1px solid var(--mm-charcoal)",
        }}
      >
        {[
          ["$1,720", "spent"],
          ["62", "booked calls"],
          ["$28", "per call"],
        ].map(([v, l]) => (
          <div key={l}>
            <div
              style={{
                fontSize: "clamp(28px, 3vw, 40px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
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

      {/* Mini bar chart */}
      <div style={{ padding: "20px 20px 16px" }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mm-fg-3)",
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          Booked calls / day
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            height: 80,
          }}
        >
          {days.map((d, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${(d / max) * 100}%`,
                background: i === days.length - 1 ? "var(--mm-accent)" : "var(--mm-fg-4)",
                transition: "background 200ms",
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer status */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--mm-charcoal)",
          fontSize: 11,
          color: "var(--mm-fg-3)",
          letterSpacing: "0.04em",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>Last optimized 2h ago · N.M.</span>
        <span style={{ fontFamily: "ui-monospace, monospace" }}>
          v2.4 · ROAS 4.2x
        </span>
      </div>
    </div>
  );
}

// Phase 3 — mock SMS conversation
function AISmsThread() {
  return (
    <div
      style={{
        background: "var(--mm-ink)",
        border: "1px solid var(--mm-charcoal)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--mm-charcoal)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--mm-fg-1)",
            }}
          >
            Mike Johnson
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--mm-fg-3)",
              letterSpacing: "0.1em",
              marginTop: 2,
            }}
          >
            Inbound lead · 9:38 AM
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mm-positive)",
            fontWeight: 500,
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
          Booked
        </div>
      </div>

      {/* Conversation */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* System: missed call */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            color: "var(--mm-fg-3)",
            letterSpacing: "0.1em",
            justifyContent: "center",
            padding: "4px 0",
          }}
        >
          <span style={{ width: 4, height: 4, background: "var(--mm-fg-3)" }} />
          MISSED CALL · 9:38 AM
          <span style={{ width: 4, height: 4, background: "var(--mm-fg-3)" }} />
        </div>

        {/* Auto-text out */}
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: "85%",
            padding: "12px 16px",
            background: "var(--mm-accent)",
            color: "var(--mm-black)",
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          Hey Mike — sorry I missed you. Need help with drywall today? I can send a quote in 2 min or call you at 3pm. Whichever works.
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              opacity: 0.6,
              letterSpacing: "0.06em",
            }}
          >
            Auto-sent · 9:42 AM · 4 min
          </div>
        </div>

        {/* Customer reply */}
        <div
          style={{
            alignSelf: "flex-start",
            maxWidth: "85%",
            padding: "12px 16px",
            background: "var(--mm-graphite)",
            color: "var(--mm-fg-1)",
            border: "1px solid var(--mm-charcoal)",
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          3pm works. Got water damage in the basement, need quote.
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              color: "var(--mm-fg-3)",
              letterSpacing: "0.06em",
            }}
          >
            9:44 AM
          </div>
        </div>

        {/* Auto: booked */}
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: "85%",
            padding: "12px 16px",
            background: "var(--mm-accent)",
            color: "var(--mm-black)",
            fontSize: 14,
            lineHeight: 1.4,
          }}
        >
          Booked for 3pm. Calendar invite sent to your phone. Talk soon.
          <div
            style={{
              marginTop: 6,
              fontSize: 10,
              opacity: 0.6,
              letterSpacing: "0.06em",
            }}
          >
            Auto-sent · 9:44 AM
          </div>
        </div>
      </div>

      {/* Footer stat */}
      <div
        style={{
          padding: "12px 20px",
          borderTop: "1px solid var(--mm-charcoal)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: "var(--mm-fg-3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Answer rate
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--mm-fg-3)" }}>38%</span>
          <span style={{ color: "var(--mm-accent)" }}>→</span>
          <span style={{ color: "var(--mm-fg-1)", fontWeight: 600 }}>71%</span>
        </div>
      </div>
    </div>
  );
}

// Phase 1 — client demos list
function Phase1Demos({
  onOpen,
}: {
  onOpen: (d: (typeof PHASE_1_DEMOS)[0]) => void;
}) {
  return (
    <div
      style={{
        background: "var(--mm-ink)",
        border: "1px solid var(--mm-charcoal)",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--mm-charcoal)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--mm-fg-3)",
          fontWeight: 500,
        }}
      >
        Live client sites · click any to preview
      </div>
      <div>
        {PHASE_1_DEMOS.map((d, i) => (
          <button
            key={d.url}
            onClick={() => onOpen(d)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              borderBottom:
                i < PHASE_1_DEMOS.length - 1
                  ? "1px solid var(--mm-charcoal)"
                  : "none",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "inherit",
              cursor: "pointer",
              color: "var(--mm-fg-1)",
              transition: "background 200ms cubic-bezier(0.2,0,0,1)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--mm-graphite)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <span style={{ textAlign: "left" }}>
              <span
                style={{
                  display: "block",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {d.name}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "var(--mm-fg-3)",
                  marginTop: 4,
                  letterSpacing: "0.04em",
                }}
              >
                {d.trade}
              </span>
            </span>
            <span style={{ fontSize: 18, color: "var(--mm-fg-3)" }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Mechanism() {
  const [active, setActive] = useState(0);
  const [activeDemo, setActiveDemo] = useState<
    (typeof PHASE_1_DEMOS)[0] | null
  >(null);

  const phase = PHASES[active];

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
            marginBottom: 80,
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
            Click any phase to see what it actually looks like. Most clients start at 01 and stop when the math stops making sense to push further.
          </p>
        </div>

        {/* Tab strip — three phases connected by arrows showing the flow */}
        <div
          className="mm-phase-tabs"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 24px 1fr 24px 1fr",
            alignItems: "stretch",
            borderTop: "1px solid var(--mm-charcoal)",
            borderBottom: "1px solid var(--mm-charcoal)",
            marginBottom: 64,
          }}
        >
          {PHASES.map((p, idx) => {
            const isActive = active === idx;
            return (
              <div key={p.n} style={{ display: "contents" }}>
                <button
                  onClick={() => setActive(idx)}
                  style={{
                    background: isActive ? "var(--mm-ink)" : "transparent",
                    border: "none",
                    padding: "32px 28px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    color: isActive ? "var(--mm-fg-1)" : "var(--mm-fg-3)",
                    transition:
                      "color 200ms cubic-bezier(0.2,0,0,1), background 200ms cubic-bezier(0.2,0,0,1)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color = "var(--mm-fg-2)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color = "var(--mm-fg-3)";
                  }}
                >
                  <div
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      marginBottom: 10,
                      color: isActive ? "var(--mm-accent)" : "var(--mm-fg-3)",
                      fontWeight: 500,
                    }}
                  >
                    PHASE {p.n}
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 13,
                      color: isActive ? "var(--mm-fg-2)" : "var(--mm-fg-3)",
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {p.sub}
                  </div>

                  {/* Active underline */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -1,
                        height: 2,
                        background: "var(--mm-gradient)",
                      }}
                    />
                  )}
                </button>
                {idx < PHASES.length - 1 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--mm-fg-3)",
                    }}
                  >
                    <svg
                      width="20"
                      height="10"
                      viewBox="0 0 20 10"
                      fill="none"
                    >
                      <line
                        x1="0"
                        y1="5"
                        x2="16"
                        y2="5"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="2 3"
                      />
                      <path
                        d="M13 1L19 5L13 9"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active phase detail panel */}
        <div
          key={active}
          className="grid mm-phase-panel"
          style={{
            gridTemplateColumns: "1fr 1.2fr",
            gap: 96,
            alignItems: "flex-start",
            animation: "mmPhaseFade 320ms cubic-bezier(0.2,0,0,1) both",
          }}
        >
          {/* LEFT — title + body + stats */}
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(40px, 5.5vw, 80px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                fontWeight: 600,
              }}
            >
              {phase.title}.
            </h3>
            <div
              style={{
                marginTop: 16,
                fontSize: 24,
                color: "var(--mm-fg-3-inv)",
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
              }}
            >
              {phase.sub}
            </div>
            <p
              style={{
                margin: "32px 0 0",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--mm-fg-2)",
                maxWidth: 520,
              }}
            >
              {phase.body}
            </p>

            {/* Stats — three quiet rows */}
            <div
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: "1px solid var(--mm-charcoal)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {phase.stats.map(([v, l]) => (
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
                      fontSize: 12,
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
                      fontSize: 22,
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

            {/* Next-phase prompt — keeps the compounding story alive */}
            {active < PHASES.length - 1 && (
              <button
                onClick={() => setActive(active + 1)}
                className="mm-link"
                style={{
                  marginTop: 40,
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  color: "var(--mm-fg-1)",
                }}
              >
                Next: phase {PHASES[active + 1].n} ·{" "}
                {PHASES[active + 1].title} →
              </button>
            )}
          </div>

          {/* RIGHT — interactive proof for this phase */}
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--mm-fg-3)",
                fontWeight: 500,
                marginBottom: 16,
              }}
            >
              Real example
            </div>
            {active === 0 && <Phase1Demos onOpen={setActiveDemo} />}
            {active === 1 && <AdsDashboard />}
            {active === 2 && <AISmsThread />}
          </div>
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

      <style jsx global>{`
        @keyframes mmPhaseFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
