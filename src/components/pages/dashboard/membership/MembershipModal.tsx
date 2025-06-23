// components/MembershipModal.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  type FormikHelpers,
  FormikErrors,
} from "formik";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { validationSchema } from "@/lib/validationSchema";
import type { paymentData } from "@/types/payment";
import {
  useMembershipPayment,
  usePesapalMembershipPayment,
} from "@/hooks/Paymenthook/usePaymentHook";
import apiClient from "@/lib/apiClient";
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
  const [error, setError] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const router = useRouter();
    const [transactionReference, setTransactionReference] = useState<
      string | null
    >(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

  const paymentMutation = useMembershipPayment();
  const pesapalPaymentMutation = usePesapalMembershipPayment();

  const initialValues: paymentData = {
    email,
    phoneNumber: phoneNumber || "",
    membershipTier: "",
    dob: "",
    amount: 0,
    physicalAddress: "",
    city: "",
    useDefaultNumber: !!phoneNumber,
    paymentMethod: "mpesa",
  };



  
    const confirmOrderPaymentStatus = useSocketData(
      "confirmMembershipPaymentStatus",
      transactionReference
    );
  
    useEffect(() => {
      if (transactionReference && confirmOrderPaymentStatus) {
        if (
          confirmOrderPaymentStatus.paymentStatus === "Completed"
        ) {
          toast.success("Payment confirmed!", {
            position: "bottom-right",
            autoClose: 5000,
            toastId: "payment-success",
          });
  
          setTimeout(() => {
            onOpenChange(false);
            setShowConfetti(false);
          }, 1000);
        } else if (confirmOrderPaymentStatus.paymentStatus === "Failed") {
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
    ]);

  const handleVisaPayment = async (
    values: paymentData,
    formikHelpers: FormikHelpers<paymentData>
  ) => {
    const { setSubmitting, setErrors } = formikHelpers;
    try {
      setSubmitting(true);
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
        amount:values.amount,

      };

      const response = await pesapalPaymentMutation.mutateAsync(paymentValues);

      setIframeUrl(response.redirectUrl);
      toast.info("Redirecting to Pesapal for Visa payment...");
      setSubmitting(false);
    } catch (err: any) {
      console.error("Visa payment error:", err);
      const errorMessage = err.message || "Visa payment initiation failed";
      setError(errorMessage);
      setErrors({ paymentMethod: errorMessage });
      toast.error(errorMessage);
      setSubmitting(false);
    }
  };

  const handleNext = useCallback(
    async (
      values: typeof initialValues,
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
            setStep(2);
          }
        } else {
          setTouched({ membershipTier: true });
          toast.error("Please select a membership tier.");
        }
      } else if (step === 2) {
        if (
          !validationErrors.physicalAddress &&
          !validationErrors.city &&
          !validationErrors.dob
        ) {
          setStep(3);
        } else {
          setTouched({ physicalAddress: true, city: true, dob: true });
          toast.error("Please fill in all required fields.");
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
      formikHelpers: FormikHelpers<paymentData>
    ) => {
      const { setSubmitting, setErrors } = formikHelpers;
      if (values.paymentMethod === "card") {
        return handleVisaPayment(values, formikHelpers);
      }

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

        toast.info("STK push sent to your phone. Please complete the payment.");

        setTransactionReference(paymentResponse.reference)

        // let attempts = 0;
        // const maxAttempts = 60;
        // const interval = setInterval(async () => {
        //   try {
        //     const { data } = await apiClient.get<{ status: string }>(
        //       `/api/payment/pesastatus?reference=${paymentResponse.reference}`
        //     );

        //     if (data.status === "success") {
        //       clearInterval(interval);
        //       toast.success("Payment successful!");
        //       onOpenChange(false);
        //       router.push("/home");
        //       setSubmitting(false);
        //     } else if (data.status === "failed") {
        //       clearInterval(interval);
        //       toast.error("Payment failed.");
        //       setSubmitting(false);
        //     }

        //     if (attempts >= maxAttempts) {
        //       clearInterval(interval);
        //       toast.error("Payment verification timed out.");
        //       setSubmitting(false);
        //     }
        //   } catch (err) {
        //     console.error("Polling error:", err);
        //     //clearInterval(interval);
        //     toast.error("Error verifying payment.");
        //     setSubmitting(false);
        //   }
        // }, 2000);
      } catch (err: any) {
        console.error("Payment error:", err);
        const errorMessage = err.message || "Payment failed";
        setError(errorMessage);
        setErrors({ paymentMethod: errorMessage });
        toast.error(errorMessage);
        setSubmitting(false);
      }
    },
    [paymentMutation, onOpenChange, router]
  );

  const handleClose = useCallback(
    (open: boolean) => {
      onOpenChange(open);
      setIframeUrl("");
      if (!open) {
        router.push("/home");
      }
    },
    [onOpenChange, router]
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] [&>button]:hidden max-w-fit overflow-y-auto h-5/6">
        <DialogHeader>
          <DialogTitle>Membership Registration</DialogTitle>
          <DialogDescription>
            Complete the following steps to register for a membership.
          </DialogDescription>
        </DialogHeader>
        {showConfetti && (
          <ReactConfetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
          />
        )}
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 right-0 flex justify-between">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border",
                  step === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : step > i
                    ? "bg-primary/20 border-primary/20"
                    : "bg-muted border-muted-foreground/20"
                )}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-8 right-8 h-0.5 bg-muted-foreground/20">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-12">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({
              values,
              setFieldValue,
              errors,
              isSubmitting,
              setTouched,
              validateForm,
              handleSubmit
            }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Select Membership Tier
                    </h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Membership Tier
                      </label>
                      <div className="flex flex-col space-y-2">
                        {membershipTiers.map((tier) => (
                          <div
                            key={tier.value}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`tier-${tier.value}`}
                              checked={values.membershipTier === tier.value}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFieldValue("membershipTier", tier.value);
                                }
                              }}
                            />
                            <label
                              htmlFor={`tier-${tier.value}`}
                              className="text-sm flex-1 cursor-pointer"
                            >
                              {tier.label}
                            </label>
                            {tier.value !== "none" && (
                              <span className="text-muted-foreground">
                                Ksh. {tier.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <ErrorMessage
                        name="membershipTier"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    {values.membershipTier &&
                      values.membershipTier !== "none" && (
                        <Card className="mt-4">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">
                                  {
                                    membershipTiers.find(
                                      (t) => t.value === values.membershipTier
                                    )?.label
                                  }{" "}
                                  Membership
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  Annual subscription
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  Ksh.{" "}
                                  {membershipTiers
                                    .find(
                                      (t) => t.value === values.membershipTier
                                    )
                                    ?.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Physical Address</h3>
                    <div>
                      <label className="text-sm font-medium">
                        Street Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          name="physicalAddress"
                          as={Input}
                          className="pl-10"
                          placeholder="Enter your address"
                        />
                      </div>
                      <ErrorMessage
                        name="physicalAddress"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">City/Town</label>
                      <Field
                        name="city"
                        as="select"
                        className="w-full p-2 border rounded-md"
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
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    <Field name="dob" component={DateOfBirthPicker} />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-sm text-red-600 mt-1"
                    />
                  </div>
                )}

                {step === 3 && (
                  
                  <PaymentForm
                    values={values}
                    setFieldValue={setFieldValue}
                    email={email}
                    phoneNumber={phoneNumber}
                    membershipTiers={membershipTiers}
                  />
                )}

                <div className="flex justify-between pt-4 pb-4 px-4 sticky bottom-0 left-0 right-0 z-10 bg-accent">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={isSubmitting}
                    >
                      Back
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleClose(false)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() =>
                        handleNext(values, errors, validateForm, setTouched)
                      }
                      disabled={isSubmitting || isNextDisabled}
                    >
                      {step === 1 && values.membershipTier === "none"
                        ? "Finish"
                        : "Next"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Pay Now"}
                    </Button>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
        {iframeUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
              <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
              <iframe
                src={iframeUrl}
                className="w-full h-96"
                title="Pesapal Payment"
              />
              <Button
                onClick={() => handleClose(false)}
                className="mt-4"
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}