"use client";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MatchFilter } from "@/components/pages/dashboard/match/matchfilter";
import { MatchList } from "@/components/pages/dashboard/match/matchlist";
import { FanEngagement } from "@/components/pages/dashboard/match/fans";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  venue: string;
  competition: string;
  ticketStatus: string;
  isHome: boolean;
  isDerby: boolean;
  isFinal: boolean;
  result: string | null;
  attended: boolean;
  highlights: string | null;
}

export default function MatchesPage() {
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [pastMatches, setPastMatches] = useState<Match[]>([]);

  // Replace with your API key
  const API_KEY = "9cb2a41cc65ce85eae236769f2eec2f1";

  const TEAM_NAME = "Muranga Seal";
  const SEASON = "2024";

  // Axios instance for API-Football
  const apiClient = axios.create({
    baseURL: "https://v3.football.api-sports.io/",
    headers: { "x-apisports-key": API_KEY },
  });

  // Query 1: Fetch team ID
  const teamQuery = useQuery({
    queryKey: ["team", TEAM_NAME],
    queryFn: async () => {
      const response = await apiClient.get(`teams?search=${TEAM_NAME}`);
      const teamId = response.data.response[0]?.team.id;
      if (!teamId) throw new Error("Muranga Seal team not found");
      return teamId;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // Query 2: Fetch fixtures (dependent on team ID)
  const fixturesQuery = useQuery({
    queryKey: ["fixtures", TEAM_NAME, SEASON],
    queryFn: async () => {
      const response = await apiClient.get(
        `fixtures?team=${teamQuery.data}&season=${SEASON}`
      );
      return response.data.response;
    },
    enabled: !!teamQuery.data, // Only run if teamId exists
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
    gcTime: 24 * 60 * 60 * 1000,
  });

  if (fixturesQuery.data && !upcomingMatches.length && !pastMatches.length) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const matches: Match[] = fixturesQuery.data.map((fixture: any) => ({
      id: fixture.fixture.id.toString(),
      homeTeam: fixture.teams.home.name,
      awayTeam: fixture.teams.away.name,
      date: fixture.fixture.date,
      venue: fixture.fixture.venue.name || "TBD",
      competition: fixture.league.name || "Kenyan Premier League",
      ticketStatus:
        new Date(fixture.fixture.date) > new Date() ? "Available" : "Closed",
      isHome: fixture.teams.home.name === TEAM_NAME,
      isDerby: false,
      isFinal: fixture.league.round.includes("Final"),
      result:
        fixture.fixture.status.short === "FT"
          ? `${fixture.goals.home} - ${fixture.goals.away}`
          : null,
      attended: false,
      highlights:
        fixture.fixture.status.short === "FT"
          ? "https://example.com/highlights"
          : null,
    }));

    const currentDate = new Date();
    setUpcomingMatches(
      matches.filter((match) => new Date(match.date) >= currentDate)
    );
    setPastMatches(
      matches.filter((match) => new Date(match.date) < currentDate)
    );
  }

  // Handle loading and error states
  if (teamQuery.isLoading || fixturesQuery.isLoading) {
    return <FullScreenLoader />;
  }

  if (teamQuery.isError || fixturesQuery.isError) {
    return (
      <div className="text-red-500">
        Failed to fetch matches:{" "}
        {teamQuery.error?.message || fixturesQuery.error?.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MatchFilter />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <MatchList matches={upcomingMatches} title="Upcoming Matches" />
          <MatchList matches={pastMatches} title="Past Matches" />
        </div>
        <div>
          <FanEngagement />
        </div>
      </div>
    </div>
  );
}
