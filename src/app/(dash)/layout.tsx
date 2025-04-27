"use client";

import { AuthProvider } from "@/components/Forms/AuthContext";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "@/hooks/Store/CartContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
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
