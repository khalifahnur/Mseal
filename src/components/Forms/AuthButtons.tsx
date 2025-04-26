"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/components/Forms/AuthContext";

export default function AuthButtons() {
  const { user, refreshUser } = useAuth();

  const [isNewLogin, setIsNewLogin] = useState(false);

  useEffect(() => {
    if (user) return;
    refreshUser()
      .then(() => {
          setIsNewLogin(false);
      })
      .catch((err) => {
        console.log("No active session:", err);
        toast.error("❌ Login failed. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, [user, isNewLogin]);

  const handleGoogleSignIn = () => {
    setIsNewLogin(true);
    window.location.href = "https://msealserver-production.up.railway.app/mseal/auth-user/google";
  };
  const handleXSignIn = () => {
    console.log("X sign-in not implemented");
  };

  return (
    <div className="w-full space-y-3">
      <button
        type="button"
        onClick={handleXSignIn}
        className="flex w-full items-center justify-center h-12 p-3 rounded-[12px] gap-2 font-semibold border-2 border-[#D6DAE3] dark:border-[#D6DAE3]/10 transition ease-in-out bg-white enabled:hover:bg-[#D6DAE3]/20 dark:bg-[#2F3134] dark:enabled:hover:bg-white/15 disabled:opacity-50"
        aria-label="Sign in with X"
        disabled
      >
        <span className="inline-flex items-center justify-center p-0 m-0 text-[#0A0A0A] dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4"
          >
            <path d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z" />
          </svg>
        </span>
        <div className="text-[#0A0A0A] dark:text-white font-semibold">
          Continue with X
        </div>
      </button>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center h-12 p-3 rounded-[12px] gap-2 font-semibold border-2 border-[#D6DAE3] dark:border-[#D6DAE3]/10 transition ease-in-out bg-white enabled:hover:bg-[#D6DAE3]/20 dark:bg-[#2F3134] dark:enabled:hover:bg-white/15 disabled:opacity-50"
        aria-label="Sign in with Google"
      >
        <span className="inline-flex items-center justify-center p-0 m-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="h-4 w-4"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.35-.98 2.49-2.06 3.24v2.7h3.33c1.94-1.79 3.05-4.43 3.05-8.2z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.33-2.7c-.99.66-2.25 1.06-3.95 1.06-3.04 0-5.62-2.05-6.54-4.81H2.06v3.02C3.87 20.66 7.69 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.46 14.19c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.59H2.06C1.42 8.02 1 9.59 1 11.9s.42 3.88 1.06 5.31l3.4-2.62z"
            />
            <path
              fill="#EA4335"
              d="M12 4.95c1.67 0 3.16.58 4.33 1.72l3.25-3.25C17.46 1.74 14.97.95 12 .95 7.69.95 3.87 3.29 2.06 6.59l3.4 2.62c.92-2.76 3.5-4.81 6.54-4.81z"
            />
          </svg>
        </span>
        <div className="text-[#0A0A0A] dark:text-white font-semibold">
          Continue with Google
        </div>
      </button>
    </div>
  );
}
