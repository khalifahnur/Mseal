export interface orders{
  items: {
        productId: string;
        quantity: number;
        price: number;
        customization: {
            name: string;
            number: string;
        } | null;
    }[];
    totalAmount: number;
    shippingAddress: {
        address?: string;
        city?: string;
        country?: string;
        street?: string;
        deliveryType?: string;
        collectionCenter?: string;
    };
    phoneNumber:string
}
