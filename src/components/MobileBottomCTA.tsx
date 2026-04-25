"use client";

import { useEffect, useState } from "react";

export default function MobileBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      const ctaSection = document.getElementById("contact");
      // Hide when the visitor is already inside the CTA section
      const insideCTA = ctaSection
        ? ctaSection.getBoundingClientRect().top < window.innerHeight * 0.6
        : false;
      setVisible(past && !insideCTA);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 transition-all duration-400 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        background: "rgba(8, 9, 10, 0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderTop: "1px solid rgba(168, 176, 196, 0.25)",
      }}
    >
      <a
        href="#audit"
        className="flex items-center justify-center gap-2 w-full bg-accent text-void px-6 py-3.5 text-sm font-bold tracking-wide"
        style={{
          boxShadow: "0 0 30px rgba(168, 176, 196, 0.35)",
        }}
      >
        Audit my positioning
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 7h9M8 4l3 3-3 3" />
        </svg>
      </a>
    </div>
  );
}
