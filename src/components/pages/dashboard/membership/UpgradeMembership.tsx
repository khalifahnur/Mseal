"use client";

import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMembershipPayment } from "@/hooks/Paymenthook/usePaymentHook";
import useSocketData from "@/hooks/socket/walletSocket";
import { Package } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactConfetti from "react-confetti";
import { toast } from "react-toastify";
import { useAuth } from "@/components/Forms/AuthContext";
import { useWindowSize } from "react-use";
import { paymentvalidationSchema } from "@/lib/validationSchema";
import { Form, Formik, FormikHelpers } from "formik";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import { paymentData } from "@/types/payment";
import { membershipTiers } from "@/lib/placeholderData";
import PaymentForm from "./PaymentOption";

interface PaymentSheetProps {
  setSheetModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  phoneNumber: string | null;
  membershipTier: string;
  dob: string;
  city: string;
}

function getMembershipPriceByValue(tierValue: string): number {
  const tier = membershipTiers.find((tier) => tier.value === tierValue);
  return tier ? tier.price : 0;
}

export default function PaymentUpgradeSheet({
  setSheetModalVisible,
  email,
  phoneNumber,
  membershipTier,
  dob,
  city,
}: PaymentSheetProps) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error"
  >("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionReference, setTransactionReference] = useState<string | null>(
    null
  );
  const { user, refreshUser } = useAuth();
  const { width, height } = useWindowSize();
  const confirmOrderPaymentStatus = useSocketData(
    "confirmMembershipPaymentStatus",
    transactionReference
  );
  const paymentMutation = useMembershipPayment();

  useEffect(() => {
    if (
      !transactionReference ||
      !confirmOrderPaymentStatus ||
      paymentStatus !== "pending"
    ) {
      return;
    }

    if (confirmOrderPaymentStatus.paymentStatus === "Completed") {
      setPaymentStatus("success");
      setShowConfetti(true);
      toast.success("Payment confirmed! Enjoy the new upgrade.", {
        position: "top-right",
        autoClose: 3000,
        toastId: "payment-success",
      });
      refreshUser();
      setSheetModalVisible(false);
    } else if (confirmOrderPaymentStatus.paymentStatus === "Failed") {
      setPaymentStatus("error");
      setTransactionReference(null);
      toast.error("Payment failed. Please try again.", {
        toastId: "payment-error",
      });
    }
  }, [transactionReference, confirmOrderPaymentStatus, paymentStatus, refreshUser, setSheetModalVisible]);

  const handleSubmit = useCallback(
    async (values: paymentData, { setSubmitting, setErrors }: FormikHelpers<paymentData>) => {
      setPaymentStatus("initiating");
      try {
        setSubmitting(true);
        const selectedTier = membershipTiers.find(
          (t) => t.value === values.membershipTier
        );
        if (!selectedTier) {
          throw new Error("Invalid membership tier selected");
        }

        const paymentValues = {
          ...values,
          amount: selectedTier.price,
        };

        const paymentResponse = await paymentMutation.mutateAsync(paymentValues);
        setTransactionReference(paymentResponse.reference);
        setPaymentStatus("pending");
        toast.info("STK push sent to your phone. Please complete the payment.", {
          toastId: "stk-push",
        });
      } /* eslint-disable @typescript-eslint/no-explicit-any */
      catch (err: any) {
        const errorMessage =
          err.response?.data?.message || err.message || "Payment failed";
        setErrors({ paymentMethod: errorMessage });
        toast.error(errorMessage, { toastId: "payment-error" });
        setPaymentStatus("error");
      } finally {
        setSubmitting(false);
      }
    },
    [paymentMutation]
  );

  const amount = getMembershipPriceByValue(membershipTier);

  const initialValues: paymentData = useMemo(
    () => ({
      email,
      phoneNumber: phoneNumber || "",
      membershipTier,
      dob,
      amount,
      city,
      useDefaultNumber: !!phoneNumber,
      paymentMethod: "mpesa",
    }),
    [email, phoneNumber, membershipTier, dob, amount, city]
  );

  if (!user || !user.email) {
    return <FullScreenLoader message="User data not available" />;
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
          Membership Upgrade
        </SheetTitle>
        <SheetDescription>Membership Upgrade</SheetDescription>
      </SheetHeader>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={paymentvalidationSchema}
        validateOnBlur={true}
  validateOnChange={true}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <PaymentForm
                values={values}
                setFieldValue={setFieldValue}
                email={email}
                phoneNumber={phoneNumber}
                membershipTiers={membershipTiers}
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