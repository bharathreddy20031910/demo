import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

export default function LandingPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">EduManage</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform for students and teachers to manage their educational journey.
            Join our community and unlock your potential.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Left side - Features */}
              <div className="md:w-1/2 bg-blue-600 text-white p-8">
                <h2 className="text-2xl font-bold mb-6">Why Choose EduManage?</h2>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Role-based access for Students and Teachers</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Secure JWT authentication</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Personalized dashboards</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Cloud-based file storage</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>User management capabilities</span>
                  </li>
                </ul>
              </div>

              {/* Right side - Auth Forms */}
              <div className="md:w-1/2 p-8">
                <div className="mb-6">
                  <div className="flex justify-center space-x-4 mb-6">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        isLogin
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        !isLogin
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>

                {isLogin ? (
                  <LoginForm onLoginSuccess={onLoginSuccess} />
                ) : (
                  <SignupForm onSignupSuccess={() => setIsLogin(true)} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}