import { api } from './client'

export function subscribeNewsletter(email) {
  return api.post('/newsletter', { email })
}

export function sendContactMessage({ name, email, message }) {
  return api.post('/contact', { name, email, message })
}