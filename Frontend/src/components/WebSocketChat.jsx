import { useState, useEffect, useRef } from 'react'
import { getToken } from '../services/authService'

export default function WebSocketChat({ user }) {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('Disconnected')
  const wsRef = useRef(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const connectWebSocket = () => {
    try {
      const ws = new WebSocket('ws://localhost:5000')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        setConnectionStatus('Connected')

        // Authenticate with JWT token
        const token = getToken()
        if (token && user) {
          ws.send(JSON.stringify({
            type: 'authenticate',
            token: token,
            name: user.name,
            role: user.role
          }))
        }
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('Received:', data)

          setMessages(prev => [...prev, {
            id: Date.now() + Math.random(),
            ...data,
            timestamp: new Date(data.timestamp).toLocaleTimeString()
          }])
        } catch (error) {
          console.error('Error parsing message:', error)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
        setConnectionStatus('Disconnected')
        wsRef.current = null
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setConnectionStatus('Error')
      }

    } catch (error) {
      console.error('Failed to connect:', error)
      setConnectionStatus('Connection Failed')
    }
  }

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close()
    }
  }

  const sendMessage = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      alert('WebSocket is not connected')
      return
    }

    if (!inputMessage.trim()) return

    wsRef.current.send(JSON.stringify({
      type: 'message',
      message: inputMessage.trim()
    }))

    setInputMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const sendPing = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'ping' }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">WebSocket Learning Chat</h2>

          {/* Connection Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">Status: {connectionStatus}</span>
            </div>

            <div className="space-x-2">
              {!isConnected ? (
                <button
                  onClick={connectWebSocket}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Connect
                </button>
              ) : (
                <button
                  onClick={disconnectWebSocket}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Disconnect
                </button>
              )}

              <button
                onClick={sendPing}
                disabled={!isConnected}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Ping Server
              </button>
            </div>
          </div>

          {/* Educational Info */}
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">🎓 Learning WebSockets</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Connect:</strong> Establish a WebSocket connection</li>
              <li>• <strong>Authenticate:</strong> Send JWT token for user verification</li>
              <li>• <strong>Send Messages:</strong> Real-time bidirectional communication</li>
              <li>• <strong>Receive Updates:</strong> Get messages from other connected users</li>
              <li>• <strong>Ping/Pong:</strong> Test connection health</li>
            </ul>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <p>No messages yet. Connect and start chatting!</p>
              <p className="text-sm mt-2">Try sending a ping to test the connection.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="mb-3">
                <div className={`p-3 rounded-lg max-w-xs ${
                  msg.type === 'message' && msg.user?.id === user?.id
                    ? 'bg-blue-500 text-white ml-auto'
                    : msg.type === 'message'
                    ? 'bg-white text-gray-800'
                    : 'bg-yellow-100 text-yellow-800 text-center max-w-full'
                }`}>
                  {msg.type === 'message' && (
                    <div className="text-xs opacity-75 mb-1">
                      {msg.user?.name} ({msg.user?.role}) - {msg.timestamp}
                    </div>
                  )}
                  <div className="text-sm">{msg.message}</div>
                  {msg.type !== 'message' && (
                    <div className="text-xs mt-1 opacity-75">{msg.timestamp}</div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={!isConnected}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !inputMessage.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">🔧 Technical Details</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>WebSocket URL:</strong> ws://localhost:5000</p>
          <p><strong>Message Types:</strong> authenticate, message, ping, pong, welcome, user_joined, user_left</p>
          <p><strong>Authentication:</strong> JWT token required for user identification</p>
          <p><strong>Real-time:</strong> Bidirectional communication without polling</p>
        </div>
      </div>
    </div>
  )
}