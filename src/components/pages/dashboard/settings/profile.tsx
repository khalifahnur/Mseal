import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard";

interface ProfileSectionProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  const size = 40;
  const initials =
    `${profile.firstName[0]}.${profile.lastName[0]}`.toUpperCase();
  return (
    <SectionCard title="Profile Information">
      <div className="space-y-4 ">
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center justify-center rounded-full bg-primary text-white font-semibold"
            style={{ width: size, height: size, fontSize: size / 2 }}
          >
            {initials}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">FirstName</Label>
            <Input id="name" defaultValue={profile.firstName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">LastName</Label>
            <Input id="name" defaultValue={profile.lastName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={profile.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue={profile.phoneNumber} />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
