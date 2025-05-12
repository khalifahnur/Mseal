"use client"

import { useCart } from "@/hooks/Store/CartContext"
import { Minus, Plus, ShoppingCart, X, ChevronRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function CartContent() {
  const { cart, removeFromCart } = useCart()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cart.length > 0 ? 500 : 0
  const total = subtotal + shipping

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
      <SheetHeader className="p-4 border-b">
        <div className="flex justify-between items-center">
          <SheetTitle className="flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            My Cart
            {totalItems > 0 && (
              <span className="ml-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-primary text-primary-foreground">
                {totalItems}
              </span>
            )}
          </SheetTitle>
          <SheetClose className="rounded-full h-6 w-6 flex items-center justify-center">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
      </SheetHeader>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="p-8 text-center flex-1 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground/40" />
          </div>
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <SheetClose asChild>
            <Link
              href="/shop"
              className="text-primary hover:underline text-sm font-medium flex items-center justify-center"
            >
              Continue Shopping
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </SheetClose>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 pb-4 border-b last:border-none last:pb-0">
                  <div className="w-20 h-20 relative rounded overflow-hidden border bg-muted shrink-0">
                    <Image src={item.imgUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.size}</p>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          //onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button
                          //onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-muted-foreground hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-medium text-sm">Ksh.{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary & Checkout */}
          <div className="border-t">
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Ksh.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Ksh.{shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Ksh.{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="p-4 pt-0">
              <SheetClose asChild>
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </>
      )}
    </SheetContent>
  )
}
