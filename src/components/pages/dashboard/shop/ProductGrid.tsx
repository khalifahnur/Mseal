import ProductCard from "./ProductCard"

type MerchandiseItem = {
  id: string
  name: string
  price: number
  imgUrl?: string
  category?: string
  description?:string
}

type ProductGridProps = {
  items: MerchandiseItem[]
}

const ProductGrid = ({ items }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          image={item.imgUrl || "/placeholder.svg"}
          badge={item.category}
          description={item.description}
        />
      ))}
    </div>
  )
}

export default ProductGrid
