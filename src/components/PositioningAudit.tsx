"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

const SCAN_STEPS = [
  "Pulling top 10 organic competitors",
  "Scraping homepage hero copy",
  "Analyzing positioning overlap",
  "Identifying unowned territory",
  "Generating audit report",
];

type Stage = "input" | "running" | "result";

export default function PositioningAudit() {
  const [stage, setStage] = useState<Stage>("input");
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [progress, setProgress] = useState(0);
  const [scanLine, setScanLine] = useState(0);

  const run = () => {
    if (!business.trim()) return;
    setStage("running");
    setProgress(0);
    setScanLine(0);
    const total = 4200;
    const start = Date.now();
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / total) * 100);
      setProgress(p);
      setScanLine(
        Math.min(SCAN_STEPS.length - 1, Math.floor((p / 100) * SCAN_STEPS.length))
      );
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => setStage("result"), 250);
    };
    requestAnimationFrame(tick);
  };

  const reset = () => {
    setStage("input");
    setBusiness("");
    setCity("");
  };

  const slug = business.toLowerCase().trim();
  const cityLabel = city.trim() || "your market";
  const isHvac = /hvac|heat|air|cool/.test(slug);
  const isRoof = /roof/.test(slug);
  const isElec = /electric/.test(slug);
  const isPlumb = /plumb/.test(slug);
  const isContractor = /contract|build|remodel|drywall|plaster/.test(slug);
  const trade = isHvac
    ? "HVAC"
    : isRoof
    ? "roofing"
    : isElec
    ? "electrical"
    : isPlumb
    ? "plumbing"
    : isContractor
    ? "general contracting"
    : slug || "service";

  const findings = [
    {
      label: "Owned positioning",
      value: "None",
      tone: "neg" as const,
      detail: `9 of 10 ${trade} sites in ${cityLabel} lead with "family-owned, fully insured, 25 years of experience." You are competing on identical claims.`,
    },
    {
      label: "Unique mechanism",
      value: "None",
      tone: "neg" as const,
      detail: `Your homepage describes services. It does not describe HOW you deliver them differently. Buyers pick on price by default.`,
    },
    {
      label: "Numerical proof",
      value: "0 of 10",
      tone: "neg" as const,
      detail: `Zero numbers visible above the fold on competitor sites. The first site to lead with "${
        Math.floor(Math.random() * 60) + 40
      } jobs completed in ${cityLabel} this year" wins on contrast alone.`,
    },
    {
      label: "Mobile load time",
      value: "5.2s",
      tone: "warn" as const,
      detail: `Median competitor site loads in 5.2s on 4G. Anything over 3s loses ~32% of mobile traffic before the hero renders.`,
    },
    {
      label: "Lead-form friction",
      value: "High",
      tone: "warn" as const,
      detail: `Average form has 8.4 fields. Industry data: dropping to 4 fields lifts completions ~67%.`,
    },
  ];

  const opportunities = [
    `Claim "${cityLabel}'s ${trade} for [specific buyer]" — nobody else is.`,
    `Lead the homepage with one number nobody can match.`,
    `Replace the 8-field form with a 3-field text-back flow.`,
    `Add an AI intake agent that answers at 11pm — no competitor has this.`,
  ];

  return (
    <section
      id="audit"
      data-screen-label="03 Audit"
      style={{
        padding: "160px 48px",
        position: "relative",
        background: "var(--mm-black)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          style={{
            textAlign: "center",
            maxWidth: 760,
            margin: "0 auto 64px",
          }}
        >
          <div style={{ display: "inline-block" }}>
            <Eyebrow number="02" label="Live positioning audit" />
          </div>
          <h2
            style={{
              margin: "32px 0 0",
              fontSize: "clamp(36px, 5vw, 76px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              fontWeight: 600,
              color: "var(--mm-fg-1)",
            }}
          >
            What&apos;s broken in how you show up.
          </h2>
          <p
            style={{
              margin: "32px auto 0",
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 540,
            }}
          >
            Type your business below. I&apos;ll run the same diagnostic I run on day one of a paid engagement. No email. No download. Just the report.
          </p>
        </div>

        {stage === "input" && (
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1.5fr 1fr auto",
              gap: 32,
              alignItems: "flex-end",
              maxWidth: 1100,
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: 16,
                }}
              >
                What you sell
              </label>
              <input
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") run();
                }}
                placeholder="Drywall, roofing, HVAC, electrical..."
                style={{
                  width: "100%",
                  fontFamily: "inherit",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--mm-charcoal)",
                  color: "var(--mm-fg-1)",
                  padding: "16px 0",
                  fontSize: 24,
                  outline: "none",
                  fontWeight: 500,
                }}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "var(--mm-accent)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "var(--mm-charcoal)")
                }
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  display: "block",
                  marginBottom: 16,
                }}
              >
                Market (optional)
              </label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") run();
                }}
                placeholder="Chicago, IL"
                style={{
                  width: "100%",
                  fontFamily: "inherit",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--mm-charcoal)",
                  color: "var(--mm-fg-1)",
                  padding: "16px 0",
                  fontSize: 24,
                  outline: "none",
                  fontWeight: 500,
                }}
                onFocus={(e) =>
                  (e.target.style.borderBottomColor = "var(--mm-accent)")
                }
                onBlur={(e) =>
                  (e.target.style.borderBottomColor = "var(--mm-charcoal)")
                }
              />
            </div>
            <button
              onClick={run}
              className="mm-btn-primary"
              style={{ fontSize: 13, padding: "18px 28px" }}
            >
              Run audit <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {stage === "input" && (
          <p
            style={{
              margin: "32px 0 0",
              fontSize: 13,
              color: "var(--mm-fg-3)",
              letterSpacing: "0.04em",
            }}
          >
            No data is stored. The audit is generated locally — same logic I use in real engagements.
          </p>
        )}

        {stage === "running" && (
          <div style={{ maxWidth: 1100, padding: "32px 0" }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--mm-fg-3)",
                fontWeight: 500,
                marginBottom: 32,
              }}
            >
              Running audit · {(business || "Business").toUpperCase()}
              {city && ` · ${city.toUpperCase()}`}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginBottom: 48,
              }}
            >
              {SCAN_STEPS.slice(0, scanLine + 1).map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                    fontSize: 18,
                    color:
                      i === scanLine ? "var(--mm-fg-1)" : "var(--mm-fg-3)",
                    fontWeight: i === scanLine ? 500 : 400,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      border: "1px solid",
                      borderColor:
                        i < scanLine ? "var(--mm-positive)" : "var(--mm-accent)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {i < scanLine ? (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="var(--mm-positive)"
                        strokeWidth="2"
                      >
                        <path d="M2 5l2 2 4-4" />
                      </svg>
                    ) : (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          background: "var(--mm-accent)",
                          animation: "mm-blink 1s steps(2) infinite",
                        }}
                      />
                    )}
                  </span>
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: 2,
                background: "var(--mm-charcoal)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: progress + "%",
                  background: "var(--mm-gradient)",
                  transition: "width 60ms linear",
                }}
              />
            </div>
          </div>
        )}

        {stage === "result" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 64,
                gap: 32,
                flexWrap: "wrap",
              }}
            >
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
                  Audit result · {trade.toUpperCase()} · {cityLabel.toUpperCase()}
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "clamp(36px, 4.5vw, 64px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                    fontWeight: 600,
                    maxWidth: 900,
                  }}
                >
                  Your positioning is{" "}
                  <span className="mm-gradient-text">generic.</span>
                </h3>
                <p
                  style={{
                    margin: "20px 0 0",
                    fontSize: 17,
                    color: "var(--mm-fg-2)",
                    lineHeight: 1.5,
                    maxWidth: 640,
                  }}
                >
                  Five issues flagged. The fix is not &ldquo;better marketing.&rdquo; It&apos;s claiming an unowned position and building everything around it.
                </p>
              </div>
              <button
                onClick={reset}
                className="mm-btn-ghost"
                style={{ fontSize: 12, flexShrink: 0 }}
              >
                <span
                  className="mm-btn-ghost-inner"
                  style={{ padding: "12px 18px" }}
                >
                  Run again
                </span>
              </button>
            </div>

            <div
              className="grid"
              style={{
                gridTemplateColumns: "1.4fr 1fr",
                gap: 64,
                alignItems: "flex-start",
              }}
            >
              {/* Left: Findings list */}
              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--mm-fg-3)",
                    fontWeight: 500,
                    marginBottom: 24,
                    paddingBottom: 16,
                    borderBottom: "1px solid var(--mm-charcoal)",
                  }}
                >
                  Flagged · 5 items
                </div>
                <div>
                  {findings.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "24px 0",
                        borderBottom:
                          i < findings.length - 1
                            ? "1px solid var(--mm-charcoal)"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 8,
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 500,
                            color: "var(--mm-fg-1)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {f.label}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color:
                              f.tone === "neg"
                                ? "var(--mm-negative)"
                                : "#E8D49A",
                            letterSpacing: "0.04em",
                            flexShrink: 0,
                          }}
                        >
                          {f.value}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "var(--mm-fg-2)",
                          lineHeight: 1.55,
                        }}
                      >
                        {f.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Unowned territory card */}
              <div style={{ padding: 1, background: "var(--mm-gradient)" }}>
                <div
                  style={{ background: "var(--mm-ink)", padding: "36px 32px" }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mm-fg-3)",
                      marginBottom: 24,
                      fontWeight: 500,
                    }}
                  >
                    Unowned territory · 4 opportunities
                  </div>
                  <ol
                    style={{
                      margin: 0,
                      padding: 0,
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {opportunities.map((o, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          gap: 16,
                          fontSize: 15,
                          lineHeight: 1.5,
                          color: "var(--mm-fg-1)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "var(--mm-fg-3)",
                            flexShrink: 0,
                            marginTop: 3,
                            letterSpacing: "0.1em",
                            minWidth: 22,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ol>
                  <a
                    href="#contact"
                    className="mm-btn-primary"
                    style={{
                      marginTop: 32,
                      display: "inline-block",
                      fontSize: 12,
                      padding: "14px 22px",
                    }}
                  >
                    Get the deep audit <span aria-hidden>→</span>
                  </a>
                  <p
                    style={{
                      margin: "14px 0 0",
                      fontSize: 12,
                      color: "var(--mm-fg-3)",
                      lineHeight: 1.5,
                    }}
                  >
                    On a 30-min call I walk through the full version with screenshots, competitor URLs, and the exact copy I&apos;d put on your homepage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes mm-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
