"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Event = {
  homeTeam: string;
  awayTeam: string;
};

interface LivePollProps {
  event: Event | null;
}

export default function LivePoll({ event }: LivePollProps) {
  const [pollVote, setPollVote] = useState<string | null>(null);

  const [pollResults, setPollResults] = useState({
    home: 10,
    away: 8,
  });

  const handleVote = (team: "home" | "away") => {
    if (pollVote) return;
    setPollVote(team);

    setPollResults((prev) => ({
      ...prev,
      [team]: prev[team] + 1,
    }));

  };

  if (!event) {
    return (
      <Card className="border-0 shadow-lg bg-gray-100 text-center py-8">
        <p className="text-gray-500 font-medium">No match available to poll</p>
      </Card>
    );
  }

  const totalVotes = pollResults.home + pollResults.away;
  const homePercentage =
    totalVotes > 0 ? Math.round((pollResults.home / totalVotes) * 100) : 0;
  const awayPercentage =
    totalVotes > 0 ? Math.round((pollResults.away / totalVotes) * 100) : 0;

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg">
            <Users className="h-6 w-6 text-white" />
          </div>
          Live Poll
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-bold text-lg mb-2">Who Will Win?</h3>
            <p className="text-gray-600 text-sm">
              Cast your vote and see live results!
            </p>
          </div>

          <div className="space-y-3">
            <Button
              variant={pollVote === "home" ? "default" : "outline"}
              onClick={() => handleVote("home")}
              disabled={!!pollVote}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              ⚡ {event.homeTeam}
            </Button>

            <Button
              variant={pollVote === "away" ? "default" : "outline"}
              onClick={() => handleVote("away")}
              disabled={!!pollVote}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              ⚡ {event.awayTeam}
            </Button>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-blue-600">{event.homeTeam}</span>
                <span className="text-blue-600">{homePercentage}%</span>
              </div>
              <Progress value={homePercentage} className="h-3 bg-gray-200" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-purple-600">{event.awayTeam}</span>
                <span className="text-purple-600">{awayPercentage}%</span>
              </div>
              <Progress value={awayPercentage} className="h-3 bg-gray-200" />
            </div>

            <div className="text-center pt-2">
              <p className="text-gray-600 text-sm font-medium">
                {totalVotes.toLocaleString()} total votes
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
