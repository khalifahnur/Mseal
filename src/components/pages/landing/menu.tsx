import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function MegaMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="text-sm font-semibold text-primary hover:text-primary"
        >
          MEMBERSHIPS
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen h-[calc(100vh-64px)] max-h-[600px] overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <DropdownMenuLabel className="text-2xl font-bold mb-6">
            Membership Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Season Tickets</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/memberships/season-ticket/adult"
                    className="hover:text-primary"
                  >
                    Adult
                  </Link>
                </li>
                <li>
                  <Link
                    href="/memberships/season-ticket/junior"
                    className="hover:text-primary"
                  >
                    Junior
                  </Link>
                </li>
                <li>
                  <Link
                    href="/memberships/season-ticket/senior"
                    className="hover:text-primary"
                  >
                    Senior
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">VIP Memberships</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/memberships/vip/gold"
                    className="hover:text-primary"
                  >
                    Gold
                  </Link>
                </li>
                <li>
                  <Link
                    href="/memberships/vip/platinum"
                    className="hover:text-primary"
                  >
                    Platinum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/memberships/vip/diamond"
                    className="hover:text-primary"
                  >
                    Diamond
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">More Information</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/memberships/benefits"
                    className="hover:text-primary"
                  >
                    Membership Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/memberships/faq"
                    className="hover:text-primary"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/memberships/terms"
                    className="hover:text-primary"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
