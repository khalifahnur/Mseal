"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  TrendingUp,
  Star,
  Zap,
} from "lucide-react"

export function FanFacts() {
    const [currentFactIndex, setCurrentFactIndex] = useState(0)

    const fanFacts = [
    {
      title: "Top Scorer Alert!",
      content: "Mseal striker has scored 12 goals this season, making him the league's second-highest scorer.",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Home Advantage",
      content: "Mseal has won 8 out of their last 10 home games this season with an impressive 80% win rate.",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Head-to-Head Record",
      content: "In their last 5 meetings, Mseal leads 3-2, but Lightning United won the most recent encounter.",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Fan Favorite",
      content: "Opponents midfielder was voted 'Player of the Month' by fans with 67% of the votes.",
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Record Breaker",
      content: "This match could see Mseal goalkeeper break the clean sheet record for the season.",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  const nextFact = () => {
    setCurrentFactIndex((prev) => (prev + 1) % fanFacts.length)
  }

  const prevFact = () => {
    setCurrentFactIndex((prev) => (prev - 1 + fanFacts.length) % fanFacts.length)
  }

  const currentFact = fanFacts[currentFactIndex]
  const IconComponent = currentFact.icon

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  Fan Facts & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevFact}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl border-0"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div
                      className={`mx-16 p-8 rounded-2xl ${currentFact.bgColor} border-l-4 border-l-current ${currentFact.color} transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-white shadow-md ${currentFact.color}`}>
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2 text-gray-800">{currentFact.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{currentFact.content}</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextFact}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl border-0"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex justify-center gap-2 mt-6">
                    {fanFacts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentFactIndex(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-200 ${
                          index === currentFactIndex
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
  );
}
