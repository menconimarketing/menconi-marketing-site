"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "./Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PAINS = [
  {
    n: "01",
    title: "You can’t tell if any of it’s working.",
    body:
      "An agency took $4K/month for six months. They sent you weekly PDFs with charts. The phone didn’t ring any more than it did before. They blamed your industry.",
  },
  {
    n: "02",
    title: "Your competition all looks the same.",
    body:
      "Same stock photo of a guy with a clipboard. Same five-star review carousel. Same “family-owned since 1998” line. None of you stand out — so the customer picks on price.",
  },
  {
    n: "03",
    title: "Your growth is referrals only.",
    body:
      "Referrals don’t scale. You can’t turn them up. You can’t predict them. You can’t control which months they come. The day your best referrer retires or sells, your pipeline goes with them.",
  },
  {
    n: "04",
    title: "You’re losing leads you don’t even see.",
    body:
      "Search your trade in your area — your business doesn’t show up. And when a lead does come in, you’re on a jobsite. By the time you call back, the homeowner already booked someone else.",
  },
];

export default function Problem() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".problem-headline", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: container.current, start: "top 80%" },
      });
      gsap.from(".problem-cell", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".problem-grid", start: "top 80%" },
      });
      gsap.from(".problem-transition", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        scrollTrigger: { trigger: ".problem-transition", start: "top 80%" },
      });
    },
    { scope: container }
  );

  return (
    <section
      id="problem"
      ref={container}
      data-screen-label="01 Problem"
      style={{ padding: "160px 48px", background: "var(--mm-black)", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="01" label="The problem" />

        {/* Headline + balance lede */}
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
            className="problem-headline"
            style={{
              margin: 0,
              fontSize: "clamp(36px, 5vw, 76px)",
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              fontWeight: 600,
              maxWidth: 1100,
              color: "var(--mm-fg-1)",
            }}
          >
            You don&apos;t need
            <br />
            more marketing.
            <br />
            You need it
            <br />
            to actually work.
          </h2>

          <div style={{ maxWidth: 380 }}>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                lineHeight: 1.3,
                color: "var(--mm-fg-1)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              None of these are marketing problems.
            </p>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--mm-fg-2)",
              }}
            >
              They&apos;re positioning problems. Four below — read them, then we fix them.
            </p>
          </div>
        </div>

        {/* Pain grid */}
        <div
          className="problem-grid grid"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 0,
            border: "1px solid var(--mm-charcoal)",
          }}
        >
          {PAINS.map((p, i) => (
            <div
              key={p.n}
              className="problem-cell"
              style={{
                padding: "48px 40px",
                borderRight:
                  i % 2 === 0 ? "1px solid var(--mm-charcoal)" : "none",
                borderBottom:
                  i < 2 ? "1px solid var(--mm-charcoal)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  color: "var(--mm-fg-3)",
                  letterSpacing: "0.18em",
                  marginBottom: 24,
                }}
              >
                {p.n}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: 32,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontWeight: 600,
                  marginBottom: 18,
                  color: "var(--mm-fg-1)",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "var(--mm-fg-2)",
                  maxWidth: 520,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Transition line — the loud moment */}
        <div
          className="problem-transition"
          style={{
            marginTop: 128,
            paddingTop: 64,
            paddingBottom: 64,
            borderTop: "1px solid var(--mm-charcoal)",
            borderBottom: "1px solid var(--mm-charcoal)",
            maxWidth: 980,
            margin: "128px auto 0",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.6vw, 48px)",
              lineHeight: 1.2,
              color: "var(--mm-fg-1)",
              letterSpacing: "-0.025em",
              fontWeight: 500,
            }}
          >
            The fix isn&apos;t a louder ad campaign. It&apos;s{" "}
            <span className="mm-gradient-text">owning a position</span> in your
            market that nobody else is claiming &mdash; and then building the site, the ads, and the follow-up to defend it.
          </p>
          <p
            style={{
              margin: "32px 0 0",
              fontSize: 14,
              color: "var(--mm-fg-3)",
              letterSpacing: "0.04em",
            }}
          >
            That&apos;s what the next section does. In about 8 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
