import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
    increaseQty,
    decreaseQty,
  } = useCartStore()

  return (
    <div className="p-8 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-6 text-lg">
            <p>
              Items: <strong>{getCartCount()}</strong>
            </p>
            <p>
              Total: <strong>{formatPrice(getCartTotal(), 'NOK', 'en-NO')}</strong>
            </p>
          </div>

          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Size: {item.size}  {/* Отображаем размер товара */}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {formatPrice(item.price, 'NOK', 'en-NO')} × {item.quantity} ={' '}
                      <strong>{formatPrice(item.price * item.quantity, 'NOK', 'en-NO')}</strong>
                    </p>
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => decreaseQty(item.id, item.size)}
                        className="px-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id, item.size)}
                        className="px-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={clearCart}
              className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded "
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="w-full sm:w-auto px-4 py-2 bg-black text-white rounded text-center "
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}