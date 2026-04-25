import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import GradientHairline from "@/components/GradientHairline";

// Below-the-fold sections — lazy-loaded.
// Order is WWP-grounded:
//  Hero (recognition) → Problem (pain named) → Audit (live proof of skill)
//  → Mechanism (the system) → Proof (case studies) → Calculator (desire)
//  → Founder (trust) → FAQ (objections) → Contact (action) → Footer
const Problem = dynamic(() => import("@/components/Problem"));
const PositioningAudit = dynamic(() => import("@/components/PositioningAudit"));
const Mechanism = dynamic(() => import("@/components/Mechanism"));
const Proof = dynamic(() => import("@/components/Proof"));
const Calculator = dynamic(() => import("@/components/Calculator"));
const Difference = dynamic(() => import("@/components/Difference"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));
const MobileBottomCTA = dynamic(() => import("@/components/MobileBottomCTA"));

export default function Home() {
  return (
    <>
      <main>
        <Nav />
        <Hero />
        <GradientHairline />
        <Problem />
        <GradientHairline />
        <PositioningAudit />
        <GradientHairline />
        <Mechanism />
        <GradientHairline />
        <Proof />
        <GradientHairline />
        <Calculator />
        <GradientHairline />
        <Difference />
        <GradientHairline />
        <FAQ />
        <GradientHairline />
        <CTA />
        <Footer />
      </main>
      <MobileBottomCTA />
    </>
  );
}
