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
    title: "You’ve been burned.",
    body:
      "An agency took $4K/month for six months. They sent you weekly PDFs with charts. You got two leads. They blamed your industry.",
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
      "Which is great until your best referrer retires, sells, or just goes quiet for a quarter. Referral pipelines don’t scale. They can’t be turned up. They can be turned off.",
  },
  {
    n: "04",
    title: "Your site costs you jobs.",
    body:
      "It loads in 6 seconds on a phone. The form has 11 fields. The estimate flow is a PDF download. You’ve watched a homeowner give up on it in front of you.",
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
      gsap.from(".problem-closing", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ".problem-closing", start: "top 85%" },
      });
    },
    { scope: container }
  );

  return (
    <section
      id="problem"
      ref={container}
      data-screen-label="02 Problem"
      style={{ padding: "160px 48px", background: "var(--mm-black)", position: "relative" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="02" label="The problem" />

        {/* Triple gap between eyebrow and headline + right-side balance */}
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
            }}
          >
            You don&apos;t need
            <br />
            more marketing.
            <br />
            <span style={{ color: "var(--mm-fg-3-inv)" }}>
              You need it to actually work.
            </span>
          </h2>

          {/* Right-side balance — bold lede + body that primes the four pain cards */}
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

        <div className="problem-closing" style={{ marginTop: 96, maxWidth: 760 }}>
          <p
            style={{
              margin: 0,
              fontSize: 28,
              lineHeight: 1.3,
              color: "var(--mm-fg-1)",
              letterSpacing: "-0.015em",
            }}
          >
            The fix isn&apos;t a louder ad campaign. It&apos;s owning a position in your market that nobody else is claiming &mdash; and then building the site, the ads, and the follow-up to defend it.
          </p>
          <p
            style={{
              margin: "24px 0 0",
              fontSize: 16,
              color: "var(--mm-fg-3)",
              lineHeight: 1.5,
              maxWidth: 520,
            }}
          >
            That&apos;s what the next section does. In about 8 seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
