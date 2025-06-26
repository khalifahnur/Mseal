import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  imgUrl?: string;
  price: number;
  quantity: number;
  size?: string;
}

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  serviceFee: number;
  total: number;
}

export default function OrderSummary({
  cart,
  subtotal,
  shipping,
  serviceFee,
  total,
}: OrderSummaryProps) {
  return (
    <div>
      <h3 className="font-medium text-base mb-3">Order Summary</h3>
      <div className="space-y-3">
        {cart.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="w-16 h-16 relative rounded overflow-hidden border bg-muted shrink-0">
              <Image
                src={item.imgUrl || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-1">
                {item.name}
              </h4>
              {item.size && (
                <p className="text-xs text-muted-foreground">Size: {item.size}</p>
              )}
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm">
                  Ksh.{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>Ksh.{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Ksh.{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service Fee</span>
          <span>Ksh.{serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total</span>
          <span>Ksh.{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
