// "use client";

// import {
//   Home,
//   Ticket,
//   Calendar,
//   CreditCard,
//   Settings,
//   LogOut,
//   HelpCircle,
//   StoreIcon,
// } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarRail,
//   SidebarSeparator,
// } from "@/components/ui/sidebar";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import Image from "next/image";
// import { fetchUserInfo } from "@/api/api";
// import { useQuery } from "@tanstack/react-query";
// import { FullScreenLoader } from "../pages/loading/FullScreenLoader";


// const baseSidebarItems = [
//   { name: "Home", href: "/home", icon: Home },
//   { name: "Tickets", href: "/tickets", icon: Ticket },
//   { name: "Matches", href: "/matches", icon: Calendar },
//   { name: "Membership", href: "/membership", icon: CreditCard },
// ];

// const shopItem = { name: "Shop", href: "/shop", icon: StoreIcon };

// const footerItems = [
//   { name: "Settings", href: "/settings", icon: Settings },
//   { name: "Logout", href: "#", icon: LogOut },
//   { name: "Need Help", href: "#", icon: HelpCircle },
// ];

// export function AppSidebar() {
//   const pathname = usePathname();

//   const { data, isLoading } = useQuery({
//     queryKey: ["userInfo"],
//     queryFn: fetchUserInfo,
//   });

//   if (isLoading) {
//     return <FullScreenLoader />;
//   }

//   const { membershipId } = data || {};
  
//   const sidebarItems = membershipId 
//     ? [...baseSidebarItems, shopItem]
//     : baseSidebarItems;

//   return (
//     <Sidebar variant="floating">
//       <SidebarHeader className="items-center justify-center">
//         <Link href="/home" className="z-50">
//           <Image
//             src="https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png"
//             alt="Muranga Seals"
//             width={50}
//             height={50}
//             className="h-24 w-auto "
//           />
//         </Link>
//       </SidebarHeader>
//       <SidebarSeparator className="mt-2"/>
//       <SidebarContent>
//         <SidebarMenu>
//           {sidebarItems.map((item) => (
//             <SidebarMenuItem key={item.name}>
//               <SidebarMenuButton asChild isActive={pathname === item.href}>
//                 <Link href={item.href}>
//                   <item.icon className="mr-2 h-4 w-4" />
//                   {item.name}
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>
//       <SidebarSeparator className="mt-2"/>
//       <SidebarFooter>
//         <SidebarMenu>
//           {footerItems.map((item) => (
//             <SidebarMenuItem key={item.name}>
//               <SidebarMenuButton asChild>
//                 <Link href={item.href}>
//                   <item.icon className="mr-2 h-4 w-4" />
//                   {item.name}
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

"use client";

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
import { usePathname } from "next/navigation";
import Image from "next/image";
import { fetchUserInfo } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { FullScreenLoader } from "../pages/loading/FullScreenLoader";

const sidebarItems = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Matches", href: "/matches", icon: Calendar },
  { name: "Membership", href: "/membership", icon: CreditCard },
  {name:"Shop",href:"/shop",icon:StoreIcon}
];

const footerItems = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "#", icon: LogOut },
  { name: "Need Help", href: "#", icon: HelpCircle },
];

export function AppSidebar() {
  const pathname = usePathname();

  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  const {membershipId} = data;
  
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="items-center justify-center bg-gradient-to-r from-black to-primary">
        <Link href="/home" className="z-50">
          <Image
            src="https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png"
            alt="Muranga Seals"
            width={50}
            height={50}
            className="h-24 w-auto "
          />
        </Link>
      </SidebarHeader>
      <SidebarSeparator className="mt-2"/>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="mt-2"/>
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
