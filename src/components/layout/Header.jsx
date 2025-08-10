import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { FiShoppingCart, FiSun, FiMoon, FiChevronDown } from 'react-icons/fi'
import { useCart } from '../../state/CartContext'
import { useTheme } from '../../state/ThemeContext'
import products from '../../data/products'

const categories = ['Smartphones', 'Headphones', 'Smartwatches', 'Accessories']

export default function Header() {
  const { totals } = useCart()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return products
      .filter(p => p.title.toLowerCase().includes(q))
      .slice(0, 6)
  }, [query])

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="container-responsive flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary font-heading text-xl font-bold">
          <span className="inline-block w-3 h-6 bg-primary rounded-sm" aria-hidden />
          Gadgets Store
        </Link>

        <div className="relative">
          <button onClick={() => setOpen(o => !o)} className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
            Categories <FiChevronDown />
          </button>
          {open && (
            <div className="absolute mt-2 w-56 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-card">
              {categories.map(cat => (
                <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => setOpen(false)}>
                  {cat}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search gadgets..."
            className="input pl-4 pr-10"
            aria-label="Search"
          />
          {query && (
            <div className="absolute mt-1 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-card max-h-80 overflow-auto">
              {suggestions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">No results</div>
              ) : (
                suggestions.map(s => (
                  <button key={s.id} className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800" onClick={() => { setQuery(''); navigate(`/product/${s.id}`) }}>
                    {s.title}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}>
            Shop
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary'}>
            Contact
          </NavLink>
        </nav>

        <button onClick={toggle} aria-label="Toggle dark mode" className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900">
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>

        <Link to="/cart" className="relative p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900" aria-label="Cart">
          <FiShoppingCart />
          {totals.itemCount > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-primary text-white text-xs px-2 py-0.5">
              {totals.itemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
