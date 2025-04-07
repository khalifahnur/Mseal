"use client"

import React, { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useAnimationControls, useMotionValue } from "framer-motion"

interface InfiniteSliderProps {
  children: ReactNode
  speed?: number
  speedOnHover?: number
  gap?: number
  className?: string
}

export default function InfiniteSlider({
  children,
  speed = 40,
  speedOnHover = 20,
  gap = 112,
  className = "",
}: InfiniteSliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const sliderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const controls = useAnimationControls()

  // Calculate the width of the slider and content
  useEffect(() => {
    if (sliderRef.current && contentRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth)
      setContentWidth(contentRef.current.offsetWidth)
    }
  }, [children])

  // Set up the animation
  useEffect(() => {
    if (contentWidth === 0 || sliderWidth === 0) return

    // We need to duplicate the content to create the infinite effect
    const contentWidthWithGap = contentWidth + gap
    const duration = contentWidthWithGap / (isHovering ? speedOnHover : speed)

    controls.start({
      x: -contentWidthWithGap,
      transition: {
        duration,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    })

    return () => {
      controls.stop()
    }
  }, [controls, contentWidth, sliderWidth, gap, speed, speedOnHover, isHovering])

  // Handle hover state
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  // If no content or not enough content to scroll, don't render
  if (React.Children.count(children) === 0) return null

  return (
    <div
      ref={sliderRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className="flex" animate={controls} style={{ x }}>
        <div ref={contentRef} className="flex" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

