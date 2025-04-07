"use client"

import InfiniteSlider from "./Infiniteslider"
import ProgressiveBlur from "./ProgressiveBlur"


// Sample sponsor logos
const sponsorLogos = [
  {
    name: "SportiBank",
    imgUrl: "/placeholder.svg?height=20&width=100",
    height: 20,
  },
  {
    name: "EnergyDrink Plus",
    imgUrl: "/placeholder.svg?height=16&width=100",
    height: 16,
  },
  {
    name: "SportiPay",
    imgUrl: "/placeholder.svg?height=16&width=100",
    height: 16,
  },
  {
    name: "AthleteGear",
    imgUrl: "/placeholder.svg?height=20&width=100",
    height: 20,
  },
  {
    name: "FanZone App",
    imgUrl: "/placeholder.svg?height=20&width=100",
    height: 20,
  },
  {
    name: "HealthPlus",
    imgUrl: "/placeholder.svg?height=16&width=100",
    height: 16,
  },
  {
    name: "Muranga County",
    imgUrl: "/placeholder.svg?height=28&width=100",
    height: 28,
  },
  {
    name: "Football Association",
    imgUrl: "/placeholder.svg?height=24&width=100",
    height: 24,
  },
]

export default function TrustedSponsors() {
  return (
    <section className="bg-background pb-4 md:p-10">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm text-gray-600">Powering the pride of Muranga</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {sponsorLogos.map((logo, index) => (
                <div key={index} className="flex">
                  <img
                    className="mx-auto h-auto w-fit dark:invert"
                    src={logo.imgUrl || "/placeholder.svg"}
                    alt={`${logo.name} Logo`}
                    height={logo.height}
                    width="auto"
                  />
                </div>
              ))}
            </InfiniteSlider>

            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

