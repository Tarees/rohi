import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Product3DCarousel from "@/components/Product3DCarousel";
import EngineeringShowcase from "@/components/EngineeringShowcase";
import OwnershipSection from "@/components/OwnershipSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollRail from "@/components/ScrollRail";
import ScrollChoreography from "@/components/ScrollChoreography";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-canvas text-white flex flex-col select-none selection:bg-red-600 selection:text-white overflow-x-clip">
        {/* Scroll-triggered reveal animations for [data-choreo] / [data-reveal] */}
        <ScrollChoreography />

        {/* Right-edge section tracker */}
        <ScrollRail />

        <Navbar />

        {/* 1. Hero: orbiting bike cards around the main bike */}
        <HeroSection />

        {/* 2. 3D rotating product carousel */}
        <div id="turntable">
          <Product3DCarousel />
        </div>

        {/* 3. Engineering showcase & why ROHI is better */}
        <EngineeringShowcase />

        {/* 4. Owning a ROHI: dealers, parts, warranty, service */}
        <OwnershipSection />

        {/* 5. Common questions (also published as FAQ structured data) */}
        <FaqSection />

        <Footer />
      </div>
    </SmoothScroll>
  );
}
