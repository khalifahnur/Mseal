//import { fetchTodayEvents } from "@/api/api";
import { Card, CardContent } from "@/components/ui/card";
//import { useQuery } from "@tanstack/react-query";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
//import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function HeaderSection() {

  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["todaysEvents"],
  //   queryFn: fetchTodayEvents,
  //   staleTime: 1000 * 60 * 5,
  //   refetchOnWindowFocus: false,
  //   retry: false,
  // });

  // console.log(data)

  // if (isLoading) return <FullScreenLoader />;
  // if (error) return <div>Error loading todays events: {error.message}</div>;

  return (
    <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-8 lg:gap-12">
            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Thunder FC Logo"
                  width={80}
                  height={80}
                  className="mx-auto mb-3 rounded-full border-4 border-white/20 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                  HOME
                </div>
              </div>
              <h3 className="font-bold text-lg">Mseal FC</h3>
              <p className="text-white/80 text-sm">Mseal</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-2">
                <span className="text-3xl font-bold">VS</span>
              </div>
              <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                LIVE SOON
              </div>
            </div>

            <div className="text-center transform hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Lightning United Logo"
                  width={80}
                  height={80}
                  className="mx-auto mb-3 rounded-full border-4 border-white/20 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                  AWAY
                </div>
              </div>
              <h3 className="font-bold text-lg">Mseal</h3>
              <p className="text-white/80 text-sm">Mseal</p>
            </div>
          </div>

          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Thunder FC vs Lightning United
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 text-white/90">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-5 w-5" />
                <span className="font-medium">July 15, 2025 • 3:00 PM EST</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Thunder Stadium</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
