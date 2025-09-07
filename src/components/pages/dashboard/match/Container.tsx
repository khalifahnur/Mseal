"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarX, Share, ShoppingBag, Ticket } from "lucide-react";
import { FanFacts } from "./fans";
import Feeds from "./Feeds";
import LIvePoll from "./LIvePoll";
import Quiz from "./Quiz";
import HeaderSection from "./HeaderSection";
import { useQuery } from "@tanstack/react-query";
import { fetchTodayEvents } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function Container() {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todaysEvents"],
    queryFn: fetchTodayEvents,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div>Error loading todays events: {error.message}</div>;

  const event = events?.[0];

  if (!event)
    return (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white mb-20">
      <CardContent className="p-10 flex flex-col items-center justify-center text-center space-y-6">
        <div className="bg-red-500/20 rounded-full p-6">
          <CalendarX className="h-12 w-12 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold">No Match Today</h2>
        <p className="text-white/70 max-w-md">
          There are no scheduled matches for today. Please check back later or
          explore upcoming fixtures.
        </p>
      </CardContent>
    </Card>
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header Section */}
        <HeaderSection event={event} />;{/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Fan Facts Carousel */}

            <FanFacts />
            {/* X Feed */}
            <Feeds />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Poll */}
            <LIvePoll event={event} />

            {/* More Fun */}
            <Quiz />
          </div>
        </div>

      </div>
    </div>
  );
}
