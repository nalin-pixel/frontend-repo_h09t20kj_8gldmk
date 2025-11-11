import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'

function App() {
  const [items, setItems] = useState([])
  const [brands, setBrands] = useState([])
  const [activeBrand, setActiveBrand] = useState('All')
  const [cart, setCart] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const load = async () => {
      try {
        const [shoesRes, brandsRes] = await Promise.all([
          fetch(`${baseUrl}/api/shoes`).then(r => r.json()),
          fetch(`${baseUrl}/api/brands`).then(r => r.json()),
        ])
        setItems(shoesRes.items || [])
        setBrands(['All', ...(brandsRes.items || [])])
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [baseUrl])

  const filtered = useMemo(() => {
    if (activeBrand === 'All') return items
    return items.filter(i => i.brand === activeBrand)
  }, [items, activeBrand])

  const addToCart = (item) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === item.id)
      if (exist) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold tracking-tight">FLAMES.SHOES</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {brands.map((b) => (
              <button key={b} onClick={() => setActiveBrand(b)} className={`hover:text-black ${activeBrand===b? 'text-black font-semibold' : 'text-gray-500'}`}>{b}</button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Cart: {cart.reduce((s,i)=>s+i.qty,0)}</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero onShopClick={() => {
        const el = document.getElementById('catalog')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }} />

      {/* Featured strip */}
      <section id="featured" className="container mx-auto px-6 py-10">
        <h2 className="text-xl font-bold mb-4">Featured</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.filter(i=>i.featured).slice(0,4).map(item => (
            <ProductCard key={item.id || item.name} item={item} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Sneakers</h2>
          <div className="md:hidden">
            <select value={activeBrand} onChange={(e)=>setActiveBrand(e.target.value)} className="border rounded px-3 py-2">
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(item => (
            <ProductCard key={item.id || item.name} item={item} onAdd={addToCart} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No products yet. Try seeding the store on the test page.
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 mt-10">
        <div className="container mx-auto px-6 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Flames Shoes. Built for demo purposes.</p>
          <a href="/test" className="underline">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
