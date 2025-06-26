"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchUserTransactions } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function LatestTransaction() {
  const {
    data: transactions,
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

  return (
    <Card className="md:col-span-2 lg:col-span-2 w-full" id="recent-transactions">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {(!transactions || transactions.length === 0) ? (
          <div className="text-center text-muted-foreground py-6">
            <p>No recent transactions found.</p>
          </div>
        ) : (
          <ScrollArea className="h-[200px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
                transactions.map((tx: any) => (
                  <TableRow key={tx._id}>
                    <TableCell className="font-medium">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="capitalize">
                      {tx.transactionType.replace("-", " ")}
                    </TableCell>
                    <TableCell>
                      Ksh.{Number(tx.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>{tx.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
