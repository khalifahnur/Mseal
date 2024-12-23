import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TicketFilter() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
      <div className="flex-1">
        <Label htmlFor="search" className="sr-only">
          Search tickets
        </Label>
        <Input
          id="search"
          placeholder="Search tickets..."
          type="search"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:flex md:space-x-4">
        <div className="w-full md:w-[180px]">
          <Label htmlFor="status" className="sr-only">
            Status
          </Label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="valid">Valid</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-[180px]">
          <Label htmlFor="date" className="sr-only">
            Date
          </Label>
          <Select>
            <SelectTrigger id="date">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="past">Past</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

