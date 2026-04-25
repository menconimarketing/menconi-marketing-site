import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import GradientHairline from "@/components/GradientHairline";

const PositioningAudit = dynamic(() => import("@/components/PositioningAudit"));
const Problem = dynamic(() => import("@/components/Problem"));
const Mechanism = dynamic(() => import("@/components/Mechanism"));
const Proof = dynamic(() => import("@/components/Proof"));
const Difference = dynamic(() => import("@/components/Difference"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Calculator = dynamic(() => import("@/components/Calculator"));
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
        <PositioningAudit />
        <GradientHairline />
        <Problem />
        <GradientHairline />
        <Mechanism />
        <GradientHairline />
        <Proof />
        <GradientHairline />
        <Difference />
        <GradientHairline />
        <FAQ />
        <GradientHairline />
        <Calculator />
        <GradientHairline />
        <CTA />
        <GradientHairline />
        <Footer />
      </main>
      <MobileBottomCTA />
    </>
  );
}
