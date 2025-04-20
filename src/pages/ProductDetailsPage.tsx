import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const product = products.find((p) => p.id === Number(id))

  if (!product) return <div className="p-8">Product not found</div> // Если не нашли товар

  const addToCart = useCartStore((state) => state.addToCart)
  const [size, setSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (!size) {
      alert('Please select a size')
      return
    }
    addToCart(product, size)  // Передаем товар и размер
    setAdded(true)
  }

  return (
    <div className="p-8 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <div className="max-w-4xl mx-auto flex gap-8">
        <div className="w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded shadow"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">{formatPrice(product.price)}</p>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Select size:</h2>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 border rounded ${
                    size === s
                      ? 'bg-black text-white'
                      : 'bg-white dark:bg-gray-800 text-black dark:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-4 flex-col sm:flex-row sm:w-full">
            {!added ? (
              <button
                onClick={handleAdd}
                disabled={added}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition w-full sm:w-auto"
              >
                Add to cart
              </button>
            ) : (
              <button
                onClick={() => navigate('/cart')}  // Переход в корзину
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition w-full sm:w-auto"
              >
                Go to Cart
              </button>
            )}

            {/* Кнопка "Continue Shopping" всегда на месте */}
            <button
              onClick={() => navigate('/catalog')}
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition w-full sm:w-auto"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}