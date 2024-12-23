import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarPlus, Share2, ImageIcon } from 'lucide-react'
import Image from "next/image"

interface TicketCardProps {
  ticket?: {
    id: string
    matchName: string
    date: string
    venue: string
    status: string
    section: string
    row: string
    seat: string
    thumbnail: string
  }
  onView: (id: string) => void
}

export function TicketCard({ ticket, onView }: TicketCardProps) {
  if (!ticket) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center gap-4 space-y-0">
        <div className="relative h-16 w-16 overflow-hidden rounded-md">
          {ticket.thumbnail ? (
            <Image
              src={ticket.thumbnail}
              alt={ticket.matchName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{ticket.matchName}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date(ticket.date).toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <p className="text-sm">
            <strong>Venue:</strong> {ticket.venue}
          </p>
          <p className="text-sm">
            <strong>Seat:</strong> Section {ticket.section}, Row {ticket.row}, Seat {ticket.seat}
          </p>
          <p className="text-sm">
            <strong>Status:</strong>{" "}
            <span className={`font-semibold ${ticket.status === 'Valid' ? 'text-green-600' : ticket.status === 'Used' ? 'text-gray-600' : 'text-yellow-600'}`}>
              {ticket.status}
            </span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm"
         //onClick={() => onView(ticket.id)}
         >
          View Details
        </Button>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <CalendarPlus className="h-4 w-4" />
            <span className="sr-only">Add to Calendar</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share Ticket</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

