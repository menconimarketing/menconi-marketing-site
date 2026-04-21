"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Mode = "default" | "cta" | "link" | "card" | "text";

const labelFor: Partial<Record<Mode, string>> = {
  card: "Preview",
  cta: "Click",
};

export default function Cursor() {
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (reduced) return;
    setMounted(true);

    document.documentElement.classList.add("custom-cursor");

    const target = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const tick = () => {
      dot.x += (target.x - dot.x) * 0.6;
      dot.y += (target.y - dot.y) * 0.6;
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const cursorAttr = t.closest("[data-cursor]")?.getAttribute("data-cursor") as Mode | null;
      if (cursorAttr) {
        setMode(cursorAttr);
        return;
      }
      // Inferred fallbacks
      if (t.closest("button, a")) {
        setMode("link");
        return;
      }
      setMode("default");
    };

    const handleDown = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0.4";
    };
    const handleUp = () => {
      if (ringRef.current) ringRef.current.style.opacity = "";
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [reduced]);

  if (reduced || !mounted) return null;

  const ringClass =
    mode === "default"
      ? "w-9 h-9"
      : mode === "link"
      ? "w-12 h-12"
      : mode === "cta"
      ? "px-4 h-9"
      : mode === "card"
      ? "px-4 h-9"
      : "w-1 h-7";

  const showLabel = mode === "card" || mode === "cta";

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none w-1.5 h-1.5 rounded-full bg-chalk"
        style={{ mixBlendMode: "difference", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 z-[200] pointer-events-none rounded-full border border-chalk flex items-center justify-center transition-[width,height,padding,border-radius,background] duration-300 ease-out ${ringClass}`}
        style={{
          mixBlendMode: "difference",
          willChange: "transform",
          borderRadius: showLabel ? "9999px" : "9999px",
        }}
      >
        {showLabel && (
          <span className="text-chalk text-[10px] uppercase tracking-[0.15em] font-semibold whitespace-nowrap">
            {labelFor[mode]}
          </span>
        )}
      </div>
    </>
  );
}
