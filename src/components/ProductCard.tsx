import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white dark:bg-gray-800 dark:text-white"
      onMouseEnter={() => setHovered(true)} // when mouse enters
      onMouseLeave={() => setHovered(false)} // when mouse leaves
    >
      {/* 👇 Клик по картинке и названию */}
      <div
        className="cursor-pointer relative"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        {/* Картинка */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-60 object-cover rounded transition-opacity ${hovered ? 'opacity-50' : 'opacity-100'}`}
        />
        {/* Текст "Choose Size" только на картинке */}
        {hovered && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold">
            Choose Size
          </div>
        )}
      </div>

      {/* Название товара */}
      <h2 className="mt-2 text-lg font-semibold hover:underline">{product.name}</h2>

      {/* Цена товара */}
      <p className="text-gray-500">{formatPrice(product.price)}</p>
    </div>
  )
}