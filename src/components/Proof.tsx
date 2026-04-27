"use client";

import { useState } from "react";
import Eyebrow from "./Eyebrow";

type Slide = { caption: string; bg: string };

type Project = {
  idx: number;
  client: string;
  trade: string;
  location: string;
  url: string;
  status: "live" | "demo";
  industryIssue: string;
  whatSiteDoes: string;
  slides: Slide[];
};

const PROJECTS: Project[] = [
  {
    idx: 1,
    client: "606 Property Services",
    trade: "Property Maintenance",
    location: "Chicago, IL",
    url: "https://606propertyservices.menconimarketing.com",
    status: "live",
    industryIssue:
      "[Active client — case study copy pending Nico's input. Need: real audit findings, what's being fixed, what's working.]",
    whatSiteDoes:
      "[Active client — describe the live site once Nico provides specifics.]",
    slides: [
      {
        caption: "Hero",
        bg: "linear-gradient(135deg,#1F1F1F 0%,#2A2A2A 50%,#0A0A0A 100%)",
      },
      {
        caption: "Service grid",
        bg: "linear-gradient(135deg,#141414 0%,#1F1F1F 50%,#0A0A0A 100%)",
      },
    ],
  },
  {
    idx: 2,
    client: "ParaBeach Plastering",
    trade: "Plastering / Stucco",
    location: "Norwalk, CA",
    url: "https://parabeachplastering.menconimarketing.com",
    status: "demo",
    industryIssue:
      "Plastering and stucco contractors all lead with the same lines: license number, family-owned since 19XX, free estimates. Nothing on a homepage tells a homeowner why to call them over the next bid.",
    whatSiteDoes:
      "Built the demo around a specific kind of work and a specific buyer — not a list of services. Hero leads with the work itself, before/after gallery sits above the fold, lead form is short enough to fill out from a phone.",
    slides: [
      {
        caption: "Hero — work-first",
        bg: "linear-gradient(135deg,#2A2A2A 0%,#0A0A0A 100%)",
      },
      {
        caption: "Portfolio grid",
        bg: "linear-gradient(135deg,#1F1F1F 0%,#0A0A0A 100%)",
      },
    ],
  },
  {
    idx: 3,
    client: "Martinez Landscaping",
    trade: "Landscaping",
    location: "Riverside, CA",
    url: "https://martinezlandscaping.menconimarketing.com",
    status: "demo",
    industryIssue:
      "Residential landscapers compete on price because they can't show their actual work — sites are all stock photos and service lists. Homeowners can't tell the difference between any of them, so they pick the cheapest quote.",
    whatSiteDoes:
      "Built the demo around real before/after work as the proof. Every project is documented visually so a prospect can compare quality, not just price. Booking flow short enough that a homeowner can request an estimate without a phone call.",
    slides: [
      {
        caption: "Before / after gallery",
        bg: "linear-gradient(135deg,#1F1F1F 0%,#0A0A0A 100%)",
      },
      {
        caption: "Service breakdown",
        bg: "linear-gradient(135deg,#0A0A0A 0%,#141414 100%)",
      },
    ],
  },
  {
    idx: 4,
    client: "Sergio's Lawn Care",
    trade: "Lawn Care",
    location: "California",
    url: "https://sergioslawncare.menconimarketing.com",
    status: "demo",
    industryIssue:
      "Lawn-care companies sell one-off mows when the real money is in route-based recurring contracts — but every site is built around single-job pricing, so customers default to one-time service.",
    whatSiteDoes:
      "Built the demo around the recurring-contract model. Front page leads with monthly plans instead of one-off jobs, customers can see service history once they're signed up, autopay capture is built into the booking flow.",
    slides: [
      {
        caption: "Recurring-plan hero",
        bg: "linear-gradient(135deg,#2A2A2A 0%,#1F1F1F 100%)",
      },
      {
        caption: "Booking flow",
        bg: "linear-gradient(135deg,#141414 0%,#0A0A0A 100%)",
      },
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
              {project.client.toUpperCase()} ·{" "}
              {String(slideIdx + 1).padStart(2, "0")} /{" "}
              {String(project.slides.length).padStart(2, "0")}
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
            {project.status === "live" ? "Active engagement" : "Industry issue"}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--mm-fg-1)",
              marginBottom: 24,
            }}
          >
            {project.industryIssue}
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
            What this site does
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              lineHeight: 1.55,
              color: "var(--mm-fg-1)",
              marginBottom: 32,
            }}
          >
            {project.whatSiteDoes}
          </p>
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
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  if (status === "live") {
    return (
      <span
        style={{
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--mm-positive)",
          fontWeight: 600,
          padding: "3px 8px",
          border: "1px solid var(--mm-positive)",
        }}
      >
        Live client
      </span>
    );
  }
  return (
    <span
      style={{
        fontSize: 9,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--mm-fg-3)",
        fontWeight: 600,
        padding: "3px 8px",
        border: "1px solid var(--mm-charcoal)",
      }}
    >
      Demo build
    </span>
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
          gridTemplateColumns: "60px 2fr 1.5fr 110px 1fr 60px",
          alignItems: "center",
          gap: 24,
          padding: "32px 0",
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
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: hover || open ? "var(--mm-accent)" : "var(--mm-fg-1)",
            transition: "color 200ms cubic-bezier(0.2,0,0,1)",
          }}
        >
          {project.client}
        </div>
        <div style={{ fontSize: 14, color: "var(--mm-fg-2)" }}>
          {project.trade}
        </div>
        <div>
          <StatusBadge status={project.status} />
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--mm-fg-3)",
          }}
        >
          {project.location}
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
          maxHeight: open ? 1400 : 0,
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
      data-screen-label="04 Work"
      style={{ padding: "160px 48px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <Eyebrow number="04" label="Recent work" />

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
              color: "var(--mm-fg-1)",
            }}
          >
            Sites I&apos;ve built.
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--mm-fg-2)",
              lineHeight: 1.5,
              maxWidth: 380,
            }}
          >
            Click any row. You&apos;ll see what was broken in that industry, what the site does about it, and the live URL.
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
      </div>
    </section>
  );
}
