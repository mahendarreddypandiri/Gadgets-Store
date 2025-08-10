import { Link } from 'react-router-dom'
import { useCart } from '../state/CartContext'
import QuantitySelector from '../components/products/QuantitySelector'
import { useEffect } from 'react'
import { setPageSEO } from '../utils/seo'

export default function CartPage() {
  const { state, totals, setQuantity, removeFromCart } = useCart()
  useEffect(() => setPageSEO({ title: 'Your Cart – Gadgets Store', description: 'View items in your cart and proceed to checkout.' }), [])

  if (state.items.length === 0) {
    return (
      <div className="container-responsive py-12 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Go to Shop</Link>
      </div>
    )
  }

  return (
    <div className="container-responsive py-8">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2 space-y-4">
          {state.items.map(item => (
            <div key={item.id} className="card p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="h-20 w-20 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
              </div>
              <QuantitySelector value={item.quantity} onChange={(v) => setQuantity(item.id, v)} />
              <div className="w-24 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">Remove</button>
            </div>
          ))}
        </section>
        <aside className="card p-4 h-fit">
          <h2 className="font-semibold mb-3">Order Summary</h2>
          <div className="flex items-center justify-between py-1">
            <span>Subtotal</span>
            <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span>Shipping</span>
            <span className="font-medium">$0.00</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t mt-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${totals.total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-primary w-full mt-4 text-center">Proceed to Checkout</Link>
        </aside>
      </div>
    </div>
  )
}