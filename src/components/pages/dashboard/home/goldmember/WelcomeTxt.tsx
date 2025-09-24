"use client"

import { useState, useEffect } from "react"

type nameProp ={
  name:string | undefined;
}
export function AnimatedWelcome({name}:nameProp) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const fullText = `Welcome back, ${name}!`

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  return (
    <div>
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-gold rounded-full animate-pulse"></div>
        <h1 className="font-semibold text-xs md:text-xl text-gradient bg-clip-text text-transparent bg-linear-to-r from-[#fae115] to-black">
          {displayText}
          <span className="animate-pulse">|</span>
        </h1>
      </div>
    </div>
  )
}
