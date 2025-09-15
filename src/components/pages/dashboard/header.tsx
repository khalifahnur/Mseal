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
import Link from "next/link";
import { useAuth } from "@/components/Forms/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "@/hooks/Authhook/authHook";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  currentTab: string;
  initials: string;
}

export function Header({ currentTab, initials }: HeaderProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: fetchLogout,
    onSuccess: () => {
      toast.success("Logged- You have logged out successfully.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      localStorage.removeItem("authToken");
      signOut();
      router.replace("/");
    },
    onError: () => {
      toast.error("Logout failed.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    },
  });

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logoutMutation]);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center justify-between border-b bg-gradient-to-r from-black via-gray-600 to-primary px-4 md:px-6">
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
                <DropdownMenuItem>Null</DropdownMenuItem>
                {/* <DropdownMenuItem>Ticket sales report ready</DropdownMenuItem>
              <DropdownMenuItem>System update available</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-2 border-[#fae115] bg-gray-900 text-white hover:bg-[#fae115] hover:text-gray-900 focus:ring-2 focus:ring-[#fae115] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 h-10 w-10 flex items-center justify-center"
                >
                  {initials ? (
                    <span className="text-sm font-medium">{initials}</span>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/settings"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="h-2 bg-gradient-to-r from-primary via-gray-600 to-black border rounded" />
    </>
  );
}
