"use client"

import Image from "next/image"
import InfiniteSlider from "./Infiniteslider"
import ProgressiveBlur from "./ProgressiveBlur"


// Sample sponsor logos
const sponsorLogos = [
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 20,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 16,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 16,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 20,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 20,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 16,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 28,
  },
  {
    name: "Sportpesa",
    imgUrl: "/assets/sportpesa.jpeg",
    height: 24,
  },
]

export default function TrustedSponsors() {
  return (
    <section className="bg-background/90 pb-4 md:p-10">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm text-gray-600">Powering the pride of Muranga Seal</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {sponsorLogos.map((logo, index) => (
                <div key={index} className="flex">
                  <Image
                    className="mx-auto h-auto w-fit dark:invert"
                    src={logo.imgUrl}
                    alt={`${logo.name} Logo`}
                    height={30}
                    width={40}
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

