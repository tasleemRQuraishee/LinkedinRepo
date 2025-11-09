const app = require('./app')
const connect = require('./db')

const PORT = process.env.PORT || 4000

// For local development we connect to MongoDB and start the server.
connect()
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error', err)
  })
