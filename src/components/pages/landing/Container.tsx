"use client";

import { motion } from "framer-motion";
import BlobImage from "./BlobImage";
import { Button } from "@/components/ui/button";
import Ctabtn from "./ctabtn";

interface LandingHeaderProps {
  onLoginClick: () => void;
}
export default function MembershipSection({
  onLoginClick,
}: LandingHeaderProps) {
  return (
    <section className="relative opensans md:px-20 overflow-hidden bg-[#ffffff] text-black min-h-[calc(100vh-4rem)] w-full">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        

        {/* <motion.div
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
        /> */}

        

        {/* Large background blobs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-primary/10 opacity-40"
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
          className="absolute w-96 h-96 rounded-full bg-gray-100 opacity-50"
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
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-black to-gray-800 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                MURANGA SEAL FC
              </motion.h1>
              <motion.h2
                className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Official Membership
                <span className="ml-2 bg-primary text-black text-xs px-2 py-1 rounded-full">
                  2025 SEASON
                </span>
              </motion.h2>
            </div>

            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Join the pride of Muranga and experience football like never
              before with exclusive member benefits including:
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
                    className="h-5 w-5 text-primary mt-0.5 mr-2 shrink-0"
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

            <Ctabtn />

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
              <Button onClick={onLoginClick} variant={"ghost"}>
                <span className="text-primary hover:underline cursor-pointer font-semibold ml-1">
                  {" "}
                  LOG IN HERE
                </span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative"
          >
            {/* Additional floating elements around the card */}
            <motion.div
              className="absolute w-12 h-12 rounded-full bg-primary/40 opacity-20 z-0"
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
  );
}
