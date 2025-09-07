import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

type Event = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  homeLogoUrl?: string;
  opponentLogoUrl?: string;
};

export default function HeaderSection({ event }: { event: Event }) {
  const matchDate = new Date(event.date);

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-primary via-gray-900 to-blue-800 text-white">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-8 lg:gap-12">
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Image
                  src={event.homeLogoUrl || "/placeholder.svg"}
                  alt={`${event.homeTeam} Logo`}
                  width={80}
                  height={80}
                  className="mx-auto mb-3 rounded-full border-4 border-white/20 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                  HOME
                </div>
              </div>
              <h3 className="font-bold text-lg">{event.homeTeam}</h3>
              <p className="text-white/80 text-sm">{event.venue}</p>
            </div>

            {/* VS */}
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-2">
                <span className="text-3xl font-bold">VS</span>
              </div>
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                LIVE SOON
              </div>
            </div>

            {/* Away Team */}
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Image
                  src={event.opponentLogoUrl || "/placeholder.svg"}
                  alt={`${event.awayTeam} Logo`}
                  width={80}
                  height={80}
                  className="mx-auto mb-3 rounded-full border-4 border-white/20 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                  AWAY
                </div>
              </div>
              <h3 className="font-bold text-lg">{event.awayTeam}</h3>
              <p className="text-white/80 text-sm">{event.venue}</p>
            </div>
          </div>

          {/* Match Info */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {event.homeTeam} vs {event.awayTeam}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span className="font-medium">
                  {matchDate.toDateString()} • {event.time}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
