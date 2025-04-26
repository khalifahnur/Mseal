"use client";

import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/pages/dashboard/settings/profile";
import { PasswordSection } from "@/components/pages/dashboard/settings/password";
import { MembershipSection } from "@/components/pages/dashboard/settings/membbership";
import { NotificationSection } from "@/components/pages/dashboard/settings/notification";
import { PrivacySection } from "@/components/pages/dashboard/settings/privacy";
import { AppSettingsSection } from "@/components/pages/dashboard/settings/appsettings";
import { mockUserSettings } from "@/components/pages/dashboard/settings/placeholder";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";

export default function SettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="space-y-6">
      <ProfileSection profile={data} />
      <PasswordSection
        twoFactorEnabled={mockUserSettings.security.twoFactorEnabled}
      />
      <MembershipSection membership={mockUserSettings.membership} />
      <NotificationSection notifications={mockUserSettings.notifications} />
      <PrivacySection privacy={mockUserSettings.privacy} />
      <AppSettingsSection appSettings={mockUserSettings.appSettings} />

      <div className=" flex items-start">
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
}
