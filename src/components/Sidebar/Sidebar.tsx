"use client";

import { useMemo, useCallback } from "react";
import {
  Home,
  Ticket,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  HelpCircle,
  StoreIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchUserInfo } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchLogout } from "@/hooks/Authhook/authHook";
import { toast } from "react-toastify";
import { useAuth } from "@/components/Forms/AuthContext";
import { Skeleton } from "../ui/skeleton";



export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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

  const baseSidebarItems = [
  { name: "Home", href: '/home', icon: Home },
  { name: "Tickets", href: '/tickets', icon: Ticket },
  { name: "Matches", href: '/matches', icon: Calendar },
  { name: "Membership", href: '/membership', icon: CreditCard },
];

const shopItem = { name: "Shop", href: '/shop', icon: StoreIcon };

const footerItems = [
  { name: "Settings", href: '/settings', icon: Settings },
  { name: "Logout", href: "#", icon: LogOut },
  { name: "Need Help", href: "#", icon: HelpCircle },
];

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logoutMutation]);

  const sidebarItems = useMemo(
    () =>
      data?.membershipId ? [...baseSidebarItems, shopItem] : baseSidebarItems,
    [data?.membershipId]
  );



  if (isLoading) {
    return (
      <Sidebar variant="floating">
        <SidebarHeader className="items-center justify-center">
          <Image
            src="./assets/images/logo.png"
            alt="Muranga Seals"
            width={50}
            height={50}
            className="h-24 w-auto"
            priority
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {baseSidebarItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <Skeleton className="h-10 w-full" />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    );
  }


  return (
    <Sidebar variant="floating">
      <SidebarHeader className="items-center justify-center">
        <Link href="/home" className="z-50">
          <Image
            src="/assets/images/logo.png"
            alt="Muranga Seals"
            width={50}
            height={50}
            className="h-24 w-auto"
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="mt-2" />
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href} prefetch>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="mt-2" />
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              {item.name === "Logout" ? (
                <SidebarMenuButton onClick={handleLogout}>
                  <item.icon className="mr-2 h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton asChild>
                  <Link href={item.href} prefetch>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
