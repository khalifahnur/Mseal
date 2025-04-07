"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import BlobImage from "./BlobImage"

export default function MembershipSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-100 text-black min-h-[calc(100vh-4rem)] w-full">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating colored shapes */}
        <motion.div
          className="absolute w-20 h-20 rounded-lg bg-[#fae11a] opacity-20"
          style={{ top: "15%", right: "20%" }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-16 h-16 rounded-lg bg-purple-500 opacity-20"
          style={{ bottom: "25%", right: "10%" }}
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-14 h-14 rounded-full bg-white opacity-20"
          style={{ top: "20%", left: "15%" }}
          animate={{
            y: [0, 15, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-24 h-24 rounded-full bg-[#fae11a] opacity-15"
          style={{ bottom: "15%", left: "20%" }}
          animate={{
            y: [0, 10, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-32 h-32 rounded-full border-4 border-gray-200 opacity-20"
          style={{ top: "10%", right: "30%" }}
          animate={{
            y: [0, -10, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Large background blobs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-yellow-100 opacity-40"
          style={{ top: "-5%", right: "-5%" }}
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-50 opacity-50"
          style={{ bottom: "-10%", left: "-10%" }}
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8 max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <motion.h3
                className="text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Official Membership
              </motion.h3>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                MURANGA SEAL FC
              </motion.h1>
              <motion.h2
                className="text-2xl sm:text-3xl font-bold text-[#fae115] flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Adult Membership
                <span className="ml-2 bg-[#fae115] text-black text-xs px-2 py-1 rounded-full">2025 SEASON</span>
              </motion.h2>
            </div>

            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Join the pride of Muranga and experience football like never before with exclusive member benefits
              including:
            </motion.p>

            <motion.ul
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {[
                "Priority match ticket access",
                "Official merchandise discounts",
                "Members-only events with players",
                "Digital membership card",
                "Match day experiences",
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  <svg
                    className="h-5 w-5 text-[#fae115] mt-0.5 mr-2 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="pt-4 space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/SignUp" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full bg-[#fae115] text-black px-8 py-3 font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 shadow-lg transform hover:-translate-y-1 focus:outline-hidden focus:ring-2 focus:ring-[#fae115] focus:ring-opacity-50 flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    JOIN NOW
                    <svg
                      className="ml-2 w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </motion.button>
                </Link>

                <Link href="/Pricing" className="w-full sm:w-auto">
                  <motion.button
                    className="w-full bg-transparent border-2 border-gray-300 text-gray-700 px-8 py-3 font-bold rounded-lg hover:border-gray-500 hover:text-black transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    VIEW PLANS
                  </motion.button>
                </Link>
              </div>

              {/* Ticket purchase option */}
              <motion.div
                className="flex items-center justify-center sm:justify-start mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-center sm:text-left">
                  <span className="text-gray-600">Just want tickets? </span>
                  <Link href="/tickets" className="group inline-flex items-center">
                    <span className="font-semibold text-black group-hover:text-[#fae115] transition-colors duration-200">
                      Buy match tickets
                    </span>
                    <svg
                      className="ml-1 w-4 h-4 text-gray-500 group-hover:text-[#fae115] group-hover:translate-x-1 transition-all duration-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>

              <div className="text-base flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Already a member?{" "}
                <Link href="/SignIn" className="text-[#fae115] hover:underline cursor-pointer font-semibold ml-1">
                  LOG IN HERE
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            {/* Additional floating elements around the card */}
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-yellow-400 opacity-20 z-0"
              style={{ top: "-10%", right: "20%" }}
              animate={{
                y: [0, -15, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute w-10 h-10 rounded-full bg-blue-400 opacity-20 z-0"
              style={{ bottom: "5%", right: "10%" }}
              animate={{
                y: [0, 10, 0],
                x: [0, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <BlobImage />
          </motion.div>
        </div>
      </div>
    </section>
  )
}