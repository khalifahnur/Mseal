// components/PaymentForm.tsx
"use client";

import { Field, ErrorMessage } from "formik";
import { Phone, CreditCard, Building2, Smartphone, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface PaymentFormProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  email: string;
  phoneNumber: string | null;
  membershipTiers: Array<{
    value: string;
    price: number;
  }>;
}

export default function PaymentForm({ values, setFieldValue, email, phoneNumber, membershipTiers }: PaymentFormProps) {
  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      description: "Pay with M-Pesa mobile money",
      popular: true,
      imgUrl:'/assets/payment/mpesa.png'
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Pay with Visa, Mastercard, or other cards",
      icon: CreditCard,
      popular: false,
      imgUrl:'/assets/payment/mastercard.png'
    },
    {
      id: "visa",
      name: "Bank Transfer",
      description: "Direct bank transfer",
      popular: false,
      imgUrl:'/assets/payment/visa.png'
    },
    {
      id: "airtel",
      name: "Airtel",
      description: "Pay with airtel mobile money",
      popular: false,
      imgUrl:'/assets/payment/airtel.png'
    },
  ];

  const selectedTier = membershipTiers.find((t) => t.value === values.membershipTier);
  const amount = selectedTier?.price || 0;

  return (
    <div className="space-y-6 md:grid md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          Complete your payment of <span className="font-medium">Ksh. {amount.toLocaleString()}</span>
        </p>

        <div className="space-y-4">
          <Label className="text-sm font-medium">Choose Payment Method</Label>
          <Field name="paymentMethod">
            {({ field }: any) => (
              <RadioGroup
                value={field.value}
                onValueChange={(value) => setFieldValue("paymentMethod", value)}
                className="grid grid-rows-4 gap-4"
              >
                {paymentMethods.map((method) => {
                  const IconComponent = method.imgUrl;
                  return (
                    <div key={method.id}>
                      <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                      <Label
                        htmlFor={method.id}
                        className="flex items-center justify-between gap-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          {/* <IconComponent className="h-5 w-5" /> */}
                          <Image src={IconComponent} alt={method.id} width={20} height={20} />
                          <div>
                            <div className="flex items-center gap-4">
                              <span className="font-medium">{method.name}</span>
                              {method.popular && (
                                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            )}
          </Field>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {values.paymentMethod === "mpesa" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                An M-Pesa STK push will be sent to your phone to complete the payment.
              </p>

              <div>
                <Label className="text-sm font-medium">Email</Label>
                <Input value={email} disabled className="bg-gray-100" />
              </div>

              <div>
                <Label className="text-sm font-medium">Phone Number</Label>
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
                <div className="text-sm text-muted-foreground mt-1">Enter your M-Pesa registered phone number</div>
                <ErrorMessage name="phoneNumber" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <Field name="useDefaultNumber">
                  {({ field }: any) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        if (typeof checked === "boolean") {
                          setFieldValue("useDefaultNumber", checked);
                          setFieldValue("phoneNumber", checked ? phoneNumber : "");
                        }
                      }}
                    />
                  )}
                </Field>
                <div className="space-y-1 leading-none">
                  <Label className="text-sm font-medium">Use this number</Label>
                  <div className="text-sm text-muted-foreground">{phoneNumber}</div>
                </div>
              </div>
            </div>
          )}

          {values.paymentMethod === "card" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll be redirected to complete the payment securely.</li>
                <li>• Complete the Visa payment within the provided timeframe.</li>
                <li>• Your membership will be activated once payment is confirmed.</li>
              </ul>
            </div>
          )}

          {values.paymentMethod === "bank" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You will receive bank transfer instructions after submitting this form.
              </p>

              <div>
                <Label className="text-sm font-medium">Email</Label>
                <Input value={email} disabled className="bg-gray-100" />
              </div>

              <div>
                <Label className="text-sm font-medium">Full Name</Label>
                <Field
                  name="bankAccountName"
                  as={Input}
                  placeholder="Enter your full name as it appears on your bank account"
                />
                <ErrorMessage name="bankAccountName" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div>
                <Label className="text-sm font-medium">Preferred Bank</Label>
                <Select onValueChange={(value) => setFieldValue("preferredBank", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kcb">KCB Bank</SelectItem>
                    <SelectItem value="equity">Equity Bank</SelectItem>
                    <SelectItem value="coop">Co-operative Bank</SelectItem>
                    <SelectItem value="absa">Absa Bank</SelectItem>
                    <SelectItem value="standard">Standard Chartered</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll receive detailed payment instructions via email</li>
                  <li>• Complete the bank transfer within 24 hours</li>
                  <li>• Your membership will be activated once payment is confirmed</li>
                </ul>
              </div>
            </div>
          )}

          {values.paymentMethod === "wallet" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Pay using your preferred digital wallet service.</p>

              <div>
                <Label className="text-sm font-medium">Email</Label>
                <Input value={email} disabled className="bg-gray-100" />
              </div>

              <div>
                <Label className="text-sm font-medium">Wallet Provider</Label>
                <Select onValueChange={(value) => setFieldValue("walletProvider", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wallet provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="skrill">Skrill</SelectItem>
                    <SelectItem value="payoneer">Payoneer</SelectItem>
                    <SelectItem value="wise">Wise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Wallet Email/ID</Label>
                <Field name="walletId" as={Input} placeholder="Enter your wallet email or ID" />
                <ErrorMessage name="walletId" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-medium text-amber-900 mb-2">Payment Process</h4>
                <p className="text-sm text-amber-800">
                  You'll be redirected to your selected wallet provider to complete the payment securely.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}