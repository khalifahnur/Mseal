"use client";

import { useAuth } from "@/components/Forms/AuthContext";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { Header } from "@/components/pages/dashboard/header";
import { SidebarInset } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MembershipModal } from "@/components/pages/dashboard/membership/MembershipModal";
import { FullScreenLoader } from "../loading/FullScreenLoader";
import { PhoneNumberModal } from "@/components/Forms/PhoneNumberModal";
import { MembershipPaywallModal } from "./PayWall";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState({
    isExpired: false,
    daysUntilExpiry: 0
  });

  useEffect(() => {
    if (user) {
      if (user.phoneNumber == null) {
        setIsPhoneModalOpen(true);
      } else if (user.membershipId == null) {
        setIsMembershipModalOpen(true);
      } else {
        // Check membership expiration
        checkMembershipExpiration();
      }
    }
  }, [user]);

  const checkMembershipExpiration = () => {
    // Handle both nested and flat user structure
    const expDateString = user?.expDate;
    
    if (!expDateString) {
      console.warn('No expiration date found for user');
      return;
    }

    const today = new Date();
    const expDate = new Date(expDateString);
    
    // Convert dates to timestamps before arithmetic operation
    const expTimestamp = expDate.getTime();
    const todayTimestamp = today.getTime();
    
    // Calculate days until expiration
    const daysUntilExpiry = Math.ceil((expTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24));
    const isExpired = expTimestamp < todayTimestamp;

    setMembershipStatus({
      isExpired,
      daysUntilExpiry
    });

    if (isExpired) {
      setIsPaywallModalOpen(true);
    }
  };

  const getCurrentTabName = () => {
    const path = pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1) || "Home";
  };

  if (isLoading || !user) {
    return <FullScreenLoader />;
  }

  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const initials = (typeof firstName === 'string' && firstName)
    ? (typeof lastName === 'string' && lastName)
      ? `${firstName.charAt(0)}.${lastName.charAt(0)}`.toUpperCase()
      : `${firstName.slice(0, 2)}`.toUpperCase()
    : '';

  const handlePhoneModalClose = () => {
    setIsPhoneModalOpen(false);
    if (user.membershipId == null) {
      setIsMembershipModalOpen(true);
    }
  };

  const getMembershipTier = () => {
    return user.membershipTier || 'ordinary';
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row w-full">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <Header currentTab={getCurrentTabName()} initials={initials} />
        
        <main className={`flex-1 overflow-y-auto p-4 md:p-6 bg-[#f4f4f4] ${
          isPaywallModalOpen ? 'pointer-events-none opacity-50' : ''
        }`}>
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

      {user.phoneNumber != null && user.membershipId != null && membershipStatus.isExpired && (
        <MembershipPaywallModal
          open={isPaywallModalOpen}
          onOpenChange={setIsPaywallModalOpen}
          tier={getMembershipTier()}
        />
      )}
    </div>
  );
}