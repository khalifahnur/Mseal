"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/Store/CartContext";
import { Package, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Formik, Form } from "formik";
import { useAuth } from "@/components/Forms/AuthContext";
import { useOrderPayment, useOrderWalletPayment } from "@/hooks/Paymenthook/usePaymentHook";
import { toast } from "react-toastify";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";
import useSocketData from "@/hooks/socket/orderSocketHook";
import PaymentForm from "@/components/pages/dashboard/wallet/PaymentMethods";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Yup from "yup";
import { paymentSchema, shippingSchema } from "@/lib/validationSchema";
import OrderSummary from "./checkout/OrderSummary ";

type checkoutProp = {
  setActiveSheet: (sheet: "cart" | "checkout" | null) => void;
};

export default function CheckoutSheet({ setActiveSheet }: checkoutProp) {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { width, height } = useWindowSize();
  const initiateOrderPayment = useOrderPayment();
  const initiateOrderWalletPayment = useOrderWalletPayment();

  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error" | "timeout"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionReference, setTransactionReference] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const confirmOrderPaymentStatus = useSocketData(
    "confirmOrderPaymentStatus",
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
          setPaymentStatus("idle")
        }, 2000);
      } else if (confirmOrderPaymentStatus.paymentStatus === "Failed") {
        setPaymentStatus("error");
        setErrorMessage("Payment failed. Please try again.");
        
      }
    }
  }, [transactionReference, confirmOrderPaymentStatus, clearCart, setActiveSheet]);

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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 100 : 0;
  const serviceFee = 50;
  const total = subtotal + shipping + serviceFee;

  const initialValues = {
    address: "",
    city: "",
    street: "",
    country: "Kenya",
    phoneNumber: user?.phoneNumber || "",
    useDefaultNumber: !!user?.phoneNumber,
    paymentMethod: "mpesa",
    bankAccountName: "",
    preferredBank: "",
  };



  const validationSchemas = [
    null,
    shippingSchema,
    Yup.object().shape({}),
    paymentSchema,
  ];

  /*eslint-disable-next-line @typescript-eslint/no-unused-vars*/ 
  /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
  const handleNextStep = async (values: typeof initialValues, validateForm: any) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 3000,
        toastId: "validation-error",
      });
    }
  };

  /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
  const handleSubmit = async (values: typeof initialValues, { setSubmitting }: any) => {
    setPaymentStatus("initiating");
    setErrorMessage(null);

    const orderDetails = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: total,
      shippingAddress: {
        address: values.address,
        city: values.city,
        country: values.country,
        street: values.street,
      },
      phoneNumber: values.phoneNumber,
      paymentMethod: values.paymentMethod,
    };

    try {
      setShowConfetti(true);
      let paymentResponse;
      const method = values.paymentMethod;
      if (method === "mpesa") {
        paymentResponse = await initiateOrderPayment.mutateAsync(orderDetails);
        toast.info("M-Pesa STK push sent to your phone. Please complete the payment.", {
          position: "top-right",
          autoClose: 10000,
          toastId: "stk-push",
        });
      } else if (method === "card") {
        console.warn("Card payment initiation not implemented");
        toast.info("Card payment processing not available.", {
          position: "top-right",
          autoClose: 8000,
          toastId: "card-info",
        });
      } else if (method === "bank") {
        console.warn("Bank transfer initiation not implemented");
        toast.info("Check your email for bank transfer instructions.", {
          position: "top-right",
          autoClose: 8000,
          toastId: "bank-info",
        });
      } else if (method === "msealwallet") {
        paymentResponse = await initiateOrderWalletPayment.mutateAsync(orderDetails);
        toast.info("Payment initialized. Please wait for confirmation.", {
          position: "top-right",
          autoClose: 10000,
          toastId: "wallet",
        });
      } else if (method === "airtel") {
        console.warn("Airtel payment initiation not implemented");
        toast.info("Airtel STK push sent. Complete the payment on your phone.", {
          position: "top-right",
          autoClose: 8000,
          toastId: "airtel-push",
        });
      }

      if (paymentResponse?.reference) {
        setTransactionReference(paymentResponse.reference);
        setPaymentStatus("pending");
      }
    } 
    /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
    catch (error: any) {
      setPaymentStatus("error");
      setErrorMessage(error.message || "Failed to initiate payment.");
    }
    setSubmitting(false);
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case "idle":
        return "Please review your order and select a payment method to proceed.";
      case "initiating":
        return "Preparing your payment request. This will only take a moment...";
      case "pending":
        return (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500"></div>
            <span>
              Payment request sent. Please complete the transaction. Keep this page open.
            </span>
          </div>
        );
      case "success":
        return "Payment confirmed! Your order has been placed successfully.";
      case "error":
        return errorMessage || "An error occurred while processing your payment.";
      case "timeout":
        return "Payment timed out. Please try again.";
    }
  };

  const steps = [
    { id: 1, name: "Shipping Details" },
    { id: 2, name: "Order Summary" },
    { id: 3, name: "Payment Method" },
  ];

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
        {/* Stepper */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    currentStep >= step.id ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-muted mx-2">
                    <div
                      className={`h-full bg-primary ${
                        currentStep > step.id ? "w-full" : "w-0"
                      } transition-all`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchemas[currentStep]}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, validateForm }) => (
            <Form className="p-4 space-y-6">
              {currentStep === 1 && (
                <div>
                  <h3 className="font-medium text-base mb-3">Shipping Details</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={`${user?.firstName || ""} ${user?.lastName || ""}`.trim()}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={user?.phoneNumber || ""}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={values.address}
                        onChange={(e) => setFieldValue("address", e.target.value)}
                        placeholder="Enter your address"
                      />
                      {errors.address && (
                        <div className="text-sm text-red-600 mt-1">{errors.address}</div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={values.city}
                          onChange={(e) => setFieldValue("city", e.target.value)}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <div className="text-sm text-red-600 mt-1">{errors.city}</div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="street">Street</Label>
                        <Input
                          id="street"
                          name="street"
                          value={values.street}
                          onChange={(e) => setFieldValue("street", e.target.value)}
                          placeholder="Enter street"
                        />
                        {errors.street && (
                          <div className="text-sm text-red-600 mt-1">{errors.street}</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={values.country}
                        onValueChange={(value) => setFieldValue("country", value)}
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
              )}

              {currentStep === 2 && (
                <OrderSummary
                  cart={cart}
                  subtotal={subtotal}
                  shipping={shipping}
                  serviceFee={serviceFee}
                  total={total}
                />
              )}

              {currentStep === 3 && (
                <div>
                  <PaymentForm
                    values={values}
                    setFieldValue={setFieldValue}
                    email={user?.email}
                    phoneNumber={user?.phoneNumber}
                    amount={total}
                    wallet={true}
                  />
                  <div className="text-sm text-muted-foreground mt-4">
                    {getStatusMessage()}
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    disabled={isSubmitting || paymentStatus === "initiating" || paymentStatus === "pending"}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                {currentStep < 3 && (
                  <Button
                    type="button"
                    className="ml-auto"
                    onClick={() => handleNextStep(values, validateForm)}
                    disabled={isSubmitting || paymentStatus === "initiating" || paymentStatus === "pending"}
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button
                    type="submit"
                    className="w-1/2 font-bold"
                    // size="lg"
                    disabled={isSubmitting || paymentStatus === "initiating" || paymentStatus === "pending"}
                  >
                    {isSubmitting || paymentStatus === "initiating"
                      ? "Initiating..."
                      : `Pay Ksh.${total.toFixed(2)}`}
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SheetContent>
  );
}