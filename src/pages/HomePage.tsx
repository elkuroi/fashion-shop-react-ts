import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 transition-colors">
      {/* 🌄 Background Image + затемнение */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.5] contrast-125"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80)`,
        }}
      ></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 p-8 rounded-xl max-w-xl text-white"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-indigo-400">Fashion Shop</span>
        </h1>
        <p className="text-gray-200 text-lg mb-8">
          Discover your style. Shop the latest trends in fashion, footwear and accessories.
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/catalog"
            className="px-6 py-3 bg-white text-black text-sm font-semibold rounded shadow hover:bg-gray-200 transition"
          >
            Start Shopping
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}