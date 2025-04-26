"use client";

import { fetchUserInfo } from "@/api/api";
import apiClient from "@/lib/apiClient";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  membershipId: string | null;
  balance: number;
  membershipTier: string | null;
  createdAt: string | null;
  expDate: string | null;
  qrcode: string | null;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signOut: () => void;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const userData = await fetchUserInfo();
      setUser(userData);
    } catch (err) {
      console.error("Failed to refresh user:", err);
      setUser(null);
      // toast.error("Failed to load user data. Please try again.", {
      //   position: "bottom-right",
      //   autoClose: 5000,
      //   theme: "light",
      // });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut, setUser,refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
