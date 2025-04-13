"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";

// Mock product data - in a real app, this would come from an API or database
const products = [
  {
    id: "1",
    name: "Home Stadium Shirt 2024-25",
    price: 99.99,
    description:
      "The official home shirt for the 2024-25 season. This authentic jersey is made with breathable fabric to keep you comfortable whether you're on the pitch or in the stands.",
    images: "/assets/images/jersey-front.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Blue"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: "2",
    name: "Away Stadium Shirt 2024-25",
    price: 99.99,
    description:
      "The official away shirt for the 2024-25 season . This authentic jersey is made with breathable fabric to keep you comfortable whether you're on the pitch or in the stands.",
    images: "/assets/images/jersey-front.png",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["White"],
    rating: 4.5,
    reviews: 96,
    inStock: true,
  },
  {
    id: "3",
    name: "Third Match Shirt 2024-25 ",
    price: 139.99,
    description:
      "The official third kit match shirt for the 2024-25 season. This premium match-quality jersey is identical to what the players wear on the pitch, featuring advanced moisture-wicking technology and premium materials.",
    images: "/assets/images/jersey-front.png",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Black"],
    rating: 4.8,
    reviews: 64,
    inStock: true,
    badge: "Almost Gone!",
  },
];

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const product =
    products.find((p) => p.id === resolvedParams.id) || products[0];
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState("1");

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(
        "Please select a size , You need to select a size before adding to cart"
      );
      return;
    }
    toast.success(
      `Added to cart ${product.name} (Size: ${selectedSize}, Qty: ${quantity}) has been added to your cart.`
    );
  };

  const handleAddToWishlist = () => {
    toast.success(
      `Added to wishlist, ${product.name} has been added to your wishlist.`
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="border-b sticky top-0 z-10 bg-white">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Shirt className="h-6 w-6 text-blue-600" />
            </Link>
            <Link href="/">
              <span className="font-bold text-xl">Football Club Store</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Men
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Women
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Kids
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Accessories
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-blue-600">
              Sale
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-1">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-medium">Cart (0)</span>
            </Link>
          </div>
        </div>
      </header> */}

      <main className="flex-1 container mx-auto p-2 py-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.images}
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
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.reviews} reviews
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
                  {product.sizes.map((size) => (
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
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
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
                  <li>100% polyester</li>
                  <li>Machine washable</li>
                  <li>Regular fit</li>
                  <li>Printed club crest and sponsor logos</li>
                  <li>Player name and number on back</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t mt-12">
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Kids
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Delivery Information
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline">
                    Corporate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2025 Football Club Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
