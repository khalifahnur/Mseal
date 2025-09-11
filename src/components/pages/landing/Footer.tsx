"use client"

import type React from "react"

import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone, ArrowRight, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  }

  return (

    
    <footer className="relative bg-gradient-to-b from-[#0a0c1b] to-black text-white overflow-hidden md:px-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="h-1 w-full bg-[#fae115]"></div>

      <div className="container mx-auto px-4 py-10">
        <motion.div
          className="grid gap-12 md:grid-cols-3 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="mb-2">
              <Image
                src="/assets/mseal-logo.png"
                alt="Muranga Seal FC Logo"
                width={180}
                height={60}
                className="mb-2"
              />
              <p className="text-gray-400 mb-4">
                The Pride of Muranga - Established 2018. We are more than a football club; we are a community united by
                passion.
              </p>
            </div>

            <h3 className="text-lg font-bold mb-4 text-[#fae115]">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About", href: "/about" },
                { name: "Matches", href: "/matches" },
                { name: "Membership", href: "/" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faq" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-[#fae115] transition-colors duration-300"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-[#fae115]">Contact Information</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-[#fae115] mt-1 mr-3 shrink-0" />
                <div>
                  <p className="text-gray-300">Email:</p>
                  <a
                    href="mailto:info@murangaseals.com"
                    className="text-white hover:text-[#fae115] transition-colors duration-300"
                  >
                    info@murangaseals.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-[#fae115] mt-1 mr-3 shrink-0" />
                <div>
                  <p className="text-gray-300">Phone:</p>
                  <a
                    href="tel:+254123456789"
                    className="text-white hover:text-[#fae115] transition-colors duration-300"
                  >
                    +254 123 456 789
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#fae115] mt-1 mr-3 shrink-0" />
                <div>
                  <p className="text-gray-300">Stadium:</p>
                  <p className="text-white">St Sebastian Park, Muranga County, Kenya</p>
                </div>
              </li>
            </ul>

            <div className="relative h-32 rounded-lg overflow-hidden border border-gray-800">
              <Image src="/placeholder.svg?height=128&width=300" alt="Stadium Location" fill className="object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <Link
                  href="/contact"
                  className="px-3 py-1.5 bg-[#fae115] text-black text-sm font-medium rounded-full hover:bg-yellow-400 transition-colors duration-300"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-[#fae115]">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-blue-600" },
                { icon: Twitter, label: "Twitter", href: "#", color: "hover:bg-blue-400" },
                { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-pink-600" },
                { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-red-600" },
              ].map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 ${social.color} transition-colors duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-[#fae115]">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news, match updates, and exclusive offers!
            </p>

            <form onSubmit={handleSubscribe} className="mb-8">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 pl-4 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#fae115] text-white"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#fae115] transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>

              {isSubscribed && (
                <motion.p
                  className="mt-2 text-green-400 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </form>

              {/* playstore links  */}
            {/* <h3 className="text-lg font-bold mb-4 text-[#fae115]">Download Our App</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </a>
            </div> */}
          </motion.div>
        </motion.div>

        {/* Footer bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Murang&apos;a Seal FC. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-[#fae115] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#fae115] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-[#fae115] transition-colors duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}