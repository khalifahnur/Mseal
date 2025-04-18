"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTickets } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ApiResponse } from "@/types/ticket";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import { useParams } from "next/navigation";


export default function BuyTicketPage() {
  const params = useParams();
  const eventId = params?.id as string;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
  });

  const event = data?.events?.find((e) => e._id === eventId);

  if (isLoading) return <FullScreenLoader />;

  if (error || !event) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Event not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="container px-4 py-4 md:px-6 md:py-2">
      <Link
        href="/tickets"
        className="flex items-center text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tickets
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Ticket</CardTitle>
              <CardDescription>
                Fill in your details to complete your purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add form here later if needed */}
              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ticket Options</h3>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of tickets</Label>
                  <Input id="quantity" type="number" min="1" max="10" defaultValue="1" />
                </div>
                <div className="space-y-2">
                  <Label>Ticket type</Label>
                  <RadioGroup defaultValue="regular">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="regular" id="regular" />
                      <Label htmlFor="regular">
                        Regular - KES {event.ticketPrice}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vip" id="vip" />
                      <Label htmlFor="vip">
                        VIP - KES {event.ticketPrice * 2}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <RadioGroup defaultValue="mpesa">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa">M-Pesa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit/Debit Card</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Complete Purchase</Button>
            </CardFooter>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-[150px] w-full overflow-hidden rounded-md">
                <Image
                  src={`/assets/images/stadi1.jpeg`}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold">{event.name}</h3>

                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{event.time} EAT</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Ticket className="mr-2 h-4 w-4" />
                    <span>Regular Ticket</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket price</span>
                  <span>KES {event.ticketPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span>1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>KES 50</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>KES {(event.ticketPrice + 50).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
