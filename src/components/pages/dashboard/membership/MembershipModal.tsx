"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import {
  Formik,
  Field,
  ErrorMessage,
  type FormikHelpers,
  FormikErrors,
} from "formik";
import { MapPin, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { validationSchema } from "@/lib/validationSchema";
import type { paymentData } from "@/types/payment";
import {
  useMembershipPayment,
  usePesapalMembershipPayment,
} from "@/hooks/Paymenthook/usePaymentHook";
import { DateOfBirthPicker } from "../Dob";
import { useRouter } from "next/navigation";
import PaymentForm from "./PaymentOption";
import { cities, membershipTiers } from "@/lib/placeholderData";
import useSocketData from "@/hooks/socket/membershipSocketHook";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export function MembershipModal({
  open,
  onOpenChange,
  email,
  phoneNumber,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  phoneNumber: string | null;
}) {
  const [step, setStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [iframeUrl, setIframeUrl] = useState("");
  const [transactionReference, setTransactionReference] = useState<
    string | null
  >(null);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "initiating" | "pending" | "success" | "error"
  >("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();

  const paymentMutation = useMembershipPayment();
  const pesapalPaymentMutation = usePesapalMembershipPayment();
  const confirmOrderPaymentStatus = useSocketData(
    "confirmMembershipPaymentStatus",
    transactionReference
  );

  useEffect(() => {
    if (
      !transactionReference ||
      !confirmOrderPaymentStatus ||
      paymentStatus !== "pending"
    )
      return;

    if (confirmOrderPaymentStatus.paymentStatus === "Completed") {
      setPaymentStatus("success");
      setShowConfetti(true);
      toast.success("Payment confirmed! You can now close the modal.", {
        position: "top-right",
        autoClose: 3000,
        toastId: "payment-success",
      });
    } else if (confirmOrderPaymentStatus.paymentStatus === "Failed") {
      setPaymentStatus("error");
      setTransactionReference(null);
    }
  }, [transactionReference, confirmOrderPaymentStatus, paymentStatus]);

  const handleVisaPayment = useCallback(
    async (
      values: paymentData,
      { setSubmitting, setErrors }: FormikHelpers<paymentData>
    ) => {
      try {
        setSubmitting(true);
        setPaymentStatus("initiating");
        const selectedTier = membershipTiers.find(
          (t) => t.value === values.membershipTier
        );
        if (!selectedTier) {
          throw new Error("Invalid membership tier selected");
        }

        const paymentValues = {
          tier: selectedTier.value,
          isUpgrade: false,
          dob: values.dob,
          physicalAddress: values.physicalAddress,
          city: values.city,
          amount: selectedTier.price,
        };

        const response = await pesapalPaymentMutation.mutateAsync(
          paymentValues
        );
        setIframeUrl(response.redirectUrl);
        toast.info("Redirecting to Pesapal for Visa payment...", {
          toastId: "visa-redirect",
        });
      } 
      /* eslint-disable @typescript-eslint/no-explicit-any */
      catch (err: any) {
        const errorMessage = err.message || "Visa payment initiation failed";
        setErrors({ paymentMethod: errorMessage });
        toast.error(errorMessage, { toastId: "visa-payment-error" });
        setPaymentStatus("error");
      } finally {
        setSubmitting(false);
      }
    },
    [pesapalPaymentMutation]
  );

  const handleNext = useCallback(
    async (
      values: paymentData,
      errors: FormikErrors<paymentData>,
      validateForm: () => Promise<FormikErrors<paymentData>>,
      setTouched: (fields: Partial<Record<keyof paymentData, boolean>>) => void
    ) => {
      if (isNextDisabled) return;
      setIsNextDisabled(true);

      const validationErrors = await validateForm();

      if (step === 1) {
        if (!validationErrors.membershipTier) {
          if (values.membershipTier === "none") {
            onOpenChange(false);
          } else {
            const selectedTier = membershipTiers.find(
              (t) => t.value === values.membershipTier
            );
            if (selectedTier) {
              setStep(2);
            }
          }
        } else {
          setTouched({ membershipTier: true });
          toast.error("Please select a membership tier.", {
            toastId: "step1-error",
          });
        }
      } else if (step === 2) {
        if (
          !validationErrors.dob &&
          !validationErrors.physicalAddress &&
          !validationErrors.city
        ) {
          setStep(3);
        } else {
          setTouched({ physicalAddress: true, city: true, dob: true });
          toast.error("Please fill in all required fields.", {
            toastId: "step2-error",
          });
        }
      }
      setIsNextDisabled(false);
    },
    [step, onOpenChange, isNextDisabled]
  );

  const handleBack = useCallback(() => {
    if (step > 1) setStep((prev) => prev - 1);
  }, [step]);

  const handleSubmit = useCallback(
    async (
      values: paymentData,
      { setSubmitting, setErrors }: FormikHelpers<paymentData>
    ) => {
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

        const paymentResponse = await paymentMutation.mutateAsync(
          paymentValues
        );
        setTransactionReference(paymentResponse.reference);
        setPaymentStatus("pending");
        toast.info(
          "STK push sent to your phone. Please complete the payment.",
          {
            toastId: "stk-push",
          }
        );
      } 
        /* eslint-disable @typescript-eslint/no-explicit-any */
        catch (err: any) {
        const errorMessage = err.message || "Payment failed";
        setErrors({ paymentMethod: errorMessage });
        toast.error(errorMessage, { toastId: "payment-error" });
        setPaymentStatus("error");
      } finally {
        setSubmitting(false);
      }
    },
    [paymentMutation, handleVisaPayment]
  );

  const handleClose = useCallback(
    (open: boolean) => {
      if (!open && paymentStatus !== "success") {
        toast.info("Please complete the payment to close the modal.", {
          toastId: "close-restrict",
        });
        return;
      }
      onOpenChange(open);
      setIframeUrl("");
      setStep(1);
      setTransactionReference(null);
      setPaymentStatus("idle");
      setShowConfetti(false);
      if (!open) {
        router.push("/home");
      }
    },
    [onOpenChange, router, paymentStatus]
  );

  const initialValues: paymentData = useMemo(
    () => ({
      email,
      phoneNumber: phoneNumber || "",
      membershipTier: "",
      dob: "",
      amount: 0,
      physicalAddress: "",
      city: "",
      useDefaultNumber: !!phoneNumber,
      paymentMethod: "",
    }),
    [email, phoneNumber]
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const MembershipTierUpdater = ({
    values,
    setFieldValue,
    membershipTiers,
  }: any) => {
    useEffect(() => {
      if (values.membershipTier) {
        const selectedTier = membershipTiers.find(
          (t:any) => t.value === values.membershipTier
        );
        if (selectedTier) {
          setFieldValue("amount", selectedTier.price);
        }
      }
    }, [values.membershipTier, setFieldValue, membershipTiers]);

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={true}>
      <DialogContent
        className="w-[90%] max-w-md sm:max-w-lg md:max-w-xl overflow-y-auto max-h-[85vh] sm:max-h-[90vh] rounded-xl p-0 border-0 shadow-xl bg-white"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="bg-gradient-to-r from-[#fae115] to-gray-900 p-4 rounded-t-xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
              Membership Registration
            </DialogTitle>
            <DialogDescription className="text-gray-800 text-sm font-medium">
              Complete payment to close modal
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6">
          {showConfetti && (
            <ReactConfetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={100}
              className="z-50"
            />
          )}

          {paymentStatus === "success" ? (
            <div className="text-center py-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Welcome to our community!
              </p>
              <Button
                onClick={() => handleClose(false)}
                className="px-6 py-2 bg-[#fae115] hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg"
              >
                Continue
              </Button>
            </div>
          ) : (
            <>
              <div className="relative mb-6">
                <div className="flex justify-between items-center">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all",
                          step === i
                            ? "bg-[#fae115] text-gray-900 scale-110"
                            : step > i
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        )}
                      >
                        {step > i ? <CheckCircle className="h-4 w-4" /> : i}
                      </div>
                      <span
                        className={cn(
                          "text-xs mt-1 font-medium",
                          step >= i ? "text-gray-900" : "text-gray-500"
                        )}
                      >
                        {i === 1 ? "Plan" : i === 2 ? "Info" : "Pay"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 -z-10">
                  <div
                    className="h-full bg-[#fae115] transition-all duration-300"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  validateOnChange={true}
                  validateOnBlur={true}
                  enableReinitialize
                >
                  {({
                    values,
                    setFieldValue,
                    errors,
                    isSubmitting,
                    setTouched,
                    validateForm,
                    handleSubmit,
                  }) => {
                    // useEffect(() => {
                    //   if (values.membershipTier) {
                    //     const selectedTier = membershipTiers.find((t) => t.value === values.membershipTier);
                    //     if (selectedTier) {
                    //       setFieldValue("amount", selectedTier.price);
                    //     }
                    //   }
                    // }, [values.membershipTier, setFieldValue]);

                    return (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <MembershipTierUpdater
                          values={values}
                          setFieldValue={setFieldValue}
                          membershipTiers={membershipTiers}
                        />
                        {step === 1 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">
                              Choose Plan
                            </h3>

                            <div className="space-y-2">
                              {membershipTiers.map((tier) => (
                                <div
                                  key={tier.value}
                                  className={cn(
                                    "relative p-3 border rounded-lg cursor-pointer transition-all",
                                    values.membershipTier === tier.value
                                      ? "border-[#fae115] bg-yellow-50"
                                      : "border-gray-200 hover:border-gray-300",
                                    tier.value === "silver" &&
                                      "ring-1 ring-[#fae115] ring-opacity-30"
                                  )}
                                  onClick={() =>
                                    setFieldValue("membershipTier", tier.value)
                                  }
                                >
                                  {tier.value === "silver" && (
                                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                      <span className="bg-[#fae115] text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                                        POPULAR
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <span className="font-medium">
                                        {tier.label}
                                      </span>
                                    </div>

                                    <div className="text-right flex items-center space-x-2">
                                      {tier.value !== "none" && (
                                        <div>
                                          <span className="text-lg font-bold text-gray-900">
                                            {tier.price.toLocaleString()}
                                          </span>
                                          <p className="text-xs text-gray-500">
                                            KSh/yr
                                          </p>
                                        </div>
                                      )}

                                      <Field
                                        name="membershipTier"
                                        type="radio"
                                        value={tier.value}
                                        checked={
                                          values.membershipTier === tier.value
                                        }
                                        onChange={() =>
                                          setFieldValue(
                                            "membershipTier",
                                            tier.value
                                          )
                                        }
                                        className="h-4 w-4 border-gray-300 text-[#fae115] focus:ring-[#fae115]"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <ErrorMessage
                              name="membershipTier"
                              component="div"
                              className="text-xs text-red-600 bg-red-50 p-2 rounded"
                            />
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">
                              Your Details
                            </h3>

                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                  Address *
                                </label>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                  <Field
                                    name="physicalAddress"
                                    as={Input}
                                    className="pl-10 h-10 text-sm border-gray-200 focus:border-[#fae115] rounded-lg"
                                    placeholder="Your address"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      setFieldValue(
                                        "physicalAddress",
                                        e.target.value
                                      );
                                    }}
                                  />
                                </div>
                                <ErrorMessage
                                  name="physicalAddress"
                                  component="div"
                                  className="text-xs text-red-600 mt-1"
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                  City *
                                </label>
                                <Field
                                  name="city"
                                  as="select"
                                  className="w-full h-10 px-3 text-sm border border-gray-200 rounded-lg focus:border-[#fae115] bg-white"
                                >
                                  <option value="">Select city</option>
                                  {cities.map((city) => (
                                    <option key={city.value} value={city.value}>
                                      {city.label}
                                    </option>
                                  ))}
                                </Field>
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  className="text-xs text-red-600 mt-1"
                                />
                              </div>

                              <div>
                                <Field
                                  name="dob"
                                  component={DateOfBirthPicker}
                                  className="h-10 text-sm border-gray-200 focus:border-[#fae115] rounded-lg"
                                />
                                <ErrorMessage
                                  name="dob"
                                  component="div"
                                  className="text-xs text-red-600 mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-900">
                              Payment
                            </h3>

                            <PaymentForm
                              values={values}
                              setFieldValue={setFieldValue}
                              email={email}
                              phoneNumber={phoneNumber}
                              membershipTiers={membershipTiers}
                            />
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                          {step > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleBack}
                              disabled={
                                isSubmitting ||
                                paymentStatus === "initiating" ||
                                paymentStatus === "pending"
                              }
                              className="px-4 py-2 text-sm rounded-lg"
                            >
                              Back
                            </Button>
                          )}

                          <div className="flex-1 flex justify-end">
                            {step < 3 ? (
                              <Button
                                type="button"
                                onClick={() =>
                                  handleNext(
                                    values,
                                    errors,
                                    validateForm,
                                    setTouched
                                  )
                                }
                                disabled={
                                  isSubmitting ||
                                  isNextDisabled ||
                                  paymentStatus === "initiating" ||
                                  paymentStatus === "pending"
                                }
                                className="px-6 py-2 bg-[#fae115] hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg text-sm"
                              >
                                {isNextDisabled ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  "Next"
                                )}
                              </Button>
                            ) : (
                              <Button
                                type="submit"
                                disabled={
                                  isSubmitting ||
                                  paymentStatus === "initiating" ||
                                  paymentStatus === "pending"
                                }
                                className="px-6 py-2 bg-[#fae115] hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg text-sm"
                              >
                                {isSubmitting ||
                                paymentStatus === "initiating" ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                ) : null}
                                {paymentStatus === "pending"
                                  ? "Processing..."
                                  : `Pay Ksh.${values.amount.toLocaleString()}`}
                              </Button>
                            )}
                          </div>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </>
          )}
        </div>

        {iframeUrl && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
              <div className="bg-[#fae115] p-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Complete Payment
                </h2>
              </div>
              <iframe
                src={iframeUrl}
                className="w-full h-96"
                title="Payment Gateway"
              />
              <div className="p-4">
                <Button
                  onClick={() => setIframeUrl("")}
                  variant="outline"
                  className="w-full py-2 text-sm rounded-lg"
                >
                  Cancel Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
