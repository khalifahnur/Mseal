import { MatchCard } from "@/components/pages/dashboard/match/matchcard"

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  venue: string
  competition: string
  ticketStatus: string
  isHome: boolean
  isDerby: boolean
  isFinal: boolean
  result: string | null
  attended: boolean
  highlights: string | null
}

interface MatchListProps {
  matches: Match[]
  title: string
}

export function MatchList({ matches, title }: MatchListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  )
}

