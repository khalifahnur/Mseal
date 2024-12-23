import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard"

interface PasswordSectionProps {
  twoFactorEnabled: boolean
}

export function PasswordSection({ twoFactorEnabled }: PasswordSectionProps) {
  return (
    <SectionCard title="Password Management">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>
        <Button>Change Password</Button>
        <div className="flex items-center space-x-2">
          <Switch id="two-factor" checked={twoFactorEnabled} />
          <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
        </div>
      </div>
    </SectionCard>
  )
}

