import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Gift } from "lucide-react"

interface Benefit {
  title: string
  description: string
}

interface BenefitsListProps {
  benefits: Benefit[]
}

export function BenefitsList() {
  return (
    <Card>
    <CardHeader>
      <CardTitle>Your Member Benefits</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold flex items-center gap-2">
            <Gift size={20} />
            Available Benefits
          </h3>
          <ul className="mt-2 space-y-2">
            <li className="text-sm">• 10% discount code: SEAL2024</li>
            <li className="text-sm">• Free birthday gift (Available in Dec)</li>
            <li className="text-sm">• Member-only entrance access</li>
          </ul>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold flex items-center gap-2">
            <Award size={20} />
            Rewards Progress
          </h3>
          <div className="mt-2 space-y-2">
            <div>
              <p className="text-sm">Next Reward: 50 points</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-[#fae115] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}

