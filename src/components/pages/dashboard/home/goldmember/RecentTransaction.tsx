"use client";

import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import { fetchUserTransactions } from "@/api/api";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Calendar, Trophy, Coffee } from "lucide-react";
/* eslint-disable @typescript-eslint/no-explicit-any */
const transactionTypeMap: Record<string, { icon: any; description: string }> = {
  ticket: {
    icon: Trophy,
    description: "Match Ticket Purchase",
  },
  refund: {
    icon: CreditCard,
    description: "Refund",
  },
  prepaid: {
    icon: Coffee,
    description: "Mseal wallet prepaid",
  },
  merchandise: {
    icon: Calendar,
    description: "Merchandise Purchase",
  },
  membership: {
    icon: Calendar,
    description: "Membership Purchase",
  },
};

export function RecentTransactions() {
  const {
    data: transactions = [], 
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latestTransactions"],
    queryFn: fetchUserTransactions,
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

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Recent Transactions</h3>
          <CreditCard className="w-5 h-5 text-gold" />
        </div>
        <div className="text-center text-muted-foreground">
          <p>No transactions done</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg">Recent Transactions</h3>
        <CreditCard className="w-5 h-5 text-gold" />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">Type</th>
              <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">Description</th>
              <th className="text-left py-3 px-2 font-medium text-sm text-muted-foreground">Date</th>
              <th className="text-right py-3 px-2 font-medium text-sm text-muted-foreground">Amount</th>
              <th className="text-center py-3 px-2 font-medium text-sm text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {
            /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
            transactions.map(({transaction}:any) => {
              const { icon: Icon, description } =
                transactionTypeMap[transaction.transactionType] || {
                  icon: CreditCard,
                  description: transaction.transactionType || "Unknown",
                };
              const isPayment = transaction.transactionType !== "refund";
              return (
                <tr
                  key={transaction._id}
                  className="border-b border-border/50 hover:bg-accent/30 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-2 rounded-full ${
                          isPayment ? "bg-red-500/20" : "bg-green-500/20"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${
                            isPayment ? "text-red-400" : "text-green-400"
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="font-medium text-sm">
                      {description}
                      {transaction.paymentMethod && (
                        <span className="text-xs text-muted-foreground">
                          {" "}
                          ({transaction.paymentMethod})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-sm text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <span
                        className={`font-bold text-sm ${
                          isPayment ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        ksh.{transaction.amount.toFixed(2)}
                      </span>
                      {isPayment ? (
                        <ArrowUpRight className="w-3 h-3 text-red-400" />
                      ) : (
                        <ArrowDownLeft className="w-3 h-3 text-green-400" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "Success"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}