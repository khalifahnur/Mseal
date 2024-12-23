"use client";

import React, { useState } from "react";
import { Star, Shield, Gift, Award, Clock, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { memberInfo, membershipTiers } from "./placeholder";
import { BenefitsList } from "./benefits";

export default function MembershipPage() {
  const [activeMembership, setActiveMembership] = useState("bronze");

  return (
    <div className="p-4 space-y-6">
      {/* Membership Status Card */}
      <Card className="bg-gradient-to-br from-[#fae115] to-black p-4">
        <CardHeader>
          <CardTitle>Your Membership Status</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6 grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Member ID</p>
              <p className="font-bold">{memberInfo.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Tier</p>
              <p className="font-bold flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                {memberInfo.tier}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-bold">
                {new Date(memberInfo.memberSince).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Points Earned</p>
              <p className="font-bold text-green-600">
                {memberInfo.pointsEarned} points
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Points to Next Tier</p>
              <p className="font-bold">{memberInfo.pointsToNextTier} points</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Membership Expires</p>
              <p className="font-bold">
                {new Date(memberInfo.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Membership Benefits */}
      <Card>
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

      {/* Membership History */}
      <Card>
        <CardHeader>
          <CardTitle>Membership History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium">Bronze Membership Renewal</p>
                  <p className="text-sm text-gray-600">Jan 15, 2024</p>
                </div>
              </div>
              <span className="text-[#fae115] font-medium">KSh 2,000</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium">Initial Membership Purchase</p>
                  <p className="text-sm text-gray-600">Jan 15, 2023</p>
                </div>
              </div>
              <span className="text-[#fae115] font-medium">KSh 2,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
