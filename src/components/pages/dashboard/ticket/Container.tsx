import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveTickets } from "./ActiveTickets"
import { TicketHistory } from "./TicketHistory"
import TicketsContainer from "./TicketsContainer"


export default function COntainer() {
  return (
    <div className="container px-2 py-2 md:px-4 md:py-4">
      <div className="flex flex-col space-y-6">
        <Tabs defaultValue="tickets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="active">Active Tickets</TabsTrigger>
            <TabsTrigger value="history">Ticket History</TabsTrigger>
          </TabsList>
          <TabsContent value="tickets">
            <TicketsContainer />
          </TabsContent>
          <TabsContent value="active">
            <ActiveTickets />
          </TabsContent>
          <TabsContent value="history">
            <TicketHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


