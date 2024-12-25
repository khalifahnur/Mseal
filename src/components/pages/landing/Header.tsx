"use client";

import Link from "next/link";
import Image from "next/image";
import { UsersRound, Menu } from "lucide-react";
import { MegaMenu } from "@/components/pages/landing/menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function LandingHeader() {
  const navItems = [
    { label: "HOME", href: "https://www.murangaseal.com/" },
    { label: "NEWS", href: "https://www.murangaseal.com/news" },
    { label: "MEMBERSHIPS", href: "#", megaMenu: true },
    {
      label: "FIXTURES & RESULTS",
      href: "https://www.murangaseal.com/opponent",
    },
    { label: "TICKETS & HOSPITALITY", href: "#" },
    { label: "SHOP", href: "#" },
    { label: "SUPPORT", href: "#" },
  ];

  return (
    <>
      <div className="bg-[#fae115] h-2 w-full"></div>
      <header className="text-black border-b border-gray-200 relative z-50">
        <div className="relative bg-black h-10 w-full" />
        <nav className="absolute w-[calc(100%-2rem)] bg-[#f7f7f7] left-5 h-12 top-15 -translate-y-1/2 px-2 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://www.murangaseal.com/assets/logo-a25ccce319b09f73006dc94d71887dbd26f5afeec59c2fa5dca6afaf101fe82c.png"
              alt="Muranga Seals"
              width={100}
              height={100}
              className="h-24 w-auto absolute -top-7"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) =>
              item.megaMenu ? (
                <MegaMenu key={item.label} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold border-b-2 hover:border-b-[#fae115] text-[#fae115] transition-colors border-transparent"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="border-l-2 border-[#eee] h-6 mx-4 hidden lg:block" />
            <Link
              href="/SignUp"
              className="hidden lg:flex items-center justify-between text-sm font-semibold text-black hover:text-gray-600 bg-[#fae115] px-3 py-1 rounded transition-colors"
              aria-label="Join Now"
            >
              <span className="flex items-center">
                <UsersRound className="mr-2" size={15} /> JOIN
              </span>
            </Link>
            <Link
              href="/SignIn"
              className="hidden lg:block text-sm text-[#fff] font-semibold bg-[#000] px-3 py-1 rounded"
            >
              LOGIN
            </Link>
            <div className="border-l-2 border-[#eee] h-6 mx-4 hidden lg:block" />
            <div className="hidden lg:block">
              <Image
                src="https://www.ke.sportpesa.com/img/actionbar_logo.png?v3.15.0.1"
                alt="Muranga Seals"
                width={100}
                height={100}
                className="h-5 w-20"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm font-semibold text-black hover:text-[#fae115] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/SignUp"
                    className="flex items-center justify-between text-sm font-semibold text-black hover:text-gray-600 bg-[#fae115] px-3 py-1 rounded transition-colors"
                    aria-label="Join Now"
                  >
                    <span className="flex items-center">
                      <UsersRound className="mr-2" size={15} /> JOIN
                    </span>
                  </Link>
                  <Link
                    href="/SignIn"
                    className="text-sm text-[#fff] font-semibold bg-[#000] px-3 py-1 rounded"
                  >
                    LOGIN
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}
