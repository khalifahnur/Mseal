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

    console.log("Redirect Logic - User:", user, "Pathname:", pathname);

    if (user && !pathname.startsWith("/home")) {
      console.log("Redirecting to /home...");
      setRedirected(true);
      router.push("/home");
    } else if (!user && pathname !== "/") {
      console.log("Redirecting to /...");
      setRedirected(true);
      router.push("/");
    }
  }, [mounted, isLoading, user, pathname, redirected, router]);

  // Reset redirected state when user changes (e.g., after login)
  useEffect(() => {
    setRedirected(false);
  }, [user]);

  if (!mounted) {
    return null; // Wait for mounting
  }

  if (isLoading) {
    console.log("Showing loading spinner...");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          aria-label="Loading"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>
    );
  }

  console.log("Rendering - User:", user, "Pathname:", pathname);

  if (!user && pathname === "/") {
    console.log("Rendering LandingPage...");
    return <LandingPage />;
  }

  if (user && pathname.startsWith("/home")) {
    console.log("Rendering /home page...");
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