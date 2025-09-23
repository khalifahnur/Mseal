import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, Trophy, Star } from "lucide-react";

interface MatchCardProps {
  match: {
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
  };
}

export function MatchCard({ match }: MatchCardProps) {
  const isPastMatch = new Date(match.date) < new Date();

  return (
    <Card
      className={`flex flex-col ${match.isHome ? "bg-blue-50" : "bg-gray-50"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          {match.isDerby && <Badge variant="secondary">Derby</Badge>}
          {match.isFinal && <Badge variant="secondary">Final</Badge>}
          <Badge variant="outline">{match.competition}</Badge>
        </div>
        {match.isHome ? (
          <Trophy className="h-4 w-4 text-blue-500" />
        ) : (
          <Star className="h-4 w-4 text-yellow-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p className="font-semibold">
            {match.homeTeam} vs {match.awayTeam}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(match.date).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">{match.venue}</p>
        </div>
        {isPastMatch ? (
          <div className="mt-4 text-center">
            <p className="font-bold text-lg">{match.result}</p>
            {match.attended && <Badge variant="secondary">Attended</Badge>}
          </div>
        ) : (
          <div className="mt-4 text-center">
            <Badge
              variant={
                match.ticketStatus === "Available" ? "default" : "secondary"
              }
            >
              {match.ticketStatus}
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isPastMatch ? (
          match.highlights && (
            <Button variant="outline" className="w-full" asChild>
              <a
                href={match.highlights}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Highlights
              </a>
            </Button>
          )
        ) : (
          <>
            <Button variant="outline" size="sm">
              {match.ticketStatus === "Available"
                ? "Book Tickets"
                : "View Tickets"}
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only flex items-center">
                <CalendarPlus className="h-4 w-4" /> Add to Calendar
              </span>
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
