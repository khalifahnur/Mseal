"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, MapPin, Receipt } from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchUsedTickets } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import { jsPDF } from "jspdf";
import download from "downloadjs";

interface Ticket {
  _id: string;
  ticketId: string;
  event: {
    eventId: string;
    match: string;
    date: string;
    time: string;
    venue: string;
    imageUrl?: string;
  }[];
  createdAt: string;
  paymentReference: string;
  paymentStatus: string;
  quantity: number;
  status: string;
  price?: number;
}

export function TicketHistory() {
  const { data, isLoading, error } = useQuery<{ tickets: Ticket[] }>({
    queryKey: ["historyTicket"],
    queryFn: fetchUsedTickets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const downloadReceipt = (ticket: Ticket, event: Ticket["event"][0]) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Purchase Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Event: ${event.match}`, 20, 40);
    doc.text(`Date: ${formatDate(event.date)}`, 20, 50);
    doc.text(`Time: ${event.time} EAT`, 20, 60);
    doc.text(`Venue: ${event.venue}`, 20, 70);
    doc.text(`Purchase Date: ${formatDate(ticket.createdAt)}`, 20, 80);
    doc.text(`Ticket ID: ${ticket.ticketId}`, 20, 90);
    if (ticket.price) {
      doc.text(`Amount Paid: KES ${ticket.price.toLocaleString()}`, 20, 100);
    }
    const pdfOutput = doc.output("blob");
    download(pdfOutput, `receipt-${ticket.ticketId}.pdf`, "application/pdf");
  };

  if (isLoading) return <FullScreenLoader />;
  if (error) return <div>Error loading ticket history: {error.message}</div>;

  const usedTickets = data?.tickets ?? [];

  if (usedTickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No ticket history</h3>
        <p className="text-muted-foreground mb-6">
          You haven&apos;t purchased any tickets yet.
        </p>
        <Button asChild>
          <a href="/tickets">Browse Tickets</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {usedTickets.map((ticket) =>
        ticket.event.map((event) => (
          <Card
            key={`${ticket._id}-${event.eventId}`}
            className="overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row bg-[url('/assets/images/stadi1.jpeg')] bg-cover bg-center md:bg-none relative before:backdrop-blur-sm backdrop-opacity-50 before:absolute before:inset-0 before:z-[-1]">
                <div className="relative md:w-1/3">
                  <Image
                    src={event.imageUrl || "/assets/images/stadi1.jpeg"}
                    alt={event.match}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">Past Event</Badge>
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl text-white md:text-black font-bold mb-2">
                        {event.match}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-muted-foreground ">
                          <Calendar className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            {formatDate(event.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            {event.time} EAT
                          </span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4 text-white md:text-black" />
                          <span className="text-white md:text-black">
                            {event.venue}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Receipt className="mr-2 h-4 w-4" />
                            View Receipt
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Purchase Receipt</DialogTitle>
                            <DialogDescription>
                              Details of your ticket purchase
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 p-4">
                            <div className="space-y-1">
                              <h4 className="font-medium">Event</h4>
                              <p>{event.match}</p>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium">Date & Time</h4>
                              <p>
                                {formatDate(event.date)} at {event.time}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium">Venue</h4>
                              <p>{event.venue}</p>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium">Purchase Date</h4>
                              <p>{formatDate(ticket.createdAt)}</p>
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-medium">Ticket ID</h4>
                              <p className="font-mono text-xs">
                                {ticket.ticketId}
                              </p>
                            </div>
                            {ticket.price && (
                              <div className="space-y-1">
                                <h4 className="font-medium">Amount Paid</h4>
                                <p>KES {ticket.price.toLocaleString()}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        onClick={() => downloadReceipt(ticket, event)}
                        aria-label="Download receipt as PDF"
                      >
                        <span className="flex items-center">
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
