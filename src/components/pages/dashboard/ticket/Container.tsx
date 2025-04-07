import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveTickets } from "./ActiveTickets"
import { TicketHistory } from "./TicketHistory"
import TicketsContainer from "./TicketsContainer"


export default function COntainer() {
  return (
    <div className="container px-2 py-2 md:px-4 md:py-4">
      <div className="flex flex-col space-y-6">
        {/* <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link href="/account" className="flex items-center text-muted-foreground hover:text-foreground mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to account
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter">My Tickets</h1>
            <p className="text-muted-foreground">View your active tickets and ticket history</p>
          </div>
        </div> */}

        <Tabs defaultValue="tickets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
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


