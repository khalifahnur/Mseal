"use client";

import { motion } from "framer-motion";
import { ShieldOff, Crown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function NoMembership() {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const { email, phoneNumber } = data;

  return (
    <Card className="w-full border">
      <CardContent className="pt-2">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              duration: 0.5,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: [-5, 5, -5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              className="bg-gray-100 rounded-full p-2"
            >
              <ShieldOff className="h-8 w-8 text-gray-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="absolute -bottom-2 -right-2"
            >
              <div className="bg-amber-400 rounded-full p-1 text-white flex items-center justify-center h-5 w-5">
                <Crown className="h-4 w-4" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-medium">No Active Membership</h3>
            <p className="text-sm text-gray-500 mt-1">
              You don't currently have an active membership plan.
            </p>
          </motion.div>
        </div>
      </CardContent>
      <CardFooter>
        <motion.div
          className="w-full items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link href={`/membership/upgrade/${email}/${phoneNumber}`}>
            <Button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white">
              Upgrade Membership
            </Button>
          </Link>
        </motion.div>
      </CardFooter>
    </Card>
  );
}
