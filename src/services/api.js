import axios from 'axios'

const api = axios.create({
  baseURL: 'http://35.196.79.227:8000',
})

export async function getProdutos() {
  const response = await api.get('/products/user/228')
  
  const produtos = response.data.map(produto => ({
    ...produto,
    image_path: produto.image_path 
      ? `http://35.196.79.227:8000${produto.image_path}` 
      : '/placeholder-image.jpg'
  }))
  
  return produtos
}

export async function login(email, password) {
  const response = await api.post('/login', { email, password })
  const token = response.data.token
  if (token) {
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return response.data
}

export async function register(name, email, password) {
  const response = await api.post('/register', { name, email, password })
  return response.data
}

export async function getUsuario() {
  const response = await api.get('/users/me')
  return response.data
}

const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api