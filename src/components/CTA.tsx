"use client";

import { useMemo, useState } from "react";
import Eyebrow from "./Eyebrow";

type Day = {
  dow: string;
  date: number;
  month: string;
  key: string;
};

const TIMES = ["9:00", "10:30", "1:00", "2:30", "4:00"];

export default function CTA() {
  const [sent, setSent] = useState(false);
  const [day, setDay] = useState<Day | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [biz, setBiz] = useState("");
  const [email, setEmail] = useState("");

  // Next 5 weekdays (Mon-Thu only)
  const days = useMemo<Day[]>(() => {
    const out: Day[] = [];
    const d = new Date();
    while (out.length < 5) {
      d.setDate(d.getDate() + 1);
      const dow = d.getDay();
      if (dow >= 1 && dow <= 4) {
        out.push({
          dow: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dow],
          date: d.getDate(),
          month: d.toLocaleString("en", { month: "short" }).toUpperCase(),
          key: d.toISOString().slice(0, 10),
        });
      }
    }
    return out;
  }, []);

  const canSubmit = day && time && biz && email;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) setSent(true);
  };

  return (
    <section
      id="contact"
      data-screen-label="10 Contact"
      style={{
        padding: "160px 48px",
        position: "relative",
        background:
          "radial-gradient(ellipse at 20% 0%, rgba(168,176,196,0.06) 0%, transparent 50%), var(--mm-black)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div style={{ marginBottom: 96 }}>
          <Eyebrow number="10" label="Book a call" />
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(40px, 6.5vw, 96px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              fontWeight: 600,
              maxWidth: 1500,
            }}
          >
            30 minutes.
            <br />
            <span className="mm-gradient-text">No pitch.</span>
            <br />
            <span style={{ color: "var(--mm-fg-3-inv)" }}>Just the audit.</span>
          </h2>
          <p
            style={{
              margin: "40px 0 0",
              fontSize: 19,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 640,
            }}
          >
            I&apos;ll pull your site up live, walk through what I&apos;d change, and tell you whether the system fits. If it doesn&apos;t, the call ends early and you keep the audit. No proposal until we both agree there&apos;s a fit.
          </p>
        </div>

        {sent && day && time ? (
          <div
            style={{
              padding: 1,
              background: "var(--mm-gradient)",
              maxWidth: 720,
            }}
          >
            <div style={{ background: "var(--mm-ink)", padding: "56px 48px" }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-positive)",
                  fontWeight: 500,
                  marginBottom: 20,
                }}
              >
                CONFIRMED
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 40,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontWeight: 600,
                }}
              >
                You&apos;re booked for {day.dow} {day.month} {day.date} at {time}.
              </h3>
              <p
                style={{
                  margin: "24px 0 0",
                  fontSize: 17,
                  color: "var(--mm-fg-2)",
                  lineHeight: 1.5,
                }}
              >
                Calendar invite sent to <span style={{ color: "var(--mm-fg-1)" }}>{email}</span>. I&apos;ll have your audit pulled up before we start.
              </p>
              <p
                style={{
                  margin: "40px 0 0",
                  fontFamily: "serif",
                  fontStyle: "italic",
                  fontSize: 22,
                  color: "var(--mm-fg-1)",
                }}
              >
                — N.M.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="grid"
            style={{
              gridTemplateColumns: "1.4fr 1fr",
              gap: 0,
              border: "1px solid var(--mm-charcoal)",
            }}
          >
            {/* Calendar */}
            <div
              style={{
                padding: 48,
                borderRight: "1px solid var(--mm-charcoal)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 28,
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
                  PICK A SLOT
                </div>
                <div
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 11,
                    color: "var(--mm-fg-3)",
                  }}
                >
                  CT · MON–THU
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 8,
                  marginBottom: 32,
                }}
              >
                {days.map((d) => {
                  const isSel = day && day.key === d.key;
                  return (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => {
                        setDay(d);
                        setTime(null);
                      }}
                      style={{
                        padding: "18px 8px",
                        background: isSel ? "var(--mm-fg-1)" : "transparent",
                        color: isSel ? "var(--mm-black)" : "var(--mm-fg-1)",
                        border:
                          "1px solid " +
                          (isSel ? "var(--mm-fg-1)" : "var(--mm-charcoal)"),
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "center",
                        transition: "all 180ms cubic-bezier(0.2,0,0,1)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSel) e.currentTarget.style.borderColor = "var(--mm-fg-3)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isSel) e.currentTarget.style.borderColor = "var(--mm-charcoal)";
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          opacity: 0.7,
                          fontWeight: 500,
                        }}
                      >
                        {d.dow.toUpperCase()}
                      </div>
                      <div
                        style={{
                          fontSize: 28,
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                          marginTop: 6,
                          lineHeight: 1,
                        }}
                      >
                        {d.date}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          opacity: 0.5,
                          marginTop: 4,
                        }}
                      >
                        {d.month}
                      </div>
                    </button>
                  );
                })}
              </div>

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
                TIME
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 8,
                }}
              >
                {TIMES.map((t) => {
                  const isSel = time === t;
                  const disabled = !day;
                  return (
                    <button
                      key={t}
                      type="button"
                      disabled={disabled}
                      onClick={() => setTime(t)}
                      style={{
                        padding: "14px 8px",
                        background: isSel ? "var(--mm-fg-1)" : "transparent",
                        color: isSel
                          ? "var(--mm-black)"
                          : disabled
                          ? "var(--mm-fg-4)"
                          : "var(--mm-fg-1)",
                        border:
                          "1px solid " +
                          (isSel ? "var(--mm-fg-1)" : "var(--mm-charcoal)"),
                        cursor: disabled ? "not-allowed" : "pointer",
                        fontFamily: "inherit",
                        fontSize: 14,
                        fontWeight: 500,
                        transition: "all 180ms cubic-bezier(0.2,0,0,1)",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              <p
                style={{
                  margin: "24px 0 0",
                  fontSize: 12,
                  color: "var(--mm-fg-3)",
                }}
              >
                {day && time
                  ? `Selected — ${day.dow} ${day.month} ${day.date} at ${time} CT`
                  : "Pick a day, then a time."}
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{
                padding: 48,
                display: "flex",
                flexDirection: "column",
                gap: 28,
                background: "var(--mm-black)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mm-fg-3)",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                YOUR DETAILS
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <label
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--mm-fg-2)",
                    fontWeight: 500,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    fontFamily: "inherit",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--mm-charcoal)",
                    color: "var(--mm-fg-1)",
                    padding: "12px 0",
                    fontSize: 18,
                    outline: "none",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderBottomColor = "var(--mm-accent)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderBottomColor = "var(--mm-charcoal)")
                  }
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <label
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--mm-fg-2)",
                    fontWeight: 500,
                  }}
                >
                  Business + trade
                </label>
                <input
                  required
                  value={biz}
                  onChange={(e) => setBiz(e.target.value)}
                  placeholder="Acme Drywall · drywall · Chicago"
                  style={{
                    fontFamily: "inherit",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--mm-charcoal)",
                    color: "var(--mm-fg-1)",
                    padding: "12px 0",
                    fontSize: 18,
                    outline: "none",
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
                type="submit"
                disabled={!canSubmit}
                className="mm-btn-primary"
                style={{
                  marginTop: 20,
                  fontSize: 13,
                  padding: "18px 24px",
                  opacity: !canSubmit ? 0.4 : 1,
                  cursor: !canSubmit ? "not-allowed" : "pointer",
                }}
              >
                {day && time
                  ? `Confirm ${day.month} ${day.date} · ${time} →`
                  : "Pick a slot first"}
              </button>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: "var(--mm-fg-3)",
                  lineHeight: 1.5,
                }}
              >
                Or email{" "}
                <span style={{ color: "var(--mm-fg-2)" }}>
                  hello@menconimarketing.com
                </span>{" "}
                directly. Either reaches me.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
