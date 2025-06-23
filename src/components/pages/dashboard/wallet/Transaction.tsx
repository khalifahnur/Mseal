import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, History } from 'lucide-react'
import React from 'react'

export default function Transaction() {
      const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Match Ticket - Home vs Rivals FC",
      amount: -45.0,
      date: "2025-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "topup",
      description: "Wallet Top-up",
      amount: 100.0,
      date: "2025-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "payment",
      description: "Merchandise - Team Jersey",
      amount: -75.0,
      date: "2025-01-12",
      status: "completed",
    },
    {
      id: 4,
      type: "refund",
      description: "Cancelled Event Refund",
      amount: 25.0,
      date: "2025-01-10",
      status: "completed",
    },
    {
      id: 5,
      type: "payment",
      description: "Concession Stand",
      amount: -12.5,
      date: "2025-01-08",
      status: "completed",
    },
  ];
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
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "payment"
                        ? "bg-red-100 text-red-600"
                        : transaction.type === "topup"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {transaction.type === "payment" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : transaction.type === "topup" ? (
                      <ArrowDownLeft className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  )
}
