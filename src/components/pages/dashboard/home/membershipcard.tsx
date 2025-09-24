"use client";

import formatMonthYear from "@/lib/utils";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

interface MembershipCardProps {
  qrcode: string | null;
  createdAt: string | null;
  membershipTier: string | null;
  cardNumber: string | null;
  expDate:string | null;
}

export function MembershipCard({
  createdAt,
  membershipTier,
  cardNumber,
  expDate,
  qrcode
}: MembershipCardProps) {
  const getBackgroundImage = () => {
    switch (membershipTier?.toLowerCase()) {
      case "gold":
        return "url('/assets/membership/Gold.png')";
      case "silver":
        return "url('/assets/membership/Silver.png')";
      case "bronze":
        return "url('/assets/membership/bronze.png')";
      default:
        return "url('/assets/membership/Ordinary.png')";
    }
  };

  const getTextColorClass = () => {
    return membershipTier?.toLowerCase() === "bronze" ? "text-white" : "text-[#1e1e1e]";
  };

  return (
    <div
      className="bg-opacity-90 rounded-2xl p-4 flex flex-col justify-between relative w-full max-w-full"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-opacity-50"></div>
      <div className="flex justify-between items-start z-10">
        <Image
          src={"/assets/mseal-logo.png"}
          alt="Membership Logo"
          width={80}
          height={80}
          className="object-contain"
        />
        <div className={`text-lg font-extrabold uppercase tracking-wide ${getTextColorClass()}`}>
          {membershipTier ? `${membershipTier} Member` : "Member"}
        </div>
      </div>

      <div className="flex justify-between items-center z-10">
        <div>
          <p className={`text-sm font-semibold ${getTextColorClass()}`}>CARD NUMBER.</p>
          <p className={`text-xl font-mono  ${getTextColorClass()}`}>
            0000 0000 0000 {cardNumber?.slice(-4) ?? "0000"}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-end  text-sm font-medium z-10">
        <div>
          <p className={`text-sm font-mono  ${getTextColorClass()}`}>MEMBER SINCE</p>
          <p className={`text-sm font-mono  ${getTextColorClass()}`}>{createdAt ? formatMonthYear(createdAt) : "N/A"}</p>
        </div>
        <div>
          <p className={`text-sm font-mono  ${getTextColorClass()}`}>EXPIRATION</p>
          <p className={`text-sm font-mono  ${getTextColorClass()}`}>{expDate ? formatMonthYear(expDate) : "N/A"}</p>
        </div>
        {/* <div className="w-20 h-20 rounded-lg bg-white p-2"> */}
          {/* <Image
            src={'/assets/images/qr.png'}
            alt="QR Code"
            width={80}
            height={80}
            className="object-contain"
          /> */}
          <div
            className={cn(
              "bg-white p-2 rounded-sm",
              qrcode ? "w-20 h-20" : "p-2"
            )}
          >
            {qrcode ? (
              <QRCodeSVG
                value={qrcode}
                size={40}
                bgColor="#ffffff"
                fgColor="#000000"
                level="L"
                className="w-full h-full"
              />
            ) : (
              <p className="text-black text-xs">No QR Code</p>
            )}
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}