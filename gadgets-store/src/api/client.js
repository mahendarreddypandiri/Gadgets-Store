import { API_BASE_URL } from './config'

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    let error
    try { error = await res.json() } catch { error = { message: res.statusText } }
    throw new Error(error.message || 'Request failed')
  }
  try { return await res.json() } catch { return null }
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
}