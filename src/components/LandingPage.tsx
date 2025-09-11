"use client";

import MembershipSection from "@/components/pages/landing/Container";
import { CTASection } from "@/components/pages/landing/cta";
import { FAQSection } from "@/components/pages/landing/faqsection";
import { Footer } from "@/components/pages/landing/Footer";
import LandingHeader from "@/components/pages/landing/Header";
import { MembershipBenefits } from "@/components/pages/landing/membershipbenefits";
import Pricing from "@/components/pages/landing/pricesection";
import Testimonials from "@/components/pages/landing/testimonial";
import TrustedSponsors from "@/components/pages/landing/TrustedSPonsor";
import { useEffect, useState } from "react";
import AuthPage from "./Forms/AuthPage";
import CookieConsentModal from "./pages/landing/cookieConsent";

export default function LandingPage() {
  const [showAUth, setShowAuth] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowCookieModal(true);
    }
  }, []);

  if (showAUth) {
    return (
      <div className="relative">
        <button
          className="absolute hidden md:block md:top-10 md:left-35 z-999 hover:underline bg-transparent cursor-pointer"
          onClick={() => setShowAuth(false)}
        >
          ← Back to Home
        </button>
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="h-full bg-[#f7f7f7] font-[family-name:var(--font-geist-sans)]">
      <LandingHeader
        onLoginClick={() => setShowAuth(true)}
        onSignUpClick={() => setShowAuth(true)}
      />
      <main className="overflow-x-hidden">
        <MembershipSection
          onLoginClick={() => setShowAuth(true)}
        />
        <TrustedSponsors />
        <MembershipBenefits />
        <Pricing onLoginClick={() => setShowAuth(true)}/>
        <CTASection />
        <Testimonials />
        <FAQSection />
      </main>
      <Footer />
      <CookieConsentModal
        isOpen={showCookieModal}
        onOpenChange={setShowCookieModal}
      />
    </div>
  );
}
