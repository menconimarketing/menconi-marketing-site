"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

type Slide = { caption: string; bg: string };

type Project = {
  idx: number;
  client: string;
  work: string;
  metric: string;
  location: string;
  year: string;
  url?: string;
  summary: string;
  result: string;
  slides: Slide[];
};

const PROJECTS: Project[] = [
  {
    idx: 1,
    client: "Acme Drywall",
    work: "Site + ads + intake agent",
    metric: "62 booked calls / 30d",
    location: "Chicago",
    year: "2026",
    url: "https://606propertyservices.menconimarketing.com",
    summary:
      "Three previous agencies told the owner drywall guys can't run profitable lead-gen. Built a positioning-first site, turned on Meta + Google with the new conversion baseline, layered an AI intake agent on top.",
    result:
      "62 booked calls in the first 30 days at $28 average cost-per-call. Hired one extra crew member by week 6 just to keep up.",
    slides: [
      { caption: "Hero — owner-direct positioning", bg: "linear-gradient(135deg,#1F1F1F 0%,#2A2A2A 50%,#0A0A0A 100%)" },
      { caption: "Case studies w/ real numbers", bg: "linear-gradient(135deg,#141414 0%,#1F1F1F 50%,#0A0A0A 100%)" },
      { caption: "Mobile lead-form (3 fields)", bg: "linear-gradient(135deg,#0A0A0A 0%,#141414 100%)" },
    ],
  },
  {
    idx: 2,
    client: "Northshore Roofing",
    work: "Site + Google Ads",
    metric: "$84K pipeline / 60d",
    location: "Evanston",
    year: "2026",
    url: "https://parabeachplastering.menconimarketing.com",
    summary:
      "Storm-damage roofer in a saturated market. Repositioned around a written install-date guarantee, redirected Google budget at the new landing pattern.",
    result: "$84K of qualified pipeline in the first 60 days, average ticket up 18% from better-fit leads.",
    slides: [
      { caption: "Install-date guarantee hero", bg: "linear-gradient(135deg,#2A2A2A 0%,#0A0A0A 100%)" },
      { caption: "Landing flow → calendar", bg: "linear-gradient(135deg,#1F1F1F 0%,#0A0A0A 100%)" },
    ],
  },
  {
    idx: 3,
    client: "Iron Range HVAC",
    work: "AI follow-up agent",
    metric: "38% → 71% answer rate",
    location: "Duluth",
    year: "2025",
    summary:
      "Existing site was fine. Existing ads were fine. Lead-to-call answer rate was 38% — 6 in every 10 leads went cold. Built an SMS+email AI agent that responds in <2 min, qualifies, and books.",
    result: "Answer rate jumped to 71%. Same ad spend, almost 2x the booked jobs.",
    slides: [
      { caption: "AI follow-up flow", bg: "linear-gradient(135deg,#141414 0%,#1F1F1F 100%)" },
      { caption: "Owner dashboard", bg: "linear-gradient(135deg,#0A0A0A 0%,#2A2A2A 100%)" },
    ],
  },
  {
    idx: 4,
    client: "Lakeside Electric",
    work: "Site + Meta Ads",
    metric: "118 leads / 30d",
    location: "Chicago",
    year: "2025",
    url: "https://martinezlandscaping.menconimarketing.com",
    summary:
      "Residential electrician chasing same-day-service homeowners. Repositioned around \"book your electrician in 90 seconds.\" Meta-led, with a 3-field text-back form.",
    result: "118 leads in 30 days at $19 cost-per-lead. Sustained for 8 months.",
    slides: [
      { caption: "90-second booking promise", bg: "linear-gradient(135deg,#1F1F1F 0%,#0A0A0A 100%)" },
      { caption: "Text-back capture form", bg: "linear-gradient(135deg,#0A0A0A 0%,#141414 100%)" },
    ],
  },
  {
    idx: 5,
    client: "Volk Custom Builders",
    work: "Brand site only",
    metric: "7-figure proposal · week 2",
    location: "Lake Forest",
    year: "2025",
    summary:
      "Custom-home builder, no ads spend, lead pipeline came from referrals. Built a brand-grade portfolio site to convert warm referrals at premium pricing.",
    result:
      "Closed a 7-figure project in week 2 from a referral who'd been on the fence with the old site for 4 months.",
    slides: [
      { caption: "Editorial portfolio grid", bg: "linear-gradient(135deg,#2A2A2A 0%,#1F1F1F 100%)" },
      { caption: "Project case study layout", bg: "linear-gradient(135deg,#141414 0%,#0A0A0A 100%)" },
    ],
  },
];

function ProjectExpansion({ project }: { project: Project }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = project.slides[slideIdx];

  return (
    <div
      style={{
        background: "var(--mm-ink)",
        borderTop: "1px solid var(--mm-charcoal)",
        padding: "48px 32px",
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1.1fr 1fr",
          gap: 48,
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              aspectRatio: "16/10",
              background: slide.bg,
              border: "1px solid var(--mm-charcoal)",
              position: "relative",
              overflow: "hidden",
              transition: "background 320ms cubic-bezier(0.2,0,0,1)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.04,
                backgroundImage:
                  'url("data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>")',
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                color: "var(--mm-fg-3)",
                letterSpacing: "0.18em",
              }}
            >
              {project.client.toUpperCase()} · {String(slideIdx + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                fontSize: 13,
                color: "var(--mm-fg-1)",
                fontWeight: 500,
              }}
            >
              {slide.caption}
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
            {project.slides.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setSlideIdx(i);
                }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  flex: 1,
                  height: 2,
                  background:
                    i === slideIdx ? "var(--mm-fg-1)" : "var(--mm-charcoal)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "background 200ms cubic-bezier(0.2,0,0,1)",
                }}
              />
            ))}
          </div>
        </div>

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
            What we shipped
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--mm-fg-1)",
              marginBottom: 32,
            }}
          >
            {project.summary}
          </p>
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
            Result
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--mm-fg-1)",
              marginBottom: 32,
            }}
          >
            {project.result}
          </p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mm-link"
              style={{
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              View live site →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onToggle}
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "60px 2fr 2fr 1.5fr 1fr 60px",
          alignItems: "center",
          gap: 24,
          padding: "36px 0",
          paddingLeft: hover || open ? 24 : 0,
          paddingRight: hover || open ? 24 : 0,
          borderTop: "1px solid var(--mm-charcoal)",
          background: hover || open ? "var(--mm-ink)" : "transparent",
          color: "inherit",
          textAlign: "left",
          cursor: "pointer",
          border: "none",
          fontFamily: "inherit",
          transition:
            "background 200ms cubic-bezier(0.2,0,0,1), padding 200ms cubic-bezier(0.2,0,0,1)",
        }}
      >
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: 12,
            color: "var(--mm-fg-3)",
          }}
        >
          {String(project.idx).padStart(2, "0")}
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: hover || open ? "var(--mm-accent)" : "var(--mm-fg-1)",
            transition: "color 200ms cubic-bezier(0.2,0,0,1)",
          }}
        >
          {project.client}
        </div>
        <div style={{ fontSize: 14, color: "var(--mm-fg-2)" }}>{project.work}</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "var(--mm-fg-1)" }}>{project.metric}</div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--mm-fg-3)",
          }}
        >
          {project.location} · {project.year}
        </div>
        <div
          style={{
            fontSize: 22,
            color: hover || open ? "var(--mm-accent)" : "var(--mm-fg-3)",
            textAlign: "right",
            transition:
              "color 200ms cubic-bezier(0.2,0,0,1), transform 200ms cubic-bezier(0.2,0,0,1)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          {open ? "×" : "→"}
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? 1200 : 0,
          overflow: "hidden",
          transition: "max-height 380ms cubic-bezier(0.2,0,0,1)",
        }}
      >
        {open && <ProjectExpansion project={project} />}
      </div>
    </div>
  );
}

export default function Proof() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="results"
      data-screen-label="06 Work"
      style={{ padding: "160px 48px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 80,
            gap: 64,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Eyebrow number="06" label="Recent work" />
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(48px, 7vw, 104px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                fontWeight: 600,
              }}
            >
              Numbers,
              <br />
              <span style={{ color: "var(--mm-fg-3-inv)" }}>not adjectives.</span>
            </h2>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 380,
            }}
          >
            Five engagements from the last 14 months. Click any row to expand the case study.
          </p>
        </div>

        <div style={{ borderBottom: "1px solid var(--mm-charcoal)" }}>
          {PROJECTS.map((p) => (
            <WorkRow
              key={p.idx}
              project={p}
              open={openIdx === p.idx}
              onToggle={() => setOpenIdx(openIdx === p.idx ? null : p.idx)}
            />
          ))}
        </div>

        <div
          className="grid"
          style={{
            marginTop: 96,
            gridTemplateColumns: "1fr 2fr",
            gap: 64,
            alignItems: "flex-start",
            borderTop: "1px solid var(--mm-charcoal)",
            paddingTop: 64,
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
            Client — Acme Drywall
            <br />
            <span style={{ color: "var(--mm-fg-3)" }}>Chicago · 2026</span>
          </div>
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(28px, 3.4vw, 44px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                fontWeight: 500,
                color: "var(--mm-fg-1)",
                maxWidth: 1000,
              }}
            >
              &ldquo;Three agencies told me drywall guys can&apos;t run real ads. Nico had us booking 60+ calls a month inside 4 weeks. We hired one guy just to handle the work.&rdquo;
            </p>
            <div
              style={{
                marginTop: 28,
                fontSize: 14,
                color: "var(--mm-fg-3)",
              }}
            >
              — D. Reyes, owner, Acme Drywall
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
