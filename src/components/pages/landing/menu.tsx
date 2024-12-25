import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

export function MegaMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="text-sm font-semibold text-[#fae115] hover:text-[#fae115]">
          MEMBERSHIPS
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen h-[calc(100vh-64px)] max-h-[600px] overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <DropdownMenuLabel className="text-2xl font-bold mb-6">Membership Options</DropdownMenuLabel>
          <DropdownMenuSeparator className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Season Tickets</h3>
              <ul className="space-y-2">
                <li><Link href="/memberships/season-ticket/adult" className="hover:text-[#fae115]">Adult</Link></li>
                <li><Link href="/memberships/season-ticket/junior" className="hover:text-[#fae115]">Junior</Link></li>
                <li><Link href="/memberships/season-ticket/senior" className="hover:text-[#fae115]">Senior</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">VIP Memberships</h3>
              <ul className="space-y-2">
                <li><Link href="/memberships/vip/gold" className="hover:text-[#fae115]">Gold</Link></li>
                <li><Link href="/memberships/vip/platinum" className="hover:text-[#fae115]">Platinum</Link></li>
                <li><Link href="/memberships/vip/diamond" className="hover:text-[#fae115]">Diamond</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">More Information</h3>
              <ul className="space-y-2">
                <li><Link href="/memberships/benefits" className="hover:text-[#fae115]">Membership Benefits</Link></li>
                <li><Link href="/memberships/faq" className="hover:text-[#fae115]">FAQs</Link></li>
                <li><Link href="/memberships/terms" className="hover:text-[#fae115]">Terms and Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

