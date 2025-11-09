// Keep a small compatibility handler for requests to /api (exact).
const serverless = require('serverless-http')
const app = require('../app')
const connect = require('../db')

let isConnected = false
const handler = serverless(app)

module.exports = async (req, res) => {
  try {
    if (!isConnected) {
      await connect()
      isConnected = true
    }
    return handler(req, res)
  } catch (err) {
    console.error('Database connection error', err)
    res.statusCode = 500
    res.end('Database connection error')
  }
}
