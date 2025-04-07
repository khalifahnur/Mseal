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

  if (pastTickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No ticket history</h3>
        <p className="text-muted-foreground mb-6">You haven't purchased any tickets yet.</p>
        <Button asChild>
          <a href="/tickets">Browse Tickets</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {pastTickets.map((ticket) => (
        <Card key={ticket.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-1/3 h-[200px]">
                <Image
                  src={ticket.imageUrl || "/placeholder.svg"}
                  alt={ticket.eventName}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary">Past Event</Badge>
                </div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{ticket.eventName}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{formatDate(ticket.date)}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{ticket.time} EAT</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{ticket.venue}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Ticket className="mr-2 h-4 w-4" />
                        <span>{ticket.ticketType} Ticket</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <User className="mr-2 h-4 w-4" />
                        <span>{ticket.seatInfo}</span>
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
                            <p>{ticket.eventName}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Date & Time</h4>
                            <p>
                              {formatDate(ticket.date)} at {ticket.time}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Venue</h4>
                            <p>{ticket.venue}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Ticket Details</h4>
                            <p>
                              {ticket.ticketType} - {ticket.seatInfo}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Purchase Date</h4>
                            <p>{formatDate(ticket.purchaseDate)}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Ticket ID</h4>
                            <p className="font-mono text-xs">{ticket.ticketCode}</p>
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Amount Paid</h4>
                            <p>KES {ticket.price.toLocaleString()}</p>
                          </div>
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
      ))}
    </div>
  )
}

