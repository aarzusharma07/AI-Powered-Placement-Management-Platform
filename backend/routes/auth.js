import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// Mock Authentication Routes
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, company, university } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const newUser = new User({
      name,
      email,
      password, // In production, hash this
      role,
      company,
      university,
      isVerified: false
    })

    await newUser.save()

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Mock password check (in production, use bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        university: user.university
      },
      token: 'mock-jwt-token-' + user._id
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
