import { Link } from 'react-router-dom'
import RatingStars from '../common/RatingStars'
import { useCart } from '../../state/CartContext'

function averageRating(reviews = []) {
  if (!reviews.length) return 0
  const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0)
  return sum / reviews.length
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const rating = averageRating(product.reviews)
  return (
    <div className="card overflow-hidden">
      <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden">
        {product.images?.[0] && (
          <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
        )}
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.slug}`} className="block font-medium line-clamp-2 hover:text-primary">{product.title}</Link>
        <div className="mt-1 text-sm text-gray-500">{product.category}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-lg font-semibold">${Number(product.price).toFixed(2)}</div>
          <RatingStars rating={rating} count={product.reviews?.length} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          <button className="btn-primary" onClick={() => addToCart(product, 1)} disabled={product.stock === 0}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}