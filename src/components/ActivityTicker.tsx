"use client";

import { useEffect, useState } from "react";

// Anchor point for "last site shipped" — update when a real site ships.
const LAST_SHIP_DATE = new Date("2026-04-17T00:00:00Z");

function daysAgo(date: Date) {
  const ms = Date.now() - date.getTime();
  const days = Math.max(0, Math.floor(ms / 86_400_000));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default function ActivityTicker() {
  const [shipped, setShipped] = useState<string>("");

  useEffect(() => {
    setShipped(daysAgo(LAST_SHIP_DATE));
  }, []);

  return (
    <div
      className="inline-flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5"
      style={{
        background: "rgba(15, 16, 18, 0.7)",
        border: "1px solid rgba(168, 176, 196, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 bg-accent rounded-full animate-ping opacity-70" />
          <span className="relative w-2 h-2 bg-accent rounded-full" />
        </span>
        <span className="text-graphite text-[10px] uppercase tracking-[0.15em] font-bold">
          Live
        </span>
      </div>
      <div className="h-3 w-px bg-iron" />
      <div className="flex items-center gap-2 text-xs">
        <span className="text-graphite">Last site shipped</span>
        <span className="text-chalk font-semibold">{shipped || "\u2014"}</span>
      </div>
      <div className="hidden sm:block h-3 w-px bg-iron" />
      <div className="hidden sm:flex items-center gap-2 text-xs">
        <span className="text-graphite">Active builds</span>
        <span className="text-chalk font-semibold">2</span>
      </div>
    </div>
  );
}
