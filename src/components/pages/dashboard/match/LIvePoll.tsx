import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function LIvePoll() {
  const [pollVote, setPollVote] = useState<string | null>(null);
  const [pollResults, setPollResults] = useState({ teamA: 55, teamB: 45 });
  const handleVote = (team: string) => {
    if (pollVote) return;

    setPollVote(team);
    if (team === "teamA") {
      setPollResults({
        teamA: pollResults.teamA + 1,
        teamB: pollResults.teamB,
      });
    } else {
      setPollResults({
        teamA: pollResults.teamA,
        teamB: pollResults.teamB + 1,
      });
    }
  };

  const totalVotes = pollResults.teamA + pollResults.teamB;
  const teamAPercentage = Math.round((pollResults.teamA / totalVotes) * 100);
  const teamBPercentage = Math.round((pollResults.teamB / totalVotes) * 100);
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
              variant={pollVote === "teamA" ? "default" : "outline"}
              onClick={() => handleVote("teamA")}
              disabled={!!pollVote}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              ⚡ Thunder FC
            </Button>
            <Button
              variant={pollVote === "teamB" ? "default" : "outline"}
              onClick={() => handleVote("teamB")}
              disabled={!!pollVote}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              ⚡ Lightning United
            </Button>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-blue-600">Thunder FC</span>
                <span className="text-blue-600">{teamAPercentage}%</span>
              </div>
              <Progress value={teamAPercentage} className="h-3 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500" />
              </Progress>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-purple-600">Lightning United</span>
                <span className="text-purple-600">{teamBPercentage}%</span>
              </div>
              <Progress value={teamBPercentage} className="h-3 bg-gray-200">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-500" />
              </Progress>
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
