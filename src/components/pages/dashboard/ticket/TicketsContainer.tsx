import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { TicketList } from "./TicketList"
import { TicketFilters } from "./ticketfilter"

export default function TicketsContainer() {
  return (
    <div className="container px-2 py-2 md:px-4 md:py-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Upcoming Matches</h1>
          <p className="text-muted-foreground">Browse and purchase tickets for upcoming Muranga Seal matches.</p>
        </div>
        <TicketFilters />
        <Suspense fallback={<TicketListSkeleton />}>
          <TicketList />
        </Suspense>
      </div>
    </div>
  )
}

function TicketListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
            <Skeleton className="h-[150px] w-full md:w-[200px] rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-[100px]" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

