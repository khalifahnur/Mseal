"use client";

import { Card } from "@/components/ui/card";
// import { QRCodeSVG } from "qrcode.react";
// import Image from "next/image";
import formatMonthYear from "@/lib/utils";
import { NfcIcon } from "lucide-react";

interface MembershipCardProps {
  memberName: string;
  memberNumber: string | null;
  teamName: string;
  balance: number;
  logoUrl?: string;
  qrcode: string | null;
  createdAt: string | null;
  expDate: string | null;
  walletId:string | null
}

export function MembershipCard({
  // memberName,
  // memberNumber,
  // teamName,
  // balance,
  logoUrl = "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1751304986/mseal-logo_dcsiqz.png",
  // qrcode,
  createdAt,
  expDate,
  walletId,
}: MembershipCardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* <Card
        className="relative overflow-hidden aspect-[2.3/1] rounded-2xl shadow-2xl border-0 mb-1 z-10 transition-transform duration-300 hover:-translate-y-2 hover:rotate-1 hover:scale-105"
        style={{
          transform: "rotate(-2deg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 opacity-90"></div>
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url("${logoUrl}")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>

        <div className="relative p-6 flex flex-col justify-between text-white h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative bg-white/20 rounded-lg p-2 backdrop-blur-md">
                <Image
                  src={logoUrl || "/placeholder.svg"}
                  alt={`${teamName} logo`}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold uppercase tracking-wide">{teamName}</h3>
                <p className="text-xs font-medium text-white/80 uppercase tracking-widest">Membership Card</p>
              </div>
            </div>
            <div
              className={cn(
                "bg-white rounded-lg shadow-lg",
                qrcode ? "w-16 h-16 p-2" : "p-3"
              )}
            >
              {qrcode ? (
                <QRCodeSVG
                  value={qrcode}
                  size={48}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  className="w-full h-full"
                />
              ) : (
                <p className="text-gray-600 text-xs font-medium">No QR</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-end mt-8">
            <div className="space-y-4">
              {memberName && (
                <div>
                  <div className="text-xs opacity-70 uppercase tracking-widest mb-1">Member Name</div>
                  <div className="text-sm font-semibold">{memberName}</div>
                </div>
              )}
              <div>
                <div className="text-xs opacity-70 uppercase tracking-widest mb-1">Balance</div>
                <div className="font-mono text-lg font-bold">
                  KSh {balance ? balance.toLocaleString("en-KE", { minimumFractionDigits: 2 }) : "0.00"}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-70 uppercase tracking-widest mb-1">Member ID</div>
              <div className="font-mono text-sm font-semibold">
                {memberNumber ? maskExceptLastFour(memberNumber) : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </Card> */}

      {/* payment Card */}
      <Card
        className="relative overflow-hidden rounded-2xl shadow-2xl border-0  transition-transform duration-300 hover:-translate-y-2 hover:rotate-[-1deg] hover:scale-105"
        style={{
          transform: "rotate(0deg) translateY(-5px)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tl from-gray-800 via-black to-gray-600 opacity-90"></div>
        <div
          className="absolute inset-0 bg-center bg-contain bg-no-repeat opacity-10"
          style={{
            backgroundImage: `url("${logoUrl}")`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>

        <div className="relative p-6 flex flex-col justify-between text-white h-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm opacity-80">Muranga Seal</p>
              <p className="text-lg font-semibold">Gold Member</p>
            </div>
            <NfcIcon className="h-8 w-8 opacity-60 transition-transform duration-300 hover:scale-110" />
          </div>
          <div className="space-y-2">
            <p className="text-sm opacity-80">Card Number</p>
            <p className="text-xl font-mono tracking-wider">•••• •••• •••• {walletId?.slice(-4) ?? "****"}</p>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-xs opacity-80">Member Since</p>
              <p className="text-sm">{formatMonthYear(createdAt)}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Expires</p>
              <p className="text-sm">{formatMonthYear(expDate)}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}