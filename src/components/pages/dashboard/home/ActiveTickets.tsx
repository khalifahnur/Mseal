import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Ticket } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ActiveTickets() {
  return (
    <Card>
      <CardHeader className="md:pb-2">
        <CardTitle>Tickets</CardTitle>
        <CardDescription>View your active tickets and history</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Ticket className="h-6 w-6" />
          </div>
          <div>
            <p className="font-medium">2 Active Tickets</p>
            <p className="text-sm text-muted-foreground">3 Past Tickets</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild>
          <Link href="/tickets">
            <CalendarDays className="mr-2 h-4 w-4" />
            View Tickets
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
