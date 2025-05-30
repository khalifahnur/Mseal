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
import { ArrowLeft, Heart, ShoppingCart, Star, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "@/hooks/Store/CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchAllMerchandise } from "@/api/api";
import { FullScreenLoader } from "@/components/pages/loading/FullScreenLoader";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: PageProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState("1");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [wantNamePrinting, setWantNamePrinting] = useState(false);
  const [nameForPrinting, setNameForPrinting] = useState("");
  const [numberForPrinting, setNumberForPrinting] = useState("");
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

  const createMultipleImages = (mainImage: string) => {
    return [
      mainImage,
      mainImage || "/assets/images/product-alt-1.png",
      mainImage || "/assets/images/product-alt-2.png",
      mainImage || "/assets/images/product-alt-3.png",
    ];
  };

  const product = baseProduct && {
    ...baseProduct,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White"],
    rating: 4.5,
    reviews: 18,
    badge: "New Arrival",
    images: createMultipleImages(baseProduct.imgUrl),
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
      imgUrl: product.images[0],
      customization: wantNamePrinting ? {
        name: nameForPrinting,
        number: numberForPrinting
      } : null
    };

    addToCart(newItem);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    toast.success(`${product.name} has been added to your wishlist.`);
  };

  const selectImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleNamePrintingToggle = (checked: boolean) => {
    setWantNamePrinting(checked);
    if (!checked) {
      setNameForPrinting("");
      setNumberForPrinting("");
    }
  };

  const namePrintingPrice = 500;
  const totalPrice = product.price + (wantNamePrinting ? namePrintingPrice : 0);

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
            <div className="sticky top-24 space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
                <Image
                  src={product.images[selectedImageIndex] || "/assets/images/placeholder.png"}
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
              
              {/* Image preview thumbnails */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`aspect-square relative overflow-hidden rounded-md border hover:border-blue-600 transition-all ${
                      selectedImageIndex === index ? "ring-2 ring-blue-600 border-blue-600" : ""
                    }`}
                  >
                    <Image
                      src={image || "/assets/images/placeholder.png"}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
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
              <div className="text-3xl font-bold mb-2">
                Ksh.{totalPrice.toFixed(2)}
              </div>
              {wantNamePrinting && (
                <div className="text-sm text-green-600 flex items-center mb-4">
                  <Check className="h-4 w-4 mr-1" />
                  Includes Ksh.{namePrintingPrice.toFixed(2)} for custom printing
                </div>
              )}
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
              {
                product.category == 'Jersey' && <div className="border p-4 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Custom Jersey Printing</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="name-printing" 
                      checked={wantNamePrinting}
                      onCheckedChange={handleNamePrintingToggle}
                    />
                    <Label htmlFor="name-printing">
                      {wantNamePrinting ? "Yes" : "No"}
                    </Label>
                  </div>
                </div>
                
                {wantNamePrinting && (
                  <div className="space-y-4 mt-3 bg-white p-3 rounded-md border animate-fadeIn">
                    <div>
                      <Label htmlFor="jersey-name">Name on Jersey</Label>
                      <Input
                        id="jersey-name"
                        placeholder="Enter name to print"
                        value={nameForPrinting}
                        onChange={(e) => setNameForPrinting(e.target.value)}
                        maxLength={15}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum 15 characters</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="jersey-number">Number on Jersey (Optional)</Label>
                      <Input
                        id="jersey-number"
                        placeholder="Enter number"
                        value={numberForPrinting}
                        onChange={(e) => {
                          // Only allow numbers
                          const value = e.target.value;
                          if (value === "" || /^[0-9]{1,2}$/.test(value)) {
                            setNumberForPrinting(value);
                          }
                        }}
                        maxLength={2}
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Numbers 1-99 only</p>
                    </div>
                    
                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                      <p className="font-medium">Custom printing adds Ksh.{namePrintingPrice.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
              }
              

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
                  {wantNamePrinting && <li className="text-blue-700">Custom printing included</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
