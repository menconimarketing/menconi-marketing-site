"use client";

import Eyebrow from "./Eyebrow";

const CONTACT: [string, string][] = [
  ["Email", "nico@menconimarketing.com"],
  ["Phone", "219-293-5148"],
  ["Location", "Chicago, IL"],
  ["Stack", "Custom code · no themes"],
];

export default function Difference() {
  return (
    <section
      id="about"
      data-screen-label="05 Founder"
      style={{
        padding: "160px 48px",
        position: "relative",
        background: "var(--mm-black)",
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.4fr",
            gap: 96,
            alignItems: "flex-start",
          }}
        >
          {/* Sticky portrait card */}
          <div style={{ position: "sticky", top: 96 }}>
            <div
              style={{
                aspectRatio: "4 / 5",
                background:
                  "linear-gradient(180deg, #1F1F1F 0%, #0A0A0A 100%)",
                border: "1px solid var(--mm-charcoal)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `
                    radial-gradient(ellipse 60% 80% at 55% 35%, rgba(184,181,174,0.18) 0%, transparent 55%),
                    radial-gradient(ellipse 80% 60% at 50% 100%, rgba(10,10,10,0.95) 0%, transparent 60%),
                    linear-gradient(135deg, #2A2A2A 0%, #141414 50%, #0A0A0A 100%)
                  `,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.06,
                  backgroundImage:
                    'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>")',
                }}
              />
              <img
                src="/brand/monogram/mm-white.svg"
                alt=""
                style={{
                  position: "absolute",
                  bottom: 32,
                  left: 32,
                  height: 28,
                  opacity: 0.85,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 10,
                  color: "var(--mm-fg-3)",
                  letterSpacing: "0.18em",
                }}
              >
                NM · 2026
              </div>
            </div>
            <div
              style={{
                marginTop: 16,
                fontSize: 11,
                color: "var(--mm-fg-3)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Photo coming.
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "var(--mm-fg-3)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span>Nico Menconi</span>
              <span>Chicago, IL</span>
            </div>
          </div>

          {/* Right column */}
          <div>
            <Eyebrow number="05" label="Who you actually work with" />
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
              One person.
              <br />
              That&apos;s the entire org chart.
            </h2>

            <div
              style={{
                marginTop: 56,
                display: "flex",
                flexDirection: "column",
                gap: 28,
                maxWidth: 620,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 21,
                  lineHeight: 1.5,
                  color: "var(--mm-fg-1)",
                  letterSpacing: "-0.005em",
                }}
              >
                I&apos;m Nico. I do the work. I write the strategy doc, design the site, write the code, build the ad account, write the headlines, configure the AI agent, and answer your texts on Saturday.
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--mm-fg-2)",
                }}
              >
                That&apos;s not a constraint I&apos;m apologizing for. It&apos;s the entire offer. When you hire an agency, you usually buy a sales rep with access to a junior team. When you hire me, you get the person making the decisions on your account &mdash; directly, every week, no proxy layer.
              </p>
            </div>

            {/* Contact block — real, honest, evergreen */}
            <div
              style={{
                marginTop: 64,
                display: "flex",
                flexDirection: "column",
                border: "1px solid var(--mm-charcoal)",
              }}
            >
              {CONTACT.map(([label, value], i) => (
                <div
                  key={label}
                  style={{
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 24,
                    borderBottom:
                      i < CONTACT.length - 1
                        ? "1px solid var(--mm-charcoal)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mm-fg-3)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      color: "var(--mm-fg-1)",
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "serif",
                  fontStyle: "italic",
                  fontSize: 32,
                  color: "var(--mm-fg-1)",
                  letterSpacing: "-0.01em",
                  fontWeight: 400,
                }}
              >
                — N.M.
              </div>
              <a
                href="mailto:nico@menconimarketing.com"
                className="mm-link"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Email me directly →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
