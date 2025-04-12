"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const LoadingImage = ({ className }: { className?: string }) => {
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => prev * -1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn("transition-transform duration-1000 ease-in-out", className)}
      style={{ transform: `rotate(${direction * 15}deg)` }}
    >
      <Image src={"/assets/images/loader.png"} alt="Loading" width={100} height={100} priority={true}/>
    </div>
  )
}

export const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <LoadingImage className="h-32 w-32" /> {/* Adjust size as needed */}
    </div>
  )
}
