"use client";

import React, { useState } from "react";
import { Star, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { membershipTiers } from "./placeholder";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import MembershipCard from "./MembershipCard";
import MembershipFAQ from "./MembershipFaqs";
import WalletContainer from "./WalletContainer";
import { useAuth } from "@/components/Forms/AuthContext";
import { Sheet } from "@/components/ui/sheet";
import PaymentUpgradeSheet from "./UpgradeMembership";

export default function MembershipPage() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: fetchUserInfo,
  //   staleTime: 1000 * 60 * 5,
  //   //cacheTime: 1000 * 60 * 30,
  //   refetchOnWindowFocus: false,
  // });

  const [sheetModalVisible, setSheetModalVisible] = useState(false);
  const [upgradeTier, setUpgradeTier] = useState("");
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const activeMembership = user?.membershipTier;

  const handleModal = (tier: string) => {
    setSheetModalVisible(true);
    setUpgradeTier(tier);
  };

  return (
    <div className="p-4 space-y-6">
      {user?.membershipId && (
        <>
          <MembershipCard
            membershipId={user?.membershipId}
            membershipTier={user?.membershipTier}
            expDate={user?.expDate}
            createdAt={user?.createdAt}
          />
          <WalletContainer />
        </>
      )}

      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle>Membership Tiers & Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {Object.entries(membershipTiers).map(([tier, details]) => (
              <Card
                key={tier}
                className={`${
                  tier === activeMembership ? "border-primary border-2" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star size={20} className="text-primary/40" />
                    {details.name}
                  </CardTitle>
                  <p className="text-2xl font-bold">{details.price}</p>
                  <p className="text-sm text-gray-600">per year</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={16} className="text-gray-900 mt-1" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full mt-4 px-4 py-2 rounded-lg ${
                      tier === activeMembership
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-primary text-[#000] hover:bg-primary/40"
                    }`}
                    disabled={tier === activeMembership}
                    onClick={() => handleModal(tier)}
                  >
                    {tier === activeMembership ? "Current Plan" : "Upgrade"}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Sheet open={sheetModalVisible} onOpenChange={setSheetModalVisible}>
        <PaymentUpgradeSheet
          setSheetModalVisible={setSheetModalVisible}
          email={user?.email || ""}
          phoneNumber={user?.phoneNumber || ""}
          membershipTier={upgradeTier || ""}
          dob={user?.dob || ""}
          city={user?.city || ""}
        />
      </Sheet>

      <MembershipFAQ />
    </div>
  );
}
