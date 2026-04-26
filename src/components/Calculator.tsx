"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

// Simple model — close rate held constant at 25% (industry default).
// Position lift translates to ~2.4x revenue (combined leads + AOV uplift).
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
          marginBottom: 14,
        }}
      >
        <label
          style={{
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--mm-fg-3)",
            fontWeight: 500,
          }}
        >
          {label}
        </label>
        <div
          style={{
            fontSize: 32,
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

  return (
    <section
      id="calculator"
      data-screen-label="07 Calculator"
      style={{ padding: "160px 48px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="07" label="Position value" />

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
            Two numbers. Move them to your business. The gap between &ldquo;today&rdquo; and &ldquo;with positioning&rdquo; is what you&apos;re leaving on the table.
          </p>
        </div>

        {/* Sliders row — clean, no card */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            marginBottom: 96,
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

        {/* Before / after split — two big numbers, one arrow, one delta */}
        <div
          style={{
            paddingTop: 64,
            borderTop: "1px solid var(--mm-charcoal)",
          }}
        >
          <div
            className="grid mm-calc-result"
            style={{
              gridTemplateColumns: "1fr 80px 1fr",
              gap: 32,
              alignItems: "center",
            }}
          >
            {/* Today */}
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
                Today · monthly revenue
              </div>
              <div
                style={{
                  fontSize: "clamp(56px, 7vw, 96px)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--mm-fg-2)",
                }}
              >
                {fmt(todayRev)}
              </div>
            </div>

            {/* Arrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="80"
                height="20"
                viewBox="0 0 80 20"
                fill="none"
                style={{ color: "var(--mm-accent)" }}
              >
                <line
                  x1="0"
                  y1="10"
                  x2="70"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <path
                  d="M62 2L78 10L62 18"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>

            {/* With positioning — gradient number */}
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
                With your position owned
              </div>
              <div
                className="mm-gradient-text"
                style={{
                  fontSize: "clamp(56px, 7vw, 96px)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {fmt(newRev)}
              </div>
            </div>
          </div>

          {/* Single delta line */}
          <div
            style={{
              marginTop: 56,
              paddingTop: 32,
              borderTop: "1px solid var(--mm-charcoal)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--mm-fg-1)",
              }}
            >
              + {fmt(monthlyDelta)} more per month
            </div>
            <div
              style={{
                fontSize: 14,
                color: "var(--mm-fg-3)",
                letterSpacing: "0.04em",
              }}
            >
              ({fmt(monthlyDelta * 12)} per year, at this rate)
            </div>
          </div>
        </div>

        <p
          style={{
            margin: "48px 0 0",
            fontSize: 13,
            color: "var(--mm-fg-3)",
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          Math: avg job value × monthly leads × 25% close rate × 2.4x position lift. The lift is the median uplift across the last 14 months of full engagements (site + ads + AI). Yours will vary. The number on a real call is more honest — and usually higher.
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
          height: 28px;
          background: var(--mm-fg-1);
          cursor: pointer;
          border-radius: 0;
        }
        .mm-slider::-moz-range-thumb {
          width: 14px;
          height: 28px;
          background: var(--mm-fg-1);
          border: none;
          cursor: pointer;
          border-radius: 0;
        }
      `}</style>
    </section>
  );
}
