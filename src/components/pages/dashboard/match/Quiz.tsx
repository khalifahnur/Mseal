import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Play } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Quiz() {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">More Fun</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="highlights" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-12 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="highlights" className="rounded-lg font-medium">
              Highlights
            </TabsTrigger>
            <TabsTrigger value="reactions" className="rounded-lg font-medium">
              Reactions
            </TabsTrigger>
            <TabsTrigger value="quiz" className="rounded-lg font-medium">
              Quiz
            </TabsTrigger>
            <TabsTrigger value="merchandise" className="rounded-lg font-medium">
              Store
            </TabsTrigger>
          </TabsList>

          <TabsContent value="highlights" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="relative group rounded-xl overflow-hidden"
                >
                  <Image
                    src="/placeholder.svg?height=120&width=300"
                    alt={`Highlight ${i}`}
                    width={300}
                    height={120}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center">
                    <Button
                      size="sm"
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Highlight
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reactions" className="mt-6">
            <div className="space-y-3">
              {[
                {
                  emoji: "😍",
                  user: "@FanUser123",
                  text: "Can't wait for this match! Thunder FC all the way!",
                },
                {
                  emoji: "🔥",
                  user: "@SportsFan456",
                  text: "Lightning United is going to dominate today!",
                },
              ].map((reaction, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">{reaction.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-blue-600">
                      {reaction.user}
                    </p>
                    <p className="text-sm text-gray-700">{reaction.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-center">
                Match Prediction Quiz
              </h4>
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  What will be the final score?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "2-1 Thunder FC",
                    "1-2 Lightning United",
                    "3-0 Thunder FC",
                    "0-0 Draw",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      size="sm"
                      className="justify-start hover:bg-blue-50 bg-transparent"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="merchandise" className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: "Team Jersey",
                  price: "$79.99",
                  image: "/placeholder.svg?height=80&width=80",
                },
                {
                  name: "Team Scarf",
                  price: "$24.99",
                  image: "/placeholder.svg?height=80&width=80",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-blue-600 font-bold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
