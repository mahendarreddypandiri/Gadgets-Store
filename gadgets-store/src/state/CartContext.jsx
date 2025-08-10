import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = { items: [] }

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'ADD': {
      const { product, quantity } = action.payload
      const existing = state.items.find(i => i.id === product.id)
      let nextItems
      if (existing) {
        nextItems = state.items.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
      } else {
        nextItems = [...state.items, { id: product.id, name: product.title, price: product.price, image: product.images?.[0], quantity }]
      }
      return { ...state, items: nextItems }
    }
    case 'REMOVE': {
      const id = action.payload
      return { ...state, items: state.items.filter(i => i.id !== id) }
    }
    case 'SET_QTY': {
      const { id, quantity } = action.payload
      return { ...state, items: state.items.map(i => (i.id === id ? { ...i, quantity } : i)) }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const raw = localStorage.getItem('gs.cart')
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        dispatch({ type: 'INIT', payload: parsed })
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gs.cart', JSON.stringify(state))
  }, [state])

  const totals = useMemo(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    return { itemCount, subtotal, total: subtotal }
  }, [state.items])

  const api = useMemo(() => ({
    state,
    totals,
    addToCart: (product, quantity = 1) => dispatch({ type: 'ADD', payload: { product, quantity } }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE', payload: id }),
    setQuantity: (id, quantity) => dispatch({ type: 'SET_QTY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  }), [state, totals])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}