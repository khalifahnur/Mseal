"use client";

import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function NoActiveTickets() {
  return (
    <Card className="w-full border">
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
              className="bg-gray-100 rounded-full p-4"
            >
              <Ticket className="h-4 w-4 text-gray-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -top-2 -right-2"
            >
              <div className="bg-red-500 rounded-full p-1 text-white text-xs font-bold flex items-center justify-center h-6 w-6">
                0
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium">No Active Tickets</h3>
            <p className="text-sm text-gray-500 mt-1">
              You don&apos;t have any active tickets at the moment.
            </p>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          Buy Ticket
        </Button>
      </CardFooter>
    </Card>
  );
}
