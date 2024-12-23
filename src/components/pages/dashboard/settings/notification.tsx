import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard"

interface NotificationSectionProps {
  notifications: {
    email: { [key: string]: boolean }
    push: { [key: string]: boolean }
    sms: { [key: string]: boolean }
  }
}

export function NotificationSection({ notifications }: NotificationSectionProps) {
  return (
    <SectionCard title="Notification Preferences">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Email Notifications</h3>
          {Object.entries(notifications.email).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 mb-2">
              <Switch id={`email-${key}`} checked={value} />
              <Label htmlFor={`email-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Push Notifications</h3>
          {Object.entries(notifications.push).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 mb-2">
              <Switch id={`push-${key}`} checked={value} />
              <Label htmlFor={`push-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">SMS Notifications</h3>
          {Object.entries(notifications.sms).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 mb-2">
              <Switch id={`sms-${key}`} checked={value} />
              <Label htmlFor={`sms-${key}`}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  )
}

