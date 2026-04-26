"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

const LIFT_LEADS = 1.85;
const LIFT_CLOSE = 1.35;
const LIFT_JOB = 1.18;

function Slider({
  label,
  value,
  set,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 14,
        }}
      >
        <label
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mm-fg-3)",
            fontWeight: 500,
          }}
        >
          {label}
        </label>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--mm-fg-1)",
          }}
        >
          {format(value)}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mm-slider"
        style={{
          width: "100%",
          height: 2,
          background: "var(--mm-charcoal)",
          outline: "none",
          cursor: "pointer",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          fontSize: 11,
          color: "var(--mm-fg-3)",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [leads, setLeads] = useState(40);
  const [close, setClose] = useState(22);
  const [job, setJob] = useState(4800);

  const currentRev = leads * (close / 100) * job;
  const newLeads = leads * LIFT_LEADS;
  const newClose = Math.min(100, close * LIFT_CLOSE);
  const newJob = job * LIFT_JOB;
  const newRev = newLeads * (newClose / 100) * newJob;
  const delta = newRev - currentRev;
  const annual = delta * 12;

  return (
    <section
      id="calculator"
      data-screen-label="07 Calculator"
      style={{ padding: "160px 48px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          className="grid"
          style={{
            marginBottom: 80,
            gridTemplateColumns: "1.2fr 1fr",
            gap: 96,
            alignItems: "flex-end",
          }}
        >
          <div>
            <Eyebrow number="07" label="Position value" />
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px, 5vw, 76px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                fontWeight: 600,
              }}
            >
              What owning your
              <br />
              position is{" "}
              <span className="mm-gradient-text">worth.</span>
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 420,
            }}
          >
            Pull the sliders to your numbers. The math on the right shows what a fully-built engagement (site + ads + AI) typically returns &mdash; based on average client uplift, not pitch numbers.
          </p>
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.2fr",
            gap: 0,
            border: "1px solid var(--mm-charcoal)",
          }}
        >
          {/* Inputs */}
          <div
            style={{
              padding: "56px 48px",
              borderRight: "1px solid var(--mm-charcoal)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--mm-fg-3)",
                fontWeight: 500,
                marginBottom: 40,
              }}
            >
              YOUR NUMBERS · TODAY
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              <Slider
                label="Leads / month"
                value={leads}
                set={setLeads}
                min={5}
                max={300}
                step={5}
                format={(n) => String(n)}
              />
              <Slider
                label="Close rate"
                value={close}
                set={setClose}
                min={5}
                max={60}
                step={1}
                format={(n) => n + "%"}
              />
              <Slider
                label="Average job value"
                value={job}
                set={setJob}
                min={500}
                max={25000}
                step={100}
                format={(n) => fmt(n)}
              />
            </div>
            <div
              style={{
                marginTop: 56,
                paddingTop: 32,
                borderTop: "1px solid var(--mm-charcoal)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                Today — monthly revenue
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: "var(--mm-fg-2)",
                  lineHeight: 1,
                }}
              >
                {fmt(currentRev)}
              </div>
            </div>
          </div>

          {/* Output */}
          <div
            style={{
              padding: "56px 48px",
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(232,212,154,0.06) 0%, transparent 60%), var(--mm-ink)",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 40,
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
                WITH POSITION OWNED
              </div>
              <div
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  color: "var(--mm-fg-3)",
                  letterSpacing: "0.16em",
                }}
              >
                BASED ON AVG CLIENT UPLIFT
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 56,
              }}
            >
              {[
                ["Leads / mo", Math.round(newLeads), `+${Math.round((LIFT_LEADS - 1) * 100)}%`],
                ["Close rate", `${Math.round(newClose)}%`, `+${Math.round((LIFT_CLOSE - 1) * 100)}%`],
                ["Avg job", fmt(newJob), `+${Math.round((LIFT_JOB - 1) * 100)}%`],
              ].map(([l, v, d]) => (
                <div key={String(l)}>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mm-fg-3)",
                      marginBottom: 8,
                    }}
                  >
                    {l}
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--mm-fg-1)",
                      lineHeight: 1,
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--mm-accent)",
                      fontFamily: "ui-monospace, monospace",
                      marginTop: 6,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {d}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid var(--mm-charcoal)", paddingTop: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                Monthly revenue — new
              </div>
              <div
                className="mm-gradient-text"
                style={{
                  fontSize: "clamp(64px, 8vw, 112px)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {fmt(newRev)}
              </div>
              <div
                style={{
                  marginTop: 24,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                  paddingTop: 24,
                  borderTop: "1px solid var(--mm-charcoal)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mm-fg-3)",
                      marginBottom: 8,
                    }}
                  >
                    Monthly delta
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--mm-fg-1)",
                    }}
                  >
                    + {fmt(delta)}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mm-fg-3)",
                      marginBottom: 8,
                    }}
                  >
                    Annualized
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--mm-fg-1)",
                    }}
                  >
                    + {fmt(annual)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          style={{
            margin: "40px 0 0",
            fontSize: 13,
            color: "var(--mm-fg-3)",
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          Math is illustrative, derived from median uplift across the last 14 months of full engagements. Yours will vary. The number on a real call is more honest &mdash; and usually higher.
        </p>
      </div>

      <style jsx global>{`
        .mm-slider {
          -webkit-appearance: none;
          appearance: none;
        }
        .mm-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 24px;
          background: var(--mm-fg-1);
          cursor: pointer;
          border-radius: 0;
        }
        .mm-slider::-moz-range-thumb {
          width: 14px;
          height: 24px;
          background: var(--mm-fg-1);
          border: none;
          cursor: pointer;
          border-radius: 0;
        }
      `}</style>
    </section>
  );
}
