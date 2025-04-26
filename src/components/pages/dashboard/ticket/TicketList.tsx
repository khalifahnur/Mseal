"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import { ApiResponse } from "@/types/ticket";


// Mock opponent data (you might want to fetch this from your API)
const opponentData: Record<string, { name: string; logo: string }> = {
  "Gor Mahia": { name: "Gor Mahia", logo: "/assets/images/gor-mahia.png" },
  "AFC Leopards": { name: "AFC Leopards", logo: "/assets/images/afc-leopards.png" },
  "Tusker FC": { name: "Tusker FC", logo: "/assets/images/tusker-fc.png" },
  "KCB FC": { name: "KCB FC", logo: "/assets/images/kcb-fc.png" },
};

export function TicketList() {
  const searchParams = useSearchParams();
  const dateFilter = searchParams.get("date");
  const sortBy = searchParams.get("sort");

  // Fetch tickets using react-query
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["tickets", dateFilter, sortBy],
    queryFn: fetchTickets,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];

    let events = [...data.events];

    // Apply date filter
    if (dateFilter) {
      const today = new Date();
      const thisWeekEnd = new Date(today);
      thisWeekEnd.setDate(today.getDate() + (7 - today.getDay()));
      const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      events = events.filter((event) => {
        const eventDate = new Date(event.date);
        if (dateFilter === "this-week") {
          return eventDate <= thisWeekEnd && eventDate >= today;
        } else if (dateFilter === "this-month") {
          return eventDate <= thisMonthEnd && eventDate >= today;
        }
        return true;
      });
    }

    // Apply sorting
    if (sortBy) {
      events.sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.ticketPrice - b.ticketPrice;
        } else if (sortBy === "price-desc") {
          return b.ticketPrice - a.ticketPrice;
        } else if (sortBy === "date") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
      });
    }

    return events;
  }, [data?.events, dateFilter, sortBy]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading events: {(error as Error).message}</p>
      </div>
    );
  }

  if (!filteredEvents.length) {
    return (
      <div className="text-center py-8">
        <p>No upcoming events found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {filteredEvents.map((event) => {
        // Calculate opponent from event name
        const opponentName = event.name
          .replace("Muranga Seal vs.", "")
          .replace("vs. Muranga Seal", "")
          .trim();
        const opponent = opponentData[opponentName] || {
          name: opponentName,
          logo: "/placeholder.svg",
        };

        const availableTickets = event.totalTickets;
        const soldPercentage = 0;
        const isSellingFast = false;

        return (
          <Card key={event._id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 ">
                  <Image
                    src={`/assets/images/stadi1.jpeg`}
                    alt={event.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={filteredEvents.indexOf(event) < 2}
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{event.name}</h3>
                        <div className="flex items-center space-x-2">
                          <Image
                            src="/assets/images/muranga-seal.png"
                            alt="Muranga Seal"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <span className="text-sm">vs</span>
                          <Image
                            src={opponent.logo}
                            alt={opponent.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{event.time} EAT</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Ticket className="mr-2 h-4 w-4" />
                          <span>KES {event.ticketPrice.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Ticket availability</span>
                          <span className="text-sm font-medium">{availableTickets} left</span>
                        </div>
                        <Progress value={soldPercentage} className="h-2" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {isSellingFast ? (
                        <Badge variant="destructive">Selling Fast</Badge>
                      ) : (
                        <Badge variant="outline">On Sale</Badge>
                    )}

                      <Link href={`/tickets/buy/${event._id}`}>
                        <Button>Buy Now</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}