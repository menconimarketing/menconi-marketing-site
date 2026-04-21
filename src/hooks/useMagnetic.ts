"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  strength?: number; // 0..1, how much to pull
  radius?: number; // px from center to start pulling
};

/**
 * Magnetic hover hook — when the cursor enters `radius` px of the element,
 * the element translates toward the cursor by `strength * distance`.
 * Springs back on leave. No-ops on touch / reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.4,
  radius = 120,
}: Options = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const animate = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (
        Math.abs(target.x - current.x) > 0.05 ||
        Math.abs(target.y - current.y) > 0.05
      ) {
        raf = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(raf);
      }
    };

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < radius) {
        target.x = dx * strength;
        target.y = dy * strength;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      } else if (current.x !== 0 || current.y !== 0) {
        target.x = 0;
        target.y = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      }
    };

    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, radius, reduced]);

  return ref;
}
