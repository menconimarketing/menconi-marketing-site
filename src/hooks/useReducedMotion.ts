"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has reduced-motion preferences OR
 * is on a touch-only device (where custom cursor / magnetic effects
 * don't make sense).
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const touch = window.matchMedia("(pointer: coarse)");

    const update = () => setReduced(motion.matches || touch.matches);
    update();

    motion.addEventListener("change", update);
    touch.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      touch.removeEventListener("change", update);
    };
  }, []);

  return reduced;
}
