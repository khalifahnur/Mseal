import { DashboardLayout } from "@/components/pages/dashboard/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  return (
    <SidebarProvider>
        <DashboardLayout>{children}</DashboardLayout>
    </SidebarProvider>
  );
}
