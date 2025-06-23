"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import PaymentSheet from "./PaymentSheet";

type WalletProp = {
  walletBalance: number | undefined;
};

export default function BalanceWallet({ walletBalance = 0 }: WalletProp) {
  
  const [showBalance, setShowBalance] = useState(false);
  const [sheetModalVisible, setSheetModalVisible] = useState(false);

  return (
    <Card className="bg-gradient-to-r from-primary to-black text-black border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <CardTitle className="text-black">Mseal Wallet</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-white/80">Available Balance</p>
          <div className="text-2xl font-bold">
            {showBalance ? `Ksh ${(walletBalance ?? 0).toFixed(2)}` : "######"}
          </div>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <Button
            variant="secondary"
            className="flex-1 bg-[#1e1e1e] text-white"
            onClick={() => setSheetModalVisible(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
          <Sheet open={sheetModalVisible} onOpenChange={setSheetModalVisible}>
            <PaymentSheet  setSheetModalVisible={setSheetModalVisible} />
          </Sheet>
        </div>
      </CardContent>
    </Card>
  );
}
