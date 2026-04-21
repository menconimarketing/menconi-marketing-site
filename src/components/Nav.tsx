"use client";

import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

export default function Nav() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="border-b border-iron/50"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          background: "rgba(8, 9, 10, 0.8)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-14">
          <a
            href="#top"
            className="flex items-center transition-opacity duration-300 hover:opacity-70"
          >
            <img
              src="/brand/monogram/mm-white.svg"
              alt="Menconi Marketing"
              className="h-5 w-auto"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "#how-it-works", label: "How It Works" },
              { href: "#results", label: "Results" },
              { href: "#about", label: "About" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-silver hover:text-chalk transition-colors duration-300 text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <MagneticButton
              href="#contact"
              data-cursor="cta"
              strength={0.25}
              radius={70}
              className="relative bg-accent/10 text-accent border border-accent/20 px-5 py-2 text-sm font-semibold hover:bg-accent hover:text-void transition-all duration-300 inline-block"
            >
              Book a Call
            </MagneticButton>
          </div>

          <button
            className="md:hidden text-chalk"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="16" y2="12" />
                  <line x1="4" y1="17" x2="12" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-80" : "max-h-0"
        }`}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          background: "rgba(8, 9, 10, 0.95)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-4 border-b border-iron/30">
          {[
            { href: "#how-it-works", label: "How It Works" },
            { href: "#results", label: "Results" },
            { href: "#about", label: "About" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-bone text-lg hover:text-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="bg-accent text-void px-5 py-3 text-center font-bold mt-2 hover:brightness-110 transition-all"
          >
            Book a Call
          </a>
        </div>
      </div>

      {/* Bottom glow line */}
      {visible && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />
      )}
    </nav>
  );
}
