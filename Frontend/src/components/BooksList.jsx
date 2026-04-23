import { useState, useEffect } from 'react'
import { getBooks, deleteBook } from '../services/api'
import BookForm from './BookForm'

export default function BooksList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getBooks()
      setBooks(Array.isArray(data) ? data : [])
    } catch (err) {
      setError('Failed to fetch books. Make sure the backend server is running on port 5000.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id)
        setBooks(books.filter(book => book._id !== id))
      } catch (err) {
        alert('Failed to delete book')
      }
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingBook(null)
  }

  const handleFormSuccess = () => {
    fetchBooks()
    handleFormClose()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Books</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Book
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <BookForm
          book={editingBook}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {loading ? (
        <p className="text-gray-600">Loading books...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books found. Add a new book to get started.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div
              key={book._id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Year:</span> {book.year}
              </p>
              <p className="text-gray-600 mb-4">{book.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingBook(book)
                    setShowForm(true)
                  }}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
