import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import NavPill from "@/components/NavPill";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import OurStory from "@/components/OurStory";
import HowWeWork from "@/components/HowWeWork";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen overflow-x-hidden" style={{ background: "var(--black-2)" }}>
        <CustomCursor />
        <NavPill />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <FeaturedProjects />
        <OurStory />
        <HowWeWork />
        <Testimonials />
        <CTASection />
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Index;
