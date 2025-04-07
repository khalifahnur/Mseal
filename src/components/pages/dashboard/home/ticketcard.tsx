import { QRCodeSVG } from "qrcode.react";
import React from "react";

interface TicketProps {
  home?: string;
  away?: string;
  kickoffTime: string;
  date: Date | string;
  seat: string;
  ticketNo: string;
  venue: string;
}

export default function TicketCard({
  home,
  away,
  kickoffTime,
  date,
  seat,
  ticketNo,
  venue,
}: TicketProps) {
  return (
    <div className="max-w-xl bg-linear-to-r from-yellow-50 to-white rounded-lg shadow-md overflow-hidden">
      {/* Main Ticket Content */}
      <div className="relative p-6">
        <div className="flex flex-row justify-between">
          {/* Teams Section */}
          <div className="flex items-center mb-2">
            <p className="text-md md:text-lg font-bold text-[#fae115]">
              {home}
            </p>
            <span className="p-2">Vs</span>
            <p className="text-md md:text-lg font-bold text-[#fae115]">
              {away}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-4 gap-8 ">
          <div>
            <div className="text-sm text-gray-400">Date</div>
            <div className="text-sm md:text-md font-semibold text-[#fae115]">
              {new Date(date).toDateString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Kickoff</div>
            <div className="text-sm md:text-md font-semibold text-[#fae115]">
              {kickoffTime}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Seat</div>
            <div className="text-sm md:text-md font-semibold text-[#fae115]">
              {seat}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Ticket No.</div>
            <div className="text-sm md:text-md font-semibold text-[#fae115]">
              {ticketNo}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 w-4 h-8 bg-gray-100 rounded-r-full transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-4 h-8 bg-gray-100 rounded-l-full transform -translate-y-1/2"></div>
        <div className="absolute left-4 top-1/2 right-4 border-t-2 border-dashed border-gray-200"></div>
      </div>

      {/* Bottom Section */}
      <div className="bg-yellow-50 p-4 flex justify-between items-center">
        <div className="text-[#fae115] text-sm">
          <div>Murang&apos;a Seal FC</div>
        </div>
        {/* Venue */}
        <div className="flex flex-row gap-5 items-center ">
          <p className="text-sm text-gray-400">Venue:</p>
          <p className="text-sm md:text-base font-semibold text-[#fae115]">
            {venue}
          </p>
        </div>
        {/* {/ QR Code /}         */}
        <div className="mt-1 md:mt-0 md:ml-6">
          <QRCodeSVG
            value={`TICKET:${ticketNo}`}
            size={40}
            className="h-10 w-10 md:h-15 md:w-15"
          />
        </div>
      </div>
    </div>
  );
}
