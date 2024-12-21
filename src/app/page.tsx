import MembershipSection from "@/components/pages/landing/Container";
import LandingHeader from "@/components/pages/landing/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full bg-white font-[family-name:var(--font-geist-sans)]">
      <LandingHeader />
      <MembershipSection />
    </div>
  );
}
