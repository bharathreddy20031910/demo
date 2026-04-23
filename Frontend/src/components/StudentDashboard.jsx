import { useEffect, useState } from 'react'
import { getUserProfile, removeToken } from '../services/authService'
import WebSocketChat from './WebSocketChat'

export default function StudentDashboard({ user, onLogout }) {
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile()
        setUserProfile(response.data.user)
      } catch (err) {
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    removeToken()
    onLogout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'chat'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              WebSocket Chat
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <>
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome back, {userProfile?.name}!
              </h2>
              <p className="text-gray-600">Here's your student dashboard overview</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">My Profile</h3>
              {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 text-lg text-gray-900">{userProfile?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{userProfile?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <p className="mt-1 text-lg text-gray-900 capitalize">{userProfile?.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member Since</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl text-blue-600 mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">My Courses</h3>
                <p className="text-gray-600">View and manage your enrolled courses</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl text-green-600 mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Assignments</h3>
                <p className="text-gray-600">Check your assignments and submissions</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl text-purple-600 mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Grades</h3>
                <p className="text-gray-600">View your academic performance</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'chat' && (
          <WebSocketChat user={user} />
        )}
      </div>
    </div>
  )
}