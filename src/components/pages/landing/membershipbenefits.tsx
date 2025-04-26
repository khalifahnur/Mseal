import { BenefitsPath } from "./benefitpath";
// where you use it
import dynamic from "next/dynamic"

const BackgroundParticles = dynamic(() => import("./benefitpath"), {
  ssr: false,
})
export function MembershipBenefits() {
  return (
      <BackgroundParticles />
  );
}
