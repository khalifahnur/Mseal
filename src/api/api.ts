import { AuthData, AuthResponse } from "@/types/auth";
import apiClient from "@/lib/apiClient";
import { paymentData, paymentResponse } from "@/types/payment";

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

// export const signUpWaiter = async (data: Authwaiter): Promise<AuthWaiterResponse> => {
//   try {
//     const response = await apiClient.post<AuthWaiterResponse>(
//       "/auth/waiter/waiter-app-signup",
//       data
//     );
//     return response.data;
//   } catch (error: any) {
//     if (error?.response) {
//       console.error("Sign-up error details:", error.response);
//       // Show a more specific error message
//       const errorMessage =
//         error?.response?.data?.message || "An error occurred during sign up.";
//       throw new Error(errorMessage);
//     } else {
//       // response (network issues, etc.)
//       console.error("Network error or no response:", error);
//       throw new Error("Network error or no response from server.");
//     }
//   }
// };

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
