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
  summary: string;
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
    summary:
      "Active client. Site built around Matthew's full-service property maintenance offer — the only company in his market built around landlords + investors instead of homeowners. Ongoing engagement.",
    slides: [
      {
        caption: "Hero — landlord-direct positioning",
        bg: "linear-gradient(135deg,#1F1F1F 0%,#2A2A2A 50%,#0A0A0A 100%)",
      },
      {
        caption: "Service grid + lead capture",
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
    summary:
      "Speculative build. Built for Cesar Cruz as part of outreach — full positioning + custom site demonstrating the kind of work I'd do on a paid engagement. Not yet engaged.",
    slides: [
      {
        caption: "Stucco-specialist hero",
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
    summary:
      "Speculative build. Full landscaping site with a before/after gallery angle — sample of what a paid engagement looks like for residential landscapers in California. Not yet engaged.",
    slides: [
      {
        caption: "Before/after gallery hero",
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
    summary:
      "Speculative build. Local lawn-care site demonstrating a route-based recurring service positioning angle. Not yet engaged.",
    slides: [
      {
        caption: "Recurring-service hero",
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
            {project.status === "live" ? "Active engagement" : "Demo build"}
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
        <Eyebrow number="06" label="Recent work" />

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
            One live client.
            <br />
            <span style={{ color: "var(--mm-fg-3-inv)" }}>
              The rest are sites I built to demonstrate how I work.
            </span>
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
            I&apos;m new. I&apos;m honest about it. Click any row to see the actual site I built and what I&apos;d ship for you.
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

        {/* Honest closing line — no fake testimonial */}
        <p
          style={{
            margin: "64px 0 0",
            fontSize: 16,
            color: "var(--mm-fg-2)",
            lineHeight: 1.55,
            maxWidth: 720,
            paddingTop: 48,
            borderTop: "1px solid var(--mm-charcoal)",
          }}
        >
          You&apos;re looking at the actual state of my client list. One paying client (606 Property Services in Chicago — Matthew). Three more sites built spec for prospects I&apos;m actively talking to. Real work, real URLs, no inflated case studies.
        </p>
      </div>
    </section>
  );
}
