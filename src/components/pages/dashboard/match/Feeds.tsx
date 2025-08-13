"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

interface XPost {
  id: string;
  text: string;
  created_at: string;
}

const fetchXPosts = async (): Promise<XPost[]> => {
  const res = await fetch("/api/x-posts");
  if (!res.ok) throw new Error("Failed to fetch X posts");
  const data = await res.json();
  return data.data;
};

export default function Feeds() {
  const {
    data: xPosts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["x-posts"],
    queryFn: fetchXPosts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  console.log("x-post", xPosts);

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          Official X Feed
          <Badge
            variant="secondary"
            className="ml-auto bg-blue-100 text-blue-700"
          >
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-gray-500">Loading posts...</p>}
        {isError && <p className="text-red-500">Failed to load X posts.</p>}
        {xPosts && (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {xPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-blue-200"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-gray-900">
                        @OfficialLeague
                      </span>
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Verified
                      </Badge>
                      <span className="text-gray-500 text-sm">
                        • {new Date(post.created_at).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed mb-4">
                      {post.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
