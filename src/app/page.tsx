import MembershipSection from "@/components/pages/landing/Container";
import { CTASection } from "@/components/pages/landing/cta";
import { FAQSection } from "@/components/pages/landing/faqsection";
import { Footer } from "@/components/pages/landing/Footer";
import LandingHeader from "@/components/pages/landing/Header";
import { MembershipBenefits } from "@/components/pages/landing/membershipbenefits";
import Pricing from "@/components/pages/landing/pricesection";
import Testimonials from "@/components/pages/landing/testimonial";
import TrustedSponsors from "@/components/pages/landing/TrustedSPonsor";


export default function Home() {
  return (
    <div className="h-full bg-[#f7f7f7] font-[family-name:var(--font-geist-sans)]">
      <LandingHeader />
      <main className="overflow-x-hidden">
      <MembershipSection />
      <TrustedSponsors />
      <MembershipBenefits />
      <Pricing />
      <CTASection />
      <Testimonials />
      <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
