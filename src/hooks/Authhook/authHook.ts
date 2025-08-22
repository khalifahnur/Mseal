import { useMutation, UseMutationResult } from "@tanstack/react-query";
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
import {
  forgotUserPasswd,
  loginUser,
  setupNewPsswd,
  signUpUser,
  updateNfcStatus,
  updateUserPhoneNumber,
  verifyPsswdCode,
} from "@/api/api";
import apiClient from "@/lib/apiClient";
import { toast } from "react-toastify";
import { useAuth } from "@/components/Forms/AuthContext";

export function useLogin(): UseMutationResult<
  AuthResponse,
  ErrorResponse,
  AuthData
> {
  const { refreshUser } = useAuth();
  return useMutation<AuthResponse, ErrorResponse, AuthData>({
    mutationFn: loginUser,
    onSuccess: async () => {
      await refreshUser();
    },
    onError: (error: ErrorResponse) => {
      console.error(
        `Login error (${error.statusCode || "Unknown"}): ${error.message}`
      );
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
      if (error.details) {
        console.error("Additional error details:", error.details);
      }
    },
  });
}

export function useSignUp(): UseMutationResult<
  AuthResponse,
  ErrorResponse,
  AuthData
> {
  return useMutation<AuthResponse, ErrorResponse, AuthData>({
    mutationFn: signUpUser,
    // onSuccess: () => {
    //   console.log("Sign-up successful:");
    // },
    onError: (error: ErrorResponse) => {
      console.error("Sign-up error:", error.message);
    },
  });
}

export const fetchLogout = async (): Promise<void> => {
  const response = await apiClient.post("/auth-user/logout");

  if (!response || response.status !== 200) {
    throw new Error("Logout failed");
  }
};

export function useUpdatePhone(): UseMutationResult<
  PhoneNumberResponse,
  ErrorResponse,
  PhoneNumber
> {
  const { refreshUser } = useAuth();
  return useMutation<PhoneNumberResponse, ErrorResponse, PhoneNumber>({
    mutationFn: updateUserPhoneNumber,
    onSuccess: (data: PhoneNumberResponse) => {
      refreshUser();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onError: (error: ErrorResponse) => {
      console.error("Update phone number error:", error.message, error.details);
      let toastMessage = error.message;
      if (error.statusCode === 409) {
        toastMessage =
          "This phone number is already in use. Please try another.";
      } else if (error.statusCode === 400) {
        toastMessage = error.message;
      } else if (error.statusCode === 401) {
        toastMessage = "Please log in again to update your phone number.";
      } else {
        toastMessage = "Failed to update phone number. Please try again.";
      }

      toast.error(toastMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (error.details) {
        console.error("Additional error details:", error.details);
      }
    },
  });
}

export function useForgotPasswd(): UseMutationResult<
  ForgotPsswdResponse,
  ErrorResponse,
  forgotData
> {
  return useMutation<ForgotPsswdResponse, ErrorResponse, forgotData>({
    mutationFn: forgotUserPasswd,
    onError: (error: ErrorResponse) => {
      console.error(
        `Reset code error (${error.statusCode || "Unknown"}): ${error.message}`
      );
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
      if (error.details) {
        console.error("Additional error details:", error.details);
      }
    },
  });
}

export function useVerifyCode(): UseMutationResult<
  ForgotPsswdResponse,
  ErrorResponse,
  verifyCode
> {
  return useMutation<ForgotPsswdResponse, ErrorResponse, verifyCode>({
    mutationFn: verifyPsswdCode,
    onError: (error: ErrorResponse) => {
      console.error(
        `Verify code error (${error.statusCode || "Unknown"}): ${error.message}`
      );
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
      if (error.details) {
        console.error("Additional error details:", error.details);
      }
    },
  });
}

export function useNewPsswd(): UseMutationResult<
  newPsswdResponse,
  ErrorResponse,
  newPsswd
> {
  return useMutation<newPsswdResponse, ErrorResponse, newPsswd>({
    mutationFn: setupNewPsswd,
    // onSuccess: () => {
    //   console.log("Sign-up successful:");
    // },
    onError: (error: ErrorResponse) => {
      console.error("new psswd setup error:", error.message);
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
      if (error.details) {
        console.error("Additional error details:", error.details);
      }
    },
  });
}

export function useUpdateNfc(): UseMutationResult<NfcResponse, ErrorResponse, "Active" | "Inactive" | "Suspended" | "Pending"> {
  const { refreshUser } = useAuth();

  return useMutation<NfcResponse, ErrorResponse, "Active" | "Inactive" | "Suspended" | "Pending">({
    mutationFn: updateNfcStatus,
    onSuccess: (data: NfcResponse) => {
      refreshUser();
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    },
    onError: (error: ErrorResponse) => {
      console.error("Update nfc status error:", error.message, error.details);
      toast.error("Failed to update Mseal NFC status. Please try again.", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
      });
    },
  });
}


