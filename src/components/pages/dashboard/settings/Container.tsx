import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/pages/dashboard/settings/profile";
import { PasswordSection } from "@/components/pages/dashboard/settings/password";
import { MembershipSection } from "@/components/pages/dashboard/settings/membbership";
import { NotificationSection } from "@/components/pages/dashboard/settings/notification";
import { PrivacySection } from "@/components/pages/dashboard/settings/privacy";
import { AppSettingsSection } from "@/components/pages/dashboard/settings/appsettings";
import { mockUserSettings } from "@/components/pages/dashboard/settings/placeholder";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <ProfileSection profile={mockUserSettings.profile} />
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
