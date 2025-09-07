"use client";

import { Formik, Form, Field } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Event } from "@/types/ticket";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import { useState, useEffect } from "react";
import { useTicketPayment, useTicketWalletPayment } from "@/hooks/Paymenthook/usePaymentHook";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useAuth } from "@/components/Forms/AuthContext";
import PaymentForm from "@/components/pages/dashboard/wallet/PaymentMethods";
import TicketSummary from "@/components/pages/dashboard/ticket/buy/Summary";
import useSocketData from "@/hooks/socket/ticketSocketHook";
import { useRouter } from "next/navigation";

export default function Container({ eventId }: { eventId: string }) {
    const router = useRouter()
  const { width, height } = useWindowSize();
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [showConfetti, setShowConfetti] = useState(false);
  const queryClient = useQueryClient()
  
  const serviceFee = 50;
  const { user } = useAuth();
  const [transactionReference, setTransactionReference] = useState<
    string | null
  >(null);

  const initiateTicketPayment = useTicketPayment();
  const initiateTicketWalletPayment = useTicketWalletPayment();

  const confirmTicketPaymentStatus = useSocketData(
    "confirmTicketPaymentStatus",
    transactionReference
  );

  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    staleTime: 1000 * 60 * 5,
  });

  const event = data?.find((e) => String(e._id) === String(eventId));

  useEffect(() => {
    if (transactionReference && confirmTicketPaymentStatus.paymentStatus) {
      if (confirmTicketPaymentStatus.paymentStatus === "Completed") {
        setPaymentStatus("success");
        toast.success(`Successfully debited your mseal wallet!`, {
          position: "top-right",
          autoClose: 3000,
          toastId: "payment-success",
        });
        setShowConfetti(true);
        queryClient.invalidateQueries({ queryKey: ['activeTickets'] })
        queryClient.invalidateQueries({ queryKey: ['userInfo'] })
        setTimeout(() => {
          setShowConfetti(false);
          setTransactionReference(null);
          router.replace("/tickets");
        }, 2000);
      } else if (confirmTicketPaymentStatus.paymentStatus === "Failed") {
        setPaymentStatus("error");
        // toast.error("Payment failed. Please try again.", {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   toastId: "payment-failed",
        // });
      }
    }
  }, [transactionReference, confirmTicketPaymentStatus,router]);

  useEffect(() => {
    if (paymentStatus === "success") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  if (isLoading || !user) return <FullScreenLoader />;
  if (error || !event) return <div>Event not found.</div>;

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

      <Link
        href="/tickets"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to tickets
      </Link>

      <Formik
        enableReinitialize
        initialValues={{
          quantity: 1,
          amount: event.ticketPrice + serviceFee,
          phoneNumber: user.phoneNumber || "",
          useDefaultNumber: !!user.phoneNumber,
          paymentMethod: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setPaymentStatus("initiating");
          const ticketDetails = {
            eventId: event._id,
            match: `${event.homeTeam} vs. ${event.awayTeam}`,
            date: event.date,
            venue: event.venue,
            time: event.time,
            quantity: values.quantity,
            amount: values.amount,
            phoneNumber: values.phoneNumber,
            paymentMethod: values.paymentMethod,

          };

          try {
            let paymentResponse;
            const method = values.paymentMethod;
            if (method === "mpesa") {
              paymentResponse = await initiateTicketPayment.mutateAsync(
                ticketDetails
              );
              
              toast.info(
                "M-Pesa STK push sent to your phone. Please complete the payment.",
                {
                  position: "top-right",
                  autoClose: 2500,
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
            } else if (method === "msealwallet") {
              paymentResponse = await initiateTicketWalletPayment.mutateAsync(
                ticketDetails
              );
              setPaymentStatus("pending");
              toast.info(
                "Payment initialized. Please wait for the ticket payment confirmation.",
                {
                  position: "top-right",
                  autoClose: 2500,
                  toastId: "wallet",
                }
              );
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
          } 
          /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
          catch (error: any) {
            setPaymentStatus("error");
            toast.error(error.message || "Failed to initiate payment.");
          }
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase Ticket</CardTitle>
                    <CardDescription>Complete your payment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Number of Tickets</Label>
                      <Field
                        name="quantity"
                        type="number"
                        as={Input}
                        /*eslint-disable-next-line @typescript-eslint/no-explicit-any*/ 
                        onChange={(e: any) => {
                          const qty = parseInt(e.target.value);
                          setFieldValue("quantity", qty);
                          setFieldValue(
                            "amount",
                            qty * event.ticketPrice + serviceFee
                          );
                        }}
                        disabled={isSubmitting}
                      />
                    </div>

                    <PaymentForm
                      values={values}
                      setFieldValue={setFieldValue}
                      email={user.email}
                      phoneNumber={user.phoneNumber}
                      amount={values.amount}
                      wallet={true}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting || paymentStatus === "initiating"}
                    >
                      {isSubmitting || paymentStatus === "initiating"
                        ? "Initiating..."
                        : `Pay Ksh ${values.amount.toLocaleString()}`}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <TicketSummary
                event={event}
                quantity={values.quantity}
                serviceFee={serviceFee}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
