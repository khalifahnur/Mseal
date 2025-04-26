// "use client";
// import { Card } from "@/components/ui/card";
// import { QRCodeSVG } from "qrcode.react";
// import Image from "next/image";
// import { Ellipsis } from "lucide-react";
// import { maskExceptLastFour } from "@/lib/utils";

// interface MembershipCardProps {
//   memberName: string;
//   memberNumber: string | null;
//   teamName: string;
//   balance: number;
//   logoUrl?: string;
//   qrcode: string | null;
// }

// export function MembershipCard({
//   memberName,
//   memberNumber,
//   teamName,
//   balance,
//   logoUrl = "https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png",
//   qrcode,
// }: MembershipCardProps) {
//   return (
//     <Card className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 p-2 text-white md:p-2">
//       <div
//         className="absolute inset-0 bg-right bg-contain bg-no-repeat filter blur-xs"
//         style={{
//           backgroundImage: `url("${logoUrl}")`,
//         }}
//       ></div>
//       <div className="flex justify-between flex-row">
//         <div className="space-y-3 md:space-y-1">
//           <div className="flex items-center gap-2">
//             {logoUrl && (
//               <Image
//                 src={logoUrl}
//                 alt={`${teamName} logo`}
//                 width={40}
//                 height={40}
//                 className="rounded-full md:h-12 md:w-12"
//               />
//             )}
//             <div className="justify-center">
//               <h3 className="text-base font-bold md:text-sm">Murang'a Seals</h3>
//               <h3 className="text-sm font-bold md:text-sm text-[#e8e8e8]">
//                 Membership Card
//               </h3>
//             </div>
//           </div>
//           <div>
//             <div className="text-xs opacity-80 md:text-sm">Member Name</div>
//             <div className="text-base font-bold md:text-sm">{memberName}</div>
//           </div>
//           <div>
//             <div className="text-xs opacity-80 md:text-sm">Member Number</div>
//             <div className="font-mono text-base md:text-sm">
//               {memberNumber ? maskExceptLastFour(memberNumber) : "N/A"}
//             </div>
//           </div>
//           <div>
//             <div className="text-xs opacity-80 md:text-sm">Balance</div>
//             <div className="text-base font-bold md:text-sm">
//               Ksh.{balance.toFixed(2)}
//             </div>
//           </div>
//         </div>

//         <div className="mt-2 flex flex-col justify-between md:mt-2 items-center">
//           <div className="items-center justify-center">
//             <button>
//               <span>
//                 <Ellipsis />
//               </span>
//             </button>
//           </div>

//           <div className="bg-white p-4 rounded-lg mb-4">
//             {qrcode ? (
//               <QRCodeSVG
//                 value={qrcode}
//                 size={200}
//                 bgColor="#ffffff"
//                 fgColor="#000000"
//                 level="M"
//                 className="mx-auto"
//               />
//             ) : (
//               <p>No QR Code Available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

"use client"

import { Card } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"
import Image from "next/image"
import { cn, maskExceptLastFour } from "@/lib/utils"


interface MembershipCardProps {
  memberName: string;
  memberNumber: string | null;
  teamName: string;
  balance: number;
  logoUrl?: string;
  qrcode: string | null;
}

export function MembershipCard({
  memberName,
  memberNumber,
  teamName,
  balance,
  logoUrl = "https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png",
  qrcode,
}: MembershipCardProps) {
  return (
    <Card className="relative overflow-hidden aspect-[2.3/1]rounded-xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"></div>
      <div
        className="absolute inset-0 bg-center bg-contain bg-no-repeat filter blur-xs"
        style={{
          backgroundImage: `url("${logoUrl}")`,
        }}
      ></div>

      {/* Content container */}
      <div className="relative p-4 flex flex-col justify-between text-white">
        {/* Top section with logo and title */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 relative">
            <Image src={logoUrl || "/placeholder.svg"} alt={`${teamName} logo`} fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold uppercase">{teamName}</h3>
            <p className="text-sm font-medium text-white/90">Membership Card</p>
          </div>
        </div>

        {/* Bottom section with member info and QR code */}
        <div className="flex justify-between items-end">
          <div>
            {memberName && (
              <div className="mb-2">
                <div className="text-sm opacity-80">Member Name</div>
                <div className="text-base font-bold">{memberName}</div>
              </div>
            )}
            <div>
              <div className="text-sm opacity-80">Member Number</div>
              <div className="font-mono text-base font-bold">{memberNumber ? maskExceptLastFour(memberNumber) : "N/A"}</div>
            </div>
          </div>

          {/* QR Code */}
          <div className={cn("bg-white p-2 rounded-lg", qrcode ? "w-24 h-24" : "p-4")}>
            {qrcode ? (
              <QRCodeSVG
                value={qrcode}
                size={88}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                className="w-full h-full"
              />
            ) : (
              <p className="text-black text-xs">No QR Code</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
