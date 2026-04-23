import { useEffect, useState } from 'react'
import { getUserProfile, getUsers, deleteUser, removeToken } from '../services/authService'
import WebSocketChat from './WebSocketChat'

export default function TeacherDashboard({ user, onLogout }) {
  const [userProfile, setUserProfile] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, usersResponse] = await Promise.all([
          getUserProfile(),
          getUsers()
        ])
        setUserProfile(profileResponse.data.user)
        setAllUsers(usersResponse.data.users)
      } catch (err) {
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId)
        setAllUsers(allUsers.filter(u => u._id !== userId))
        alert('User deleted successfully')
      } catch (err) {
        alert('Failed to delete user')
      }
    }
  }

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
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
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
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'users'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 font-semibold ${
                activeTab === 'chat'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
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
              <p className="text-gray-600">Manage your students and oversee the platform</p>
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
                <div className="text-4xl text-blue-600 mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Manage Students</h3>
                <p className="text-gray-600">Oversee student accounts and progress</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl text-green-600 mb-4">📊</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Analytics</h3>
                <p className="text-gray-600">View platform statistics and reports</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl text-purple-600 mb-4">⚙️</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Settings</h3>
                <p className="text-gray-600">Configure platform settings</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">User Management</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-3 text-left">Name</th>
                    <th className="border p-3 text-left">Email</th>
                    <th className="border p-3 text-left">Role</th>
                    <th className="border p-3 text-left">Joined</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length > 0 ? (
                    allUsers.map(u => (
                      <tr key={u._id} className="hover:bg-gray-100">
                        <td className="border p-3">{u.name}</td>
                        <td className="border p-3">{u.email}</td>
                        <td className="border p-3 capitalize">{u.role}</td>
                        <td className="border p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="border p-3">
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="border p-3 text-center text-gray-600">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <WebSocketChat user={user} />
        )}
      </div>
    </div>
  )
}