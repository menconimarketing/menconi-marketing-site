"use client";

import Spline from "@splinetool/react-spline";
import { useState } from "react";

type Props = {
  sceneUrl: string;
  className?: string;
};

export default function SplineScene({ sceneUrl, className = "" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!sceneUrl || failed) return null;

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Spline
        scene={sceneUrl}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.5s ease-out",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Hide Spline watermark (bottom right) */}
      <div
        className="absolute bottom-0 right-0 w-[160px] h-[50px] pointer-events-none"
        style={{ background: "var(--void)" }}
      />
    </div>
  );
}
