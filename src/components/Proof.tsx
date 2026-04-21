"use client";

import { useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteModal from "./SiteModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    name: "606 Property Services",
    trade: "Property Maintenance",
    location: "Chicago, IL",
    description: "Full website rebuild with lead capture and service pages",
    url: "https://606propertyservices.menconimarketing.com",
  },
  {
    name: "ParaBeach Plastering",
    trade: "Plastering",
    location: "Southern California",
    description: "Brand-new site build with portfolio showcase and booking",
    url: "https://parabeachplastering.menconimarketing.com",
  },
  {
    name: "Martinez Landscaping",
    trade: "Landscaping",
    location: "Riverside, CA",
    description: "Custom demo site with before/after project gallery",
    url: "https://martinezlandscaping.menconimarketing.com",
  },
];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: (typeof projects)[0];
  index: number;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;

    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    cardRef.current.style.setProperty("--mx", `${x * 100}%`);
    cardRef.current.style.setProperty("--my", `${y * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateZ(0)";
  }, []);

  return (
    <button
      ref={cardRef}
      onClick={onOpen}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="card"
      className={`project-card project-card-${index} group relative text-left transition-[border-color,background] duration-500`}
      style={{
        background: "rgba(15, 16, 18, 0.5)",
        border: "1px solid rgba(34, 35, 38, 0.6)",
        backdropFilter: "blur(8px)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Mouse-follow glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(94, 106, 210, 0.1), transparent 60%)",
        }}
      />

      {/* Project visual */}
      <div className="relative w-full aspect-[16/10] bg-smoke/50 overflow-hidden border-b border-iron/30">
        <div className="absolute inset-0 grid-bg opacity-30" />

        {/* Browser chrome preview */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-deep/80 border-b border-iron/40 flex items-center gap-1.5 px-3">
          <span className="w-2 h-2 rounded-full bg-iron" />
          <span className="w-2 h-2 rounded-full bg-iron" />
          <span className="w-2 h-2 rounded-full bg-iron" />
          <div className="flex-1 mx-3 h-3 bg-smoke/80 text-[9px] text-graphite px-2 flex items-center truncate">
            {project.url.replace(/^https?:\/\//, "")}
          </div>
        </div>

        <div className="absolute inset-0 pt-7 flex items-center justify-center">
          <div className="relative">
            <div className="w-12 h-12 border border-iron/50 rotate-45 group-hover:rotate-[225deg] group-hover:border-accent/60 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-accent/20 group-hover:bg-accent/50 rotate-45 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* "Click to view" overlay on hover */}
        <div className="absolute inset-0 bg-void/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pt-7">
          <div className="flex items-center gap-2 text-chalk text-sm font-medium">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <path d="M5 7h4M7 5v4" />
            </svg>
            Preview live site
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
      </div>

      <div className="p-7 relative z-10">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h3 className="font-[var(--font-syne)] text-chalk font-bold text-lg group-hover:text-white transition-colors duration-300">
            {project.name}
          </h3>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1"
          >
            <path d="M4 2h8v8M12 2L4 10" />
          </svg>
        </div>
        <p className="text-accent/70 text-sm mb-3 flex items-center gap-2">
          <span className="w-3 h-px bg-accent/50" />
          {project.trade} &mdash; {project.location}
        </p>
        <p className="text-silver text-sm leading-relaxed font-[var(--font-afacad)]">
          {project.description}
        </p>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(94, 106, 210, 0.3)",
        }}
      />
    </button>
  );
}

export default function Proof() {
  const container = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<(typeof projects)[0] | null>(null);

  useGSAP(
    () => {
      gsap.from(".proof-label", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      gsap.from(".proof-headline", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      gsap.from(".proof-intro", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".proof-intro",
          start: "top 85%",
        },
      });

      projects.forEach((_, i) => {
        gsap.from(`.project-card-${i}`, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.project-card-${i}`,
            start: "top 85%",
          },
        });
      });

      gsap.from(".proof-closing", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".proof-closing",
          start: "top 88%",
        },
      });
    },
    { scope: container }
  );

  return (
    <>
      <section id="results" ref={container} className="relative py-32 md:py-44 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent, var(--iron), transparent)",
          }}
        />

        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-6 relative z-10">
          <div className="mb-16">
            <p className="proof-label text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Real work
            </p>
            <h2
              className="proof-headline font-[var(--font-syne)] text-chalk font-extrabold leading-tight tracking-[-0.01em]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Judge the work. Not the pitch.
            </h2>
            <p className="proof-intro mt-6 text-silver text-lg max-w-[640px] leading-relaxed font-[var(--font-afacad)]">
              These are live sites I built for real contractors. Click any card to preview the site right here &mdash; no new tab, no leaving this page.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>

          <p className="proof-closing mt-14 text-silver text-center text-lg font-[var(--font-afacad)]">
            Every site above was built by one person. The same person who would
            build yours.
          </p>
        </div>
      </section>

      <SiteModal
        open={activeProject !== null}
        onClose={() => setActiveProject(null)}
        url={activeProject?.url ?? ""}
        name={activeProject?.name ?? ""}
        trade={activeProject?.trade ?? ""}
        location={activeProject?.location ?? ""}
      />
    </>
  );
}
