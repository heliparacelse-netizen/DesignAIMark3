const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://designaimark3-backend-1.onrender.com'

const getToken = () => {
  if (typeof window === 'undefined') return null
  const token = localStorage.getItem('roomvera_token')
  if (!token || token === 'null' || token === 'undefined') return null
  return token
}

export const api = {
  async post(path: string, body: any, auth = true) {
    const headers: any = { 'Content-Type': 'application/json' }
    if (auth) {
      const token = getToken()
      if (token) headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers, body: JSON.stringify(body) })
    return res.json()
  },
  async get(path: string, auth = true) {
    const headers: any = {}
    if (auth) {
      const token = getToken()
      if (token) headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(`${API_URL}${path}`, { headers })
    return res.json()
  },
  async delete(path: string) {
    const token = getToken()
    const res = await fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
    return res.json()
  },
  setToken(token: string) { localStorage.setItem('roomvera_token', token) },
  removeToken() { localStorage.removeItem('roomvera_token') },
  getToken,
}

export default api
