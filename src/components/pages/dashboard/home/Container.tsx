"use client";

import { MembershipCard } from "@/components/pages/dashboard/home/membershipcard";
import ActiveTickets from "./ActiveTickets";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import NoMembership from "./NoMembership";
import { useAuth } from "@/components/Forms/AuthContext";
import LatestTransaction from "./LatestTransaction";
import UpcomingMatches from "./UpcomingMatches";

export default function Home() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="space-y-1">
      <section className="flex flex-row justify-between" id="welcome-header">
        <h1 className="text-xs font-semibold md:text-xl text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#fae115] to-black">
          Welcome, {user?.firstName} !
        </h1>
        <div className="flex flex-row justify-between gap-5">
          <p className="text-xs text-muted-foreground md:text-base">
            {new Date().toLocaleDateString()} -{" "}
            {new Date().toLocaleTimeString()}
          </p>
          <p className="text-xs text-muted-foreground md:text-base">
            Sunny, 22°C
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 mt-2 mb-2">
        <div className="col-span-full sm:col-span-1" id="membership-card">
          {user?.membershipId == null ? (
            <NoMembership />
          ) : (
            <MembershipCard
              membershipTier={user?.membershipTier}
              qrcode={user?.qrcode}
              createdAt={user?.createdAt}
              cardNumber={user?.walletId}
            />
          )}
        </div>
        <div className="col-span-full sm:col-span-1" id="active-tickets">
          <ActiveTickets />
        </div>
      </section>

<section>
  <UpcomingMatches />
</section>
      

      <div className="gap-4 pt-2">
        <LatestTransaction />
      </div>

      {/* Onboarding Tour */}
      {/* {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />} */}

      {/* Manual trigger for testing */}
      {/* <div className="fixed bottom-4 right-4 z-10">
        <Button
          onClick={() => setShowOnboarding(true)}
          className="bg-gradient-to-r from-[#fae115] to-amber-500 hover:from-amber-500 hover:to-[#fae115]"
        >
          Show Tour
        </Button>
      </div> */}
    </div>
  );
}
