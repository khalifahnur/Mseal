import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  imgUrl?: string;
  price: number;
  quantity: number;
  size?: string;
  customization?: {
    name: string;
    number: string;
  } | null;
}

interface OrderSummaryProps {
  cart: CartItem[];
  itemSubtotal: number;
  printingCost: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
}

export default function OrderSummary({
  cart,
  itemSubtotal,
  printingCost,
  deliveryFee,
  serviceFee,
  total,
}: OrderSummaryProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
                {item.customization && (
                  <span className="text-muted-foreground"> (Customized)</span>
                )}
              </h4>
              {item.size && (
                <p className="text-xs text-muted-foreground">Size: {item.size}</p>
              )}
              <div className="flex justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </span>
                <span className="text-sm">
                  KSh {(item.price * item.quantity + (item.customization ? 500 * item.quantity : 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Items Subtotal</span>
          <span>KSh {itemSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Printing Cost</span>
          <span>KSh {printingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span>KSh {deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Service Fee</span>
          <span>KSh {serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t">
          <span>Total</span>
          <span>KSh {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>
      </div>
    </div>
  );
}