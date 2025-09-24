"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function NoUpcomingMatch() {
  return (
    <Card className="p-6 bg-[#1e1e1e] text-white">
      <CardContent className="pt-0">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
            }}
            className="relative pt-2"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
              className="rounded-full p-4"
            >
              
              <Image src={'/assets/images/icons8-ball.gif'} width={10} height={10} alt="ball" className="w-10 h-10 rounded-lg object-cover "/>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <div className="bg-red-500 rounded-full p-1 text-[#1e1e1e] text-xs font-bold flex items-center justify-center h-6 w-6">
                0
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium">No Upcoming Match</h3>
            <p className="text-sm text-gray-500 mt-1">
              There is no upcoming match.
            </p>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
