"use client";

import { useEffect, useRef, useState } from "react";

export default function BrandIntro() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show only once per session
    const seen = sessionStorage.getItem("mm-intro-seen");
    if (seen) {
      setShow(false);
      return;
    }
    // Lock scroll while intro plays
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleEnded = () => {
    setFading(true);
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("mm-intro-seen", "1");
      document.body.style.overflow = "";
    }, 700);
  };

  const handleSkip = () => {
    setFading(true);
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("mm-intro-seen", "1");
      document.body.style.overflow = "";
    }, 400);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-void flex items-center justify-center transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="w-full h-full object-cover"
      >
        <source src="/brand/intro.mp4" type="video/mp4" />
      </video>

      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-silver/60 hover:text-chalk text-xs tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2"
      >
        Skip
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 3l6 6M3 9l6-6" />
        </svg>
      </button>
    </div>
  );
}
