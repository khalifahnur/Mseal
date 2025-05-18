export interface orders{
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  shippingAddress: {
    address?: string;
    city: string;
    country?: string;
    street?: string;
  };
  phoneNumber:string;
}

