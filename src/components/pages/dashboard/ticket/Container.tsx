"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ActiveTickets } from "./ActiveTickets";
import { TicketHistory } from "./TicketHistory";
import TicketsContainer from "./TicketsContainer";
import { useAuth } from "@/components/Forms/AuthContext";

export default function Container() {
  const [openDialog, setOpenDialog] = useState(false);
  const [hasShownDialog, setHasShownDialog] = useState(false);
  const { user } = useAuth();
  const isGoldMember = user?.membershipTier === "gold";
  const isSilverMember = user?.membershipTier === "silver";
  const userName = user?.firstName || "User";

  useEffect(() => {
    if ((isGoldMember || isSilverMember) && !hasShownDialog) {
      setOpenDialog(true);
      setHasShownDialog(true);
    }
  }, [isGoldMember, isSilverMember, hasShownDialog]);

  const handleTabChange = (value: string) => {
    if (value === "tickets" && (isGoldMember || isSilverMember) && !hasShownDialog) {
      setOpenDialog(true);
      setHasShownDialog(true);
    }
  };

  return (
    <div className="container px-2 py-2 md:px-4 md:py-4">
      <div className="flex flex-col space-y-6">
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome, {userName}!</AlertDialogTitle>
              {user?.membershipTier === "gold" ? (
                <AlertDialogDescription>
                  Thank you for being a valued Gold Member! Your VIP ticket is
                  included as part of your membership. Enjoy exclusive benefits,
                  including priority seating, VIP access to events, and special
                  discounts on concessions and merchandise.
                </AlertDialogDescription>
              ) : user?.membershipTier === "silver" ? (
                <AlertDialogDescription>
                  Thank you for being a valued Silver Member! Your ticket is
                  included as part of your membership. Enjoy !
                </AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setOpenDialog(false)}>
                Got it!
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Tabs
          defaultValue="tickets"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="active">Active Tickets</TabsTrigger>
            <TabsTrigger value="history">Ticket History</TabsTrigger>
          </TabsList>
          <TabsContent value="tickets">
            <TicketsContainer />
          </TabsContent>
          <TabsContent value="active">
            <ActiveTickets />
          </TabsContent>
          <TabsContent value="history">
            <TicketHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}