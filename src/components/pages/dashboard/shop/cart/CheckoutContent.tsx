"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/Store/CartContext";
import { CreditCard, MapPin, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useAuth } from "@/components/Forms/AuthContext";
import { useOrderPayment } from "@/hooks/Paymenthook/usePaymentHook";
import { toast } from "react-toastify";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import useSocketData from "@/hooks/socket/socketHook";

type checkoutProp = {
  setActiveSheet: (sheet: "cart" | "checkout" | null) => void;
};

export default function CheckoutSheet({ setActiveSheet }: checkoutProp) {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { width, height } = useWindowSize();
  const initiateOrderPayment = useOrderPayment();

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    street: "",
    country: "Kenya",
    mpesaNumber: user?.phoneNumber || "",
  });
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error" | "timeout"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionReference, setTransactionReference] = useState<
    string | null
  >(null);

  const confirmOrderPaymentStatus = useSocketData(
    "confirmMembershipPaymentStatus",
    transactionReference
  );

  useEffect(() => {
    if (transactionReference && confirmOrderPaymentStatus) {
      if (
        confirmOrderPaymentStatus.orderId &&
        confirmOrderPaymentStatus.paymentStatus === "Completed"
      ) {
        setPaymentStatus("success");
        toast.success("Payment confirmed! Order placed.", {
          position: "top-right",
          autoClose: 5000,
          toastId: "payment-success",
        });

        setTimeout(() => {
          setActiveSheet(null);
          clearCart();
          setShowConfetti(false);
        }, 1000);
      } else if (confirmOrderPaymentStatus.paymentStatus === "Failed") {
        setPaymentStatus("error");
        setErrorMessage("Payment failed. Please try again.");
        toast.error("Payment failed. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          toastId: "payment-failed",
        });
      }
    }
  }, [
    transactionReference,
    confirmOrderPaymentStatus,
    clearCart,
    setActiveSheet,
    paymentStatus,
  ]);

  // Timeout for payment completion
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (paymentStatus === "pending") {
      timeout = setTimeout(() => {
        setPaymentStatus("timeout");
        setErrorMessage("Payment timed out. Please try again.");
        toast.error("Payment timed out. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          toastId: "payment-timeout",
        });
      }, 5 * 60 * 1000); // 5 minutes
    }
    return () => clearTimeout(timeout);
  }, [paymentStatus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 100 : 0;
  const serviceFee = 50;
  const total = subtotal + shipping + serviceFee;

  const data = {
    items: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    })),
    totalAmount: total,
    shippingAddress: {
      address: shippingDetails.address,
      city: shippingDetails.city,
      country: shippingDetails.country,
      street: shippingDetails.street,
    },
    phoneNumber: shippingDetails.mpesaNumber,
  };

  const handleSubmit = async () => {
    if (
      !shippingDetails.address.trim() ||
      !shippingDetails.city.trim() ||
      !shippingDetails.street.trim()
    ) {
      toast.error(
        "Please fill in all required shipping details (address, city, street).",
        {
          position: "top-right",
          autoClose: 5000,
          toastId: "shipping-error",
        }
      );
      return;
    }
    setPaymentStatus("initiating");
    setErrorMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPaymentStatus("pending");
      const paymentResponse = await initiateOrderPayment.mutateAsync(data);
      setTransactionReference(paymentResponse.reference);
      setShowConfetti(true);
    } catch (error: unknown) {
      setPaymentStatus("error");
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred while initiating your payment.";
      setErrorMessage(message);
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "idle":
        return "Please review your order and click 'Pay' to proceed with payment.";
      case "initiating":
        return "Preparing your payment request. This will only take a moment...";
      case "pending":
        return (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
            <span>
              Payment request sent. Please check your phone to complete the
              M-Pesa transaction. Keep this page open.
            </span>
          </div>
        );
      case "success":
        return "Payment confirmed! Your order has been placed successfully.";
      case "error":
        return (
          errorMessage || "An error occurred while processing your payment."
        );
      case "timeout":
        return "Payment timed out. Please try again.";
    }
  };

  return (
    <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
      <SheetHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <SheetTitle className="flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Checkout
          </SheetTitle>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto">
        {showConfetti && (
          <ReactConfetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
          />
        )}
        <div className="p-4 space-y-6">
          {/* Shipping Details */}
          <div>
            <h3 className="font-medium text-base mb-3 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Shipping Details
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={`${user?.firstName || ""} ${
                    user?.lastName || ""
                  }`.trim()}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={user?.phoneNumber || ""}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="street">Street</Label>
                  <Input
                    id="street"
                    name="street"
                    value={shippingDetails.street}
                    onChange={handleInputChange}
                    placeholder="Enter street"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  defaultValue={shippingDetails.country}
                  onValueChange={(value) =>
                    setShippingDetails((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="Uganda">Uganda</SelectItem>
                    <SelectItem value="Tanzania">Tanzania</SelectItem>
                    <SelectItem value="Rwanda">Rwanda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Method */}
          <div>
            <h3 className="font-medium text-base mb-3 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Method
            </h3>
            <RadioGroup defaultValue="mpesa">
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value="mpesa" id="mpesa" />
                <Label
                  htmlFor="mpesa"
                  className="flex items-center cursor-pointer"
                >
                  <Image
                    src="/assets/images/mpesa.png"
                    width={24}
                    height={24}
                    alt="M-Pesa"
                    className="mr-2"
                  />
                  M-Pesa
                </Label>
              </div>
            </RadioGroup>
            <div className="mt-3">
              <Label htmlFor="mpesaNumber">M-Pesa Phone Number</Label>
              <div className="flex items-center">
                <div className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  id="mpesaNumber"
                  name="mpesaNumber"
                  value={shippingDetails.mpesaNumber}
                  onChange={handleInputChange}
                  className="rounded-l-none"
                  placeholder="Enter M-Pesa number"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-medium text-base mb-3">Order Summary</h3>
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-16 h-16 relative rounded overflow-hidden border bg-muted shrink-0">
                    <Image
                      src={item.imgUrl || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Size: {item.size}
                    </p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm">
                        Ksh.{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary & Pay Button */}
      <div className="border-t">
        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>Ksh.{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>Ksh.{shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Fee</span>
            <span>Ksh.{serviceFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Ksh.{total.toFixed(2)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {getStatusMessage()}
          </div>
        </div>
        <div className="p-4 pt-0">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={
              paymentStatus === "initiating" || paymentStatus === "pending"
            }
          >
            Pay Ksh.{total.toFixed(2)}
          </Button>
        </div>
      </div>
    </SheetContent>
  );
}
