import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentTab: string;
  initials:string
}

export function Header({ currentTab,initials}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-gradient-to-r from-black to-primary px-4 md:px-6">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 md:hidden bg-white" />
        <h1 className="text-lg font-semibold md:text-xl text-white">
          {currentTab}
        </h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>New event created</DropdownMenuItem>
              <DropdownMenuItem>Ticket sales report ready</DropdownMenuItem>
              <DropdownMenuItem>System update available</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full border-[#358ee8] border-2">
                {
                  initials ? <span>{initials}</span> : <User className="h-4 w-4"/>
                }
                
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
