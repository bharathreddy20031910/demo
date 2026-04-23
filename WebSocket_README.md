# WebSocket Learning Implementation

This project includes a simple WebSocket implementation designed for teaching students about real-time web communication.

## 🎯 Learning Objectives

- Understand WebSocket protocol and real-time communication
- Learn bidirectional client-server communication
- Implement JWT authentication over WebSockets
- Handle connection states and error management
- Build a simple chat application

## 🚀 Features

### Backend (Node.js + Express)
- **WebSocket Server**: Built with `ws` library
- **Authentication**: JWT-based user authentication
- **Message Types**: Support for different message types (auth, message, ping, etc.)
- **Connection Management**: Handle user connections and disconnections
- **Broadcasting**: Send messages to all connected clients

### Frontend (React)
- **WebSocket Client**: Native WebSocket API
- **Real-time Chat**: Send and receive messages instantly
- **Connection Status**: Visual indicators for connection state
- **User Authentication**: JWT token integration
- **Educational UI**: Clear explanations and technical details

## 📋 Message Types

### Client → Server
```json
{
  "type": "authenticate",
  "token": "jwt_token_here",
  "name": "User Name",
  "role": "student|teacher"
}
```

```json
{
  "type": "message",
  "message": "Hello, WebSocket!"
}
```

```json
{
  "type": "ping"
}
```

### Server → Client
```json
{
  "type": "welcome",
  "message": "Connected to WebSocket server!",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

```json
{
  "type": "authenticated",
  "message": "Welcome User!",
  "user": { "id": "...", "name": "...", "role": "..." },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

```json
{
  "type": "message",
  "message": "Hello from another user",
  "user": { "id": "...", "name": "...", "role": "..." },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

```json
{
  "type": "user_joined",
  "message": "User joined the chat",
  "user": { "name": "...", "role": "..." },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

```json
{
  "type": "user_left",
  "message": "User left the chat",
  "user": { "name": "..." },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

```json
{
  "type": "pong",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🛠️ Technical Implementation

### Backend Architecture
```
Backend/
├── websocket/
│   └── WebSocketServer.js    # Main WebSocket server class
├── Controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   └── auth.js              # JWT middleware
└── index.js                 # Express server with WS integration
```

### Frontend Architecture
```
Frontend/
├── components/
│   ├── WebSocketChat.jsx    # Chat component with WS client
│   ├── StudentDashboard.jsx # Student dashboard with chat tab
│   └── TeacherDashboard.jsx # Teacher dashboard with chat tab
└── services/
    └── authService.js       # Authentication service
```

## 🔧 Setup Instructions

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

2. **Environment Variables**
   Make sure your `.env` file has:
   ```
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_uri
   ```

3. **Start Servers**
   ```bash
   # Terminal 1 - Backend
   cd Backend && npm start

   # Terminal 2 - Frontend
   cd Frontend && npm run dev
   ```

4. **Access Application**
   - Frontend: http://localhost:5173
   - WebSocket: ws://localhost:5000

## 🎓 Teaching Points

### 1. WebSocket vs HTTP
- **HTTP**: Request-response, stateless, polling needed for real-time
- **WebSocket**: Persistent connection, bidirectional, real-time

### 2. Connection Lifecycle
- **Connect**: `new WebSocket(url)`
- **Open**: `onopen` event
- **Message**: `onmessage` event
- **Close**: `onclose` event
- **Error**: `onerror` event

### 3. Message Handling
- JSON serialization/deserialization
- Message type routing
- Error handling

### 4. Authentication
- JWT tokens for user identification
- Secure message validation
- Role-based features

### 5. Real-time Concepts
- Broadcasting to multiple clients
- Connection management
- State synchronization

## 🧪 Testing the WebSocket

1. **Open multiple browser tabs**
2. **Login with different users**
3. **Navigate to WebSocket Chat tab**
4. **Connect and start chatting**
5. **Test ping functionality**
6. **Observe real-time message delivery**

## 🔍 Code Walkthrough

### Backend WebSocket Server
```javascript
// Initialize WebSocket server
const wsServer = new WebSocketServer(server)

// Handle connections
ws.on('connection', (ws, request) => {
  // Handle messages
  ws.on('message', (message) => {
    this.handleMessage(ws, message)
  })
})
```

### Frontend WebSocket Client
```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:5000')

// Handle connection
ws.onopen = () => {
  console.log('Connected')
  // Authenticate
  ws.send(JSON.stringify({
    type: 'authenticate',
    token: token,
    name: user.name,
    role: user.role
  }))
}

// Handle messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data)
  // Process message based on type
}
```

## 🚀 Extensions for Advanced Learning

1. **Private Messaging**: Add direct user-to-user messaging
2. **Rooms/Channels**: Implement chat rooms
3. **File Sharing**: Send files over WebSocket
4. **Typing Indicators**: Show when users are typing
5. **Message History**: Persist messages in database
6. **Rate Limiting**: Prevent spam messages
7. **Connection Pooling**: Handle large numbers of connections

## 📚 Resources

- [WebSocket API MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [ws Library Documentation](https://github.com/websockets/ws)
- [Real-time Web Apps with WebSockets](https://web.dev/websockets/)
- [JWT Authentication](https://jwt.io/)

---

This WebSocket implementation provides a solid foundation for teaching real-time web development concepts!