"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge";
// import { ShoppingCart } from "lucide-react"
// import { toast } from "react-toastify"

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group border rounded-lg overflow-hidden bg-white flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/shop/product/${id}`}>
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {badge && (
          <Badge
            variant={"secondary"}
            className="absolute top-2 right-2 text-xs bg-blue-100 text-blue-800"
          >
            {badge}
          </Badge>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="space-y-3">
          <h4 className="text-xl font-semibold text-gray-800 truncate">
            {name || "Item Name"}
          </h4>
          <p className="text-sm text-gray-600 line-clamp-3">
            {description || "No description provided"}
          </p>
          <div className="flex justify-between items-center pt-2">
            <span className="text-lg font-bold text-green-600">
              Ksh {price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
