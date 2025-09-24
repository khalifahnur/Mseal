"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const jerseys = [
  {
    id: 1,
    name: "Home Jersey 2024",
    //price: "Ksh.3200",
    image: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1758045331/img4_csabmd.jpg",
    rating: 4.8,
    isNew: true,
  },
  {
    id: 2,
    name: "Away Jersey 2025",
    //price: "",
    image: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1758045331/img13_l8h643.jpg",
    rating: 4.7,
    isNew: true,
  },
  {
    id: 3,
    name: "Third Kit 2025",
    //price: "",
    image: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1758045309/img176_y5fkob.jpg",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 4,
    name: "Hoodie",
    //price: "$40",
    image: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1758045300/img60_vrfqwq.jpg",
    rating: 4.7,
    isNew: true,
  },
]

export function ShopArrivals() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % jerseys.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentJersey = jerseys[currentIndex]

  return (
    <Card className="bg-white text-gray-900 overflow-hidden h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingBag className="w-5 h-5 " />
          New Arrivals - Mseal Shop
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <div className="p-4 text-center">
            <div className="relative mb-3 ">
              <Image
                src={currentJersey.image || "/placeholder.svg"}
                alt={currentJersey.name}
                className="w-60 h-60 mx-auto rounded-lg object-cover "
                width={200}
                height={200}
              />
              
            </div>

            <h3 className="font-semibold text-sm mb-1">{currentJersey.name}</h3>

            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-3 h-3 fill-primary text-yellow-400" />
              <span className="text-xs text-primary">{currentJersey.rating}</span>
            </div>

            <div className="flex items-center ">
              {/* <span className="text-lg font-bold text-primary">{currentJersey.price}</span> */}
              <Link href={'/shop'} className="ml-auto">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/50 text-white font-semibold"
              >
                Visit Shop
              </Button>
              </Link>
            </div>
          </div>

          {/* <div className="absolute top-1/2 -translate-y-1/2 left-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-black"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div> */}

          {/* <div className="absolute top-1/2 -translate-y-1/2 right-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-black"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div> */}

          <div className="flex justify-center gap-1 pb-3">
            {jerseys.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-4" : "bg-gray-900 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
