import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/lib/utils";
import { Event } from "@/types/ticket";

type ticketSUmmaryProps = {
  event: Event;
  quantity: number;
  serviceFee: number;
};

export default function TicketSummary({
  event,
  quantity,
  serviceFee,
}: ticketSUmmaryProps) {
  return (
    <div>
      <Card className="shadow-sm sticky top-8">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="text-xl">Ticket Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold">{`${event.homeTeam} vs. ${event.awayTeam}`}</h3>
              <div className="flex items-center space-x-2">
                <Image
                  src={event.homeLogoUrl || "/placeholder.svg"}
                  alt={event.homeTeam}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-sm">vs</span>
                <Image
                  src={event.opponentLogoUrl || "/placeholder.svg"}
                  alt={event.awayTeam}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-base">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-base">{event.time} EAT</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-base">{event.venue}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Ticket className="mr-3 h-5 w-5 text-blue-600" />
                <span className="text-base">Regular Ticket</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3 text-base">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ticket price</span>
              <span className="font-medium">
                Ksh.{event.ticketPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">x{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service fee</span>
              <span className="font-medium">Ksh.{serviceFee}</span>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-lg font-semibold bg-gray-50 p-3 rounded-md">
              <span>Total</span>
              <span className="text-blue-700">
                Ksh.{" "}
                {(event.ticketPrice * quantity + serviceFee).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
