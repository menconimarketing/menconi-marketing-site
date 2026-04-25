import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

// Below-the-fold sections lazy-loaded so the initial JS bundle is tiny.
// SSR stays ON so HTML is still pre-rendered for SEO + first paint.
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
      <main className="noise">
        <Nav />
        <Hero />
        <PositioningAudit />
        <Problem />
        <Mechanism />
        <Proof />
        <Difference />
        <FAQ />
        <Calculator />
        <CTA />
        <Footer />
      </main>
      <MobileBottomCTA />
    </>
  );
}
