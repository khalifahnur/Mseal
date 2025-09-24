"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import { useQuery } from "@tanstack/react-query";
import { fetchUpcomingEvents } from "@/api/api";
import Image from "next/image";
import Link from "next/link";

export default function UpcomingMatches() {
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: fetchUpcomingEvents,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading events: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <Card id="upcoming-matches">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">Upcoming Matches</CardTitle>
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
                <TableHead className="hidden sm:table-cell">Tickets</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events && events.length > 0 ? (
                /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/
                events.map((event: any) => (
                  <TableRow key={event._id}>
                    <TableCell>
                      {new Date(event.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.venue}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Image
                        src={event.opponentLogoUrl}
                        alt={event.awayTeam}
                        className="h-6 w-6 rounded-full"
                        height={20}
                        width={20}
                      />
                      {event.awayTeam}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {event.availableTickets > 0
                        ? `${event.availableTickets} Available`
                        : "Sold Out"}
                    </TableCell>
                    <TableCell>
                      {event.availableTickets > 0 && (
                        <Link href={`/tickets/buy/${event._id}`}>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-primary to-primary/40 hover:from-amber-500 hover:to-primary"
                          >
                            Buy Ticket
                          </Button>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No upcoming matches.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
