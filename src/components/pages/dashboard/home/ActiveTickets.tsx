import { fetchActiveTickets, fetchUsedTickets } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueries } from "@tanstack/react-query";
import { CalendarDays, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import NoActiveTickets from "./NoActiveTicket";

export default function ActiveTickets() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["historyTicket"],
        queryFn: fetchUsedTickets,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["activeTickets"],
        queryFn: fetchActiveTickets,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    ],
  });

  const [usedTicketsQuery, activeTicketsQuery] = results;

  if (usedTicketsQuery.isLoading || activeTicketsQuery.isLoading) {
    return <FullScreenLoader />;
  }

  const usedTickets = usedTicketsQuery.data?.tickets ?? [];
  const activeTickets = activeTicketsQuery.data?.tickets ?? [];

  if (activeTickets.length === 0) {
    return <NoActiveTickets />;
  }
  return (
    <Card className="relative w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Tickets</CardTitle>
        <CardDescription>View your active tickets and history</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Ticket className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">{activeTickets?.length} Active Ticket</p>
            <p className="text-sm text-muted-foreground">
              {usedTickets?.length} Past Tickets
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild>
          <Link href="/tickets">
            <CalendarDays className="mr-2 h-4 w-4" />
            View Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
