"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share, ShoppingBag, Ticket } from "lucide-react";
import { FanFacts } from "./fans";
import Feeds from "./Feeds";
import LIvePoll from "./LIvePoll";
import Quiz from "./Quiz";
import HeaderSection from "./HeaderSection";

export default function Container() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header Section */}
        <HeaderSection />
        {/* Main Content Grid */}
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
            <LIvePoll />

            {/* More Fun */}
            <Quiz />
          </div>
        </div>

        {/* Footer CTA */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Ready for Match Day?</h3>
              <p className="text-gray-300">
                Don&apos;t miss out on the action - get your tickets and gear now!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-8">
                <Share className="h-5 w-5 mr-2" />
                Share on X
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-12 px-8 bg-transparent"
              >
                <Ticket className="h-5 w-5 mr-2" />
                Buy Tickets
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-12 px-8 bg-transparent"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Visit Team Store
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
