import { MatchFilter } from "@/components/pages/dashboard/match/matchfilter"
import { MatchList } from "@/components/pages/dashboard/match/matchlist"
import { FanEngagement } from "@/components/pages/dashboard/match/fans"
import { mockMatches } from "@/components/pages/dashboard/match/placholder"

export default function MatchesPage() {
  const currentDate = new Date()
  const upcomingMatches = mockMatches.filter(match => new Date(match.date) >= currentDate)
  const pastMatches = mockMatches.filter(match => new Date(match.date) < currentDate)

  return (
    <div className="space-y-6">
      <MatchFilter />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <MatchList matches={upcomingMatches} title="Upcoming Matches" />
          <MatchList matches={pastMatches} title="Past Matches" />
        </div>
        <div>
          <FanEngagement />
        </div>
      </div>
    </div>
  )
}

