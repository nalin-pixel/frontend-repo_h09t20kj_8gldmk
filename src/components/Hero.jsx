import { motion } from 'framer-motion'

export default function Hero({ onShopClick }) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, #ff3d00 0, transparent 40%), radial-gradient(circle at 80% 0, #00d9ff 0, transparent 40%)'
      }} />
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              Elevate Your Run
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-cyan-400">Shop the latest from Nike & Puma</span>
            </motion.h1>
            <p className="mt-6 text-gray-300 max-w-xl">
              Performance-engineered sneakers built for speed, comfort and style.
              Discover our newest drops and exclusive colorways.
            </p>
            <div className="mt-8 flex gap-4">
              <button onClick={onShopClick} className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
                Shop now
              </button>
              <a href="#featured" className="px-6 py-3 rounded-md font-semibold border border-white/30 hover:bg-white/10 transition">
                Featured
              </a>
            </div>
          </div>
          <motion.img
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop"
            alt="Hero shoe"
            className="w-full rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}
