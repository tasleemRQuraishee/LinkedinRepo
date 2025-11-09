const app = require('../app')
const connect = require('../db')

// Catch-all Vercel serverless handler for any /api/* path.
let isConnected = false

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connect()
      isConnected = true
    }

    return app(req, res)
  } catch (err) {
    console.error('Database connection error', err)
    res.statusCode = 500
    res.end('Database connection error')
  }
}
