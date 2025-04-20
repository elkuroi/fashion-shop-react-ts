import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51RG0Fp2eeQaIlPxegpJalnr7edi7XWyC7nQQQa92btd2Nnfgdgb5LKkjyzIQV4lbdSfl2gFjNP7ufm7Xqnfrig4q008IDFvX5N') // ЗАМЕНИ на свой реальный публичный ключ

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCartStore()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const isValid = () => {
    return (
      form.name.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      /^\+?\d{7,15}$/.test(form.phone) &&
      form.address.trim()
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid()) {
      alert('Please complete the form with valid information.')
      return
    }

    setLoading(true)

    try {
      const stripe = await stripePromise

      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }

      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: form,
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`Server error: ${response.status} - ${text}`)
      }

      const session = await response.json()
      console.log('✅ Stripe Session:', session)

      if (!session.id) {
        throw new Error('No session ID returned from backend')
      }

      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error: any) {
      console.error('❌ Stripe Checkout Error:', error)
      alert(`❌ Failed to redirect to Stripe Checkout.\n\n${error.message}`)
      setLoading(false)
    }
  }

  return (
    <div className="p-8 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
      <h1 className="text-2xl font-bold mb-6 text-center">🧾 Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800"
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping address"
            value={form.address}
            onChange={handleChange}
            className="w-full border dark:border-gray-700 p-3 rounded bg-white dark:bg-gray-800"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Place Order (${getCartTotal()} NOK)`}
          </button>
        </form>
      )}

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center space-y-2">
            <p className="text-lg font-semibold">Redirecting to Stripe...</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Please do not close this window</p>
          </div>
        </div>
      )}
    </div>
  )
}