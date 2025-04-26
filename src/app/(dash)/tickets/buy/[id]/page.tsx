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
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { formatDate, cn } from "@/lib/utils";
import { ApiResponse } from "@/types/ticket";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useTicketPayment } from "@/hooks/Paymenthook/usePaymentHook";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";

// Custom Loading Overlay Component
const PaymentProcessingOverlay = ({
  message = "Processing your payment...",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 0;
        return prev + 5;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-white/70">
      <div className="w-64 h-32 flex flex-col items-center justify-center space-y-6">
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full grid grid-cols-4 gap-2 h-8">
          {[0, 1, 2, 3].map((i) => {
            const delay = `${i * 150}ms`;
            return (
              <div
                key={i}
                className="bg-blue-100 border-2 border-primary/50 rounded-md flex items-center justify-center animate-pulse"
                style={{ animationDelay: delay }}
              />
            );
          })}
        </div>

        <p className="text-black font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

const StatusBanner = ({ status, message }:{status:"idle" | "initiating" | "pending" | "success" | "error", message:string}) => {
  const statusConfig = {
    idle: {
      icon: null,
      title: "Idle",
      bgColor: "bg-gray-50 border-gray-200",
      textColor: "text-gray-800",
    },
    initiating: {
      icon: <Loader2 className="h-5 w-5 mr-2 animate-spin" />,
      title: "Initiating Payment",
      bgColor: "bg-blue-50 border-blue-200",
      textColor: "text-blue-800",
    },
    pending: {
      icon: <Clock className="h-5 w-5 mr-2" />,
      title: "Payment Pending",
      bgColor: "bg-amber-50 border-amber-200",
      textColor: "text-amber-800",
    },
    success: {
      icon: <CheckCircle className="h-5 w-5 mr-2" />,
      title: "Payment Initiated Successfully",
      bgColor: "bg-green-50 border-green-200",
      textColor: "text-green-800",
    },
    error: {
      icon: <AlertCircle className="h-5 w-5 mr-2" />,
      title: "Payment Error",
      bgColor: "bg-red-50 border-red-200",
      textColor: "text-red-800",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn("flex items-start p-4 rounded-lg border", config.bgColor)}
    >
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="ml-3">
        <h3 className={cn("text-sm font-medium", config.textColor)}>
          {config.title}
        </h3>
        <div className={cn("mt-2 text-sm", config.textColor)}>{message}</div>
      </div>
    </div>
  );
};

export default function BuyTicketPage() {
  const params = useParams();
  const eventId = params?.id as string;
  const { width, height } = useWindowSize();
  const [quantity, setQuantity] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const initiateTicketPayment = useTicketPayment();
  const serviceFee = 50;

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (paymentStatus === "success") {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  const event = data?.events?.find((e) => e._id === eventId);

  if (isLoading) return <FullScreenLoader />;

  if (error || !event) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the event you&apos;re looking for or failed to load
            event details.
          </p>
          <Link
            href="/tickets"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to tickets
          </Link>
        </div>
      </div>
    );
  }

  function calculateTicketDetails(quantity: number) {
    if (!event) return null;

    const totalAmount = event.ticketPrice * quantity + serviceFee;

    return {
      eventId: event._id,
      match: event.name,
      date: event.date,
      venue: event.venue,
      quantity: quantity,
      amount: totalAmount,
    };
  }

  const handleSubmit = async () => {
    setPaymentStatus("initiating");
    setErrorMessage(null);
    const ticketDetails = calculateTicketDetails(quantity);
    if (!ticketDetails) {
      setPaymentStatus("error");
      setErrorMessage("Failed to calculate ticket details.");
      return;
    }

    try {
      // Short timeout to show the initiating state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPaymentStatus("pending");

      // Process payment
      await initiateTicketPayment.mutateAsync(ticketDetails);

      // Short timeout to ensure processing overlay is visible
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPaymentStatus("success");

      toast.success(
        "STK Push sent successfully! Please complete the payment on your phone.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) { 
      setPaymentStatus("error");
      setErrorMessage(
        error?.message || "An error occurred while processing your payment."
      );
      toast.error("Payment initiation failed. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "initiating":
        return "Preparing your payment request. This will only take a moment...";
      case "pending":
        return "Payment request sent. Please check your phone to complete the M-Pesa transaction. Keep this page open until the transaction is complete.";
      case "success":
        return "Payment request sent successfully! Complete the payment on your phone to confirm your tickets. You'll receive a confirmation once the payment is complete.";
      case "error":
        return (
          errorMessage || "An error occurred while processing your payment."
        );
      default:
        return "";
    }
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {paymentStatus === "pending" && <PaymentProcessingOverlay />}

      <Link
        href="/tickets"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to tickets
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Purchase Ticket</CardTitle>
              <CardDescription className="text-base">
                Fill in your details to complete your purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Payment Status Display */}
              {paymentStatus !== "idle" && (
                <StatusBanner
                  status={paymentStatus}
                  message={getStatusMessage()}
                />
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Ticket Options</h3>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-base">
                    Number of tickets
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    disabled={
                      paymentStatus === "initiating" ||
                      paymentStatus === "pending"
                    }
                    className="text-lg p-6"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Payment Method</h3>
                <RadioGroup
                  defaultValue="mpesa"
                  disabled={
                    paymentStatus === "initiating" ||
                    paymentStatus === "pending"
                  }
                >
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                    <RadioGroupItem
                      value="mpesa"
                      id="mpesa"
                      className="h-5 w-5"
                    />
                    <Label
                      htmlFor="mpesa"
                      className="text-base cursor-pointer flex-1"
                    >
                      M-Pesa
                    </Label>
                    <Image
                      src="/assets/images/mpesa.png"
                      alt="M-Pesa Logo"
                      width={50}
                      height={20}
                      className="h-8"
                    />
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className={cn(
                  "w-full py-6 text-lg font-medium transition-all",
                  paymentStatus === "success"
                    ? "bg-primary hover:bg-primary/10"
                    : ""
                )}
                onClick={handleSubmit}
                disabled={
                  paymentStatus === "initiating" || paymentStatus === "pending"
                }
              >
                {paymentStatus === "initiating" && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                {paymentStatus === "initiating"
                  ? "Initiating Payment..."
                  : paymentStatus === "pending"
                  ? "Awaiting Payment..."
                  : paymentStatus === "success"
                  ? "Payment Initiated Successfully!"
                  : "Complete Purchase"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <Card className="shadow-sm sticky top-8">
            <CardHeader className="bg-gray-50 rounded-t-lg">
              <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="text-xl font-bold">{event.name}</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="text-base">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="text-base">{event.time} EAT</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="text-base">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Ticket className="mr-3 h-5 w-5 text-blue-600" />
                    <span className="text-base">Regular Ticket</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket price</span>
                  <span className="font-medium">
                    Ksh.{event.ticketPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">x{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="font-medium">Ksh.{serviceFee}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg font-semibold bg-gray-50 p-3 rounded-md">
                  <span>Total</span>
                  <span className="text-blue-700">
                    Ksh.{" "}
                    {(
                      event.ticketPrice * quantity +
                      serviceFee
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
