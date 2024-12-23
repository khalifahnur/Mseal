import { Button } from "@/components/ui/button"
import { SectionCard } from "@/components/pages/dashboard/settings/sectioncard"

interface MembershipSectionProps {
  membership: {
    type: string
    expiryDate: string
    paymentMethod: string
  }
}

export function MembershipSection({ membership }: MembershipSectionProps) {
  return (
    <SectionCard title="Membership Information">
      <div className="space-y-4">
        <p><strong>Membership Type:</strong> {membership.type}</p>
        <p><strong>Expiry Date:</strong> {membership.expiryDate}</p>
        <p><strong>Payment Method:</strong> {membership.paymentMethod}</p>
        <div className="space-x-2">
          <Button variant="outline">Renew Membership</Button>
          <Button variant="outline">Update Payment Method</Button>
        </div>
      </div>
    </SectionCard>
  )
}

