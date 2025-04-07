"use client"

interface ProgressiveBlurProps {
  className?: string
  direction: "left" | "right"
  blurIntensity?: number
}

export default function ProgressiveBlur({ className = "", direction, blurIntensity = 1 }: ProgressiveBlurProps) {
  const gradientDirection = direction === "left" ? "to right" : "to left"

  return (
    <div
      className={`${className}`}
      style={{
        background: `linear-gradient(${gradientDirection}, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%)`,
        backdropFilter: `blur(${blurIntensity * 4}px)`,
      }}
    />
  )
}

