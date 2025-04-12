import { initiateMembershipPayment } from "@/api/api";
import { paymentData, paymentError, paymentResponse } from "@/types/payment";
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