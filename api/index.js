const app = require('../app')
const connect = require('../db')

// Keep track of whether we've connected to the DB. For Vercel serverless
// functions we want to reuse the cached connection when possible.
let isConnected = false

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connect()
      isConnected = true
    }

    // An Express app is a function (req, res) so we can call it directly.
    return app(req, res)
  } catch (err) {
    console.error('Database connection error', err)
    res.statusCode = 500
    res.end('Database connection error')
  }
}
