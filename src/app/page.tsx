import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import GradientHairline from "@/components/GradientHairline";

// Below-the-fold sections — lazy-loaded.
// WWP-grounded order:
//  Hero (recognition) → Problem (pain) → Audit (live skill proof)
//  → Mechanism (the system) → Proof (case studies)
//  → Founder (trust) → FAQ (objections) → Contact (action) → Footer
const Problem = dynamic(() => import("@/components/Problem"));
const PositioningAudit = dynamic(() => import("@/components/PositioningAudit"));
const Mechanism = dynamic(() => import("@/components/Mechanism"));
const Proof = dynamic(() => import("@/components/Proof"));
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
