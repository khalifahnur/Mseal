import MembershipSection from "@/components/pages/landing/Container";
import { CTASection } from "@/components/pages/landing/cta";
import { FAQSection } from "@/components/pages/landing/faqsection";
import { Footer } from "@/components/pages/landing/Footer";
import LandingHeader from "@/components/pages/landing/Header";
import { MembershipBenefits } from "@/components/pages/landing/membershipbenefits";
import { PricingSection } from "@/components/pages/landing/pricesection";
import { Testimonials } from "@/components/pages/landing/testimonial";

export default function Home() {
  return (
    <div className="h-full bg-[#f7f7f7] font-[family-name:var(--font-geist-sans)]">
      <LandingHeader />
      <MembershipSection />
      <MembershipBenefits />
      <PricingSection />
      <CTASection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}
