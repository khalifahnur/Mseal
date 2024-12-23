import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard";

interface AppSettingsSectionProps {
  appSettings: {
    language: string;
    theme: string;
    fontSize: string;
  };
}

export function AppSettingsSection({ appSettings }: AppSettingsSectionProps) {
  return (
    <SectionCard title="App Settings">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select defaultValue={appSettings.language}>
            <SelectTrigger id="language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Spanish">Swahili</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select defaultValue={appSettings.theme}>
            <SelectTrigger id="theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SectionCard>
  );
}
