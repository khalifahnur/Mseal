"use client";

import { Shirt, ShoppingCart } from "lucide-react"
import Link from "next/link"
import PromoHeader from "./PromoHeader"
import { useCart } from "@/hooks/Store/CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMerchandise } from "@/api/api";
import { FullScreenLoader } from "../../loading/FullScreenLoader";
import ProductGrid from "./ProductGrid";
import CartButton from "./cart/CartButton";

export default function Container() {
  const { cart } = useCart();
  const totalItems = cart?.length
  
  const { data, isLoading } = useQuery({
    queryKey: ["allMerchandise"],
    queryFn: fetchAllMerchandise,
    staleTime: 1000 * 60 * 5,
    //cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <FullScreenLoader />;
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-white">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-secondary" />
            <span className="font-bold text-xl">Muranga Seal Store</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Men
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Women
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Kids
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Accessories
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Sale
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <Link href="/shop/cart" className="flex items-center gap-1">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">Cart ({totalItems})</span>
            </Link> */}
            <CartButton variant="full" />
          </div>
        </div>
      </header>

      <PromoHeader />

      <main className="flex-1 container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* <FilterSidebar /> */}

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">Player Jerseys & Kits</h1>
              <ProductGrid items={data.responseItems}/>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Kids
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Delivery Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Corporate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">© 2025 Football Club Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
