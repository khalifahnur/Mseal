import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"
import { Mail, Printer, RefreshCw } from 'lucide-react'

interface TicketDetailViewProps {
  ticket: {
    id: string
    matchName: string
    date: string
    venue: string
    status: string
    section: string
    row: string
    seat: string
    matchPreview: string
    keyPlayers: string
    weatherForecast: string
    ticketType: string
    transactionId: string
  }
}

export function TicketDetailView({ ticket }: TicketDetailViewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Ticket Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{ticket.matchName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Match Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p><strong>Date & Time:</strong> {new Date(ticket.date).toLocaleString()}</p>
              <p><strong>Venue:</strong> {ticket.venue}</p>
              <p><strong>Weather:</strong> {ticket.weatherForecast}</p>
              <p><strong>Key Players:</strong> {ticket.keyPlayers}</p>
              <p className="mt-2">{ticket.matchPreview}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Type:</strong> {ticket.ticketType}</p>
              <p><strong>Section:</strong> {ticket.section}</p>
              <p><strong>Row:</strong> {ticket.row}</p>
              <p><strong>Seat:</strong> {ticket.seat}</p>
              <p><strong>Transaction ID:</strong> {ticket.transactionId}</p>
              <div className="mt-4 flex justify-center">
                <QRCodeSVG value={`TICKET:${ticket.id}`} size={150} />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" className="w-full max-w-[120px]">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="w-full max-w-[120px]">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button variant="outline" className="w-full max-w-[120px]">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refund
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

