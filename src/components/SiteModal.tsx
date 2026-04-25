"use client";

import { useEffect, useRef } from "react";

type SiteModalProps = {
  open: boolean;
  onClose: () => void;
  url: string;
  name: string;
  trade: string;
  location: string;
};

export default function SiteModal({
  open,
  onClose,
  url,
  name,
  trade,
  location,
}: SiteModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.3s_ease-out]"
      style={{
        background: "rgba(8, 9, 10, 0.85)",
        backdropFilter: "blur(12px)",
      }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* MM brand bar — top (so viewer always knows they're still on Nico's site) */}
      <div className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-6 border-b border-iron/50"
        style={{ background: "rgba(15, 16, 18, 0.9)", backdropFilter: "blur(20px)" }}
      >
        <div className="flex items-center gap-3">
          <img src="/brand/monogram/mm-white.svg" alt="MM" className="h-5 w-auto" />
          <span className="text-silver text-xs tracking-[0.2em] uppercase hidden md:inline">
            Preview
          </span>
        </div>
        <button
          onClick={onClose}
          className="group flex items-center gap-2 text-silver hover:text-chalk transition-colors duration-300 text-sm"
        >
          <span className="hidden md:inline tracking-wide">Close Preview</span>
          <span className="w-8 h-8 flex items-center justify-center border border-iron group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3l8 8M3 11l8-8" />
            </svg>
          </span>
        </button>
      </div>

      {/* Modal frame */}
      <div
        className="relative w-full max-w-[1400px] h-[calc(100vh-8rem)] mt-8 flex flex-col animate-[scaleIn_0.4s_cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: "var(--void)",
          border: "1px solid rgba(168, 176, 196, 0.25)",
          boxShadow:
            "0 0 60px rgba(168, 176, 196, 0.15), 0 0 120px rgba(168, 176, 196, 0.08)",
        }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-iron/50 bg-deep shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-iron" />
            <span className="w-3 h-3 rounded-full bg-iron" />
            <span className="w-3 h-3 rounded-full bg-iron" />
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="bg-smoke px-4 py-1.5 text-xs text-silver truncate flex items-center gap-2"
              style={{ border: "1px solid rgba(34, 35, 38, 0.6)" }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-graphite shrink-0">
                <rect x="2" y="4" width="6" height="5" />
                <path d="M3.5 4V3a1.5 1.5 0 013 0v1" />
              </svg>
              {url.replace(/^https?:\/\//, "")}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 text-right">
            <div>
              <p className="text-chalk text-xs font-bold font-[var(--font-afacad)]">{name}</p>
              <p className="text-graphite text-[10px]">{trade} &mdash; {location}</p>
            </div>
          </div>
        </div>

        {/* Iframe */}
        <div className="flex-1 bg-white overflow-hidden relative">
          <iframe
            src={url}
            title={name}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        {/* Bottom bar */}
        <div className="px-5 py-3 border-t border-iron/50 bg-deep flex items-center justify-between shrink-0">
          <p className="text-graphite text-xs">
            Live site &mdash; built by Menconi Marketing
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-bright text-xs font-medium flex items-center gap-1.5 transition-colors duration-300"
          >
            Open in new tab
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 1h6v6M9 1L4 6M3 4v5H1" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
