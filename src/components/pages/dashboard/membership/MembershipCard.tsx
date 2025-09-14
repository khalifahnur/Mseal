import { useState } from "react";
import {
  Shield,
  Award,
  Calendar,
  CreditCard,
  TrendingUp,
  Gift,
} from "lucide-react";
import formatMonthYear, { maskExceptLastFour } from "@/lib/utils";

interface membershipCardProps {
  membershipId: string;
  membershipTier: string | null;
  expDate: string | null;
  createdAt: string | null;
}
export default function MembershipCard({
  membershipId,
  membershipTier,
  expDate,
  createdAt,
}: membershipCardProps) {
  const [memberInfo] = useState({
    membershipTier: "Premium Bronze",
    pointsEarned: 10,
    pointsToNextTier: 0,
  });

  return (
    <div className="w-full mx-auto">
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-black to-primary  shadow-2xl border border-gray-700/30">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        </div>

        {/* Card header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="text-yellow-400 h-6 w-6" />
              <h2 className="text-xl font-bold text-white">
                Membership Status
              </h2>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="relative p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-indigo-300">
                    Member ID
                  </p>
                </div>
                <p className="font-mono font-bold text-white tracking-wide">
                  {maskExceptLastFour(membershipId)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-indigo-300">
                    Current Tier
                  </p>
                </div>
                <p className="font-bold text-white flex items-center gap-2">
                  <Shield className="text-yellow-400 h-5 w-5" />
                  {membershipTier}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-indigo-300">
                    Member Since
                  </p>
                </div>
                <p className="font-bold text-white">
                  {formatMonthYear(createdAt)}
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Gift className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-indigo-300">
                    Points Earned
                  </p>
                </div>
                <p className="font-bold text-green-400 text-lg">
                  {memberInfo.pointsEarned.toLocaleString()} pts
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-indigo-300">
                    Points to Next Tier
                  </p>
                </div>
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-white">
                      {memberInfo.pointsToNextTier} points
                    </p>
                  </div>
                  <div className="w-full bg-indigo-800/50 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: `${
                          (memberInfo.pointsEarned /
                            (memberInfo.pointsEarned +
                              memberInfo.pointsToNextTier)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-indigo-300">
                    Membership Expires
                  </p>
                </div>
                <p className="font-bold text-white">
                  {formatMonthYear(expDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className="relative p-4 bg-indigo-950/50 border-t border-white/10">
          <div className="flex items-center justify-between">
            <p className="text-xs text-indigo-300">
              Premium Member Benefits Apply
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p className="text-xs font-medium text-white">Valid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
