const mongoose = require('mongoose')

// Support multiple env var names and default to local Mongo for dev
const MONGO = process.env.MONGO_URI || process.env.MONGO || 'mongodb://127.0.0.1:27017/linkedin_clone'

// Use a global cached connection to avoid opening new connections on every
// serverless function invocation (cold starts aside).
let cached = global._mongo

if (!cached) {
  cached = global._mongo = { conn: null, promise: null }
}

async function connect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    // mongoose v7+ doesn't need useNewUrlParser/useUnifiedTopology flags
    cached.promise = mongoose.connect(MONGO).then((mongooseInstance) => {
      return mongooseInstance
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

module.exports = connect
