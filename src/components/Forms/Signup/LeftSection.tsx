import React from "react";
import { motion } from "framer-motion";
import { features } from "@/lib/placeholderData";
import { CheckCircle, Shield, Star, Zap } from "lucide-react";

export default function LeftSection() {
  const benefitIcons = [
    { icon: Shield, color: "text-black/80" },
    { icon: Star, color: "text-black/80" },
    { icon: Zap, color: "text-black/80" },
    { icon: CheckCircle, color: "text-black/80" },
  ];
  return (
    <div className="relative bg-gradient-to-br from-[#fae115] via-[#f5d800] to-[#e6c200] p-12 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-16 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            Join Our Community
          </h2>
          <p className="text-black/80 text-lg leading-relaxed">
            Unlock exclusive benefits and be part of something amazing.
          </p>
        </motion.div>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const IconComponent =
              benefitIcons[index % benefitIcons.length].icon;
            return (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="flex items-center space-x-4 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                  <IconComponent className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <span className="text-black font-medium text-lg">
                    {feature}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-3">
            <Star className="w-5 h-5 text-black" />
            <span className="text-black font-medium">Premium Experience</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
