import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard"
import Image from "next/image"

interface ProfileSectionProps {
  profile: {
    name: string
    email: string
    phone: string
    address: string
    profilePicture: string
  }
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  return (
    <SectionCard title="Profile Information">
      <div className="space-y-4 ">
        <div className="flex items-center space-x-4">
          <Image
            src={profile.profilePicture}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <Button>Change Picture</Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={profile.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={profile.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" defaultValue={profile.phone} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" defaultValue={profile.address} />
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    </SectionCard>
  )
}

