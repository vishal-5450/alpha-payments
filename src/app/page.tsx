import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StatsSection } from "@/components/home/StatsSection";
import { WhySection } from "@/components/home/WhySection";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/layout/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServicesSection />
      <ProductShowcase />
      <ProcessSection />
      <StatsSection />
      <WhySection />
      <Testimonials />
      <CTASection />
    </>
  );
}
