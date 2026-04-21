"use client";

import { CSSProperties, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

type Props = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  strength?: number;
  radius?: number;
  style?: CSSProperties;
  type?: "button" | "submit";
  "data-cursor"?: string;
};

export default function MagneticButton({
  href,
  onClick,
  className = "",
  children,
  strength = 0.35,
  radius = 110,
  style,
  type,
  ...rest
}: Props) {
  const ref = useMagnetic<HTMLDivElement>({ strength, radius });

  const inner = href ? (
    <a href={href} className={className} style={style} data-cursor={rest["data-cursor"]}>
      {children}
    </a>
  ) : (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={className}
      style={style}
      data-cursor={rest["data-cursor"]}
    >
      {children}
    </button>
  );

  return (
    <div ref={ref} className="magnetic-wrap">
      {inner}
    </div>
  );
}
