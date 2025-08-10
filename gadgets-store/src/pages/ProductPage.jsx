import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageGallery from '../components/products/ImageGallery'
import QuantitySelector from '../components/products/QuantitySelector'
import RatingStars from '../components/common/RatingStars'
import Breadcrumbs from '../components/common/Breadcrumbs'
import Reviews from '../components/products/Reviews'
import { useCart } from '../state/CartContext'
import { setPageSEO } from '../utils/seo'
import { fetchProduct } from '../api/products'
import Loading from '../components/common/Loading'

function averageRating(reviews = []) {
  if (!reviews.length) return 0
  return reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length
}

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchProduct(slug).then(p => { setProduct(p); setLoading(false); setPageSEO({ title: `${p.title} – Gadgets Store`, description: p.description }) }).catch(() => setLoading(false))
  }, [slug])

  if (loading) return <Loading />

  if (!product) {
    return (
      <div className="container-responsive py-12">
        <p>Product not found. <Link to="/shop" className="text-primary hover:underline">Back to shop</Link></p>
      </div>
    )
  }

  const rating = averageRating(product.reviews)

  function handleAdd() {
    addToCart(product, qty)
    setAdded('Added to cart!')
    setTimeout(() => setAdded(''), 2000)
  }

  return (
    <div className="container-responsive py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.category, to: `/shop?category=${encodeURIComponent(product.category)}` }, { label: product.title }]} />
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <ImageGallery images={product.images} title={product.title} />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <RatingStars rating={rating} count={product.reviews?.length} />
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </div>
          <div className="mt-4 text-3xl font-semibold">${Number(product.price).toFixed(2)}</div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <QuantitySelector value={qty} onChange={setQty} min={1} max={product.stock || 99} />
            <button className="btn-primary" onClick={handleAdd} disabled={product.stock === 0}>Add to cart</button>
            {added && <span className="text-green-600">{added}</span>}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-semibold mb-2">Customer Reviews</h3>
        <Reviews reviews={product.reviews} />
      </div>
    </div>
  )
}