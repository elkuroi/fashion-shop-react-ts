import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

type CartItem = Product & {
  quantity: number
  size: string // Добавлен размер
}

type CartState = {
  cartItems: CartItem[]
  addToCart: (product: Product, size: string) => void // Добавление с размером
  removeFromCart: (id: number, size: string) => void // Удаление с учетом размера
  clearCart: () => void
  increaseQty: (id: number, size: string) => void
  decreaseQty: (id: number, size: string) => void
  getCartCount: () => number
  getCartTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, size) => {
        const existing = get().cartItems.find(
          (item) => item.id === product.id && item.size === size
        )
        if (existing) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }))
        } else {
          set((state) => ({
            cartItems: [...state.cartItems, { ...product, quantity: 1, size }],
          }))
        }
      },

      removeFromCart: (id, size) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id || item.size !== size),
        })),

      clearCart: () => set({ cartItems: [] }),

      increaseQty: (id, size) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQty: (id, size) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      getCartCount: () =>
        get().cartItems.reduce((acc, item) => acc + item.quantity, 0),

      getCartTotal: () =>
        get().cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
)