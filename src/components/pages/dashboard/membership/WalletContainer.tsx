import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, Wallet, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function WalletContainer() {
  return (
    <Card className="bg-black text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 " />
            <CardTitle className="text-white">
              Mseal Wallet & NFC Card
            </CardTitle>
          </div>
          <Badge>New Feature</Badge>
        </div>
        <CardDescription>
          Experience seamless payments with your Mseal wallet and NFC
          membership card
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <CreditCard className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-gray-900">Contactless Payments</p>
              <p className="text-sm text-muted-foreground">
                Tap to pay at venues
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <Wallet className="h-8 w-8 text-green-600" />
            <div>
              <p className="font-medium text-black">Digital Balance</p>
              <p className="text-sm text-muted-foreground">Ksh.#### available</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
            <Zap className="h-8 w-8 text-amber-600" />
            <div>
              <p className="font-medium text-black">Instant Transactions</p>
              <p className="text-sm text-muted-foreground">
                No waiting in lines
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="place-content-end">
        <Button asChild className="w-1/2">
          <Link href="/membership/wallet">
            <Wallet className="h-4 w-4 mr-2" />
            Mseal Wallet
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
