"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MembershipCard } from "@/components/pages/dashboard/home/membershipcard";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActiveTickets from "./ActiveTickets";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import NoMembership from "./NoMembership";
import { useAuth } from "@/components/Forms/AuthContext";

export default function Home() {
  const { user, isLoading } = useAuth();

  // const { data, isLoading } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: fetchUserInfo,
  //   staleTime: 1000 * 60 * 5,
  //   //cacheTime: 1000 * 60 * 30,
  //   refetchOnWindowFocus: false,
  // });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  console.log(user);

  return (
    <div className="space-y-1">
      <section className="flex flex-row justify-between" id="welcome-header">
        <h1 className="text-xs font-semibold md:text-xl text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#fae115] to-black">
          Welcome, {user?.firstName} !
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
        <div className="col-span-full sm:col-span-1" id="membership-card">
          {user?.membershipId == null ? (
            <NoMembership />
          ) : (
            <MembershipCard
              memberName={`${user?.firstName} ${user?.lastName}`}
              memberNumber={user?.membershipId}
              teamName="Murang'a Seals"
              balance={user?.balance}
              qrcode={user?.qrcode}
            />
          )}
        </div>
        <div className="col-span-full sm:col-span-1" id="active-tickets">
          <ActiveTickets />
        </div>
      </section>

      <Card id="upcoming-matches">
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
                      {index % 3 === 0 && (
                        <Button
                          size="sm"
                          id={index === 0 ? "buy-ticket-button" : ""}
                          className="bg-gradient-to-r from-[#fae115] to-amber-500 hover:from-amber-500 hover:to-[#fae115]"
                        >
                          Buy Ticket
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="gap-4 pt-2">
        <Card
          className="md:col-span-2 lg:col-span-2 w-full"
          id="recent-transactions"
        >
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

      {/* Onboarding Tour */}
      {/* {showOnboarding && <OnboardingTour onComplete={completeOnboarding} />} */}

      {/* Manual trigger for testing */}
      {/* <div className="fixed bottom-4 right-4 z-10">
        <Button
          onClick={() => setShowOnboarding(true)}
          className="bg-gradient-to-r from-[#fae115] to-amber-500 hover:from-amber-500 hover:to-[#fae115]"
        >
          Show Tour
        </Button>
      </div> */}
    </div>
  );
}
