"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProgressiveBlur from "./ProgressiveBlur";

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
];

export default function TrustedSponsors() {
  const [ setApi] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const plugin = Autoplay({ delay: 1500, stopOnInteraction: true });

  if (!isMounted) {
    return null;
  }

  return (
    <section className="bg-background/90 pb-4 md:p-10">
      <div className="relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm text-gray-600">
              Powering the pride of Muranga Seal
            </p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <Carousel
              setApi={setApi}
              className="w-full"
              plugins={[plugin]}
              opts={{
                align: "start",
                loop: true,
                dragFree: true,
                containScroll: "trimSnaps",
              }}
            >
              <CarouselContent className="-ml-4">
                {sponsorLogos.map((logo, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/4 lg:basis-1/6 basis-1/4"
                  >
                    <div className="flex h-full items-center justify-center p-2">
                      <Image
                        className="mx-auto object-contain max-h-[30px] w-auto"
                        src={logo.imgUrl || "/placeholder.svg"}
                        alt={`${logo.name} Logo`}
                        height={30}
                        width={40}
                        onError={(e) => {
                          console.error(`Failed to load image: ${logo.imgUrl}`);
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='30' viewBox='0 0 40 30'%3E%3Crect width='40' height='30' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' fontFamily='Arial' fontSize='6' textAnchor='middle' dominantBaseline='middle' fill='%23999'%3ELogo%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background z-10"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background z-10"></div>
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
  );
}
