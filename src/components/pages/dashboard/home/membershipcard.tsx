"use client";

import { Card } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";
import { Ellipsis } from "lucide-react";

interface MembershipCardProps {
  memberName: string;
  memberNumber: string;
  teamName: string;
  balance: number;
  logoUrl?: string;
}

export function MembershipCard({
  memberName,
  memberNumber,
  teamName,
  balance,
  logoUrl = "https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png",
}: MembershipCardProps) {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 p-4 text-white md:p-2">
      <div
        className="absolute inset-0 bg-right bg-contain bg-no-repeat filter blur-sm "
        style={{
          backgroundImage: `url("${logoUrl}")`,
        }}
      ></div>
      <div className="flex justify-between flex-row">
        <div className="space-y-3 md:space-y-1">
          <div className="flex items-center gap-2">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={`${teamName} logo`}
                width={40}
                height={40}
                className="rounded-full md:h-12 md:w-12"
              />
            )}
            <div className="justify-center">
              <h3 className="text-base font-bold md:text-lg">
                Murang&apos;a Seals
              </h3>
              <h3 className="text-sm font-bold md:text-sm text-[#e8e8e8]">
                Membership Card
              </h3>
            </div>
          </div>
          <div>
            <div className="text-xs opacity-80 md:text-sm">Member Name</div>
            <div className="text-base font-bold md:text-lg">{memberName}</div>
          </div>
          <div>
            <div className="text-xs opacity-80 md:text-sm">Member Number</div>
            <div className="font-mono text-base md:text-lg">{memberNumber}</div>
          </div>
          <div>
            <div className="text-xs opacity-80 md:text-sm">Balance</div>
            <div className="text-base font-bold md:text-lg">
              Ksh.{balance.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col justify-between md:mt-2 items-center">
          <div className="items-center justify-center">
            <button>
              <span>
                <Ellipsis />
              </span>
            </button>
          </div>
          <QRCodeSVG
            value={`MEMBER:Ksh{memberNumber}`}
            size={40}
            className="rounded-lg bg-white p-1 md:p-2"
          />
        </div>
      </div>
    </Card>
  );
}
