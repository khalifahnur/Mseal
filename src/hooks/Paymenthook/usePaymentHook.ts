import { initiateMembershipPayment, initiateTicketPayment } from "@/api/api";
import { paymentData, paymentError, paymentResponse, ticketPayment } from "@/types/payment";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export function useMembershipPayment(): UseMutationResult<
paymentResponse,
paymentError,
paymentData
> {
return useMutation<paymentResponse, paymentError, paymentData>({
  mutationFn: initiateMembershipPayment,
  onSuccess: (data) => {
    console.log("Payment initiated successfully:", data);
  },
  onError: (error: paymentError) => {
    console.error("Payment initiation error:", error.message);
  },
});
}

export function useTicketPayment(): UseMutationResult<
paymentResponse,
paymentError,
ticketPayment
> {
return useMutation<paymentResponse, paymentError, ticketPayment>({
  mutationFn: initiateTicketPayment,
  onSuccess: (data) => {
    console.log("Payment initiated successfully:", data);
  },
  onError: (error: paymentError) => {
    console.error("Payment initiation error:", error.message);
  },
});
}
