import BrandIntro from "@/components/BrandIntro";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PositioningAudit from "@/components/PositioningAudit";
import Problem from "@/components/Problem";
import Mechanism from "@/components/Mechanism";
import Proof from "@/components/Proof";
import Difference from "@/components/Difference";
import FAQ from "@/components/FAQ";
import Calculator from "@/components/Calculator";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import MobileBottomCTA from "@/components/MobileBottomCTA";

export default function Home() {
  return (
    <>
      <BrandIntro />
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
