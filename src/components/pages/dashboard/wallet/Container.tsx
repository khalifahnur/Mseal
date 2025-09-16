"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import BalanceWallet from "./BalanceWallet";
import Nfc from "./Nfc";
import { useAuth } from "@/components/Forms/AuthContext";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function WalletPage() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <Link
          href="/membership"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-1 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to membership
        </Link>
      </div>

      {/* Wallet Balance Card */}

      <BalanceWallet walletBalance={user?.balance} />

      <Nfc
        createdAt={user?.createdAt}
        tier={user?.membershipTier}
        nfcId={user?.walletId}
        nfcEnabled={user?.walletStatus}
      />

      
    </div>
  );
}
