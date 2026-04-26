"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

// Math: avg job × monthly leads × 25% close rate × 2.4x position lift
const POSITION_LIFT = 2.4;
const ASSUMED_CLOSE = 0.25;

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
          marginBottom: 12,
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
            fontSize: 22,
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
          marginTop: 6,
          fontSize: 11,
          color: "var(--mm-fg-3)",
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
  const [job, setJob] = useState(4800);

  const todayRev = leads * ASSUMED_CLOSE * job;
  const newRev = todayRev * POSITION_LIFT;
  const monthlyDelta = newRev - todayRev;
  const annualDelta = monthlyDelta * 12;

  return (
    <section
      id="calculator"
      data-screen-label="07 Calculator"
      style={{ padding: "160px 48px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="07" label="Position value" />

        {/* Headline + intro */}
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
            }}
          >
            What owning your
            <br />
            position is{" "}
            <span className="mm-gradient-text">worth.</span>
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 420,
            }}
          >
            Move the two sliders to your numbers. The number below is what your business is leaving on the table — every month.
          </p>
        </div>

        {/* Sliders — quiet, context-setting, side by side at the top */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            paddingBottom: 56,
            borderBottom: "1px solid var(--mm-charcoal)",
          }}
        >
          <Slider
            label="Average job value"
            value={job}
            set={setJob}
            min={500}
            max={25000}
            step={100}
            format={(n) => fmt(n)}
          />
          <Slider
            label="Monthly leads"
            value={leads}
            set={setLeads}
            min={5}
            max={300}
            step={5}
            format={(n) => String(n)}
          />
        </div>

        {/* HERO — the big delta number takes the stage */}
        <div
          style={{
            paddingTop: 80,
            paddingBottom: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mm-fg-3)",
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            What you&apos;re leaving on the table — every month
          </div>

          <div
            className="mm-gradient-text mm-delta-hero"
            style={{
              fontSize: "clamp(72px, 13vw, 200px)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              marginBottom: 24,
            }}
          >
            + {fmt(monthlyDelta)}
          </div>

          <div
            style={{
              fontSize: "clamp(20px, 2vw, 28px)",
              color: "var(--mm-fg-1)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              fontWeight: 500,
              maxWidth: 760,
            }}
          >
            More revenue. Per month. From positioning — not from spending more on ads.
          </div>
        </div>

        {/* Supporting evidence — small, quiet */}
        <div
          style={{
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid var(--mm-charcoal)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: 32,
            flexWrap: "wrap",
            fontSize: 14,
            color: "var(--mm-fg-3)",
          }}
        >
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  marginRight: 12,
                }}
              >
                Today
              </span>
              <span style={{ color: "var(--mm-fg-2)", fontWeight: 500 }}>
                {fmt(todayRev)}/mo
              </span>
            </div>
            <div>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  marginRight: 12,
                }}
              >
                With positioning
              </span>
              <span style={{ color: "var(--mm-fg-1)", fontWeight: 500 }}>
                {fmt(newRev)}/mo
              </span>
            </div>
            <div>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  marginRight: 12,
                }}
              >
                Annualized
              </span>
              <span style={{ color: "var(--mm-fg-1)", fontWeight: 500 }}>
                + {fmt(annualDelta)}/yr
              </span>
            </div>
          </div>
        </div>

        {/* Math explainer */}
        <p
          style={{
            margin: "24px 0 0",
            fontSize: 12,
            color: "var(--mm-fg-3)",
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          Math: avg job value × monthly leads × 25% close rate × 2.4x position lift. The lift is the median uplift across the last 14 months of full engagements (site + ads + AI). Your number on a real call is more honest — and usually higher.
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
