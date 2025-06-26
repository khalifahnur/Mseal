"use client";

import { fetchUserWalletTransactions } from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight, History } from "lucide-react";
import React from "react";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function Transaction() {
  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["walletTransactions"],
    queryFn: fetchUserWalletTransactions,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) return <FullScreenLoader />;

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading transactions: {error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest wallet activity</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!transactions || transactions.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p className="text-sm">No wallet transactions have been made.</p>
            {/* You can replace this with an animation or illustration */}
          </div>
        ) : (
          <div className="space-y-4">
            {
            /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
            transactions.map((tx: any) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      tx.transactionType === "prepaid"
                        ? "bg-red-100 text-red-600"
                        : tx.transactionType === "membership"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {tx.transactionType === "prepaid" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium capitalize">
                      {tx.transactionType.replace("-", " ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">
                    +Ksh {Number(tx.amount).toLocaleString()}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {tx.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
