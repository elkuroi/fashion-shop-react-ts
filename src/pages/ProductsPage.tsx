import { products } from "../data/products"
import { ProductCard } from "../components/ProductCard"

const ProductsPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-center">Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product) => (
          <div className="w-full h-80"> {/* Окружили карточку фиксированным размером */}
            <ProductCard product={product} key={product.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage