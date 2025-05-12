"use client";

import { useCart } from "@/hooks/Store/CartContext";
import { ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CartContent from "./CartContent";

export default function CartButton() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
          <ShoppingCartIcon
            className={"h-4 transition-all ease-in-out hover:scale-110"}
          />

          {totalItems ? (
            <div className="absolute right-0 top-0 mr-2 -mt-2 h-4 w-4 rounded-sm bg-red-500 text-[11px] font-medium text-white">
              {totalItems}
            </div>
          ) : null}
        </div>
      </SheetTrigger>
      <CartContent />
    </Sheet>
  );
}
