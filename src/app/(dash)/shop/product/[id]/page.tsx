"use client";

import { use, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/Store/CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMerchandise } from "@/api/api";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState("1");
  const { addToCart } = useCart();
  const resolvedParams = use(params);
  const { data, isLoading } = useQuery({
    queryKey: ["allMerchandise"],
    queryFn: fetchAllMerchandise,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <FullScreenLoader />;
  if (!data) return <p className="p-4">Failed to load product data.</p>;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const baseProduct = data.responseItems.find(
    (p: any) => p.id === resolvedParams.id
  );

  const product = baseProduct && {
    ...baseProduct,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White"],
    rating: 4.5,
    reviews: 18,
    badge: "New Arrival",
    images: baseProduct.imgUrl,
  };

  if (!product) return <p className="p-4">Product not found.</p>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: Number(quantity),
      size: selectedSize,
      imgUrl: product.images,
    };

    addToCart(newItem);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} has been added to your wishlist.`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto p-2 py-4">
        <Link
          href="/shop"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          shop
        </Link>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.images || "/assets/images/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews || 0} reviews
                </span>
              </div>
              <div className="text-3xl font-bold mb-6">
                Ksh.{product.price.toFixed(2)}
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {(product.sizes || []).map((size: string) => (
                    <Button
                      key={size}
                      type="button"
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="h-12"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Qty" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="default"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="flex-1"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium mb-3">Product Details</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Official licensed product</li>
                  <li>Available Colors: {product.colors?.join(", ")}</li>
                  <li>Rating: {product.rating} / 5</li>
                  <li>Reviews: {product.reviews}</li>
                  <li>Machine washable</li>
                  <li>Regular fit</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
