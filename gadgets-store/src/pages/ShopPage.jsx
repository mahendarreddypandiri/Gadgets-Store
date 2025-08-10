import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import PriceRange from '../components/filters/PriceRange'
import SortDropdown from '../components/filters/SortDropdown'
import { setPageSEO } from '../utils/seo'
import { fetchProducts } from '../api/products'
import Loading from '../components/common/Loading'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

const categories = ['All', 'Smartphones', 'Headphones', 'Smartwatches', 'Accessories']

export default function ShopPage() {
  useEffect(() => setPageSEO({ title: 'Shop – Gadgets Store', description: 'Browse all gadgets with filters and sorting.' }), [])
  const query = useQuery()
  const initialCategory = query.get('category') || 'All'

  const [category, setCategory] = useState(initialCategory)
  const [price, setPrice] = useState([0, 2000])
  const [sort, setSort] = useState('popular')
  const [items, setItems] = useState(null)

  useEffect(() => {
    const params = { category: category === 'All' ? undefined : category, minPrice: price[0], maxPrice: price[1] }
    fetchProducts(params).then(setItems).catch(() => setItems([]))
  }, [category, price])

  const listed = useMemo(() => {
    let list = items || []
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => Number(a.price) - Number(b.price))
        break
      case 'price-desc':
        list = [...list].sort((a, b) => Number(b.price) - Number(a.price))
        break
      case 'newest':
        list = [...list].reverse()
        break
      default:
        break
    }
    return list
  }, [items, sort])

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl font-bold">Shop</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <label className="inline-flex items-center gap-2">
                    <input type="radio" name="category" checked={category === cat} onChange={() => setCategory(cat)} />
                    <span>{cat}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-4">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <PriceRange min={0} max={2000} value={price} onChange={setPrice} />
          </div>
        </aside>
        <section className="md:col-span-3">
          <div className="mb-4 flex items-center justify-end gap-3">
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          {items === null ? <Loading /> : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {listed.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}