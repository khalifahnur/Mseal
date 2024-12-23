import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FanEngagement() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Match Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="home-score">Murang'a Seals</Label>
              <Input id="home-score" type="number" className="w-16" min="0" />
              <span>-</span>
              <Input id="away-score" type="number" className="w-16" min="0" />
              <Label htmlFor="away-score">Opponent</Label>
            </div>
            <Button type="submit">Submit Prediction</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fan Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Who will be the Man of the Match?</p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">Player 1</Button>
            <Button variant="outline" className="w-full justify-start">Player 2</Button>
            <Button variant="outline" className="w-full justify-start">Player 3</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

