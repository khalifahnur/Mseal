"use client";

import { useState, useCallback } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  type FormikHelpers,
  FormikErrors,
} from "formik";
import { MapPin, Phone } from "lucide-react";
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
import { cities, membershipTiers } from "@/lib/placeholderData";
import type { paymentData } from "@/types/payment";
import { useMembershipPayment } from "@/hooks/Paymenthook/usePaymentHook";
import apiClient from "@/lib/apiClient";
import { DateOfBirthPicker } from "../Dob";
import { useRouter } from "next/navigation";

export function MembershipModal({
  open,
  onOpenChange,
  email,
  phoneNumber,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  phoneNumber: string;
}) {
  const [step, setStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const paymentMutation = useMembershipPayment();
  const [error, setError] = useState("");
  const router = useRouter();

  const initialValues: paymentData = {
    email,
    phoneNumber: "",
    membershipTier: "",
    dob: "",
    amount: 0,
    physicalAddress: "",
    city: "",
    useDefaultNumber: false,
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

      // Trigger validation
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
        if (!validationErrors.physicalAddress && !validationErrors.city && !validationErrors.dob) {
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
      { setSubmitting }: FormikHelpers<paymentData>
    ) => {
      try {
        setSubmitting(true);

        const selectedTier = membershipTiers.find(
          (t) => t.value === values.membershipTier
        );
        if (!selectedTier) throw new Error("Invalid membership tier selected");

        const paymentValues = {
          ...values,
          amount: selectedTier.price,
        };

        const paymentResponse = await paymentMutation.mutateAsync(paymentValues);

        toast.info("STK push sent to your phone. Please complete the payment.");

        let attempts = 0;
        const maxAttempts = 30;
        const interval = setInterval(async () => {
          try {
            const { data } = await apiClient.get<{ status: string }>(
              `/payment/payment-status?reference=${paymentResponse.reference}`
            );

            if (data.status === "success") {
              clearInterval(interval);
              toast.success("Payment successful!");
              onOpenChange(false);
              router.push("/home");
              setSubmitting(false);
            } else if (data.status === "failed") {
              clearInterval(interval);
              toast.error("Payment failed.");
              setSubmitting(false);
            }

            if (++attempts >= maxAttempts) {
              clearInterval(interval);
              toast.error("Payment verification timed out.");
              setSubmitting(false);
            }
          } catch (err) {
            console.error("Polling error:", err);
            clearInterval(interval);
            toast.error("Error verifying payment.");
            setSubmitting(false);
          }
        }, 2000);
      } catch (err: any) {
        console.error("Payment error:", err);
        setError(err.message || "Payment failed");
        toast.error(err.message || "Payment failed");
        setSubmitting(false);
      }
    },
    [paymentMutation, onOpenChange, router]
  );

  const handleClose = useCallback(
    (open: boolean) => {
      onOpenChange(open);
      if (!open) {
        router.push("/home");
      }
    },
    [onOpenChange, router]
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Membership Registration</DialogTitle>
          <DialogDescription>
            Complete the following steps to register for a membership.
          </DialogDescription>
        </DialogHeader>
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
            validateOnChange={true} // Enable validation on change for immediate feedback
            validateOnBlur={true}
          >
            {({
              values,
              setFieldValue,
              errors,
              touched,
              isSubmitting,
              dirty,
              setTouched,
              validateForm,
            }) => (
              <Form className="space-y-6">
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
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Information</h3>
                    <p className="text-sm text-muted-foreground">
                      An M-Pesa STK push will be sent to your phone to complete
                      the payment of{" "}
                      <span className="font-medium">
                        Ksh.{" "}
                        {membershipTiers
                          .find((t) => t.value === values.membershipTier)
                          ?.price.toLocaleString()}
                      </span>
                    </p>

                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input value={email} disabled className="bg-gray-100" />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Field
                          name="phoneNumber"
                          as={Input}
                          className="pl-10"
                          placeholder="+254XXXXXXXXX"
                          disabled={values.useDefaultNumber}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Enter your M-Pesa registered phone number
                      </div>
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-sm text-red-600 mt-1"
                      />
                    </div>

                    <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <Field name="useDefaultNumber">
                        {({ field }: any) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              if (typeof checked === "boolean") {
                                setFieldValue("useDefaultNumber", checked);
                                setFieldValue(
                                  "phoneNumber",
                                  checked ? phoneNumber : ""
                                );
                              }
                            }}
                          />
                        )}
                      </Field>
                      <div className="space-y-1 leading-none">
                        <label className="text-sm font-medium">
                          Use this number
                        </label>
                        <div className="text-sm text-muted-foreground">
                          {phoneNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
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
                      onClick={() => handleNext(values, errors, validateForm, setTouched)}
                      disabled={isSubmitting || isNextDisabled}
                    >
                      {step === 1 && values.membershipTier === "none"
                        ? "Finish"
                        : "Next"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                    >
                      {isSubmitting ? "Processing..." : "Pay Now"}
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}