import { api } from './client'

export function createOrder(order) {
  return api.post('/orders', order)
}