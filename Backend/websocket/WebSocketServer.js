const WebSocket = require('ws')
const jwt = require('jsonwebtoken')

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server })
    this.clients = new Map() // Store connected clients with their user info

    this.wss.on('connection', (ws, request) => {
      console.log('New WebSocket connection established')

      // Handle incoming messages
      ws.on('message', (message) => {
        this.handleMessage(ws, message)
      })

      // Handle client disconnection
      ws.on('close', () => {
        this.handleDisconnection(ws)
      })

      // Handle connection errors
      ws.on('error', (error) => {
        console.error('WebSocket error:', error)
      })

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected to WebSocket server! Send messages to start chatting.',
        timestamp: new Date().toISOString()
      }))
    })

    console.log('WebSocket server initialized')
  }

  handleMessage(ws, message) {
    try {
      const data = JSON.parse(message.toString())

      switch (data.type) {
        case 'authenticate':
          this.authenticateUser(ws, data)
          break
        case 'message':
          this.handleChatMessage(ws, data)
          break
        case 'ping':
          ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }))
          break
        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Unknown message type',
            timestamp: new Date().toISOString()
          }))
      }
    } catch (error) {
      console.error('Error handling message:', error)
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format',
        timestamp: new Date().toISOString()
      }))
    }
  }

  authenticateUser(ws, data) {
    try {
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET)
      this.clients.set(ws, {
        id: decoded.id,
        name: data.name || 'Anonymous',
        role: data.role || 'student'
      })

      ws.send(JSON.stringify({
        type: 'authenticated',
        message: `Welcome ${data.name || 'Anonymous'}! You are now authenticated.`,
        user: { id: decoded.id, name: data.name, role: data.role },
        timestamp: new Date().toISOString()
      }))

      // Notify all clients about new user
      this.broadcast({
        type: 'user_joined',
        message: `${data.name || 'Anonymous'} joined the chat`,
        user: { name: data.name, role: data.role },
        timestamp: new Date().toISOString()
      }, ws)

    } catch (error) {
      ws.send(JSON.stringify({
        type: 'auth_error',
        message: 'Authentication failed',
        timestamp: new Date().toISOString()
      }))
    }
  }

  handleChatMessage(ws, data) {
    const clientInfo = this.clients.get(ws)

    if (!clientInfo) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Please authenticate first',
        timestamp: new Date().toISOString()
      }))
      return
    }

    const messageData = {
      type: 'message',
      message: data.message,
      user: {
        id: clientInfo.id,
        name: clientInfo.name,
        role: clientInfo.role
      },
      timestamp: new Date().toISOString()
    }

    // Broadcast message to all connected clients
    this.broadcast(messageData)
  }

  handleDisconnection(ws) {
    const clientInfo = this.clients.get(ws)
    if (clientInfo) {
      console.log(`${clientInfo.name} disconnected`)

      // Notify other clients
      this.broadcast({
        type: 'user_left',
        message: `${clientInfo.name} left the chat`,
        user: { name: clientInfo.name },
        timestamp: new Date().toISOString()
      }, ws)

      this.clients.delete(ws)
    }
  }

  broadcast(data, excludeClient = null) {
    this.wss.clients.forEach(client => {
      if (client !== excludeClient && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data))
      }
    })
  }

  // Method to get connected clients count
  getConnectedClientsCount() {
    return this.wss.clients.size
  }

  // Method to get authenticated users
  getAuthenticatedUsers() {
    return Array.from(this.clients.values())
  }
}

module.exports = WebSocketServer