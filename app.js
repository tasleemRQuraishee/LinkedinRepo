const express = require('express')
const cors = require('cors')


const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')

const app = express()

app.use(cors())
app.use(express.json())

// Mount routes both with and without the /api prefix so the app works
// when served directly (local dev) and when Vercel routes /api/* to the
// serverless handler which may strip the prefix.
app.use('/api/auth', authRoutes)
app.use('/auth', authRoutes)

app.use('/api/posts', postRoutes)
app.use('/posts', postRoutes)

module.exports = app
