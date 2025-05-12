"use client";

import { useCart } from "@/hooks/Store/CartContext";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartContent from "./CartContent";

interface CartButtonProps {
  variant?: "icon" | "text" | "full";
  className?: string;
}

export default function CartButton({
  variant = "full",
  className = "",
}: CartButtonProps) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={`flex items-center gap-1 hover:text-primary transition-colors ${className}`}
        >
          <ShoppingCart className="h-5 w-5" />
          {variant !== "icon" && (
            <span className="text-sm font-medium">
              {variant === "full"
                ? `Cart (${totalItems})`
                : totalItems > 0
                ? `(${totalItems})`
                : ""}
            </span>
          )}
        </button>
      </SheetTrigger>
      <CartContent />
    </Sheet>
  );
}
