"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { Shield, Clock, Crown, Gift, Ticket, Users } from "lucide-react"

const benefits = [
  {
    title: "Priority Access",
    description: "Book tickets before general sale for all home matches",
    icon: Clock,
    color: "bg-linear-to-br from-blue-50/90 to-blue-100/90",
    textColor: "text-blue-800",
    borderColor: "border-blue-200/50",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100/80",
    shadowColor: "shadow-blue-500/10",
    hoverBg: "hover:bg-linear-to-br hover:from-blue-100/90 hover:to-blue-200/90",
  },
  {
    title: "VIP Experience",
    description: "Premium seating and exclusive match day perks",
    icon: Crown,
    color: "bg-linear-to-br from-amber-50/90 to-amber-100/90",
    textColor: "text-amber-800",
    borderColor: "border-amber-200/50",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100/80",
    shadowColor: "shadow-amber-500/10",
    hoverBg: "hover:bg-linear-to-br hover:from-amber-100/90 hover:to-amber-200/90",
  },
  {
    title: "Insider Access",
    description: "Behind-the-scenes content and team updates",
    icon: Shield,
    color: "bg-linear-to-br from-emerald-50/90 to-emerald-100/90",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-200/50",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100/80",
    shadowColor: "shadow-emerald-500/10",
    hoverBg: "hover:bg-linear-to-br hover:from-emerald-100/90 hover:to-emerald-200/90",
  },
  {
    title: "Member Rewards",
    description: "Exclusive discounts on merchandise and events",
    icon: Gift,
    color: "bg-linear-to-br from-purple-50/90 to-purple-100/90",
    textColor: "text-purple-800",
    borderColor: "border-purple-200/50",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100/80",
    shadowColor: "shadow-purple-500/10",
    hoverBg: "hover:bg-linear-to-br hover:from-purple-100/90 hover:to-purple-200/90",
  },
  {
    title: "Digital Card",
    description: "Access your membership directly from your phone",
    icon: Ticket,
    color: "bg-linear-to-br from-pink-50/90 to-pink-100/90",
    textColor: "text-pink-800",
    borderColor: "border-pink-200/50",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-100/80",
    shadowColor: "shadow-pink-500/10",
    hoverBg: "hover:bg-linear-to-br hover:from-pink-100/90 hover:to-pink-200/90",
  },
  {
    title: "Member Events",
    description: "Exclusive invitations to member-only gatherings",
    icon: Users,
    color: "bg-linear-to-br from-indigo-50/90 to-indigo-100/90",
    textColor: "text-indigo-800",
    borderColor: "border-indigo-200/50",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100/80",
    shadowColor: "shadow-indigo-500/10",
    hoverBg: "hover:bg-linear-to-br hover:from-indigo-100/90 hover:to-indigo-200/90",
  },
];


const BackgroundParticles = ({ count = 20 }) => {
  const particles = useMemo(() => {
    return [...Array(count)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      width: Math.random() * 10 + 5,
      height: Math.random() * 10 + 5,
    }))
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-10"
          initial={{
            x: `${p.x}%`,
            y: `${p.y}%`,
            scale: p.scale,
          }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${p.width}px`,
            height: `${p.height}px`,
          }}
        />
      ))}
    </div>
  )
}


export function BenefitsPath() {
  const [containerWidth, setContainerWidth] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  // Responsive calculations
  const isMobile = containerWidth < 768
  const visibleBenefits = benefits.slice(0, 6)
  const cardWidth = isMobile ? 160 : 200

  return (
    <div className="relative w-full py-12 overflow-hidden flex justify-center">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 30% 40%, rgba(124, 58, 237, 0.4), transparent 30%), radial-gradient(circle at 70% 60%, rgba(37, 99, 235, 0.4), transparent 30%), radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.3), transparent 50%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "10% 10%", "0% 0%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* <div className="absolute inset-0 rounded-3xl bg-opacity-30 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div> */}
      
      <BackgroundParticles count={15} />
      
      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto px-4 z-10">
        <div className="text-center mb-12">
          <motion.div 
            className="inline-block px-3 py-1 bg-slate-800/80 rounded-full text-yellow-400 text-sm font-medium mb-4 backdrop-blur-xs border border-slate-700/50"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            MEMBER PRIVILEGES
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-gray-100 via-gray-400 to-primary/20 bg-clip-text text-black "
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Premium Membership Benefits
          </motion.h2>
          <motion.p 
            className="text-slate-300 max-w-2xl mx-auto text-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join the Muranga Seal family and enjoy exclusive privileges designed to enhance your fan experience.
          </motion.p>
        </div>

        {/* Centered grid container */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {visibleBenefits.map((benefit, index) => {
              const Icon = benefit.icon

              return (
                <motion.div
                  key={benefit.title}
                  className={`${benefit.color} ${benefit.hoverBg} backdrop-blur-md rounded-xl p-5 shadow-lg ${benefit.shadowColor} border ${benefit.borderColor} hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
                  style={{
                    width: "100%",
                    maxWidth: `${cardWidth}px`,
                    margin: "0 auto",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                    transition: { duration: 0.2 },
                  }}
                >
                  {/* Subtle animated gradient in card background */}
                  <motion.div 
                    className="absolute inset-0 opacity-20 z-0 pointer-events-none"
                    animate={{
                      background: [
                        "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2), transparent 50%)",
                        "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2), transparent 50%)",
                        "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2), transparent 50%)"
                      ]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "mirror"
                    }}
                  />
                  
                  <div
                    className={`${benefit.iconBg} ${benefit.iconColor} h-14 w-14 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-md relative z-10`}
                  >
                    <Icon size={26} />
                  </div>
                  <h3
                    className={`font-bold mb-2 text-base md:text-lg ${benefit.textColor} text-center group-hover:translate-x-1 transition-transform duration-300 relative z-10`}
                  >
                    {benefit.title}
                  </h3>
                  <p className={`text-sm ${benefit.textColor} opacity-80 text-center relative z-10`}>
                    {benefit.description}
                  </p>
                  <div className="w-0 group-hover:w-full h-0.5 bg-linear-to-r from-transparent via-yellow-400 to-transparent mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 mx-auto relative z-10"></div>
                </motion.div>
              )
            })}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default BenefitsPath