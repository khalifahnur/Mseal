"use client";
import React from "react";
import Image from "next/image";
import { motion, Variants, easeOut } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LeftSection() {
  const container: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
        ease: [0, 0, 0.58, 1],
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <div className="relative bg-gradient-to-br from-[#fae115] via-[#f5d800] to-[#e6c200] p-12 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 h-full flex flex-col justify-center items-center text-center"
      >
        <motion.div variants={item} className="relative">
          <motion.div
            animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-110" />
            <Image
              src="https://res.cloudinary.com/dfuh1q6ic/image/upload/v1751304986/mseal-logo_dcsiqz.png"
              alt="Muranga Seals"
              width={220}
              height={220}
              className="relative z-10 w-56 h-auto drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={item} className="mt-8 space-y-4">
          <h2 className="text-4xl font-bold text-black leading-tight">
            Welcome Back!
          </h2>
          <p className="text-black/80 text-lg max-w-md leading-relaxed">
            Sign in to access your account and continue your journey with us.
          </p>
        </motion.div>

        <motion.div
          variants={item}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex justify-center mt-6"
        >
          <Sparkles className="w-8 h-8 text-black/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}
