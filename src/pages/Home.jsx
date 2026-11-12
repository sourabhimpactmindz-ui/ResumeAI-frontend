import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParticleField from "../components/ParticleField";
import HeroSection from "../sections/home/HeroSection";
import StatsSection from "../sections/home/StatsSection";
import StepsStackSection from "../sections/home/StepsStackSection";
import ScoreSection from "../sections/home/ScoreSection";
import FixesSection from "../sections/home/FixesSection";
import BeforeAfterSection from "../sections/home/BeforeAfterSection";
import MythsSection from "../sections/home/MythsSection";
import TestimonialsSection from "../sections/home/TestimonialsSection";
import FaqSection from "../sections/home/FaqSection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-deep-space text-c-100 overflow-x-hidden selection:bg-c-100 selection:text-c-900">
      <ParticleField count={36} />
      <Navbar />

      <main className="relative z-10 flex flex-col items-center w-full">
        <HeroSection />
        <StatsSection />
        <StepsStackSection />
        <ScoreSection />
        <FixesSection />
        <BeforeAfterSection />
        <MythsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}

