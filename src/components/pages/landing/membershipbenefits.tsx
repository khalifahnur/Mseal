import dynamic from "next/dynamic"

const BackgroundParticles = dynamic(() => import("./benefitpath"), {
  ssr: false,
})
export function MembershipBenefits() {
  return (
      <BackgroundParticles />
  );
}
