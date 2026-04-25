"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#audit", label: "Audit" },
  { href: "#how-it-works", label: "Process" },
  { href: "#results", label: "Work" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--mm-border-soft)"
          : "1px solid transparent",
        transition:
          "background 200ms cubic-bezier(0.2,0,0,1), border-color 200ms cubic-bezier(0.2,0,0,1)",
      }}
    >
      <div
        className="max-w-[1400px] mx-auto flex items-center justify-between"
        style={{ padding: "18px 48px" }}
      >
        <a
          href="#top"
          className="flex items-center"
          style={{ transition: "opacity 200ms cubic-bezier(0.2,0,0,1)" }}
        >
          <img
            src="/brand/wordmark/wordmark-white.svg"
            alt="Menconi Marketing"
            style={{ height: 22, width: "auto" }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ gap: 36 }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: "var(--mm-fg-1)",
                textDecoration: "none",
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "color 200ms cubic-bezier(0.2,0,0,1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--mm-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--mm-fg-1)")
              }
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mm-btn-primary"
            style={{ fontSize: 13, padding: "10px 18px" }}
          >
            Book a call <span aria-hidden>→</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ background: "transparent", border: "none", color: "var(--mm-fg-1)" }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="butt"
          >
            {mobileOpen ? (
              <path d="M5 5l12 12M5 17L17 5" />
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" />
                <line x1="3" y1="11" x2="19" y2="11" />
                <line x1="3" y1="15" x2="19" y2="15" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden"
        style={{
          maxHeight: mobileOpen ? 360 : 0,
          transition: "max-height 280ms cubic-bezier(0.2,0,0,1)",
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: mobileOpen ? "1px solid var(--mm-border-soft)" : "none",
        }}
      >
        <div
          className="flex flex-col"
          style={{ padding: "16px 32px 32px", gap: 18 }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: "var(--mm-fg-1)",
                textDecoration: "none",
                fontSize: 18,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mm-btn-primary"
            style={{ fontSize: 14, padding: "14px 20px", justifyContent: "center", marginTop: 12 }}
          >
            Book a call <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
