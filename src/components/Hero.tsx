"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas";
import SplineScene from "./SplineScene";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SPLINE_SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const mouseTarget = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    mouseTarget.current = { x, y };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      setMouse((prev) => ({
        x: prev.x + (mouseTarget.current.x - prev.x) * 0.06,
        y: prev.y + (mouseTarget.current.y - prev.y) * 0.06,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-word", {
        y: 120,
        rotateX: -80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.06,
      })
        .from(".hero-sub", { y: 50, opacity: 0, duration: 1 }, "-=0.5")
        .from(".hero-cta-wrap", { y: 40, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-micro", { opacity: 0, duration: 0.8 }, "-=0.3")
        .from(
          ".hero-grid-v",
          {
            scaleY: 0,
            duration: 1.6,
            stagger: 0.06,
            ease: "power2.inOut",
          },
          0.3
        )
        .from(
          ".hero-grid-h",
          {
            scaleX: 0,
            duration: 1.6,
            stagger: 0.06,
            ease: "power2.inOut",
          },
          0.4
        )
        .from(
          ".hero-orb",
          { scale: 0, opacity: 0, duration: 2, ease: "power2.out" },
          0.2
        )
        .from(
          ".hero-particle",
          {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: { each: 0.1, from: "random" },
          },
          0.8
        );

      // Scroll-driven letter explosion \u2014 each .hero-word scatters outward
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      words.forEach((el) => {
        // Random direction + rotation for each word
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 300;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance * 0.6 - 100; // bias upward
        const rot = (Math.random() - 0.5) * 180;

        gsap.to(el, {
          x: dx,
          y: dy,
          rotation: rot,
          scale: 0.5 + Math.random() * 0.5,
          opacity: 0,
          filter: "blur(6px)",
          ease: "power2.in",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      // Sub-text, CTA, micro all just lift + fade
      gsap.to([".hero-sub", ".hero-cta-wrap", ".hero-micro"], {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "70% top",
          scrub: 1.5,
        },
      });

      gsap.to(".hero-bg-layer", {
        y: 200,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Word rotator — slot-machine through 4 words, lands on "position"
      gsap.set(".hero-rotator", { y: 0 });
      gsap.to(".hero-rotator span", {
        opacity: 1,
        duration: 0.001,
      });
      const rotateWords = gsap.timeline({ delay: 1.4 });
      // Each word is 1em tall, stacked vertically. Slide up to reveal next.
      rotateWords
        .to(".hero-rotator", { y: "-1em", duration: 0.4, ease: "power3.inOut" })
        .to(".hero-rotator", { y: "-2em", duration: 0.4, ease: "power3.inOut", delay: 0.2 })
        .to(".hero-rotator", { y: "-3em", duration: 0.5, ease: "power3.out", delay: 0.2 });
    },
    { scope: container }
  );

  return (
    <section
      id="top"
      ref={container}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D hero — Spline if configured, else native bloom-rendered wave */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {SPLINE_SCENE_URL ? (
          <SplineScene sceneUrl={SPLINE_SCENE_URL} />
        ) : (
          <HeroCanvas />
        )}
      </div>

      {/* Gradient mesh background - responds to mouse */}
      <div className="hero-bg-layer absolute inset-0 pointer-events-none">
        <div
          className="hero-orb absolute w-[800px] h-[800px] opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--accent) 0%, rgba(94, 106, 210, 0.3) 30%, transparent 70%)",
            top: `calc(40% + ${mouse.y * 30}px)`,
            left: `calc(50% + ${mouse.x * 40}px)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="hero-orb absolute w-[600px] h-[600px] opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-bright) 0%, transparent 70%)",
            top: `calc(60% + ${mouse.y * -20}px)`,
            left: `calc(30% + ${mouse.x * -25}px)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="hero-orb absolute w-[500px] h-[500px] opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle, rgba(123, 133, 232, 0.8) 0%, transparent 70%)",
            top: `calc(30% + ${mouse.y * 15}px)`,
            left: `calc(70% + ${mouse.x * 20}px)`,
            transform: "translate(-50%, -50%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Grid lines - vertical */}
      <div className="absolute inset-0 flex justify-between px-[8%] pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="hero-grid-v w-px h-full origin-top"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, rgba(34, 35, 38, ${0.15 + i * 0.03}) 20%, rgba(34, 35, 38, ${0.1 + i * 0.02}) 80%, transparent 100%)`,
              transform: `translateX(${mouse.x * (3 + i * 1.5)}px)`,
            }}
          />
        ))}
      </div>

      {/* Grid lines - horizontal */}
      <div className="absolute inset-0 flex flex-col justify-between py-[12%] pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="hero-grid-h w-full h-px origin-left"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(34, 35, 38, ${0.12 + i * 0.03}), transparent)`,
              transform: `translateY(${mouse.y * (2 + i * 1.2)}px)`,
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      {[
        { top: "15%", left: "12%", size: 3, speed: 25 },
        { top: "22%", left: "78%", size: 2, speed: 35 },
        { top: "45%", left: "8%", size: 2.5, speed: 20 },
        { top: "65%", left: "85%", size: 2, speed: 30 },
        { top: "75%", left: "20%", size: 1.5, speed: 40 },
        { top: "35%", left: "90%", size: 3, speed: 15 },
        { top: "80%", left: "55%", size: 2, speed: 28 },
        { top: "10%", left: "45%", size: 1.5, speed: 22 },
      ].map((p, i) => (
        <div
          key={i}
          className="hero-particle absolute pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "var(--accent)",
            opacity: 0.3 + (i % 3) * 0.15,
            transform: `translate(${mouse.x * p.speed}px, ${mouse.y * p.speed}px)`,
            transition: "transform 0.1s linear",
            boxShadow: `0 0 ${p.size * 4}px rgba(94, 106, 210, 0.4)`,
          }}
        />
      ))}

      {/* Geometric shapes */}
      <div
        className="hero-particle absolute top-[18%] right-[12%] w-20 h-20 border border-iron/30 rotate-45 pointer-events-none"
        style={{
          transform: `rotate(45deg) translate(${mouse.x * 15}px, ${mouse.y * 15}px)`,
        }}
      />
      <div
        className="hero-particle absolute bottom-[22%] left-[10%] w-16 h-16 border border-accent/10 pointer-events-none"
        style={{
          transform: `rotate(${12 + mouse.x * 5}deg) translate(${mouse.x * -20}px, ${mouse.y * -20}px)`,
        }}
      />

      {/* Main content */}
      <div className="hero-content relative z-10 max-w-[1100px] mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p className="mb-8 text-accent text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
          <span className="hero-word inline-block">Strategic</span>{" "}
          <span className="hero-word inline-block">Marketing</span>{" "}
          <span className="hero-word inline-block">Positioning</span>{" "}
          <span className="hero-word inline-block">Partner</span>
        </p>

        <h1
          className="font-[var(--font-syne)] text-chalk font-extrabold leading-[1.02] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 5.2rem)",
            perspective: "1000px",
          }}
        >
          <span className="hero-word inline-block">You&nbsp;</span>
          <span className="hero-word inline-block">don&apos;t&nbsp;</span>
          <span className="hero-word inline-block">need&nbsp;</span>
          <span className="hero-word inline-block">more&nbsp;</span>
          <span className="hero-word inline-block">marketing.</span>
          <br />
          <span className="hero-word inline-block text-gradient">You&nbsp;</span>
          <span className="hero-word inline-block text-gradient">need&nbsp;</span>
          <span className="hero-word inline-block text-gradient">a&nbsp;</span>
          <span
            className="hero-word inline-block text-gradient align-baseline overflow-hidden"
            style={{ height: "1em", verticalAlign: "bottom" }}
          >
            <span className="hero-rotator inline-flex flex-col leading-[1.02]">
              <span className="opacity-0">edge</span>
              <span className="opacity-0">leverage</span>
              <span className="opacity-0">personality</span>
              <span>position</span>
            </span>
          </span>
          <br />
          <span className="hero-word inline-block text-gradient">to&nbsp;</span>
          <span className="hero-word inline-block text-gradient">market.</span>
        </h1>

        <p className="hero-sub mt-8 text-silver text-lg md:text-xl max-w-[680px] mx-auto leading-relaxed font-[var(--font-afacad)]">
          Most marketing money disappears because the business has no real position &mdash; they look like every competitor on the block. I find your unowned space, then build the website, ads, and automation that prove you own it.
        </p>

        <div className="hero-cta-wrap mt-12 flex flex-col items-center gap-5">
          <MagneticButton
            href="#audit"
            data-cursor="cta"
            className="group relative inline-flex items-center gap-3 bg-accent text-void px-10 py-4 text-lg font-bold transition-all duration-300"
            style={{
              boxShadow:
                "0 0 40px rgba(94, 106, 210, 0.2), 0 0 80px rgba(94, 106, 210, 0.1)",
            }}
          >
            Audit my positioning
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </MagneticButton>
          <p className="hero-micro text-graphite text-sm tracking-wide">
            Free. 15 minutes. No pitch. No deck.
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-5 h-8 border border-silver/40 flex justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-silver animate-bounce" />
        </div>
      </div>
    </section>
  );
}
