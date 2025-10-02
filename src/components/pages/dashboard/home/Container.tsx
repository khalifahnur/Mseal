"use client";

import ActiveTickets from "./ActiveTickets";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import NoMembership from "./NoMembership";
import { useAuth } from "@/components/Forms/AuthContext";
import UpcomingMatches from "./UpcomingMatches";
import { AnimatedWelcome } from "./goldmember/WelcomeTxt";
import { RecentTransactions } from "./goldmember/RecentTransaction";
import { ShopArrivals } from "./goldmember/Shop";
import { MembershipCard } from "./membershipcard";


export default function Home() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="space-y-1">
      <section className="flex flex-row justify-between" id="welcome-header">
        <AnimatedWelcome name={user?.firstName}/>
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
        <div
          className="col-span-full sm:col-span-1 flex flex-col space-y-4"
          id="membership-card"
        >
          {user?.membershipId == null ? (
            <NoMembership />
          ) : (
            <MembershipCard
              membershipTier={user?.membershipTier}
              qrcode={user?.qrcode}
              createdAt={user?.createdAt}
              expDate={user?.expDate}
              cardNumber={user?.walletId}
            />
          )}
          
          <div id="active-tickets">
            <ActiveTickets />
          </div>
        </div>
        <div className="col-span-full sm:col-span-1" id="shop-arrivals">
          <ShopArrivals />
        </div>
      </section>

      <section>
        <UpcomingMatches />
      </section>

      <div className="gap-4 pt-2">
        <RecentTransactions />
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
