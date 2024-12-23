import { TicketCard } from "@/components/pages/dashboard/ticket/ticketcard"
import { TicketDetailView } from "@/components/pages/dashboard/ticket/ticketdetails"

interface Ticket {
  id: string
  matchName: string
  date: string
  venue: string
  status: string
  section: string
  row: string
  seat: string
  thumbnail: string
  matchPreview: string
  keyPlayers: string
  weatherForecast: string
  ticketType: string
  transactionId: string
}

interface TicketListProps {
  tickets: Ticket[]
}

export function TicketList({ tickets }: TicketListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex flex-col">
          <TicketCard ticket={ticket} onView={() => {}} />
          <div className="mt-2">
            <TicketDetailView ticket={ticket} />
          </div>
        </div>
      ))}
    </div>
  )
}

