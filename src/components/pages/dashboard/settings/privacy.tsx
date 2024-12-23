import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard"

interface PrivacySectionProps {
  privacy: {
    dataSharing: boolean
    socialSharing: boolean
  }
}

export function PrivacySection({ privacy }: PrivacySectionProps) {
  return (
    <SectionCard title="Privacy Settings">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="data-sharing" checked={privacy.dataSharing} />
          <Label htmlFor="data-sharing">Allow data sharing with partners</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="social-sharing" checked={privacy.socialSharing} />
          <Label htmlFor="social-sharing">Enable automatic social media sharing</Label>
        </div>
      </div>
    </SectionCard>
  )
}

