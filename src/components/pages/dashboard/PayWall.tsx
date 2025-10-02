"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMembershipPayment } from "@/hooks/Paymenthook/usePaymentHook";
import useSocketData from "@/hooks/socket/walletSocket";
import { Package, CreditCard} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactConfetti from "react-confetti";
import { toast } from "react-toastify";
import { useAuth } from "@/components/Forms/AuthContext";
import { useWindowSize } from "react-use";
import { paymentvalidationSchema } from "@/lib/validationSchema";
import { Form, Formik, FormikHelpers } from "formik";
import { paymentData } from "@/types/payment";
import { features, membershipTiers } from "@/lib/placeholderData";
import { FullScreenLoader } from "../loading/FullScreenLoader";
import PaymentForm from "./membership/PaymentOption";

type MembershipTier = 'ordinary' | 'bronze' | 'silver' | 'gold';

const getFeaturesForTier = (tier: string): string[] => {
  const validTier = tier as MembershipTier;
  return features[validTier] || features.ordinary;
};


function getMembershipPriceByValue(tierValue: string): number {
  const tier = membershipTiers.find((tier) => tier.value === tierValue);
  return tier ? tier.price : 0;
}

export function MembershipPaywallModal({ open, onOpenChange, tier }: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier:string}) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error"
  >("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionReference, setTransactionReference] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { user, refreshUser } = useAuth();
  const { width, height } = useWindowSize();
  const confirmOrderPaymentStatus = useSocketData(
    "confirmMembershipPaymentStatus",
    transactionReference
  );
  const paymentMutation = useMembershipPayment();

  const currentTierFeatures = getFeaturesForTier(tier);

  const amount = getMembershipPriceByValue(tier);

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
      toast.success("Payment confirmed! Your membership has been renewed.", {
        position: "top-right",
        autoClose: 3000,
        toastId: "renewal-success",
      });
      refreshUser();
      setTimeout(() => {
        onOpenChange(false);
        setShowPaymentForm(false);
        setShowConfetti(false);
      }, 2000);
    } else if (confirmOrderPaymentStatus.paymentStatus === "Failed") {
      setPaymentStatus("error");
      setTransactionReference(null);
      toast.error("Payment failed. Please try again.", {
        toastId: "payment-error",
      });
    }
  }, [transactionReference, confirmOrderPaymentStatus, paymentStatus, refreshUser, onOpenChange]);

  const handleFormSubmit = useCallback(
    async (values: paymentData, { setSubmitting, setErrors }: FormikHelpers<paymentData>) => {
      setPaymentStatus("initiating");
      try {
        setSubmitting(true);

        const paymentValues = {
          ...values,
          amount: amount,
          paymentContext: "renewal"
        };

        const paymentResponse = await paymentMutation.mutateAsync(paymentValues);
        setTransactionReference(paymentResponse.reference);
        setPaymentStatus("pending");
        toast.info("STK push sent to your phone. Please complete the payment.", {
          toastId: "stk-push",
        });
      } 
      /* eslint-disable @typescript-eslint/no-explicit-any */
      catch (err:any) {
        const errorMessage = err.response?.data?.message || err.message || "Payment failed";
        setErrors({ paymentMethod: errorMessage });
        toast.error(errorMessage, { toastId: "payment-error" });
        setPaymentStatus("error");
      } finally {
        setSubmitting(false);
      }
    },
    [amount, paymentMutation]
  );

  const initialValues: paymentData = useMemo(
    () => ({
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      membershipTier: tier,
      dob: user?.dob || "",
      amount: amount,
      city: user?.city || "",
      useDefaultNumber: !!user?.phoneNumber,
      paymentMethod: "mpesa",
    }),
    [user, tier, amount]
  );

  const handleClose = () => {
    onOpenChange(false);
    // Reset states after a delay to allow animation
    setTimeout(() => {
      setShowPaymentForm(false);
      setPaymentStatus("idle");
      setTransactionReference(null);
    }, 300);
  };

  if (!user || !user.email) {
    return <FullScreenLoader message="User data not available" />;
  }

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={true}>
      {showConfetti && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      <DialogContent className="[&>button]:hidden w-[90%] max-w-md sm:max-w-lg md:max-w-xl overflow-y-hidden max-h-[85vh] sm:max-h-[90vh] rounded-xl p-0 border-0 shadow-xl bg-white"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {showPaymentForm ? (
          <>
            <DialogHeader className="bg-primary text-white p-6">
              <DialogTitle className="text-2xl text-white text-center flex items-center justify-center">
                <CreditCard className="mr-2 h-6 w-6" />
                Renew Membership
              </DialogTitle>
              <p className="text-center text-blue-100 mt-2">
                Complete your membership renewal payment
              </p>
            </DialogHeader>
            
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={paymentvalidationSchema}
              validateOnBlur={true}
              validateOnChange={true}
              onSubmit={handleFormSubmit}
            >
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="flex flex-col">
                  <div className="flex-1 overflow-y-auto max-h-[60vh] p-6">
                    <PaymentForm
                      values={values}
                      setFieldValue={setFieldValue}
                      email={user.email}
                      phoneNumber={user.phoneNumber}
                      membershipTiers={membershipTiers.filter(t => t.value === tier)}
                      //isRenewal={true}
                    />
                  </div>
                  <div className="border-t p-4 bg-gray-50">
                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowPaymentForm(false)}
                        disabled={isSubmitting || paymentStatus === "pending"}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
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
                          : `Pay Ksh ${Number(amount).toFixed(2)}`}
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <DialogHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
              <DialogTitle className="text-2xl text-white text-center flex items-center justify-center">
                <Package className="mr-2 h-6 w-6" />
                Membership Expired
              </DialogTitle>
              <p className="text-center text-red-100 mt-2">
                Renew your annual membership to restore access
              </p>
            </DialogHeader>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="text-red-500 mr-2">❌</span>
                  You&apos;ve lost access to:
                </h3>
                <ul className="space-y-2">
                  {currentTierFeatures.map((feature, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 pt-2">

                <Button
                  onClick={() => setShowPaymentForm(true)}
                  variant="outline"
                  className="w-full"
                  disabled={paymentStatus === "initiating" || paymentStatus === "pending"}
                >
                  Renew Membership
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}