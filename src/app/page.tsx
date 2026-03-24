import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/landing/hero-section";
import FeaturedProjects from "@/components/landing/featured-projects";
import HowItWorks from "@/components/landing/how-it-works";
import WhyFundTech from "@/components/landing/why-fund-tech";
import UpcomingEvents from "@/components/landing/upcoming-events";
import Testimonials from "@/components/landing/testimonials";
import CTASection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedProjects />
      <HowItWorks />
      <WhyFundTech />
      <UpcomingEvents />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
