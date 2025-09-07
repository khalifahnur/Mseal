import MatchesPage from "@/components/pages/dashboard/match/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share, ShoppingBag, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <MatchesPage />
      {/* Footer CTA */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Ready for Match Day?</h3>
            <p className="text-gray-300">
              Don&apos;t miss out on the action - get your tickets and gear now!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`https://twitter.com/intent/tweet?text=🔥 Don’t miss today’s Mseal FC match!`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200 h-12 px-8">
                <Share className="h-5 w-5 mr-2" />
                Share on X
              </Button>
            </Link>

            <Link href="/tickets" passHref>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-12 px-8 bg-transparent"
              >
                <Ticket className="h-5 w-5 mr-2" />
                Buy Tickets
              </Button>
            </Link>

            <Link href="/shop" passHref>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 h-12 px-8 bg-transparent"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Visit Team Store
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
