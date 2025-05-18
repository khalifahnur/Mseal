import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Gift, Zap } from "lucide-react";

export function BenefitsList() {
  return (
    <Card className="col-span-1 bg-black text-white">
      <CardContent className="space-y-6 mt-10">
        <div className="grid grid-cols-2 gap-4 ">
          <div className=" bg-white/5 p-3 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">12</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Events Attended
            </p>
          </div>
          <div className="bg-white/5  p-3 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">4</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Rewards Claimed
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Member Since</h4>
          <p className="text-sm">January 15, 2025</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 hover:bg-yellow-400/30 hover:text-yellow-400 transition-all"
        >
          View Membership History
        </Button>
      </CardFooter>
    </Card>
  );
}
