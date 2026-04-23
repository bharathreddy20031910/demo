const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./Routes/authRoutes')
const uploadRoutes = require('./Routes/uploadRoutes')
const cors = require('cors')
const WebSocketServer = require('./websocket/WebSocketServer')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use('/uploads', express.static('uploads')) // Removed since files are now stored in Cloudinary

// API Routes
app.use('/api', authRoutes)
app.use('/api', uploadRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is missing in .env')
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log('Database Connected') })
  .catch((err) => { console.log('Database Error:', err) })

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// Initialize WebSocket server
const wsServer = new WebSocketServer(server)

// Make WebSocket server available globally for other modules if needed
global.wsServer = wsServer

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})
