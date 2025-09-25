"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/components/Forms/AuthContext";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: string;
  description?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  badge,
  description,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const {user} = useAuth();

  const discountPercentage = user?.membershipTier === "gold" ? 0.3 : user?.membershipTier === "silver" ? 0.2 : 0;
  const discountedPrice = discountPercentage ? price * (1 - discountPercentage) : price;

  

  return (
    <Card
      className="group cursor-pointer border-0 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
          <Link href={`/shop/product/${id}`}>
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            //onClick={() => window.alert(`${name} coming soon! ${id}`)}
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isHovered ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-red-500"}`}
            />
          </Button>
          </Link>
        </div>

        {/* Product Details */}
        <div className="space-y-2 sm:space-y-3">
  <div className="flex items-start justify-between gap-2 sm:gap-4">
    <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent text overflow */}
      <h3 className="text-xs sm:text-sm md:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2"> {/* Added line-clamp-2 */}
        {name || "Item Name"}
      </h3>
      {badge && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
          {badge}
        </span>
      )}
    </div>
    <div className="text-right flex-shrink-0"> {/* Added flex-shrink-0 */}
      {discountPercentage > 0 ? (
        <>
          <p className="text-xs sm:text-sm text-gray-500 line-through">Ksh {price.toLocaleString()}</p>
          <p className="text-sm sm:text-lg font-extrabold text-red-600">
            Ksh {discountedPrice.toLocaleString()}
          </p>
          <p className="text-[10px] sm:text-xs text-green-600 font-semibold">
            {user?.membershipTier?.toUpperCase()} {discountPercentage * 100}% OFF
          </p>
        </>
      ) : (
        <p className="text-sm sm:text-lg font-extrabold text-gray-900">Ksh {price.toLocaleString()}</p>
      )}
    </div>
  </div>

  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3"> {/* Adjusted line-clamp */}
    {description || "No description provided"}
  </p>
  
  <Link href={`/shop/product/${id}`} className="block"> {/* Added block class */}
    <Button
      variant="outline"
      size="sm" // Added responsive size
      className="w-full mt-1 sm:mt-2 text-xs sm:text-sm text-gray-900 border-primary hover:bg-primary/90 hover:text-white transition-colors py-1.5 sm:py-2" // Added responsive padding
    >
      Add to cart
    </Button>
  </Link>
</div>
      </CardContent>
    </Card>
  );
}