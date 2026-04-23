import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const signup = (userData) => apiClient.post('/signup', userData)
export const login = (credentials) => apiClient.post('/login', credentials)
export const getUsers = () => apiClient.get('/users')
export const getUserProfile = () => apiClient.get('/profile')
export const deleteUser = (userId) => apiClient.delete(`/users/${userId}`)

// Helper functions for token management
export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const isAuthenticated = () => {
  return !!getToken()
}
