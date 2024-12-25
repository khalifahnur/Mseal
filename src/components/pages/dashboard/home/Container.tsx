import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketCard from "@/components/pages/dashboard/home/ticketcard";
import { MembershipCard } from "@/components/pages/dashboard/home/membershipcard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, TrendingUp, Trophy } from "lucide-react";

export default function Home() {
  const recentResults = [
    { opponent: "Gor Mahia", score: "2-1", result: "W" },
    { opponent: "Sofapaka", score: "0-0", result: "D" },
    { opponent: "Bandari", score: "1-2", result: "L" },
  ];

  const leaguePosition = {
    position: 8,
    played: 15,
    won: 7,
    drawn: 4,
    lost: 4,
    points: 25,
  };

  const date = new Date();

  return (
    <div className="space-y-1">
      <section className="flex flex-row justify-between">
        <h1 className="text-xs font-semibold md:text-xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#fae115] to-black">
          Welcome, User!
        </h1>
        <div className="flex flex-row justify-between gap-5">
          <p className="text-xs text-muted-foreground md:text-base">
            {new Date().toLocaleDateString()} -{" "}
            {new Date().toLocaleTimeString()}
          </p>
          <p className="text-xs text-muted-foreground md:text-base">
            Sunny, 22°C
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 pb-2">
        <div className="col-span-full sm:col-span-1">
          <p className="font-xs font-bold py-1 px-5">Active Ticket</p>
          <TicketCard
            home="MSEAL"
            away="GOR"
            kickoffTime="16:25"
            date= {date}
            seat="54B"
            ticketNo="FF346Y"
            venue="St. Sebastian Park"
          />
        </div>

        <div className="col-span-full sm:col-span-1 mt-8">
          <MembershipCard
            memberName="User"
            memberNumber="001"
            teamName="Murang'a Seals"
            balance={500}
          />
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[150px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Opponent</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Ticket Status
                  </TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>{new Date().toLocaleTimeString()}</TableCell>
                    <TableCell>Stadium {index + 1}</TableCell>
                    <TableCell>Team {index + 1}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {["Available", "Sold Out", "Booked"][index % 3]}
                    </TableCell>
                    <TableCell>
                      {index % 3 === 0 && <Button size="sm">Buy Ticket</Button>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid gap-4 pt-2 md:grid-cols-2 lg:grid-cols-5">
        <Card className="md:col-span-2 lg:col-span-2 w-full">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date().toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {
                          [
                            "Ticket Purchase",
                            "Membership Renewal",
                            "Merchandise",
                          ][index % 3]
                        }
                      </TableCell>
                      <TableCell>Ksh.{(index + 1) * 50}</TableCell>
                      <TableCell>
                        {["Completed", "Pending", "Completed"][index % 3]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* League Position */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center text-center gap-2 text-base sm:text-sm">
              <Trophy size={20} />
              League Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className=" text-center text-2xl sm:text-3xl font-bold text-green-600">
              {leaguePosition.position}th
            </p>
            <div className="mt-2 space-y-1 text-xs sm:text-sm">
              <p className="text-center">Played: {leaguePosition.played}</p>
              <p className="text-center">Won: {leaguePosition.won}</p>
              <p className="text-center">Points: {leaguePosition.points}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Results */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp size={20} />
              Recent Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-xs sm:text-sm">
              {recentResults.map((result, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="truncate mr-2">{result.opponent}</span>
                  <span className="font-mono">{result.score}</span>
                  <span
                    className={`font-bold ${
                      result.result === "W"
                        ? "text-green-600"
                        : result.result === "L"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {result.result}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* News and Updates Section */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Latest News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-sm sm:text-base">
                  Team Announces New Signing
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Striker joins from Coastal Rangers...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
