import { api } from './client'

export function fetchProducts(params = {}) {
  const q = new URLSearchParams()
  if (params.category) q.set('category', params.category)
  if (typeof params.minPrice === 'number') q.set('minPrice', String(params.minPrice))
  if (typeof params.maxPrice === 'number') q.set('maxPrice', String(params.maxPrice))
  const qs = q.toString()
  return api.get(`/products${qs ? `?${qs}` : ''}`)
}

export function fetchProduct(slug) {
  return api.get(`/products/${encodeURIComponent(slug)}`)
}

export function postReview(slug, { author, rating, text }) {
  return api.post(`/products/${encodeURIComponent(slug)}/reviews`, { author, rating, text })
}