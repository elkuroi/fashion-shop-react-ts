import { Link, NavLink } from 'react-router-dom'
import { FaShoppingCart, FaMoon, FaSun } from 'react-icons/fa'
import { useCartStore } from '../store/cartStore'
import { useDarkMode } from '../hooks/useDarkMode'

export const Header = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const [isDark, setIsDark] = useDarkMode()

  const navLinkClass =
    'text-sm font-medium hover:underline transition'

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Fashion Shop
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/catalog" className={navLinkClass}>
            Catalog
          </NavLink>

          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsDark(!isDark)}
            className="text-xl hover:scale-110 transition"
            title="Toggle theme"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </nav>
      </div>
    </header>
  )
}