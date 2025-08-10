import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { setPageSEO } from '../utils/seo'
import { fetchProducts } from '../api/products'
import Loading from '../components/common/Loading'

export default function HomePage() {
  const [items, setItems] = useState(null)
  useEffect(() => setPageSEO({ title: 'Gadgets Store – Latest Tech & Accessories', description: 'Shop smartphones, headphones, smartwatches, and accessories at Gadgets Store.' }), [])
  useEffect(() => { fetchProducts().then(setItems).catch(() => setItems([])) }, [])
  const featured = (items || []).slice(0, 4)

  return (
    <div>
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container-responsive py-16 md:py-24 grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Upgrade Your Tech Game</h1>
            <p className="mt-4 text-white/90">Discover the latest gadgets at unbeatable prices. Fast shipping and easy returns.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/shop" className="btn-outline bg-white text-primary hover:bg-blue-50">Shop Now</Link>
              <a href="#featured" className="btn-outline border-white text-white hover:bg-white hover:text-primary">Best Sellers</a>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop" alt="Latest gadgets" className="rounded-xl shadow-card" />
          </div>
        </div>
      </section>

      <section id="featured" className="container-responsive py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link to="/shop" className="text-primary hover:underline">View all</Link>
        </div>
        {items === null ? <Loading /> : (
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      <section className="container-responsive py-12">
        <div className="card p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold">Stay in the loop</h3>
            <p className="text-gray-600 dark:text-gray-400">Get updates on new arrivals and special offers.</p>
          </div>
          <form className="flex w-full md:w-auto gap-3">
            <input type="email" placeholder="Enter your email" className="input" required />
            <button className="btn-primary" type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}