import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  currentTab: string;
}

export function Header({ currentTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-black px-4 md:px-6">
      <div className="flex items-center">
        <SidebarTrigger className="mr-2 md:hidden bg-white" />
        <h1 className="text-lg font-semibold md:text-xl text-white">
          {currentTab}
        </h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="icon" className="bg-white">
          <Bell className="h-5 w-5 " />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  );
}
