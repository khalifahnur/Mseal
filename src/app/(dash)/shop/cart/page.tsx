"use client";

import { useCart } from "@/hooks/Store/CartContext";
import { ShoppingCart, X, ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { cart, removeFromCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-xl shadow-xl border z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold flex items-center">
          <ShoppingCart className="mr-2 h-5 w-5 text-black" />
          Your Cart
          <span className="ml-2 h-5 w-5 rounded-full text-xs flex items-center justify-center bg-primary text-white">
            {totalItems}
          </span>
        </h2>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="p-8 text-center flex-1 flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
          </div>
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            href="/shop"
            className="text-primary hover:underline text-sm font-medium flex items-center justify-center"
          >
            Continue Shopping
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="max-h-80 overflow-y-auto p-4 space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-3 pb-4 border-b last:border-none last:pb-0"
              >
                <div className="w-16 h-16 relative rounded overflow-hidden border bg-gray-100 shrink-0">
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm line-clamp-2">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Size: {item.size}
                  </p>

                  <div className="flex justify-between items-center mt-2">
                    {/* <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-2 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div> */}
                    <p className="font-medium text-sm">
                      Ksh.{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary & Checkout */}
          <div className="p-4 bg-gray-50 rounded-b-xl">
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Ksh.{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Ksh.{shipping.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>Ksh.{total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-primary hover:bg-primary/90 text-white text-center py-3 rounded font-medium transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
