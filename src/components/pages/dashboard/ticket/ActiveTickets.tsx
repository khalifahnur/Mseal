"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Download, MapPin, QrCode, Ticket, User } from "lucide-react"
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

export function ActiveTickets() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTickets, setActiveTickets] = useState<TicketData[]>([
    {
      id: "ticket-1",
      eventId: "1",
      eventName: "Muranga Seal vs. Gor Mahia",
      date: "2025-04-10",
      time: "15:00",
      venue: "Muranga Stadium",
      ticketType: "Regular",
      seatInfo: "Section A, Row 5, Seat 12",
      price: 500,
      purchaseDate: "2025-03-15",
      ticketCode: "MS-GM-2025-04-10-A5-12",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "ticket-2",
      eventId: "2",
      eventName: "Muranga Seal vs. AFC Leopards",
      date: "2025-04-17",
      time: "16:30",
      venue: "Muranga Stadium",
      ticketType: "VIP",
      seatInfo: "VIP Section, Row 2, Seat 8",
      price: 1200,
      purchaseDate: "2025-03-20",
      ticketCode: "MS-AL-2025-04-17-V2-08",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ])

  if (activeTickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Ticket className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No active tickets</h3>
        <p className="text-muted-foreground mb-6">You don&apos;t have any upcoming matches to attend.</p>
        <Button asChild>
          <a href="/tickets">Browse Tickets</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {activeTickets.map((ticket) => (
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
                          <QrCode className="mr-2 h-4 w-4" />
                          View Ticket
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Ticket Details</DialogTitle>
                          <DialogDescription>Show this QR code at the entrance for admission</DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="bg-white p-4 rounded-lg mb-4">
                            <Image
                              src="/placeholder.svg?height=200&width=200&text=QR+Code"
                              alt="Ticket QR Code"
                              width={200}
                              height={200}
                              className="mx-auto"
                            />
                          </div>
                          <div className="text-center space-y-2">
                            <h4 className="font-bold">{ticket.eventName}</h4>
                            <p>
                              {formatDate(ticket.date)} • {ticket.time}
                            </p>
                            <p>{ticket.venue}</p>
                            <p>{ticket.seatInfo}</p>
                            <p className="font-mono text-xs">{ticket.ticketCode}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
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

