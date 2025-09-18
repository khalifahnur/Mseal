import {
  AuthData,
  AuthResponse,
  ErrorResponse,
  forgotData,
  ForgotPsswdResponse,
  newPsswd,
  newPsswdResponse,
  NfcResponse,
  PhoneNumber,
  PhoneNumberResponse,
  verifyCode,
} from "@/types/auth";
import apiClient from "@/lib/apiClient";
import {
  paymentData,
  paymentResponse,
  ticketPayment,
  walletPayment,
} from "@/types/payment";
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
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred during sign in.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
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
      const errorMessage =
        error?.response?.data?.message || "An error occurred during sign up.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const forgotUserPasswd = async (
  data: forgotData
): Promise<ForgotPsswdResponse> => {
  try {
    const response = await apiClient.post<ForgotPsswdResponse>(
      "/auth-user/forgot-password/verify-email",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during forgot password.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const verifyPsswdCode = async (
  data: verifyCode
): Promise<ForgotPsswdResponse> => {
  try {
    const response = await apiClient.post<ForgotPsswdResponse>(
      "/auth-user/forgot-password/verify-code",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred during forgot password.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const setupNewPsswd = async (data: newPsswd): Promise<newPsswdResponse> => {
  try {
    const response = await apiClient.post<newPsswdResponse>(
      "/auth-user/forgot-password/new-passowrd",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during new password setup.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
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
    if (error?.response?.status === 401) {
      // User is not logged in
      return null;
    } else if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching user info.";
      throw new Error(errorMessage);
    } else {
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
      "/payment/initiate-membership-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchTickets() {
  try {
    const response = await apiClient.get("/event/fetch-upcoming-events");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching all events.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
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
      const errorMessage =
        error?.response?.data?.error || "Error fetching active ticket.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
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
      const errorMessage =
        error?.response?.data?.error || "Error fetching used ticket.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateTicketPayment = async (
  data: ticketPayment
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/initiate-ticket-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchAllMerchandise() {
  try {
    const response = await apiClient.get(
      "/merchandise/fetch-users-merchandise"
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching merchandise.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateUserPhoneNumber = async (
  data: PhoneNumber
): Promise<PhoneNumberResponse> => {
  try {
    const response = await apiClient.patch<PhoneNumberResponse>(
      "/auth-user/update-user-phone-number",
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response?.data?.error || "Failed to update phone number",
      statusCode: error.response?.status,
      details: error.response?.data?.details,
    };
    throw errorResponse;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateNfcStatus = async (status: "Active" | "Inactive" | "Suspended" | "Pending"): Promise<NfcResponse> => {
  try {
    const response = await apiClient.patch<NfcResponse>(
      `/auth-user/wallet/nfc`,
      { status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response?.data?.error || "Failed to update nfc status",
      statusCode: error.response?.status,
      details: error.response?.data?.details,
    };
    throw errorResponse;
  }
};


/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateOrderPayment = async (
  data: orders
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/initiate-order-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
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
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
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
      const errorMessage =
        error?.response?.data?.message || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchUserTransactions() {
  try {
    const response = await apiClient.get(
      "/transaction/fetch-latest-transaction"
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching admin info.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchUserWalletTransactions() {
  try {
    const response = await apiClient.get(
      "/transaction/fetch-wallet-transaction"
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "Error fetching admin info.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchUpcomingEvents() {
  try {
    const response = await apiClient.get("/event/fetch-upcoming-events");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.error || "Error fetching upcoming events.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchTodayEvents() {
  try {
    const response = await apiClient.get("/event/fetch-today-events");
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.error || "Error fetching todays events.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error or no response from server.");
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateTicketWalletPayment = async (
  data: ticketPayment
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/mseal-wallet/initiate-ticket-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      throw new Error("Network error or no response from server.");
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const initiateOrderWalletPayment = async (
  data: orders
): Promise<paymentResponse> => {
  try {
    const response = await apiClient.post<paymentResponse>(
      "/payment/mseal-wallet/initiate-order-payment",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      //console.error("Payment error details:", error.response);
      // Show a more specific error message
      const errorMessage =
        error?.response?.data?.error || "An error occurred during payment.";
      throw new Error(errorMessage);
    } else {
      // response (network issues, etc.)
      //console.error("Network error or no response:", error);
      throw new Error("Network error or no response from server.");
    }
  }
};

