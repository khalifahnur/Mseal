import {
  initiateMembershipPayment,
  initiateOrderPayment,
  initiateOrderWalletPayment,
  initiatePesapalMembershipPayment,
  initiateTicketPayment,
  initiateTicketWalletPayment,
  initiateWalletTopupPayment,
} from "@/api/api";
import { orders } from "@/types/order";
import {
  paymentData,
  paymentError,
  paymentResponse,
  ticketPayment,
  walletPayment,
} from "@/types/payment";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useMembershipPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  paymentData
> {
  return useMutation<paymentResponse, paymentError, paymentData>({
    mutationFn: initiateMembershipPayment,
    // onSuccess: (data) => {
    //   console.log("Payment initiated successfully:", data);
    // },
    // onError: (error: paymentError) => {
    //   console.error("Payment initiation error:", error.message);
    // },
  });
}

export function usePesapalMembershipPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  paymentData
> {
  return useMutation<paymentResponse, paymentError, paymentData>({
    mutationFn: initiatePesapalMembershipPayment,
    // onSuccess: (data) => {
    //   console.log("Payment initiated successfully:", data);
    // },
    // onError: (error: paymentError) => {
    //   console.error("Payment initiation error:", error.message);
    // },
  });
}

export function useTicketPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  ticketPayment
> {
  return useMutation<paymentResponse, paymentError, ticketPayment>({
    mutationFn: initiateTicketPayment,
    // onSuccess: (data) => {
    //   console.log("Payment initiated successfully:", data);
    // },
    // onError: (error: paymentError) => {
    //   console.error("Payment initiation error:", error.message);
    // },
  });
}

export function useOrderPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  orders
> {
  return useMutation<paymentResponse, paymentError, orders>({
    mutationFn: initiateOrderPayment,
    onSuccess: () => {
      toast.success(
        "STK Push sent successfully! Please complete the payment on your phone.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      // console.log("Payment initiated successfully:", data);
    },
    onError: (error: paymentError) => {
      toast.error(
        `Payment initiation failed. Please try again.\n ${error.message}`,
        {
          position: "bottom-right",
          autoClose: 5000,
        }
      );
      //console.error("Payment initiation error:", error.message);
    },
  });
}

export function useWalletTopupPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  walletPayment
> {
  return useMutation<paymentResponse, paymentError, walletPayment>({
    mutationFn: initiateWalletTopupPayment,
    // onSuccess: (data) => {
    //   console.log("Payment initiated successfully:", data);
    // },
    // onError: (error: paymentError) => {
    //   console.error("Payment initiation error:", error.message);
    // },
  });
}

export function useTicketWalletPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  ticketPayment
> {
  return useMutation<paymentResponse, paymentError, ticketPayment>({
    mutationFn: initiateTicketWalletPayment
  });
}

export function useOrderWalletPayment(): UseMutationResult<
  paymentResponse,
  paymentError,
  orders
> {
  return useMutation<paymentResponse, paymentError, orders>({
    mutationFn: initiateOrderWalletPayment,
    onSuccess: () => {
      toast.success(
        "Sent successfully! Please wait the payment to be deducted on your mseal wallet account.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      // console.log("Payment initiated successfully:", data);
    },
    onError: (error: paymentError) => {
      toast.error(
        error.message,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      //console.error("Payment initiation error:", error.message);
    },
  });
}
