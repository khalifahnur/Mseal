"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  NfcIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import formatMonthYear from "@/lib/utils";
import { useUpdateNfc } from "@/hooks/Authhook/authHook";
import Transaction from "./Transaction";

type nfcProp = {
  nfcId?: string | null | undefined;
  createdAt: string | null | undefined;
  tier: string | undefined | null;
  nfcEnabled:
    | "Active"
    | "Inactive"
    | "Suspended"
    | "Pending"
    | null
    | undefined;
};
export default function Nfc({
  createdAt,
  tier,
  nfcId,
  nfcEnabled,
}: nfcProp) {
  const updateNfc = useUpdateNfc();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* NFC Card Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <NfcIcon className="h-5 w-5" />
              <CardTitle>NFC Membership Card</CardTitle>
            </div>
            <Badge variant={nfcEnabled ? "default" : "secondary"}>
              {nfcEnabled === "Active" ? "Active" : "Inactive"}
            </Badge>
          </div>
          <CardDescription>
            Use your NFC-enabled membership card for contactless payments and
            access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Virtual Card Display */}
          <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 rounded-xl p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm opacity-80">Muranga Seal</p>
                <p className="text-lg font-semibold">
                  {tier?.charAt(0).toUpperCase()}
                  {tier?.slice(1)} Member
                </p>
              </div>
              <NfcIcon className="h-8 w-8 opacity-60" />
            </div>
            <div className="space-y-2">
              <p className="text-sm opacity-80">Card Number</p>
              <p className="text-lg font-mono tracking-wider">
                •••• •••• •••• {nfcId?.slice(-4) ?? "****"}
              </p>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div className="ml-auto text-right">
                <p className="text-xs opacity-80">Member Since</p>
                <p className="text-sm">{formatMonthYear(createdAt)}</p>
              </div>
            </div>
          </div>

          {/* NFC Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="nfc-payments">NFC Payments</Label>
                <p className="text-sm text-muted-foreground">
                  Enable contactless payments
                </p>
              </div>
              <Switch
                id="nfc-payments"
                checked={nfcEnabled === "Active"}
                onCheckedChange={(checked) => {
                  updateNfc.mutate(checked ? "Active" : "Inactive");
                }}
              />
            </div>
          </div>
        </CardContent>
        {/* <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1">
            <Settings className="h-4 w-4 mr-2" />
            Card Settings
          </Button>
          <Button variant="outline" className="flex-1">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </Button>
        </CardFooter> */}
      </Card>

      {/* Quick Actions */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common wallet and payment actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <QrCode className="h-6 w-6" />
              <span className="text-sm">Pay with QR</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Smartphone className="h-6 w-6" />
              <span className="text-sm">Mobile Pay</span>
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Saved Payment Methods</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">•••• 1234</p>
                    <p className="text-sm text-muted-foreground">
                      Visa • Expires 12/26
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Primary</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Apple Pay</p>
                    <p className="text-sm text-muted-foreground">•••• 5678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </CardFooter>
      </Card> */}
      {/* Transaction History */}
      <Transaction />
    </div>
  );
}
