"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Sample data for sponsors and partners
const trustedSponsors = [
  {
    id: 1,
    name: "SportiBank",
    imgUrl: "/placeholder.svg?height=80&width=120",
    type: "financial",
    color: "from-blue-500/20 to-blue-700/20",
    borderColor: "border-blue-500/30",
  },
  {
    id: 2,
    name: "EnergyDrink Plus",
    imgUrl: "/placeholder.svg?height=80&width=120",
    type: "beverage",
    color: "from-green-500/20 to-green-700/20",
    borderColor: "border-green-500/30",
  },
  {
    id: 3,
    name: "SportiPay",
    imgUrl: "/placeholder.svg?height=80&width=120",
    type: "payment",
    color: "from-purple-500/20 to-purple-700/20",
    borderColor: "border-purple-500/30",
  },
  {
    id: 4,
    name: "AthleteGear",
    imgUrl: "/placeholder.svg?height=80&width=120",
    type: "equipment",
    color: "from-amber-500/20 to-amber-700/20",
    borderColor: "border-amber-500/30",
  },
  {
    id: 5,
    name: "FanZone App",
    imgUrl: "/placeholder.svg?height=80&width=120",
    type: "technology",
    color: "from-pink-500/20 to-pink-700/20",
    borderColor: "border-pink-500/30",
  },
  {
    id: 6,
    name: "HealthPlus",
    imgUrl: "/placeholder.svg?height=80&width=120",
    type: "healthcare",
    color: "from-indigo-500/20 to-indigo-700/20",
    borderColor: "border-indigo-500/30",
  },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            x: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
            y: [
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
              `${Math.random() * 100}%`,
            ],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
          }}
        />
      ))}
    </div>
  );
};

export function TrustedSponsors() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const sponsorTypes = {
    financial: "💰 Financial",
    beverage: "🥤 Beverage",
    payment: "💳 Payment",
    equipment: "👟 Equipment",
    technology: "📱 Technology",
    healthcare: "⚕️ Healthcare"
  };

  return (
    <div ref={sectionRef} className="relative w-full py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), transparent 30%), radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.3), transparent 30%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <FloatingParticles />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-block px-4 py-1.5 bg-gradient-to-r from-slate-800 to-slate-900 rounded-full border border-slate-700/70 shadow-lg text-yellow-400 text-sm font-medium mb-6 backdrop-blur-sm"
            whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(234, 179, 8, 0.3)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Official Sponsors & Partners
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-slate-300 to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Powered by Excellence
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Meet the brands that make our success possible through their unwavering support
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {trustedSponsors.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { type: "spring", stiffness: 300, damping: 10 } 
              }}
            >
              <div className={`h-24 w-36 md:h-28 md:w-40 bg-gradient-to-br ${item.color} rounded-xl p-4 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg group-hover:shadow-xl ${item.borderColor} border hover:border-opacity-80`}>
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  {/* Animated background glow effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4), transparent 60%)`,
                        `radial-gradient(circle at 100% 100%, rgba(255,255,255,0.4), transparent 60%)`,
                        `radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4), transparent 60%)`
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <Image
                    src={item.imgUrl || "/placeholder.svg"}
                    width={120}
                    height={80}
                    alt={`${item.name} - ${item.type}`}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-110 relative z-10 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
              
              {/* Badge with sponsor name and type */}
              <motion.div 
                className="absolute -bottom-8 left-0 right-0 flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-700/50 shadow-lg transform-gpu opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-white">{item.name}</span>
                    <span className="h-3 w-0.5 bg-slate-600 rounded-full opacity-50"></span>
                    <span className="text-xs text-slate-300">{sponsorTypes[item.type]}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Muranga Seal members enjoy exclusive discounts and special offers from our official sponsors and partners.
            Simply show your membership card at participating locations to claim your benefits.
          </p>
          
          <motion.a
            href="#partners"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            View all partner offers
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

export default TrustedSponsors