"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shirt, Trash2, ArrowLeft, CreditCard } from "lucide-react"

// Mock cart data - in a real app, this would come from state management or API
const initialCartItems = [
  {
    id: "1",
    name: "Home Stadium Shirt 2024-25",
    price: 99.99,
    size: "M",
    quantity: 1,
    image: "/assets/images/jersey-front.png",
  },
  {
    id: "6",
    name: "Team Socks Home 2024-25",
    price: 99.99,
    size: "L",
    quantity: 2,
    image: "/assets/images/jersey-front.png",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = 4.99
  const total = subtotal - discount + shipping

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "FCPROMO") {
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-white">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Shirt className="h-6 w-6 text-blue-600" />
            </Link>
            <Link href="/">
              <span className="font-bold text-xl">Football Club Store</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-4 border-b">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 font-medium">Product</div>
                    <div className="col-span-2 font-medium text-center">Price</div>
                    <div className="col-span-2 font-medium text-center">Quantity</div>
                    <div className="col-span-2 font-medium text-right">Total</div>
                  </div>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 relative rounded overflow-hidden shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-sm text-red-600 flex items-center mt-1"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">£{item.price.toFixed(2)}</div>
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <div className="h-8 w-8 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2 text-right font-medium">
                          Ksh.{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>

                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    className="w-40"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="border rounded-lg p-6 sticky top-24">
                <h2 className="font-bold text-lg mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-£{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>£{shipping.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>

                <div className="mt-4 text-xs text-gray-500 text-center">Secure checkout powered by Stripe</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-100 border-t mt-12">
        <div className="container mx-auto p-6">
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">© 2025 Football Club Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
