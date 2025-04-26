"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, MapPin, Receipt, Ticket, User } from "lucide-react"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useQuery } from "@tanstack/react-query"
import { fetchUsedTickets } from "@/api/api"
import { FullScreenLoader } from "../../loading/FullScreenLoader"

interface TicketData {
  id: string
  eventId: string
  eventName: string
  date: string
  time: string
  venue: string
  ticketType: string
  seatInfo: string
  price: number
  purchaseDate: string
  ticketCode: string
  imageUrl: string
}

export function TicketHistory() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pastTickets, setPastTickets] = useState<TicketData[]>([
    {
      id: "ticket-3",
      eventId: "3",
      eventName: "Muranga Seal vs. KCB FC",
      date: "2025-01-15",
      time: "15:00",
      venue: "Muranga Stadium",
      ticketType: "Regular",
      seatInfo: "Section B, Row 8, Seat 21",
      price: 500,
      purchaseDate: "2025-01-05",
      ticketCode: "MS-KCB-2025-01-15-B8-21",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "ticket-4",
      eventId: "4",
      eventName: "Tusker FC vs. Muranga Seal",
      date: "2024-12-20",
      time: "19:00",
      venue: "Ruaraka Stadium",
      ticketType: "Regular",
      seatInfo: "Section C, Row 3, Seat 15",
      price: 450,
      purchaseDate: "2024-12-10",
      ticketCode: "TFC-MS-2024-12-20-C3-15",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "ticket-5",
      eventId: "5",
      eventName: "Muranga Seal vs. Bandari FC",
      date: "2024-11-05",
      time: "16:00",
      venue: "Muranga Stadium",
      ticketType: "VIP",
      seatInfo: "VIP Section, Row 1, Seat 4",
      price: 1200,
      purchaseDate: "2024-10-25",
      ticketCode: "MS-BFC-2024-11-05-V1-04",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ])

  const { data, isLoading } = useQuery({
    queryKey: ["historyTicket"],
    queryFn: fetchUsedTickets,
    staleTime: 1000 * 60 * 5,
    //cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <FullScreenLoader />;

  const usedTickets = data?.tickets ?? [];

  if (usedTickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No ticket history</h3>
        <p className="text-muted-foreground mb-6">You haven&apos;t purchased any tickets yet.</p>
        <Button asChild>
          <a href="/tickets">Browse Tickets</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {usedTickets.map((ticket) => {
        const event = ticket.event?.[0];
        (
        <Card key={ticket._id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-1/3">
                <Image
                  src={`/assets/images/stadi1.jpeg`}
                  alt={event.name}
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
                    <h3 className="text-xl font-bold mb-2">{event.name}</h3>

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
                          <DialogDescription>Details of your ticket purchase</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 p-4">
                          <div className="space-y-1">
                            <h4 className="font-medium">Event</h4>
                            <p>{event.name}</p>
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
                            <p className="font-mono text-xs">{ticket.ticketId}</p>
                          </div>
                          {/* <div className="space-y-1">
                            <h4 className="font-medium">Amount Paid</h4>
                            <p>KES {ticket.price.toLocaleString()}</p>
                          </div> */}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )})}
    </div>
  )
}

