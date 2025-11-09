const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// GET /api/auth - health/auth check
router.get('/', async (req, res) => {
  try {
    const auth = req.header('Authorization')
    if (!auth) return res.status(200).json({ authenticated: false })

    const parts = auth.split(' ')
    if (parts.length !== 2) return res.status(401).json({ error: 'Invalid token format' })

    const token = parts[1]
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
      const user = await User.findById(payload.id).select('-password')
      if (!user) return res.status(401).json({ authenticated: false })
      return res.json({ authenticated: true, user })
    } catch (err) {
      return res.status(401).json({ authenticated: false })
    }
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })

    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email already in use' })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hash })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router

