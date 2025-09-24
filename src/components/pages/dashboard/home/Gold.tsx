"use client";

import Image from "next/image";

export default function MembershipCard({ 
  membershipTier = "BRONZE MEMBER", 
  cardNumber = "0000 0000 0000 0000", 
  memberSince = "06/2025", 
  expiration = "06/2025", 
  logoUrl = "/assets/mseal-logo.png", 
  qrCodeUrl = "/assets/mseal-logo.png" 
}) {
  return (
    <div className="bg-red-800 bg-opacity-90 rounded-lg p-4 flex flex-col justify-between relative w-full max-w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'%23222\' d=\'M0 0h100v100H0z\'/%3E%3Cpath fill=\'%23000\' d=\'M10 10h80v80H10z\'/%3E%3C/svg%3E')] opacity-50"></div>

      {/* Logo and Membership Tier */}
      <div className="flex justify-between items-start z-10">
        <div className="w-20 h-20">
          <Image
            src={logoUrl}
            alt="Membership Logo"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="text-white text-xl font-bold uppercase tracking-wide">
          {membershipTier}
        </div>
      </div>

      {/* Card Number and QR Code */}
      <div className="flex justify-between items-center z-10">
        <div>
          <p className="text-white text-sm font-semibold">CARD NUMBER.</p>
          <p className="text-white text-2xl font-mono">{cardNumber}</p>
        </div>
        <div className="w-20 h-20">
          <Image
            src={qrCodeUrl}
            alt="QR Code"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      </div>

      {/* Member Since and Expiration */}
      <div className="flex justify-between items-end text-white text-sm font-medium z-10">
        <div>
          <p>MEMBER SINCE</p>
          <p>{memberSince}</p>
        </div>
        <div>
          <p>EXPIRATION</p>
          <p>{expiration}</p>
        </div>
      </div>
    </div>
  );
}
