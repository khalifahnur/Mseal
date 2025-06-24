"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWalletTopupPayment } from "@/hooks/Paymenthook/usePaymentHook";
import useSocketData from "@/hooks/socket/walletSocket";
import { Package } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { toast } from "react-toastify";
import PaymentForm from "./PaymentMethods";
import { useAuth } from "@/components/Forms/AuthContext";
import { useWindowSize } from "react-use";
import { paymentvalidationSchema } from "@/lib/validationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

interface PaymentSheetProps {
  setSheetModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PaymentSheet({
  setSheetModalVisible,
}: PaymentSheetProps) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error"
  >("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionReference, setTransactionReference] = useState<
    string | null
  >(null);
  const { user } = useAuth();
  const { width, height } = useWindowSize();
  const initiateWalletPayment = useWalletTopupPayment();
  const confirmWalletPaymentStatus = useSocketData(
    "confirmWalletPaymentStatus",
    transactionReference
  );
  const quickAmounts = [100, 500, 1000, 2000];

  useEffect(() => {
    if (transactionReference && confirmWalletPaymentStatus.paymentStatus) {
      if (confirmWalletPaymentStatus.paymentStatus === "Completed") {
        setPaymentStatus("success");
        toast.success(`Successfully added to wallet!`, {
          position: "top-right",
          autoClose: 3000,
          toastId: "payment-success",
        });
        setShowConfetti(true);
        setTimeout(() => {
          setSheetModalVisible(false);
          setShowConfetti(false);
          setTransactionReference(null);
        }, 2000);
      } else if (confirmWalletPaymentStatus.paymentStatus === "Failed") {
        setPaymentStatus("error");
        toast.error("Payment failed. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          toastId: "payment-failed",
        });
      }
    }
  }, [transactionReference, confirmWalletPaymentStatus, setSheetModalVisible]);

  if (!user) {
    return <FullScreenLoader />;
  }

  return (
    <SheetContent className="w-full sm:max-w-md flex flex-col p-0 overflow-x-scroll">
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <SheetHeader className="p-4 border-b">
        <SheetTitle className="flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Add Funds to Wallet
        </SheetTitle>
        <SheetDescription>
          Add money to your digital wallet using M-Pesa.
        </SheetDescription>
      </SheetHeader>
      <Formik
        enableReinitialize
        initialValues={{
          amount: "",
          phoneNumber: user?.phoneNumber || "",
          useDefaultNumber: !!user?.phoneNumber,
          paymentMethod: "",
        }}
        validationSchema={paymentvalidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
          setPaymentStatus("initiating");

          try {
            const amount = Number(values.amount);
            const method = values.paymentMethod;

            let paymentResponse;

            if (method === "mpesa") {
              // M-Pesa flow
              paymentResponse = await initiateWalletPayment.mutateAsync({
                amount,
                phoneNumber: values.phoneNumber,
              });
              toast.info(
                "M-Pesa STK push sent to your phone. Please complete the payment.",
                {
                  position: "top-right",
                  autoClose: 10000,
                  toastId: "stk-push",
                }
              );
            } else if (method === "card") {
              // Card Payment Flow
              // paymentResponse = await initiateCardPayment.mutateAsync({
              //   amount,
              //   email: user?.email,
              // });

              // // Redirect to payment gateway
              // window.location.href = paymentResponse.redirectUrl;
              console.warn("card initiation");
            } else if (method === "bank") {
              // Bank Payment Flow
              // paymentResponse = await initiateBankTransfer.mutateAsync({
              //   amount,
              //   accountName: values.bankAccountName,
              //   bank: values.preferredBank,
              //   email: user?.email,
              // });
              console.warn("bank initiation");

              toast.info("Check your email for bank transfer instructions.", {
                position: "top-right",
                autoClose: 8000,
                toastId: "bank-info",
              });
            } else if (method === "wallet") {
              // Wallet Payment Flow
              // paymentResponse = await initiateWalletProviderPayment.mutateAsync({
              //   amount,
              //   provider: values.walletProvider,
              //   walletId: values.walletId,
              // });
              //window.location.href = paymentResponse.redirectUrl;
            } else if (method === "airtel") {
              // Airtel money flow (similar to M-Pesa)
              // paymentResponse = await initiateAirtelPayment.mutateAsync({
              //   amount,
              //   phoneNumber: values.phoneNumber,
              // });

              toast.info(
                "Airtel STK push sent. Complete the payment on your phone.",
                {
                  position: "top-right",
                  autoClose: 8000,
                  toastId: "airtel-push",
                }
              );
            }

            if (paymentResponse?.reference) {
              setTransactionReference(paymentResponse.reference);
              setPaymentStatus("pending");
            }
          } catch (error: unknown) {
            setPaymentStatus("error");

            const message =
              error instanceof Error
                ? error.message
                : "Failed to initiate payment.";

            toast.error(message, {
              position: "bottom-right",
              autoClose: 5000,
              toastId: "payment-error",
            });
          }

          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (Ksh)</Label>
                <Field
                  name="amount"
                  as={Input}
                  type="number"
                  placeholder="0.00"
                  disabled={
                    isSubmitting ||
                    paymentStatus === "initiating" ||
                    paymentStatus === "pending"
                  }
                  className="text-lg"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-sm text-red-600"
                />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      type="button"
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setFieldValue("amount", amount.toString())}
                      disabled={
                        isSubmitting ||
                        paymentStatus === "initiating" ||
                        paymentStatus === "pending"
                      }
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <PaymentForm
                values={values}
                setFieldValue={setFieldValue}
                email={user?.email}
                phoneNumber={user?.phoneNumber}
                amount={Number(values.amount) || 0}
                //paymentStatus={paymentStatus}
              />
            </div>
            <div className="border-t p-4">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={
                  isSubmitting ||
                  paymentStatus === "initiating" ||
                  paymentStatus === "pending"
                }
              >
                {paymentStatus === "initiating"
                  ? "Initiating..."
                  : paymentStatus === "pending"
                  ? "Awaiting Payment..."
                  : `Pay Ksh ${Number(values.amount || 0).toFixed(2)}`}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </SheetContent>
  );
}
