const express = require('express')
const { signup, login, getUsers, getUserProfile, deleteUser } = require('../Controllers/authController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/users', protect, authorize('teacher'), getUsers)
router.get('/profile', protect, getUserProfile)
router.delete('/users/:id', protect, deleteUser)

module.exports = router
