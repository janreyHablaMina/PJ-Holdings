import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StorytellingSection from "@/components/StorytellingSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import ServicesCapabilities from "@/components/ServicesCapabilities";
import TestimonialsMetrics from "@/components/TestimonialsMetrics";
import ProjectEstimatorSection from "@/components/ProjectEstimatorSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#06070a] text-zinc-100 flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Floating Navigation */}
      <Navbar />

      {/* Hero Section with Interactive 3D WebGL Canvas */}
      <HeroSection />

      {/* Brand Storytelling & Philosophy */}
      <StorytellingSection />

      {/* Selected Work & Case Studies Showcase */}
      <PortfolioShowcase />

      {/* Core Capabilities & Disciplines */}
      <ServicesCapabilities />

      {/* Impact, Valuation Metrics & Testimonials */}
      <TestimonialsMetrics />

      {/* Interactive Project Scope & Estimator Studio */}
      <ProjectEstimatorSection />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
