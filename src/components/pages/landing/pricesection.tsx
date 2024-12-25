import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Star } from 'lucide-react'
import { placeholderData } from "@/components/pages/landing/placeholder"

export function PricingSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Membership Plans</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderData.pricingPlans.map((plan) => (
            <Card key={plan.id} className="flex flex-col">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star size={20} className="text-green-600" />
                    {plan.name}
                  </CardTitle>
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <p className="text-sm text-gray-600">per year</p>
                </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full hover:bg-green-700">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

