"use client";

import React from "react";
import { Star, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { membershipTiers } from "./placeholder";
import { BenefitsList } from "./benefits";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import MembershipCard from "./MembershipCard";
import MembershipFAQ from "./MembershipFaqs";

export default function MembershipPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 5,
    //cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const { membershipId, membershipTier, expDate, createdAt } = data;

  const activeMembership = membershipTier;

  return (
    <div className="p-4 space-y-6">
            
      {membershipId && (
        <MembershipCard membershipId={membershipId} membershipTier={membershipTier} expDate={expDate} createdAt={createdAt} />
      )}


      {/* Membership Benefits */}
      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle>Membership Tiers & Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(membershipTiers).map(([tier, details]) => (
              <Card
                key={tier}
                className={`${
                  tier === activeMembership ? "border-[#fae115] border-2" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star size={20} className="text-green-600" />
                    {details.name}
                  </CardTitle>
                  <p className="text-2xl font-bold">{details.price}</p>
                  <p className="text-sm text-gray-600">per year</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check size={16} className="text-green-600 mt-1" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full mt-4 px-4 py-2 rounded-lg ${
                      tier === activeMembership
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-[#fae115] text-[#000] hover:bg-green-700"
                    }`}
                    disabled={tier === activeMembership}
                  >
                    {tier === activeMembership ? "Current Plan" : "Upgrade"}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Member Benefits */}
      <BenefitsList />

            <MembershipFAQ />
    </div>
  );
}
