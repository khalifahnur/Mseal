import { AuthData, AuthResponse, ErrorResponse, PhoneNumber, PhoneNumberResponse } from "@/types/auth";
import apiClient from "@/lib/apiClient";
import { paymentData, paymentResponse, ticketPayment, walletPayment } from "@/types/payment";
import { orders } from "@/types/order";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const loginUser = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth-user/signIn",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "An error occurred");
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const signUpUser = async (data: AuthData): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>(
      "/auth-user/signUp",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Sign-up error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during sign up.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchUserInfo() {
  try {
    const response = await apiClient.get("/auth-user/fetch-user-info");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error fetching admin info:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error fetching admin info.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateMembershipPayment = async (
  data: paymentData
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/initiate-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Payment error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchTickets() {
  try {
    const response = await apiClient.get("/event/fetch-all-events");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error fetching all events:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error fetching all events.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchActiveTickets() {
  try {
    const response = await apiClient.get("/ticket/fetch-active-ticket");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error fetching active ticket:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error fetching active ticket.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchUsedTickets() {
  try {
    const response = await apiClient.get("/ticket/fetch-used-ticket");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error fetching used ticket:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error fetching used ticket.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateTicketPayment = async (data: ticketPayment): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/initiate-ticket-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Payment error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchAllMerchandise() {
  try {
    const response = await apiClient.get("/merchandise/fetch-users-merchandise");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Error fetching merchandise:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "Error fetching merchandise.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateUserPhoneNumber = async (data: PhoneNumber): Promise<PhoneNumberResponse> => {
  try {
    const response = await apiClient.patch<PhoneNumberResponse>(
      '/auth-user/update-user-phone-number',
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response?.data?.error || 'Failed to update phone number',
      statusCode: error.response?.status,
      details: error.response?.data?.details,
    };
    throw errorResponse;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateOrderPayment = async (data: orders): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/initiate-order-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Payment error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiatePesapalMembershipPayment = async (
  data: paymentData
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/pesapal/initiate-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Payment error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateWalletTopupPayment = async (
  data: walletPayment
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/mseal-wallet-topup",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      console.error("Payment error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.message || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};
