import { AuthProvider } from "@/components/Forms/AuthContext";
import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "@/hooks/Store/CartContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/");
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
