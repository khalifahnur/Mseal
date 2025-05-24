"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "./Forms/AuthContext";
import LandingPage from "./LandingPage";

function AppContent() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading || redirected) return;

    if (user && !pathname.startsWith("/home")) {
      setRedirected(true);
      router.push("/home");
    } else if (!user && pathname !== "/") {
      setRedirected(true);
      router.push("/");
    }
  }, [mounted, isLoading, user, pathname, redirected, router]);

  // Reset redirected state when user changes (e.g., after login)
  useEffect(() => {
    setRedirected(false);
  }, [user]);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          aria-label="Loading"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>
    );
  }


  if (!user && pathname === "/") {
    return <LandingPage />;
  }

  if (user && pathname.startsWith("/home")) {
    return null;
  }

  return null;
}

export function AppWrapper() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}