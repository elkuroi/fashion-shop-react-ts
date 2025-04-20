import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore' 

export default function Success() {
  const navigate = useNavigate()
  const clearCart = useCartStore(state => state.clearCart)


  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-500 mb-4"> Payment Successful!</h1>
      <p className="text-lg mb-6">Thank you for your order! We'll send a confirmation soon.</p>

      <button
        onClick={() => navigate('/Catalog')}
        className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
      >
        Back to Catalog
      </button>
    </div>
  )
}