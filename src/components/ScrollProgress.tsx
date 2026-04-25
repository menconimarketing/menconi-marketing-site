"use client";

import { useEffect } from "react";

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".mm-scroll-progress");
    if (!bar) return;

    let raf = 0;
    const update = () => {
      const scrolled = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      const pct = Math.min(100, Math.max(0, (scrolled / max) * 100));
      bar.style.setProperty("--mm-scroll", `${pct}%`);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="mm-scroll-progress" aria-hidden />;
}
