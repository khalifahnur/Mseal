import React from 'react'
import { TicketFilter } from './ticketfilter'
import { mockTickets } from './placeholder'
import { TicketList } from './ticketlist'

export default function Container() {
  return (
    <div className="space-y-6">
      <TicketFilter />
      <TicketList tickets={mockTickets} />
    </div>
  )
}
