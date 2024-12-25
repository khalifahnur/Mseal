"use client";
import React from 'react';
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Early Access",
    description: "Priority ticket booking for all matches",
    color: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-200",
  },
  {
    title: "VIP Seating",
    description: "Premium match day experience",
    color: "bg-gray-200",
    textColor: "text-blue-700",
    borderColor: "border-blue-100",
  },
  {
    title: "Exclusive Content",
    description: "Behind-the-scenes access",
    color: "bg-pink-50",
    textColor: "text-pink-700",
    borderColor: "border-pink-100",
  },
  {
    title: "Member Rewards",
    description: "Special discounts and offers",
    color: "bg-yellow-50",
    textColor: "text-green-700",
    borderColor: "border-green-100",
  },
];

export function BenefitsPath() {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Responsive calculations
  const isMobile = containerWidth < 768;
  const viewBoxWidth = isMobile ? 400 : 800;
  const viewBoxHeight = isMobile ? 600 : 400;
  const cardWidth = isMobile ? 140 : 180;

  // Calculate card positions first
  const cardPositions = benefits.map((_, index) => {
    const progress = index / (benefits.length - 1);
    
    if (isMobile) {
      // Mobile positions with slight curve
      return {
        x: viewBoxWidth / 2 + Math.sin(progress * Math.PI) * 80,
        y: 100 + progress * 400
      };
    } else {
      // Desktop positions
      const angle = progress * Math.PI;
      return {
        x: viewBoxWidth * 0.1 + progress * viewBoxWidth * 0.8,
        y: 250 - Math.sin(angle) * 150
      };
    }
  });

  // Generate path through card positions
  const generateCurvePath = () => {
    if (isMobile) {
      // Create a smooth curve through all points for mobile
      const points = cardPositions.map(pos => `${pos.x},${pos.y}`);
      return `M${points[0]} C${points[0]} ${points[1]} ${points[1]} S${points[2]} ${points[2]} S${points[3]} ${points[3]}`;
    } else {
      // Create a smooth curve through points for desktop
      const startPoint = cardPositions[0];
      const endPoint = cardPositions[cardPositions.length - 1];
      const controlPoint = {
        x: viewBoxWidth / 2,
        y: Math.min(...cardPositions.map(p => p.y)) - 20
      };
      return `M${startPoint.x},${startPoint.y} Q${controlPoint.x},${controlPoint.y} ${endPoint.x},${endPoint.y}`;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto min-h-[400px] md:min-h-[350px] px-4">
      <h2 className="text-2xl text-[#fff] md:text-3xl font-bold text-center mb-4 md:mb-2">
        Membership Benefits
      </h2>

      <div className="relative w-full h-[500px] md:h-[250px] flex items-center justify-center">
        <svg
          className="absolute w-full h-full"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={generateCurvePath()}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>

        {benefits.map((benefit, index) => {
          const position = cardPositions[index];
          
          return (
            <motion.div
              key={benefit.title}
              className={`absolute ${benefit.color} rounded-lg p-3 md:p-4 shadow-lg border ${benefit.borderColor}`}
              style={{
                width: `${cardWidth}px`,
                left: `${(position.x / viewBoxWidth) * 100}%`,
                top: `${(position.y / viewBoxHeight) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
            >
              <h3 className={`font-semibold mb-1 md:mb-2 text-sm md:text-base ${benefit.textColor}`}>
                {benefit.title}
              </h3>
              <p className={`text-xs md:text-sm ${benefit.textColor} opacity-90`}>
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default BenefitsPath;