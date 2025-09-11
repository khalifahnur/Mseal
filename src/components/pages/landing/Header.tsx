"use client"

import Link from "next/link"
import Image from "next/image"
import { UsersRound, Menu } from "lucide-react"
import { MegaMenu } from "@/components/pages/landing/menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useState } from "react"

interface LandingHeaderProps {
  onLoginClick: () => void
  onSignUpClick: () => void
}

export default function LandingHeader({ onLoginClick, onSignUpClick }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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
  ]

  return (
    <div className={`${isScrolled ? "sticky top-0 z-50" : ""}`}>
      <div className={`bg-[#fae115] w-full ${isScrolled ? "h-1" : "h-2"}`}></div>
      <header
        className={`text-black border-b border-gray-200 relative z-50 transition-all duration-300 ${isScrolled ? "shadow-md" : ""}`}
      >
        <div className={`relative bg-black ${isScrolled ? "h-0" : "h-10"} w-full transition-all duration-300`} />
        <nav
          className={`${
            isScrolled
              ? "sticky top-0 bg-black h-16 flex items-center justify-between px-5 py-2"
              : "absolute w-[calc(100%-2rem)] bg-[#ffff] left-5 h-12 top-10 -translate-y-1/2 px-2 flex items-center justify-between"
          } transition-all duration-300`}
        >
          <Link href="/" className="shrink-0">
            <Image
              src="/assets/mseal-logo.png"
              alt="Muranga Seals"
              width={100}
              height={100}
              className={`w-auto ${
                isScrolled ? "h-14 relative top-0" : "h-24 absolute -top-7"
              } transition-all duration-300`}
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
              ),
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="border-l-2 border-[#eee] h-6 mx-4 hidden lg:block" />

            <Button
              className="hidden lg:flex items-center justify-between text-sm font-semibold text-black hover:text-gray-600 bg-[#fae115] px-3 py-1 rounded transition-colors cursor-pointer"
              onClick={onSignUpClick}
              variant={"ghost"}
            >
              <span className="flex items-center">
                <UsersRound className="mr-2" size={15} /> JOIN
              </span>
            </Button>

            <Button
              className="hidden lg:block text-sm text-[#fff] font-semibold bg-[#000] px-3 py-1 rounded cursor-pointer"
              onClick={onLoginClick}
              variant={"ghost"}
            >
              LOGIN
            </Button>

            <div className="border-l-2 border-[#eee] h-6 mx-4 hidden lg:block" />
            <div className="hidden lg:block p-2">
              <Image
                src="/assets/sponsors/sp-logo.jpg"
                alt="Muranga Seals"
                width={100}
                height={100}
                className="h-5 w-20"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden bg-white" aria-label="Open menu">
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
                  <Button
                    className="flex items-center justify-center text-sm font-semibold text-black hover:text-gray-600 bg-[#fae115] px-3 py-1 rounded transition-colors cursor-pointer"
                    onClick={onSignUpClick}
                  >
                    <UsersRound className="mr-2" size={15} /> JOIN
                  </Button>
                  <Button
                    className="text-sm text-[#fff] font-semibold bg-[#000] px-3 py-1 rounded cursor-pointer"
                    onClick={onLoginClick}
                  >
                    LOGIN
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </div>
  )
}
