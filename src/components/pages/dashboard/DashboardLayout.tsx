"use client";

import { useAuth } from "@/components/Forms/AuthContext";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { Header } from "@/components/pages/dashboard/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MembershipModal } from "@/components/pages/dashboard/membership/MembershipModal";
import { FullScreenLoader } from "../loading/FullScreenLoader";
import { PhoneNumberModal } from "@/components/Forms/PhoneNumberModal";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  useState(() => {
    if (user) {
      if (user.phoneNumber == null) {
        setIsPhoneModalOpen(true);
      } else if (user.membershipId == null) {
        setIsMembershipModalOpen(true);
      }
    }
  });

  const getCurrentTabName = () => {
    const path = pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1) || "Home";
  };

  if (isLoading || !user) {
    return <FullScreenLoader />;
  }

  const firstname = user?.firstName;
  const lastName = user?.lastName;
  const initials = `${firstname.charAt(0)}.${lastName.charAt(0)}`.toUpperCase();

  const handlePhoneModalClose = () => {
    setIsPhoneModalOpen(false);
    if (user.membershipId == null) {
      setIsMembershipModalOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <Header currentTab={getCurrentTabName()} initials={initials} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f8f8f8]">
          {children}
        </main>
      </SidebarInset>

      {user.phoneNumber == null && (
        <PhoneNumberModal
          open={isPhoneModalOpen}
          onOpenChange={handlePhoneModalClose}
        />
      )}

      {user.phoneNumber != null && user.membershipId == null && (
        <MembershipModal
          open={isMembershipModalOpen}
          onOpenChange={setIsMembershipModalOpen}
          email={user.email}
          phoneNumber={user.phoneNumber}
        />
      )}
    </div>
  );
}