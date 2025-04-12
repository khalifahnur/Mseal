"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Step = {
  title: string
  description: string
  targetId: string
  position: "top" | "right" | "bottom" | "left" | "center"
}

export function OnboardingTour({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tooltipStyle, setTooltipStyle] = useState({})

  const steps: Step[] = [
    {
      title: "Welcome to Dashboard",
      description: "Let's take a quick tour to help you get started.",
      targetId: "welcome-header",
      position: "bottom",
    },
    {
      title: "Active Tickets",
      description:
        "View your current match tickets here. You can access your ticket details before heading to the stadium.",
      targetId: "active-tickets",
      position: "right",
    },
    {
      title: "Membership Card",
      description:
        "Your digital membership card shows your status and current balance. Use it for purchases and special offers.",
      targetId: "membership-card",
      position: "left",
    },
    {
      title: "Upcoming Matches",
      description: "See all scheduled matches and purchase tickets directly from this table.",
      targetId: "upcoming-matches",
      position: "top",
    },
    {
      title: "Buy Tickets",
      description: "Click here to purchase tickets for upcoming matches. Early booking gets you the best seats!",
      targetId: "buy-ticket-button",
      position: "left",
    },
    {
      title: "Recent Transactions",
      description: "Track all your purchases and payments in one place. Keep an eye on your spending.",
      targetId: "recent-transactions",
      position: "top",
    },
  ]

  const positionTooltip = () => {
    const step = steps[currentStep]
    const targetElement = document.getElementById(step.targetId)

    if (!targetElement) {
      // Center in viewport if target not found
      setTooltipStyle({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 100,
        maxWidth: "90%",
        width: "calc(100% - 32px)",
      })
      return
    }

    const rect = targetElement.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const isMobile = viewportWidth < 640

    // Position tooltip based on specified position
    let tooltipTop, tooltipLeft, transform, arrowClass

    // Adjust positioning for mobile
    const mobilePosition = isMobile ? "bottom" : step.position

    switch (mobilePosition) {
      case "top":
        tooltipTop = rect.top - 12
        tooltipLeft = rect.left + rect.width / 2
        transform = "translate(-50%, -100%)"
        arrowClass =
          "after:content-[''] after:absolute after:left-1/2 after:-bottom-2 after:-translate-x-1/2 after:border-8 after:border-t-background after:border-x-transparent after:border-b-transparent"
        break
      case "right":
        tooltipTop = rect.top + rect.height / 2
        tooltipLeft = rect.left + rect.width + 12
        transform = "translateY(-50%)"
        arrowClass =
          "after:content-[''] after:absolute after:top-1/2 after:-left-2 after:-translate-y-1/2 after:border-8 after:border-r-background after:border-y-transparent after:border-l-transparent"
        break
      case "bottom":
        tooltipTop = rect.bottom + 12
        tooltipLeft = rect.left + rect.width / 2
        transform = "translateX(-50%)"
        arrowClass =
          "after:content-[''] after:absolute after:left-1/2 after:-top-2 after:-translate-x-1/2 after:border-8 after:border-b-background after:border-x-transparent after:border-t-transparent"
        break
      case "left":
        tooltipTop = rect.top + rect.height / 2
        tooltipLeft = rect.left - 12
        transform = "translate(-100%, -50%)"
        arrowClass =
          "after:content-[''] after:absolute after:top-1/2 after:-right-2 after:-translate-y-1/2 after:border-8 after:border-l-background after:border-y-transparent after:border-r-transparent"
        break
      case "center":
      default:
        tooltipTop = viewportHeight / 2
        tooltipLeft = viewportWidth / 2
        transform = "translate(-50%, -50%)"
        arrowClass = ""
    }

    // Ensure tooltip stays within viewport
    const tooltipWidth = isMobile ? viewportWidth * 0.9 : Math.min(300, viewportWidth * 0.8)

    if (tooltipLeft < 10) tooltipLeft = 16
    if (tooltipLeft > viewportWidth - 10) tooltipLeft = viewportWidth - 10
    if (tooltipTop < 10) tooltipTop = 10
    if (tooltipTop > viewportHeight - 10) tooltipTop = viewportHeight - 10

    setTooltipStyle({
      position: "fixed",
      top: `${tooltipTop}px`,
      left: `${tooltipLeft}px`,
      transform,
      zIndex: 100,
      maxWidth: `${tooltipWidth}px`,
      width: mobilePosition === "center" ? "calc(100% - 32px)" : "auto",
      className: arrowClass,
    })
  }

  useEffect(() => {
    positionTooltip()

    // Reposition on window resize
    const handleResize = () => {
      positionTooltip()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [currentStep])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    onComplete()
  }

  // Get the arrow class from the style object
  const arrowClass = tooltipStyle.className || ""

  // Remove className from the style object to avoid React warnings
  const cleanedStyle = { ...tooltipStyle }
  delete cleanedStyle.className

  return (
    <>
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={skipTour} />

      {/* Tooltip */}
      <Card className={`shadow-lg z-50 ${arrowClass}`} style={cleanedStyle as React.CSSProperties}>
        <CardHeader className="pb-2 p-3 sm:p-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base sm:text-lg">{steps[currentStep].title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={skipTour} className="h-6 w-6 sm:h-8 sm:w-8">
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
          <p className="text-sm">{steps[currentStep].description}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-3 sm:p-6">
          <div className="text-xs sm:text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2 sm:h-8 sm:text-sm sm:px-3"
                onClick={prevStep}
              >
                <ChevronLeft className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Prev
              </Button>
            )}
            <Button
              size="sm"
              onClick={nextStep}
              className="h-7 text-xs px-2 sm:h-8 sm:text-sm sm:px-3 bg-gradient-to-r from-[#fae115] to-amber-500 hover:from-amber-500 hover:to-[#fae115]"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
