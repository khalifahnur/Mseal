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
import { TrendingUp, Trophy } from "lucide-react";
import ActiveTickets from "./ActiveTickets";

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
        <h1 className="text-xs font-semibold md:text-xl text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#fae115] to-black">
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
          {/* <TicketCard
            home="MSEAL"
            away="GOR"
            kickoffTime="16:25"
            date={date}
            seat="54B"
            ticketNo="FF346Y"
            venue="St. Sebastian Park"
          /> */}
          <ActiveTickets />
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

      <div className=" gap-4 pt-2 ">
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
        
      </div>
    </div>
  );
}
