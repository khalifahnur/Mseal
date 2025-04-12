"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { toast } from "react-toastify"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  badge?: string
}

export default function ProductCard({ id, name, price, image, badge }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    toast.success(`Added to cart ${name} has been added to your cart.`)
  }

  return (
    <div
      className="group border rounded-lg overflow-hidden bg-white flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/shop/product/${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={600}
            height={600}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {badge && <Badge className="absolute top-2 right-2 bg-orange-500">{badge}</Badge>}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <Link href={`/shop/product/${id}`} className="hover:underline">
          <h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>
        </Link>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="font-bold">Ksh.{price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
