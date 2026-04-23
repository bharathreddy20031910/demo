import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getBooks = async () => {
  try {
    const response = await apiClient.get('/books')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export const createBook = async (bookData) => {
  try {
    const response = await apiClient.post('/books', bookData)
    return response.data
  } catch (error) {
    console.error('Error creating book:', error)
    throw error
  }
}

export const updateBook = async (bookId, bookData) => {
  try {
    const response = await apiClient.put(`/books/${bookId}`, bookData)
    return response.data
  } catch (error) {
    console.error('Error updating book:', error)
    throw error
  }
}

export const deleteBook = async (bookId) => {
  try {
    const response = await apiClient.delete(`/books/${bookId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting book:', error)
    throw error
  }
}

export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export default apiClient
