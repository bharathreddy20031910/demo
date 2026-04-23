import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import StudentDashboard from './components/StudentDashboard'
import TeacherDashboard from './components/TeacherDashboard'
import { isAuthenticated, getToken } from './services/authService'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      // In a real app, you'd validate the token and get user data
      // For now, we'll just check if token exists
      const token = getToken()
      if (token) {
        // You could decode the token to get user info, but for simplicity
        // we'll redirect to login if no user state
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const handleLoginSuccess = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <LandingPage onLoginSuccess={handleLoginSuccess} />
  }

  // Render appropriate dashboard based on user role
  if (user.role === 'teacher') {
    return <TeacherDashboard user={user} onLogout={handleLogout} />
  } else {
    return <StudentDashboard user={user} onLogout={handleLogout} />
  }
}

export default App
