import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function MatchFilter() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">
            Search matches
          </Label>
          <Input
            id="search"
            placeholder="Search matches..."
            type="search"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:flex md:space-x-4">
          <div className="w-full md:w-[180px]">
            <Label htmlFor="date-range" className="sr-only">
              Date Range
            </Label>
            <Select>
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-[180px]">
            <Label htmlFor="competition" className="sr-only">
              Competition
            </Label>
            <Select>
              <SelectTrigger id="competition">
                <SelectValue placeholder="Competition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Competitions</SelectItem>
                <SelectItem value="league">League</SelectItem>
                <SelectItem value="cup">Cup</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <Button variant="outline">All Games</Button>
        <Button variant="outline">Home Games</Button>
        <Button variant="outline">Away Games</Button>
      </div>
    </div>
  )
}

