"use client";

import { AuthProvider, useAuth } from "@/components/Forms/AuthContext";
import LoginForm from "@/components/Forms/Signin/SigninForm";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "@/hooks/Store/CartContext";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user && pathname !== "/home") {
      router.push("/home");
    }
  }, [mounted, user, pathname, router]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          aria-label="Loading"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        ></div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <SidebarProvider>
        <CartProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </CartProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
