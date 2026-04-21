"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const trustBullets = [
  "You work directly with the person who builds everything",
  "Nothing gets outsourced or passed downstream",
  "Your site, your code, your data \u2014 you own all of it",
  "No long-term contracts. Leave whenever you want.",
];

export default function Difference() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".diff-label", {
        x: -30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      gsap.from(".diff-headline", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".diff-headline",
          start: "top 85%",
        },
      });

      gsap.from(".diff-photo", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".diff-photo",
          start: "top 85%",
        },
      });

      gsap.from(".diff-corner", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".diff-photo",
          start: "top 80%",
        },
      });

      gsap.from(".diff-body", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".diff-body",
          start: "top 85%",
        },
      });

      trustBullets.forEach((_, i) => {
        gsap.from(`.trust-bullet-${i}`, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.trust-bullet-${i}`,
            start: "top 88%",
          },
        });
      });

      gsap.from(".diff-closing", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".diff-closing",
          start: "top 88%",
        },
      });

      // Parallax between photo and text
      gsap.to(".diff-photo-wrap", {
        y: -40,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".diff-text-wrap", {
        y: -20,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      id="about"
      ref={container}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--iron), transparent)",
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] opacity-[0.03] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left — visual */}
          <div className="diff-photo-wrap">
            <div
              className="diff-photo relative aspect-[4/5] overflow-hidden group"
              style={{
                background: "rgba(15, 16, 18, 0.6)",
                border: "1px solid rgba(34, 35, 38, 0.5)",
              }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-24 h-24 mx-auto mb-4 border border-accent/30 flex items-center justify-center bg-accent/5"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  >
                    <span className="font-[var(--font-syne)] text-accent text-2xl font-bold">
                      NM
                    </span>
                  </div>
                  <p className="text-graphite text-xs tracking-wide">
                    Photo placeholder
                  </p>
                </div>
              </div>

              {/* Corner accents */}
              <div className="diff-corner absolute top-3 left-3 w-8 h-8 border-t border-l border-accent/50" />
              <div className="diff-corner absolute top-3 right-3 w-8 h-8 border-t border-r border-accent/50" />
              <div className="diff-corner absolute bottom-3 left-3 w-8 h-8 border-b border-l border-accent/50" />
              <div className="diff-corner absolute bottom-3 right-3 w-8 h-8 border-b border-r border-accent/50" />

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/20 group-hover:bg-accent/40 transition-colors duration-500" />
            </div>
          </div>

          {/* Right — copy */}
          <div className="diff-text-wrap">
            <p className="diff-label text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Who you&apos;re working with
            </p>
            <h2
              className="diff-headline font-[var(--font-syne)] text-chalk font-extrabold leading-tight tracking-[-0.01em] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Not your agency.
              <br />
              <span className="text-gradient">Your positioning partner.</span>
            </h2>

            <div className="diff-body space-y-4 text-silver text-lg leading-relaxed mb-10 font-[var(--font-afacad)]">
              <p>
                I&apos;m Nico Menconi. I run Menconi Marketing out of Chicago.
              </p>
              <p>
                At most agencies, you talk to a salesperson. Then you get handed to a coordinator. Then your project gets passed to a designer you&apos;ll never meet. Three weeks in, no one remembers what you said on the first call &mdash; let alone what makes your business different.
              </p>
              <p>
                That doesn&apos;t happen here. I&apos;m the one on the call. I&apos;m the one who finds your position. I&apos;m the one who builds your site. I&apos;m the one who sets up your ads. When you text me a question, I text you back.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {trustBullets.map((bullet, i) => (
                <div
                  key={i}
                  className={`trust-bullet-${i} flex items-start gap-3 group/bullet`}
                >
                  <div className="w-1.5 h-1.5 bg-accent mt-2.5 shrink-0 group-hover/bullet:shadow-[0_0_8px_rgba(94,106,210,0.5)] transition-shadow duration-300" />
                  <p className="text-bone font-[var(--font-afacad)] group-hover/bullet:text-chalk transition-colors duration-300">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <p className="diff-closing text-chalk text-xl font-semibold font-[var(--font-syne)] tracking-tight">
              Big companies have layers. I have your phone number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
